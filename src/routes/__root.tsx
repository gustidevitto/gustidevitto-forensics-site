import { createRootRoute, Outlet, useLocation, ScrollRestoration } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
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
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        document.documentElement.lang = i18n.language
        document.title = t('global.seo_home_title', 'Gusti Devitto Forensics | Institution-Grade Intelligence')
    }, [i18n.language, t])

    const canonicalUrl = `https://www.gustidevitto.com${location.pathname === '/' ? '' : location.pathname}`
    const isEntranceGate = location.pathname === '/'

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <title>Gusti Devitto — Forensic Business Practice</title>
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
                            "areaServed": ["US", "CA", "ID", "SG", "AU"],
                            "knowsAbout": t('global.knows_about', { returnObjects: true }),
                            "priceRange": "$$$"
                        }
                    ]
                })}
            </script>
            <link rel="alternate" type="application/ld+json" href="/ontology.jsonld" title="Semantic Knowledge Graph" />

            <div className="relative flex-1 flex flex-col z-10">
                {!isEntranceGate && (
                    /* ── macOS Menu Bar Style Header ── */
                    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#1c1c1e]/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#1c1c1e]/75">
                        <div className="container flex h-16 items-center justify-between px-4 md:px-8">

                            {/* Logo — clean, no HUD decoration */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="/assets/images/android-chrome-192x192.png"
                                    alt="Gusti Devitto Logo"
                                    className="h-8 w-8 rounded-squircle-sm"
                                />
                                <div className="flex flex-col -space-y-0.5">
                                    <a className="font-bold text-[17px] tracking-tight text-white" href="/">
                                        Gusti Devitto<span className="text-[#82C7A8]">™</span>
                                    </a>
                                    <span className="text-[10px] font-medium text-white/40 tracking-wide">
                                        Forensic Business Intelligence
                                    </span>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
                                <a
                                    href={typeof window !== 'undefined' && localStorage.getItem('preferredPath') === 'network' ? '/network-intelligence' : '/single-entity'}
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 ${
                                        pathname === '/' || pathname === '/single-entity' || pathname === '/network-intelligence' 
                                        ? 'bg-white/[0.08] text-[#0A84FF] font-semibold shadow-sm' 
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.home')}
                                </a>
                                <a 
                                    href="/fip-lite" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 font-semibold ${
                                        pathname.includes('/fip-lite') || pathname.includes('/cash-autopsy') || pathname.includes('/margin-audit') || pathname.includes('/growth-scan')
                                        ? 'bg-white/[0.08] text-[#0A84FF] shadow-sm' 
                                        : 'text-[#82C7A8] hover:text-[#A4E0C4] hover:bg-[#82C7A8]/[0.08]'
                                    }`}
                                >
                                    {t('nav.calculator')}
                                </a>
                                <a 
                                    href="/about-gusti-devitto" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 ${
                                        pathname === '/about-gusti-devitto' 
                                        ? 'bg-white/[0.08] text-[#0A84FF] font-semibold shadow-sm' 
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.about')}
                                </a>
                                <a 
                                    href="/blog" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 ${
                                        pathname.startsWith('/blog') 
                                        ? 'bg-white/[0.08] text-[#0A84FF] font-semibold shadow-sm' 
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.blog')}
                                </a>
                                <a 
                                    href="/forensics-pillars" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 ${
                                        pathname.startsWith('/forensics-pillars') || pathname.startsWith('/master-index') || pathname.startsWith('/pilar')
                                        ? 'bg-white/[0.08] text-[#0A84FF] font-semibold shadow-sm' 
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.pillars', '25 Pillars')}
                                </a>
                                <a 
                                    href="/investasi" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 font-semibold ${
                                        pathname === '/investasi' 
                                        ? 'bg-white/[0.08] text-[#0A84FF] shadow-sm' 
                                        : 'text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.pricing', 'Investment')}
                                </a>
                                <a 
                                    href="/contact" 
                                    className={`px-3 py-1.5 rounded-squircle-sm transition-all duration-200 ${
                                        pathname === '/contact' 
                                        ? 'bg-white/[0.08] text-[#0A84FF] font-semibold shadow-sm' 
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {t('nav.contact')}
                                </a>
                                <div className="ml-2 pl-2 border-l border-white/[0.08]">
                                    <LanguageToggle />
                                </div>
                            </nav>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center gap-3">
                                <LanguageToggle />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-9 w-9">
                                            <Menu className="h-4 w-4" />
                                            <span className="sr-only">Toggle Menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="bg-[#1c1c1e]/95 backdrop-blur-2xl border-l border-white/[0.06] w-72">
                                        <div className="flex flex-col gap-1 mt-8">
                                            <a
                                                href={typeof window !== 'undefined' && localStorage.getItem('preferredPath') === 'network' ? '/network-intelligence' : '/single-entity'}
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all ${
                                                    pathname === '/' || pathname === '/single-entity' || pathname === '/network-intelligence' 
                                                    ? 'bg-white/[0.08] text-[#0A84FF] font-semibold' 
                                                    : 'font-medium text-white/60 hover:text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.home')}
                                            </a>
                                            <a 
                                                href="/fip-lite" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all font-semibold ${
                                                    pathname.includes('/fip-lite') || pathname.includes('/cash-autopsy') || pathname.includes('/margin-audit') || pathname.includes('/growth-scan')
                                                    ? 'bg-white/[0.08] text-[#0A84FF]' 
                                                    : 'text-[#82C7A8] hover:bg-[#82C7A8]/[0.08]'
                                                }`}
                                            >
                                                {t('nav.calculator')}
                                            </a>
                                            <a 
                                                href="/about-gusti-devitto" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all ${
                                                    pathname === '/about-gusti-devitto' 
                                                    ? 'bg-white/[0.08] text-[#0A84FF] font-semibold' 
                                                    : 'font-medium text-white/60 hover:text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.about')}
                                            </a>
                                            <a 
                                                href="/blog" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all ${
                                                    pathname.startsWith('/blog') 
                                                    ? 'bg-white/[0.08] text-[#0A84FF] font-semibold' 
                                                    : 'font-medium text-white/60 hover:text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.blog')}
                                            </a>
                                            <a 
                                                href="/forensics-pillars" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all ${
                                                    pathname.startsWith('/forensics-pillars') || pathname.startsWith('/master-index') || pathname.startsWith('/pilar')
                                                    ? 'bg-white/[0.08] text-[#0A84FF] font-semibold' 
                                                    : 'font-medium text-white/60 hover:text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.pillars', '25 Pillars')}
                                            </a>
                                            <a 
                                                href="/investasi" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all font-semibold ${
                                                    pathname === '/investasi' 
                                                    ? 'bg-white/[0.08] text-[#0A84FF]' 
                                                    : 'text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.pricing', 'Investment')}
                                            </a>
                                            <a 
                                                href="/contact" 
                                                className={`px-4 py-3 rounded-squircle-sm text-base transition-all ${
                                                    pathname === '/contact' 
                                                    ? 'bg-white/[0.08] text-[#0A84FF] font-semibold' 
                                                    : 'font-medium text-white/60 hover:text-white hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {t('nav.contact')}
                                            </a>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </header>
                )}

                <main className="flex-1 pt-16">
                    <Outlet />
                </main>

                {!isEntranceGate && (
                    <footer className="border-t border-white/[0.05] bg-[#161618] py-8 md:py-0">
                        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-6 md:px-12 lg:px-20">
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2">
                                <a href="/about-gusti-devitto" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                                    {t('footer.about')}
                                </a>
                                <a href="/master-index" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                                    {t('footer.index')}
                                </a>
                                <a href="/methodology" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                                    {t('footer.methodology')}
                                </a>
                                <a href="/verdict" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                                    {t('footer.verdict')}
                                </a>
                                <a href="/terms" className="text-xs text-white/40 hover:text-white/40 transition-colors">
                                    {t('footer.terms')}
                                </a>
                                <a href="/privacy" className="text-xs text-white/40 hover:text-white/40 transition-colors">
                                    {t('footer.privacy')}
                                </a>
                            </div>
                            {/* Copyright — no monospace */}
                            <p className="text-[10px] font-medium text-white/40 tracking-wide">
                                © {new Date().getFullYear()} Gusti Devitto™ · FIP™ v4.00
                            </p>
                        </div>
                    </footer>
                )}

                {!isEntranceGate && <BackToTop />}
                <ScrollRestoration />
            </div>
        </ThemeProvider>
    )
}

function BackToTop() {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(document.documentElement.scrollTop > 300)
        }
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[60] h-10 w-10 rounded-squircle-md glass-elevated flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            aria-label={t('global.back_to_top')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    )
}
