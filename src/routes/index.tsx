import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowRight } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { LanguageSlider } from '@/components/LanguageSlider'

export const Route = createFileRoute('/')(({
    component: Index,
}))

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
        <div className="flex-1 w-full bg-[#1c1c1e] text-white font-sans relative selection:bg-[#0A84FF]/30 selection:text-white overflow-hidden">
            {/* SEO & Authority Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('global.seo_home_desc')} />
            <meta name="keywords" content={t('global.seo_home_keywords')} />
            <link rel="canonical" href="https://www.gustidevitto.com/" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:image" content="https://www.gustidevitto.com/assets/images/og-cover.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.gustidevitto.com/" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('global.og_home_title')} />
            <meta name="twitter:description" content={t('global.og_home_desc')} />
            <meta name="twitter:image" content="https://www.gustidevitto.com/assets/images/og-cover.jpg" />
            <meta name="twitter:site" content="@gustidevitto" />
            <meta name="geo.region" content="US" />
            <meta name="geo.placename" content="United States" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />

            {/* ═══════════ HERO — THE NAMEPLATE ═══════════ */}
            <section className="relative min-h-[100dvh] flex flex-col justify-end">

                {/* Gusti's photo as full-bleed background — the anchor */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-45 grayscale-[0.25] contrast-[1.08]"
                    />
                    {/* Warm charcoal gradient scrim — matches macOS background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/75 to-[#1c1c1e]/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1e]/55 via-transparent to-[#1c1c1e]/35" />
                </div>

                {/* Content overlay — bottom-left anchored (preserved exactly) */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20 pt-[25vh] md:pt-[30vh]">
                    <div className="max-w-6xl">
                        {/* Name — massive, left-aligned, uppercase */}
                        <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-[0.85] uppercase">
                            <Trans i18nKey="entrance_gate.hero_title">
                                GUSTI <br />
                                DEVITTO
                            </Trans>
                        </h1>

                        {/* Role — understated, blue accent line */}
                        <div className="mt-4 md:mt-6 flex items-center gap-4">
                            <div className="w-8 h-px bg-[#0A84FF]/50" />
                            <p className="text-xs md:text-sm text-white/40 font-medium tracking-[0.2em] uppercase">
                                {t('entrance_gate.hero_subtitle')}
                            </p>
                        </div>

                        {/* Hook — single sentence, not boxed */}
                        <p className="mt-8 md:mt-10 text-base md:text-lg text-white/60 max-w-md leading-relaxed font-light">
                            {t('entrance_gate.init_prompt')}
                        </p>

                        {/* Language toggle */}
                        <div className="mt-6">
                            <LanguageSlider />
                        </div>
                    </div>
                </div>

                {/* Thin gradient separator */}
                <div className="relative z-10 mx-6 md:mx-12 lg:mx-20 h-px bg-gradient-to-r from-[#0A84FF]/25 via-[#0A84FF]/08 to-transparent" />
            </section>

            {/* ═══════════ PATH SELECTION — BELOW THE FOLD ═══════════ */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
                <div className="max-w-6xl">
                    {/* Label */}
                    <p className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase mb-8 md:mb-12">
                        {t('entrance_gate.choose_path', 'Choose your path')}
                    </p>

                    {/* Path cards — glassmorphic, squircle */}
                    <div className="flex flex-col gap-3 max-w-2xl">

                        {/* Path 1: Single Business */}
                        <Link
                            to="/single-entity"
                            onClick={() => handlePathSelection('single')}
                            className="group relative flex items-center justify-between p-6 glass rounded-squircle-lg hover:glass-elevated transition-all duration-300"
                        >
                            <div className="space-y-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                    {t('entrance_gate.multi_outlet_label')}
                                </h3>
                                <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 max-w-sm">
                                    {t('entrance_gate.multi_outlet_desc')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-8">
                                <span className="hidden md:block text-[10px] tracking-[0.15em] uppercase text-white/40 group-hover:text-[#AF52DE]/70 transition-colors duration-300 font-medium">
                                    {t('entrance_gate.multi_outlet_cta')}
                                </span>
                                <div className="w-8 h-8 rounded-squircle-sm glass-blue flex items-center justify-center group-hover:bg-[#0A84FF]/20 transition-colors">
                                    <ArrowRight className="w-4 h-4 text-[#0A84FF] group-hover:translate-x-0.5 transition-transform duration-300" />
                                </div>
                            </div>
                        </Link>

                        {/* Path 2: Multi-Location / Network */}
                        <Link
                            to="/network-intelligence"
                            onClick={() => handlePathSelection('network')}
                            className="group relative flex items-center justify-between p-6 glass rounded-squircle-lg hover:glass-elevated transition-all duration-300"
                        >
                            <div className="space-y-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                    {t('entrance_gate.enterprise_label')}
                                </h3>
                                <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 max-w-sm">
                                    {t('entrance_gate.enterprise_desc')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-8">
                                <span className="hidden md:block text-[10px] tracking-[0.15em] uppercase text-white/40 group-hover:text-[#AF52DE]/70 transition-colors duration-300 font-medium">
                                    {t('entrance_gate.enterprise_cta')}
                                </span>
                                <div className="w-8 h-8 rounded-squircle-sm glass-blue flex items-center justify-center group-hover:bg-[#0A84FF]/20 transition-colors">
                                    <ArrowRight className="w-4 h-4 text-[#0A84FF] group-hover:translate-x-0.5 transition-transform duration-300" />
                                </div>
                            </div>
                        </Link>

                        {/* Emergency scan — inline link */}
                        <Link
                            to="/fip-lite"
                            className="group inline-flex items-center gap-3 mt-6 md:mt-10 text-xs text-white/40 hover:text-[#AF52DE] transition-colors duration-300"
                        >
                            <span className="font-medium tracking-wider uppercase">
                                {t('entrance_gate.emergency_cta', 'Free Emergency Scan')}
                            </span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer credential */}
            <div className="px-6 md:px-12 lg:px-20 pb-8 flex justify-between items-center text-white/[0.06]">
                <span className="text-[9px] font-medium uppercase tracking-[0.35em]">FIP™ V4.00</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.35em] hidden md:block">© 2026 GUSTI DEVITTO</span>
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
