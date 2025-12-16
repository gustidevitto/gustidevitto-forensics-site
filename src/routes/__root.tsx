import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen bg-background font-sans antialiased dark">
            <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center justify-between">
                        <div className="flex items-center">
                            <a className="mr-6 flex items-center space-x-2 font-bold text-xl" href="/">
                                Gusti Devitto™
                            </a>
                            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                                <a href="/calculator" className="transition-colors hover:text-foreground/80 text-foreground/60">Calculator</a>
                                <a href="/forensics-pillars" className="transition-colors hover:text-foreground/80 text-foreground/60">7 Pillars</a>
                                <a href="/offerings" className="transition-colors hover:text-foreground/80 text-foreground/60">Services</a>
                                <a href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</a>
                            </nav>
                        </div>
                        <div className="md:hidden">
                            {/* Simple Mobile Menu Placeholder - In real app use Sheet */}
                            <span className="text-xs text-muted-foreground">Menu</span>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    <Outlet />
                </main>
                <footer className="border-t py-6 md:px-8 md:py-0">
                    <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                            © 2025 Gusti Devitto™. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
    ),
})
