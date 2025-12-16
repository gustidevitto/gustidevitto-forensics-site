import * as React from "react"
import { Input } from "@/components/ui/input"

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number
    onValueChange: (value: number) => void
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value, onValueChange, className, ...props }, ref) => {
        // Format number to display string with thousand separators
        const formatDisplay = (val: number) => {
            if (val === 0) return ''
            return new Intl.NumberFormat('id-ID').format(val)
        }

        const [displayValue, setDisplayValue] = React.useState(formatDisplay(value))

        // Update internal display when external value changes (e.g. reset)
        React.useEffect(() => {
            if (value !== parseInput(displayValue)) {
                setDisplayValue(formatDisplay(value))
            }
        }, [value])

        const parseInput = (input: string) => {
            // Remove non-digits
            const clean = input.replace(/\./g, '').replace(/[^0-9]/g, '')
            return clean ? parseInt(clean, 10) : 0
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            // Allow user to clear input
            if (raw === '') {
                setDisplayValue('')
                onValueChange(0)
                return
            }

            const numericValue = parseInput(raw)
            setDisplayValue(formatDisplay(numericValue))
            onValueChange(numericValue)
        }

        return (
            <Input
                {...props}
                ref={ref}
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={handleChange}
                className={className}
            />
        )
    }
)
CurrencyInput.displayName = "CurrencyInput"
