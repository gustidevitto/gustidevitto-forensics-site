import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from "@/components/theme-provider"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background font-sans antialiased">
                <div className="relative flex min-h-screen flex-col">
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <img src="/assets/images/android-chrome-192x192.png" alt="Gusti Devitto Logo" className="h-8 w-8" />
                                <a className="font-bold text-xl tracking-tight" href="/">
                                    Gusti Devitto<span className="text-secondary dark:text-primary">™</span>
                                </a>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                                <a href="/get-access" className="transition-colors hover:text-primary">Calculator</a>
                                <a href="/blog" className="transition-colors hover:text-primary">Blog</a>
                                <a href="/forensics-pillars" className="transition-colors hover:text-primary">7 Pillars</a>
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
                                            <a href="/forensics-pillars" className="text-lg font-medium hover:text-primary">7 Pillars</a>
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
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Terms & Conditions
                                </a>
                                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </a>
                            </div>
                            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                © 2025 Gusti Devitto™. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    ),
})
