import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // Base macOS-style input
                    "flex h-10 w-full rounded-squircle-sm border border-white/[0.08] bg-white/[0.04]",
                    "px-4 py-2 text-sm text-white placeholder:text-white/40",
                    // Focus: blue ring like macOS focus
                    "focus:outline-none focus:border-[#0A84FF]/50 focus:bg-white/[0.06]",
                    "focus:ring-2 focus:ring-[#0A84FF]/20",
                    // Transition
                    "transition-all duration-200",
                    // Disabled
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    // Number inputs — keep mono font for numbers
                    type === "number" && "font-mono tracking-tight text-right",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
