import React, { useEffect, useRef } from 'react';

interface NeuralMesh3DProps {
  className?: string;
  color?: string; // e.g. "56, 189, 248" (RGB without alpha)
  nodeCount?: number;
  opacity?: number;
}

// Pseudo-random seeded generator for deterministic initial positions
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Node3D {
  // Base position in 3D space
  baseX: number;
  baseY: number;
  baseZ: number;
  // Current animated position
  x: number;
  y: number;
  z: number;
  // Drift parameters (organic movement)
  driftSpeedX: number;
  driftSpeedY: number;
  driftSpeedZ: number;
  driftAmplitude: number;
  driftPhase: number;
  // Pulse parameters
  pulseSpeed: number;
  pulsePhase: number;
  baseRadius: number;
}

export const NeuralMesh3D: React.FC<NeuralMesh3DProps> = ({
  className = "",
  color = "56, 189, 248",
  nodeCount = 50,
  opacity = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let w = 0;
    let h = 0;

    // --- Resize (110% of container for overflow/crop feel) ---
    const SCALE = 1.1; // 110% — overflows container, clipped by overflow:hidden
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = parent.clientWidth * SCALE;
        h = parent.clientHeight * SCALE;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // --- Generate nodes in 3D space ---
    const nodes: Node3D[] = [];
    const spreadX = Math.min(w, 1100) * 0.5;
    const spreadY = Math.min(h, 900) * 0.45;
    const spreadZ = 350;

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      // Vary radius so some nodes are inner, some outer
      const radiusFactor = 0.45 + seededRandom(i * 7) * 0.55;

      const bx = Math.sin(phi) * Math.cos(theta) * spreadX * radiusFactor;
      const by = Math.sin(phi) * Math.sin(theta) * spreadY * radiusFactor;
      const bz = Math.cos(phi) * spreadZ * radiusFactor;

      nodes.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        x: bx,
        y: by,
        z: bz,
        driftSpeedX: 0.2 + seededRandom(i * 3) * 0.6,
        driftSpeedY: 0.2 + seededRandom(i * 5) * 0.6,
        driftSpeedZ: 0.15 + seededRandom(i * 9) * 0.4,
        driftAmplitude: 10 + seededRandom(i * 11) * 25,
        driftPhase: seededRandom(i * 13) * Math.PI * 2,
        pulseSpeed: 0.5 + seededRandom(i * 17) * 1.5,
        pulsePhase: seededRandom(i * 19) * Math.PI * 2,
        baseRadius: 1.2 + seededRandom(i * 23) * 2.0,
      });
    }

    // Pre-compute connection pairs (connect nearby nodes in 3D)
    const connectionPairs: [number, number][] = [];
    const maxDist = spreadX * 0.55;
    for (let i = 0; i < nodeCount; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          distances.push({ idx: j, dist });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);
      const connectCount = Math.min(2 + Math.floor(seededRandom(i * 29) * 2), distances.length);
      for (let k = 0; k < connectCount; k++) {
        const j = distances[k].idx;
        if (i < j) {
          connectionPairs.push([i, j]);
        }
      }
    }

    // --- 3D Projection ---
    const focalLength = 600;

    const project = (x: number, y: number, z: number): { sx: number; sy: number; scale: number; behind: boolean } => {
      const perspZ = z + focalLength;
      if (perspZ < 50) return { sx: 0, sy: 0, scale: 0, behind: true };
      const scale = focalLength / perspZ;
      return {
        sx: w / 2 + x * scale,
        sy: h / 2 + y * scale,
        scale,
        behind: false,
      };
    };

    // --- Camera orbit ---
    const rotateY = (x: number, z: number, angle: number): [number, number] => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos - z * sin, x * sin + z * cos];
    };
    const rotateX = (y: number, z: number, angle: number): [number, number] => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [y * cos - z * sin, y * sin + z * cos];
    };

    // Build a lookup map for fast projected node access
    const projectedMap = new Map<number, { sx: number; sy: number; scale: number; behind: boolean }>();

    // --- Draw loop ---
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // Camera orbit angles
      const camAngleY = time * 0.4;
      const camAngleX = Math.sin(time * 0.15) * 0.15;

      // Update node positions with organic drift
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const t = time + n.driftPhase;
        n.x = n.baseX + Math.sin(t * n.driftSpeedX) * n.driftAmplitude;
        n.y = n.baseY + Math.sin(t * n.driftSpeedY + 1.3) * n.driftAmplitude * 0.7;
        n.z = n.baseZ + Math.sin(t * n.driftSpeedZ + 2.7) * n.driftAmplitude * 0.5;
      }

      // Transform & project all nodes
      projectedMap.clear();
      const sortedProjected: { sx: number; sy: number; scale: number; behind: boolean; idx: number }[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const [rx, rz] = rotateY(n.x, n.z, camAngleY);
        const [ry, rz2] = rotateX(n.y, rz, camAngleX);
        const p = project(rx, ry, rz2);
        projectedMap.set(i, p);
        sortedProjected.push({ ...p, idx: i });
      }

      // Sort back-to-front
      sortedProjected.sort((a, b) => a.scale - b.scale);

      // Draw connections
      ctx.lineCap = 'round';
      for (const [i, j] of connectionPairs) {
        const pi = projectedMap.get(i)!;
        const pj = projectedMap.get(j)!;
        if (pi.behind || pj.behind) continue;

        const avgScale = (pi.scale + pj.scale) / 2;
        const lineAlpha = Math.max(0.03, Math.min(0.25, (avgScale - 0.4) * 0.5)) * opacity;
        if (lineAlpha < 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(pi.sx, pi.sy);
        ctx.lineTo(pj.sx, pj.sy);
        ctx.strokeStyle = `rgba(${color}, ${lineAlpha})`;
        ctx.lineWidth = Math.max(0.3, avgScale * 0.8);
        ctx.stroke();
      }

      // Draw nodes
      for (const p of sortedProjected) {
        if (p.behind) continue;
        const n = nodes[p.idx];

        // Pulse
        const pulse = 1 + Math.sin(time * n.pulseSpeed + n.pulsePhase) * 0.35;
        const r = n.baseRadius * p.scale * pulse;

        // Depth-dependent opacity
        const nodeAlpha = Math.max(0.05, Math.min(0.9, (p.scale - 0.3) * 1.2)) * opacity;
        if (nodeAlpha < 0.02) continue;

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3);
        glowGrad.addColorStop(0, `rgba(${color}, ${nodeAlpha * 0.5})`);
        glowGrad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${nodeAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [color, nodeCount, opacity]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="block"
        style={{ margin: '-5%' }} /* Center the 110% canvas so overflow is even on all sides */
      />
    </div>
  );
};
