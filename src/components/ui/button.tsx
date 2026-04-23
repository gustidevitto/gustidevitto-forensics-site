import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                // Primary — macOS system blue, squircle
                default:
                    "bg-[#0A84FF] text-white hover:bg-[#409CFF] active:bg-[#0A84FF] active:scale-[0.98] rounded-squircle-md shadow-[0_1px_3px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.06)_inset]",
                // Destructive
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-squircle-md",
                // Outline — glass style
                outline:
                    "glass border border-white/10 text-white/90 hover:text-white hover:border-white/20 rounded-squircle-md",
                // Secondary — muted surface
                secondary:
                    "bg-white/[0.06] text-white hover:bg-white/[0.10] rounded-squircle-md border border-white/[0.08]",
                // Ghost — fully transparent
                ghost:
                    "text-white/60 hover:text-white hover:bg-white/[0.06] rounded-squircle-md",
                // Link
                link:
                    "text-[#0A84FF] underline-offset-4 hover:underline",
                // Gold — brand accent only (use sparingly)
                gold:
                    "bg-[#AF52DE] text-black font-bold hover:bg-[#D085FF] active:scale-[0.98] rounded-squircle-md shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm:  "h-8 rounded-squircle-sm px-3 text-xs",
                lg:  "h-12 rounded-squircle-md px-6 text-base",
                xl:  "h-14 rounded-squircle-md px-8 text-base font-bold",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
