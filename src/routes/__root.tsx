import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from "@/components/theme-provider"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {/* Global Base Meta */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="alternate" type="application/ld+json" href="/ontology.jsonld" />

            {/* JSON-LD for Local Business / Professional Service */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Gusti Devitto Forensics",
                    "image": "https://www.gustidevitto.com/assets/images/android-chrome-192x192.png",
                    "description": "Spesialis Business Forensics & Phantom Cost Hunting. Kami bukan mencari fraud atau penipuan (Fraud Hunting), melainkan mendeteksi kebocoran profit (Phantom Cost Hunting) yang tersembunyi di operasional multi-outlet.",
                    "url": "https://www.gustidevitto.com",
                    "telephone": "+6281234567890",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Semarang",
                        "addressRegion": "Jawa Tengah",
                        "addressCountry": "ID"
                    },
                    "knowsAbout": ["Business Forensics", "Phantom Cost Analysis", "Profit Optimization", "Multi-outlet Operations"],
                    "priceRange": "$$$"
                })}
            </script>
            <div className="min-h-screen bg-background font-sans antialiased relative overflow-hidden">
                {/* Tactical Scanline Overlay */}
                <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] overflow-hidden">
                    <div className="h-[200%] w-full bg-[linear-gradient(to_bottom,transparent_50%,#000_50%)] bg-[length:100%_4px] animate-scanline"></div>
                </div>

                <div className="relative flex min-h-screen flex-col">
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <img src="/assets/images/android-chrome-192x192.png" alt="Gusti Devitto Logo" className="h-8 w-8" />
                                <div className="flex flex-col -space-y-1">
                                    <a className="font-bold text-xl tracking-tight" href="/">
                                        Gusti Devitto<span className="text-secondary dark:text-primary">™</span>
                                    </a>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-status-blink"></div>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">System: Operational // Auth L-7</span>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                                <a href="/get-access" className="transition-colors hover:text-primary">Calculator</a>
                                <a href="/blog" className="transition-colors hover:text-primary">Blog</a>
                                <a href="/forensics-pillars" className="transition-colors hover:text-primary">15 Pillars</a>
                                <a href="/investasi" className="transition-colors hover:text-primary">Investasi</a>
                                <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
                                <ModeToggle />
                            </nav>

                            {/* Mobile Navigation */}
                            <div className="md:hidden flex items-center gap-4">
                                <ModeToggle />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Menu className="h-5 w-5" />
                                            <span className="sr-only">Toggle Menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right">
                                        <div className="flex flex-col space-y-6 mt-6">
                                            <a href="/get-access" className="text-lg font-medium hover:text-primary">Calculator</a>
                                            <a href="/blog" className="text-lg font-medium hover:text-primary">Blog</a>
                                            <a href="/forensics-pillars" className="text-lg font-medium hover:text-primary">15 Pillars</a>
                                            <a href="/investasi" className="text-lg font-medium hover:text-primary">Investasi</a>
                                            <a href="/contact" className="text-lg font-medium hover:text-primary">Contact</a>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <footer className="border-t bg-card py-6 md:px-8 md:py-0">
                        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                                <a href="/master-index" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    Framework Index
                                </a>
                                <a href="/methodology" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    Methodology
                                </a>
                                <a href="/verdict" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    Verdict
                                </a>
                                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Terms
                                </a>
                                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacy
                                </a>
                            </div>
                            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                © {new Date().getFullYear()} Gusti Devitto™. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    ),
})
