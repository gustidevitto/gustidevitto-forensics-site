import React, { useEffect, useRef } from 'react';

interface DnaSpiralProps {
  className?: string;
  speed?: number;
  neonColor1?: string;
  neonColor2?: string;
  opacity?: number;
  position?: 'left' | 'right';
}

export const DnaSpiral: React.FC<DnaSpiralProps> = ({ 
  className = "",
  speed = 1,
  neonColor1 = "rgba(56, 189, 248, ", // Light blue
  neonColor2 = "rgba(245, 158, 11, ", // Amber
  opacity = 0.3,
  position = 'right'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Code snippets to display
    const codeLines = [
      "0x00A1: DATA_LEAK_DETECTED",
      "SYS: REVENUE_STREAM_UNVERIFIED",
      "WARN: MARGIN_EROSION_ACTIVE",
      "INIT: FORENSIC_SCAN_PROTOCOL",
      "0x0B42: STRUCTURAL_INTEGRITY_COMPROMISED",
      "EXEC: DEEP_LEDGER_ANALYSIS",
      "ANOMALY: OVERHEAD_INFLATION",
      "CALC: TRUE_PROFIT_MARGIN",
      "0x11C9: FRANCHISE_ROYALTY_DISCREPANCY",
      "SYS: NEURAL_MESH_ONLINE"
    ];

    const resize = () => {
      // Use parent container dimensions or window
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // DNA settings
    const rungs = 40; // Number of rungs in the helix
    const ySpacing = 30; // Space between rungs
    const radius = Math.min(canvas.width * 0.15, 60); // Helix radius
    const isRight = position === 'right';
    const centerX = isRight ? canvas.width * 0.85 : canvas.width * 0.2; // Right or Left side
    
    // Y threshold for morphing into code (e.g., middle of screen)
    const morphThresholdY = canvas.height * 0.4;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02 * speed;
      
      // Calculate start Y to make it scroll infinitely
      const scrollOffset = (time * 20) % ySpacing;
      
      for (let i = 0; i < rungs; i++) {
        // Base Y position for this rung (scrolling UP)
        let y = canvas.height - (i * ySpacing) + scrollOffset;
        
        // As it scrolls up, we need to handle wrapping around or let it just render off-screen
        // To make it infinite, we map Y back to the bottom if it goes too high
        if (y < -100) {
           // Not wrapping mathematically here, just letting it render because `scrollOffset` handles the infinite illusion
        }
        
        // Calculate phase for rotation
        const phase = (i * 0.3) + time;
        
        // Calculate X positions for the two strands
        const x1 = centerX + Math.sin(phase) * radius;
        const x2 = centerX + Math.sin(phase + Math.PI) * radius;
        
        // 3D effect: calculate Z for depth-sorting and size
        const z1 = Math.cos(phase);
        const z2 = Math.cos(phase + Math.PI);
        const scale1 = 0.5 + (z1 + 1) * 0.25;
        const scale2 = 0.5 + (z2 + 1) * 0.25;

        // Draw Rung
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Strand 1 Node
        ctx.beginPath();
        ctx.arc(x1, y, 3 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = `${neonColor1}${opacity * (0.5 + scale1 * 0.5)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${neonColor1}1)`;
        ctx.fill();

        // Draw Strand 2 Node
        ctx.beginPath();
        ctx.arc(x2, y, 3 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = `${neonColor2}${opacity * (0.5 + scale2 * 0.5)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${neonColor2}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Morph to Code Effect
        // If the rung passes a certain point (morphThresholdY), fade in code
        if (y < morphThresholdY && y > morphThresholdY - 200) {
            const morphProgress = Math.max(0, Math.min(1, (morphThresholdY - y) / 100)); // 0 to 1
            const fadeOutProgress = Math.max(0, Math.min(1, (morphThresholdY - 100 - y) / 100)); // Fades out above offset
            
            const codeOpacity = (morphProgress - fadeOutProgress) * opacity * 2;
            
            if (codeOpacity > 0.01) {
                // Select code line based on 'i' to be deterministic
                const codeIndex = i % codeLines.length;
                const text = codeLines[codeIndex];
                
                // Draw connecting line moving out
                const codeStartX = isRight ? centerX - radius - 20 : centerX + radius + 20;
                const lineProgress = Math.min(1, morphProgress * 2);
                const codeEndX = isRight ? codeStartX - (50 * lineProgress) : codeStartX + (50 * lineProgress);
                
                ctx.beginPath();
                ctx.moveTo(isRight ? Math.min(x1, x2) : Math.max(x1, x2), y);
                ctx.lineTo(codeEndX, y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${codeOpacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                // Draw Text
                ctx.font = '10px monospace';
                ctx.fillStyle = `rgba(255, 255, 255, ${codeOpacity})`;
                if (isRight) {
                    ctx.textAlign = 'right';
                    ctx.fillText(text, codeEndX - 5, y + 3);
                } else {
                    ctx.textAlign = 'left';
                    ctx.fillText(text, codeEndX + 5, y + 3);
                }
            }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, neonColor1, neonColor2, opacity, position]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
