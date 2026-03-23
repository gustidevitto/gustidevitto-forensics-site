import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowRight } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { LanguageSlider } from '@/components/LanguageSlider'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handlePathSelection = (path: 'single' | 'network') => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredPath', path)
        }
    }

    if (!mounted) return null

    return (
        <div className="flex-1 w-full bg-[#060a12] text-white font-sans relative selection:bg-amber-400 selection:text-black overflow-hidden">
            {/* SEO & Authority Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('global.seo_home_desc')} />
            <meta name="keywords" content={t('global.seo_home_keywords')} />
            <link rel="canonical" href="https://gustidevitto.com/" />
            
            {/* Open Graph / social */}
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:image" content="/assets/images/aboutme.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('global.og_home_title')} />
            <meta name="twitter:description" content={t('global.og_home_desc')} />
            <meta name="twitter:image" content="/assets/images/aboutme.jpg" />
            <meta name="twitter:site" content="@gustidevitto" />

            {/* GEO Signals (Global + Local) */}
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.region" content="US-CA" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="New York, San Francisco, Jakarta" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />

            {/* ═══════════ HERO — THE NAMEPLATE ═══════════ */}
            <section className="relative min-h-[100dvh] flex flex-col justify-end">

                {/* Gusti's photo as background — the anchor */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-50 grayscale-[0.4] contrast-[1.1]"
                    />
                    {/* Gradient scrim: transparent top → solid bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/70 to-[#060a12]/20" />
                    {/* Subtle side vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#060a12]/60 via-transparent to-[#060a12]/40" />
                </div>

                {/* Content overlay — bottom-left anchored */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20 pt-[25vh] md:pt-[30vh]">
                    <div className="max-w-6xl">
                        {/* Name — massive, left-aligned, uppercase */}
                        <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black tracking-[-0.04em] leading-[0.85] uppercase">
                            <Trans i18nKey="entrance_gate.hero_title">
                                GUSTI <br />
                                DEVITTO
                            </Trans>
                        </h1>

                        {/* Role — understated */}
                        <div className="mt-4 md:mt-6 flex items-center gap-4">
                            <div className="w-8 h-px bg-amber-400/60" />
                            <p className="text-xs md:text-sm text-white/40 font-medium tracking-[0.25em] uppercase">
                                {t('entrance_gate.hero_subtitle')}
                            </p>
                        </div>

                        {/* The hook — single sentence, not boxed */}
                        <p className="mt-8 md:mt-10 text-base md:text-lg text-white/70 max-w-md leading-relaxed font-light">
                            {t('entrance_gate.init_prompt')}
                        </p>

                        {/* Language toggle — small, functional, not decorative */}
                        <div className="mt-6">
                            <LanguageSlider />
                        </div>
                    </div>
                </div>

                {/* Thin amber rule separating hero from paths */}
                <div className="relative z-10 mx-6 md:mx-12 lg:mx-20 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />
            </section>

            {/* ═══════════ PATH SELECTION — BELOW THE FOLD ═══════════ */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
                <div className="max-w-6xl">
                    {/* Label — left-aligned, no decoration */}
                    <p className="text-[10px] font-medium tracking-[0.3em] text-white/25 uppercase mb-8 md:mb-12">
                        {t('entrance_gate.choose_path', 'Choose your path')}
                    </p>

                    {/* Path cards — stacked, not equal height, left-aligned */}
                    <div className="flex flex-col gap-4 max-w-2xl">

                        {/* Path 1: Single Business */}
                        <Link
                            to="/single-entity"
                            onClick={() => handlePathSelection('single')}
                            className="group relative flex items-center justify-between py-6 md:py-8 border-b border-white/[0.06] hover:border-white/20 transition-colors duration-500"
                        >
                            <div className="space-y-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                    {t('entrance_gate.multi_outlet_label')}
                                </h3>
                                <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors duration-300 max-w-sm">
                                    {t('entrance_gate.multi_outlet_desc')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-8">
                                <span className="hidden md:block text-[10px] tracking-[0.15em] uppercase text-white/20 group-hover:text-amber-400/60 transition-colors duration-300 font-medium">
                                    {t('entrance_gate.multi_outlet_cta')}
                                </span>
                                <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </Link>

                        {/* Path 2: Multi-Location / Network */}
                        <Link
                            to="/network-intelligence"
                            onClick={() => handlePathSelection('network')}
                            className="group relative flex items-center justify-between py-6 md:py-8 border-b border-white/[0.06] hover:border-white/20 transition-colors duration-500"
                        >
                            <div className="space-y-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                    {t('entrance_gate.enterprise_label')}
                                </h3>
                                <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors duration-300 max-w-sm">
                                    {t('entrance_gate.enterprise_desc')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-8">
                                <span className="hidden md:block text-[10px] tracking-[0.15em] uppercase text-white/20 group-hover:text-amber-400/60 transition-colors duration-300 font-medium">
                                    {t('entrance_gate.enterprise_cta')}
                                </span>
                                <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </Link>

                        {/* Emergency scan — inline, not a button, not decorated */}
                        <Link
                            to="/fip-lite"
                            className="group inline-flex items-center gap-3 mt-6 md:mt-10 text-xs text-white/30 hover:text-amber-400 transition-colors duration-300"
                        >
                            <span className="font-mono tracking-wider uppercase">
                                {t('entrance_gate.emergency_cta', 'Free Emergency Scan')}
                            </span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer credential — absolute bottom */}
            <div className="px-6 md:px-12 lg:px-20 pb-8 flex justify-between items-center text-white/[0.08]">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em]">FIP™ V4.00</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] hidden md:block">© 2026 GUSTI DEVITTO</span>
            </div>

            {/* Accessible SEO content */}
            <div className="sr-only">
                <p>Gusti Devitto - Forensic Business Diagnostician.</p>
                <p>Specializing in Profit Leakage Detection, Phantom Cost Analysis, and Network Intelligence for Multi-Outlet Businesses.</p>
                <p>Layanan Audit Forensik Bisnis untuk mendeteksi uang siluman dan inefisiensi operasional.</p>
            </div>
        </div>
    )
}
