"use client"

import { useEffect, useRef } from "react"

interface WavingDotsProps {
    className?: string
    color?: string
}

export function WavingDots({ className = "", color = "rgba(255, 255, 255, 0.1)" }: WavingDotsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let time = 0

        const spacing = 30
        const amplitude = 20 // Height of the wave
        const waveLength = 0.01 // Frequency of the wave (lower is wider)
        const speed = 0.02 // Speed of animation

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const draw = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = color

            const cols = Math.ceil(canvas.width / spacing)
            const rows = Math.ceil(canvas.height / spacing)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing
                    const originalY = j * spacing

                    // Calculate wave offset
                    // We combine x and y in the sine function to create a diagonal/fabric wave effect
                    const yOffset = Math.sin(x * waveLength + (time * speed) + (j * 0.1)) * amplitude +
                        Math.sin(j * waveLength + (time * speed * 0.5)) * amplitude * 0.5

                    const y = originalY + yOffset

                    ctx.beginPath()
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2) // Small dot radius 1.5
                    ctx.fill()
                }
            }

            time += 1
            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener("resize", resize)
        resize()
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [color])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ opacity: 0.8 }}
        />
    )
}
