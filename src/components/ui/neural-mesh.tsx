import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface NeuralMeshProps {
    colorClass: string // Tailwind color class, e.g., 'text-red-500'
}

// Pseudo-random generator for stable hydration & renders
const pRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
    return x - Math.floor(x)
}

export function NeuralMeshBackground({ colorClass }: NeuralMeshProps) {
    const { nodes, lines } = useMemo(() => {
        const generatedNodes = Array.from({ length: 30 }).map((_, i) => {
            // Distribute primarily in a ring to avoid the center text if possible
            const angle = (i / 30) * Math.PI * 2
            
            // Randomize radius between 25% and 48% of the SVG viewport to form an orbiting shell
            const baseRad = 25 + pRandom(i) * 23
            
            // Add slight jitter to angle
            const jitterAngle = angle + (pRandom(i + 100) * 0.5 - 0.25)
            
            const cx = 50 + baseRad * Math.cos(jitterAngle)
            const cy = 50 + baseRad * Math.sin(jitterAngle)
            
            return {
                id: i,
                cx: `${cx}%`,
                cy: `${cy}%`,
                r: 0.3 + pRandom(i + 200) * 1.5,
            }
        })

        const generatedLines: Array<{ x1: string, y1: string, x2: string, y2: string }> = []
        
        // Connect each node to 2-3 of its closest neighbors angularly
        for (let i = 0; i < generatedNodes.length; i++) {
            const connections = Math.floor(2 + pRandom(i + 300) * 2) // 2 to 3 connections
            for (let j = 1; j <= connections; j++) {
                const targetIdx = (i + j) % generatedNodes.length
                
                // Only connect if pseudo-random allows it (creates breaks in the mesh)
                if (pRandom(i + targetIdx) > 0.3) {
                    generatedLines.push({
                        x1: generatedNodes[i].cx,
                        y1: generatedNodes[i].cy,
                        x2: generatedNodes[targetIdx].cx,
                        y2: generatedNodes[targetIdx].cy,
                    })
                }
            }
            
            // Occasionally cross-connect across the diameter securely
            if (pRandom(i + 400) > 0.85) {
                const oppositeIdx = (i + Math.floor(generatedNodes.length / 2)) % generatedNodes.length
                generatedLines.push({
                    x1: generatedNodes[i].cx,
                    y1: generatedNodes[i].cy,
                    x2: generatedNodes[oppositeIdx].cx,
                    y2: generatedNodes[oppositeIdx].cy,
                })
            }
        }
        
        return { nodes: generatedNodes, lines: generatedLines }
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-40 mix-blend-screen">
            {/* The primary spinning mesh */}
            <motion.svg
                className={`w-[150vw] h-[150vw] lg:w-[120vw] lg:h-[120vw] max-w-[1400px] max-h-[1400px] ${colorClass}`}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                animate={{
                    rotate: [0, 360],
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                    rotate: { duration: 180, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                {lines.map((line, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                        strokeWidth="0.08"
                        stroke="currentColor"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: [0.05, 0.35, 0.05] }}
                        transition={{
                            duration: 3 + pRandom(i) * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: pRandom(i + 100) * 3
                        }}
                    />
                ))}
                
                {nodes.map((node, i) => (
                    <motion.circle
                        key={`node-${node.id}`}
                        cx={node.cx} cy={node.cy} r={node.r}
                        fill="currentColor"
                        className="filter blur-[1px]" // Gives it a glowing neuronal synaptic look
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.1, 0.9, 0.1], r: [node.r, node.r * 1.5, node.r] }}
                        transition={{
                            duration: 2 + pRandom(i + 50) * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: pRandom(i + 150) * 2
                        }}
                    />
                ))}
            </motion.svg>

            {/* A subtle counter-rotating secondary mesh for depth over complex backgrounds */}
            <motion.svg
                className={`absolute w-[100vw] h-[100vw] max-w-[900px] max-h-[900px] opacity-30 ${colorClass}`}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                animate={{
                    rotate: [360, 0],
                    scale: [1.05, 0.95, 1.05],
                }}
                transition={{
                    rotate: { duration: 240, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
               {nodes.slice(0, 15).map((node, i) => (
                    <motion.circle
                        key={`bg-node-${node.id}`}
                        cx={node.cy} cy={node.cx} r={node.r * 1.2} // inverted axis for offset
                        fill="currentColor"
                        className="filter blur-[3px]"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: [0.05, 0.4, 0.05] }}
                        transition={{
                            duration: 4 + pRandom(i) * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.svg>
        </div>
    )
}
