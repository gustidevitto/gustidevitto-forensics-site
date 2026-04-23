/** @type {import('tailwindcss').Config} */
export default {
    future: {
        hoverOnlyWhenSupported: true,
    },
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
                mono: ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                // macOS squircle-approximation radii
                lg: 'var(--radius)',          // 16px — standard card
                md: 'calc(var(--radius) - 4px)',  // 12px
                sm: 'calc(var(--radius) - 8px)',  // 8px
                squircle: 'var(--radius)',
                'squircle-sm': '0.75rem',     // 12px
                'squircle-md': '1.25rem',     // 20px
                'squircle-lg': '1.75rem',     // 28px
                'squircle-xl': '2.25rem',     // 36px — hero cards, modals
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            }
        }
    },
    plugins: [
        import("tailwindcss-animate"),
        require('@tailwindcss/typography'),
    ],
}
