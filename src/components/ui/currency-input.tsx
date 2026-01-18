import * as React from "react"
import { Input } from "@/components/ui/input"

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number
    onValueChange: (value: number) => void
    locale?: string
    prefix?: string
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value, onValueChange, className, locale = 'id-ID', prefix = 'Rp', ...props }, ref) => {
        // Format number to display string with thousand separators
        const formatDisplay = (val: number) => {
            if (val === 0) return ''
            return new Intl.NumberFormat(locale).format(val)
        }

        const [displayValue, setDisplayValue] = React.useState(formatDisplay(value))

        // Update internal display when external value changes (e.g. reset)
        React.useEffect(() => {
            const parsedCurrent = parseInput(displayValue)
            if (value !== parsedCurrent) {
                setDisplayValue(formatDisplay(value))
            }
        }, [value, locale])

        const parseInput = (input: string) => {
            // Remove non-digits
            const clean = input.replace(/[^0-9]/g, '')
            return clean ? parseInt(clean, 10) : 0
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
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
            <div className="relative">
                {prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold opacity-40">{prefix}</span>
                )}
                <Input
                    {...props}
                    ref={ref}
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={handleChange}
                    className={`${prefix ? 'pl-10' : 'pl-3'} ${className}`}
                />
            </div>
        )
    }
)
CurrencyInput.displayName = "CurrencyInput"
