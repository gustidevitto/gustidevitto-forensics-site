import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-squircle-sm border border-white/[0.08]",
                "bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25",
                "focus:outline-none focus:border-[#0A84FF]/50 focus:bg-white/[0.06]",
                "focus:ring-2 focus:ring-[#0A84FF]/20",
                "transition-all duration-200",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "resize-none",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"

export { Textarea }
