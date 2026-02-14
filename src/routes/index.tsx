import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowRight, Globe, Zap, AlertTriangle } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { LanguageSlider } from '@/components/LanguageSlider'
import { Button } from '@/components/ui/button'
import { SingleEntityGraphic, NetworkGraphic } from '@/components/EntranceGraphics'

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
        <div
            className="flex-1 w-full bg-[#0a1628] text-white font-sans flex items-start md:items-center justify-center selection:bg-primary selection:text-black relative p-6 pb-24 md:p-12 lg:p-20"
        >
            {/* Automatic Spotlight Effect */}
            <div
                className="absolute inset-0 pointer-events-none z-0 animate-spotlight-roam opacity-40"
                style={{
                    background: `radial-gradient(800px circle at center, rgba(56, 189, 248, 0.15), transparent 50%)`
                }}
            />

            {/* SEO Overlay */}
            {/* SEO Overlay */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('global.seo_home_desc')} />
            <meta name="keywords" content={t('global.seo_home_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>

                {/* Enhanced Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                        backgroundSize: '40px 40px',
                    }}></div>
            </div>

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                {/* LEFT SIDE: Brand & Identity */}
                <div className="space-y-10 animate-fade-in-left">
                    {/* Emergency Button - Mobile Top */}
                    <div className="lg:hidden mb-8">
                        <Link to="/fip-lite">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400/50">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Emergency Diagnostic
                            </Button>
                        </Link>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">BUSINESS FORENSICS UNIT</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
                            <Trans i18nKey="entrance_gate.hero_title">
                                GUSTI <br />
                                DEVITTO
                            </Trans>
                            <span className="text-[#FFD700] italic ml-1">™</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-primary"></div>
                            <p className="text-xs md:text-sm text-white/40 font-bold tracking-[0.3em] uppercase">
                                {t('entrance_gate.hero_subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* Language Toggle Slider - Integrated beneath title */}
                    <div className="animate-fade-in delay-300">
                        <LanguageSlider />
                    </div>

                    <div className="space-y-4">
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Status Report:</p>
                        <p className="text-base md:text-lg text-white border-l-2 border-primary/50 pl-6 py-2 leading-relaxed max-w-md font-bold">
                            {t('entrance_gate.init_prompt')}
                        </p>

                        {/* Desktop Emergency Button */}
                        <div className="hidden lg:block pt-4">
                            <Link to="/fip-lite">
                                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400/50 px-8 h-14">
                                    <AlertTriangle className="w-5 h-5 mr-3" />
                                    Start Emergency Scan (Free)
                                </Button>
                            </Link>
                            <p className="text-[10px] text-red-400 mt-2 font-bold uppercase tracking-wider pl-1">
                                * Find out exactly where you are losing money in 30 seconds.
                            </p>
                        </div>
                    </div>

                    {/* Footer Credentials */}
                    <div className="hidden lg:flex flex-col gap-4 pt-12 border-t border-white/5 opacity-30">
                        <div className="flex gap-8 text-[9px] font-black tracking-widest uppercase">
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40">PROTOCOL</span>
                                <span className="text-primary">FIP™ V4.00</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40">REGION</span>
                                <span className="text-white/60">SEA_IDN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Vertical Segment Selection */}
                <div className="flex flex-col gap-6 animate-fade-in-right">

                    {/* Option 1: Single Entity (SME) */}
                    <Link
                        to="/single-entity"
                        onClick={() => handlePathSelection('single')}
                        className="group relative h-[250px] md:h-[280px] flex flex-col justify-end p-8 border border-white/10 bg-zinc-900/40 hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm ease-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                    >
                        {/* Background Illustration */}
                        <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                            <SingleEntityGraphic />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('entrance_gate.multi_outlet_label')}</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{t('entrance_gate.multi_outlet_title')}</h3>
                                <p className="text-sm text-white/60 font-medium">{t('entrance_gate.multi_outlet_desc')}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                {t('entrance_gate.multi_outlet_cta')} <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    {/* Option 2: Enterprise (Network Intelligence) */}
                    <Link
                        to="/network-intelligence"
                        onClick={() => handlePathSelection('network')}
                        className="group relative h-[250px] md:h-[280px] flex flex-col justify-end p-8 border border-white/10 bg-zinc-900/40 hover:border-red-500/50 transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm ease-out hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1"
                    >
                        {/* Background Illustration */}
                        <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                            <NetworkGraphic />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('entrance_gate.enterprise_label')}</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-red-500 transition-colors">{t('entrance_gate.enterprise_title')}</h3>
                                <p className="text-sm text-white/60 font-medium">{t('entrance_gate.enterprise_desc')}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                {t('entrance_gate.enterprise_cta')} <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Absolute Footer Credential */}
            <div className="absolute bottom-8 left-12 md:left-20 right-12 md:right-20 flex justify-between items-center opacity-10 pointer-events-none">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">CONFIDENTIAL</span>
                <div className="h-px flex-1 mx-8 bg-white/20 hidden md:block"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">© 2026 GUSTI DEVITTO</span>
            </div>
            {/* Hidden Aesthetic SEO Gate */}
            <div className="sr-only">
                <p>Gusti Devitto - Forensic Business Diagnostician.</p>
                <p>Specializing in Profit Leakage Detection, Phantom Cost Analysis, and Network Intelligence for Multi-Outlet Businesses.</p>
                <p>Layanan Audit Forensik Bisnis untuk mendeteksi uang siluman dan inefisiensi operasional.</p>
            </div>
        </div>
    )
}
