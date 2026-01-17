import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeProvider } from "@/components/theme-provider"
import { useTranslation } from 'react-i18next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent() {
    const { t, i18n } = useTranslation()

    useEffect(() => {
        // Update HTML lang attribute on change
        document.documentElement.lang = i18n.language
        // Update Page Title dynamically
        document.title = t('global.seo_home_title', 'Gusti Devitto Forensics | Institution-Grade Intelligence')
    }, [i18n.language, t])

    const canonicalUrl = "https://www.gustidevitto.com"
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {/* Global Base Meta */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={t('global.seo_home_desc')} />
            <meta name="keywords" content={t('global.seo_home_keywords')} />
            <meta httpEquiv="content-language" content={i18n.language} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:locale" content={i18n.language === 'id' ? 'id_ID' : 'en_US'} />
            <meta property="og:locale:alternate" content={i18n.language === 'id' ? 'en_US' : 'id_ID'} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
            <link rel="alternate" href={canonicalUrl} hrefLang="id-ID" />
            <link rel="alternate" href={canonicalUrl} hrefLang="en-US" />
            <link rel="alternate" type="application/ld+json" href="/ontology.jsonld" />

            {/* JSON-LD Global Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebSite",
                            "@id": "https://www.gustidevitto.com/#website",
                            "url": "https://www.gustidevitto.com",
                            "name": "Gusti Devitto Forensics",
                            "publisher": { "@id": "https://www.gustidevitto.com/#organization" }
                        },
                        {
                            "@type": "ProfessionalService",
                            "@id": "https://www.gustidevitto.com/#organization",
                            "name": "Gusti Devitto Forensics",
                            "image": "https://www.gustidevitto.com/assets/images/android-chrome-192x192.png",
                            "description": t('global.schema_desc'),
                            "url": "https://www.gustidevitto.com",
                            "telephone": "+6281234567890",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Semarang",
                                "addressRegion": "Jawa Tengah",
                                "addressCountry": "ID"
                            },
                            "knowsAbout": t('global.knows_about', { returnObjects: true }),
                            "priceRange": "$$$"
                        }
                    ]
                })}
            </script>
            <link rel="alternate" type="application/ld+json" href="/ontology.jsonld" title="Semantic Knowledge Graph" />
            <div className="min-h-screen bg-background font-sans antialiased relative">
                {/* Subtle Moving Background Lights */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-subtle-glow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-subtle-glow [animation-delay:-5s]"></div>
                </div>

                <div className="relative flex min-h-screen flex-col z-10">
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
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-status-blink"></div>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Auth L-9 // Sovereign Intelligence Access</span>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
                                <a href="/fip-lite" className="transition-colors hover:text-primary">{t('nav.calculator')}</a>
                                <a href="/about-gusti-devitto" className="transition-colors hover:text-primary">{t('nav.about')}</a>
                                <a href="/blog" className="transition-colors hover:text-primary">{t('nav.blog')}</a>
                                <a href="/forensics-pillars" className="transition-colors hover:text-primary">{t('nav.pillars')}</a>
                                <a href="/investasi" className="transition-colors hover:text-primary font-bold decoration-primary underline-offset-4 decoration-2">{t('nav.pricing')}</a>
                                <a href="/contact" className="transition-colors hover:text-primary">{t('nav.contact')}</a>
                                <LanguageToggle />
                                <ModeToggle />
                            </nav>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center gap-4">
                                <LanguageToggle />
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
                                            <div className="flex flex-col gap-2 pb-4 border-b">
                                                <a href="/#owners" className="text-xs font-black text-primary">{t('nav.owners')}</a>
                                                <a href="/#investors" className="text-xs font-black text-muted-foreground">{t('nav.investors')}</a>
                                                <a href="/#franchise" className="text-xs font-black text-muted-foreground">{t('nav.franchise')}</a>
                                            </div>
                                            <a href="/fip-lite" className="text-lg font-medium hover:text-primary">{t('nav.calculator')}</a>
                                            <a href="/about-gusti-devitto" className="text-lg font-medium hover:text-primary">{t('nav.about')}</a>
                                            <a href="/blog" className="text-lg font-medium hover:text-primary">{t('nav.blog')}</a>
                                            <a href="/forensics-pillars" className="text-lg font-medium hover:text-primary">{t('nav.pillars')}</a>
                                            <a href="/investasi" className="text-lg font-medium hover:text-primary">{t('nav.pricing')}</a>
                                            <a href="/contact" className="text-lg font-medium hover:text-primary">{t('nav.contact')}</a>
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
                                <a href="/about-gusti-devitto" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.about')}
                                </a>
                                <a href="/master-index" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.index')}
                                </a>
                                <a href="/methodology" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.methodology')}
                                </a>
                                <a href="/verdict" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.verdict')}
                                </a>
                                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.terms')}
                                </a>
                                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('footer.privacy')}
                                </a>
                            </div>
                            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                © {new Date().getFullYear()} Gusti Devitto™. {t('footer.rights')}
                                <span className="mx-2 text-muted-foreground/40">|</span>
                                <span className="text-xs text-muted-foreground/60 font-mono">FIP™ Protocol v4</span>
                            </p>
                        </div>
                    </footer>
                    {/* Back to Top Button */}
                    <BackToTop />
                </div>
            </div>
        </ThemeProvider>
    )
}

function BackToTop() {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop
            if (scrolled > 300) {
                setVisible(true)
            } else if (scrolled <= 300) {
                setVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-primary text-black shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label={t('global.back_to_top')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    )
}
