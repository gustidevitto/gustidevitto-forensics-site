import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Activity, CheckCircle2, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation, Trans } from 'react-i18next'
import { WavingDots } from "@/components/ui/waving-dots"

export const Route = createFileRoute('/single-entity')({
    component: SingleEntityPage,
})

function SingleEntityPage() {
    const { t, i18n } = useTranslation()
    const [networkSize, setNetworkSize] = useState<number>(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const heroImages = [
        '/assets/images/audit.png',
        '/assets/images/forensic_dashboard.png',
        '/assets/images/network_monitoring.png',
        '/assets/images/dachicken.png'
    ]

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === 'undefined') return
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMousePos({ x, y })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

    return (
        <div
            onMouseMove={handleMouseMove}
            className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] perspective-1000 overflow-x-hidden"
        >
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('multi_outlet.seo_desc')} />
            <meta name="keywords" content={t('multi_outlet.seo_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />

            {/* Hero Section with Carousel */}
            <section className="relative py-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
                {/* Dynamic Spotlight Effect - "The Forensic Torch" */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
                    style={{
                        background: `radial-gradient(800px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(56, 189, 248, 0.15), transparent 50%)`
                    }}
                />

                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 animate-pulse transition-transform duration-[50ms] ease-linear"
                        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] transition-transform duration-[50ms] ease-linear"
                        style={{ transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)` }}
                    ></div>
                    {/* Enhanced Grid Pattern for Parallax Reference */}
                    <div className="absolute inset-0 opacity-[0.08] transition-transform duration-[50ms] ease-linear"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                            backgroundSize: '40px 40px',
                            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
                        }}></div>
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Copy */}
                        <div className="space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <Activity className="w-3 h-3" /> {t('multi_outlet.hero_badge')}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                                {t('multi_outlet.hero_title')} <br />
                                <span className="text-primary">{t('multi_outlet.hero_title_accent')}</span>
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {t('multi_outlet.hero_desc')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button asChild size="lg" className="h-16 px-10 text-lg font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20">
                                    <Link to="/fip-lite">
                                        {t('multi_outlet.cta_health_score')}
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-16 px-10 border-white/10 hover:bg-white/5 text-white font-bold">
                                    <a href="#benefits">{t('multi_outlet.cta_see_catch')}</a>
                                </Button>
                            </div>

                            <p className="text-sm text-muted-foreground/60 italic">
                                {t('multi_outlet.hero_meta')}
                            </p>
                        </div>

                        {/* Right: Image Carousel */}
                        <div className="relative perspective-1000">
                            <div
                                className="relative rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden backdrop-blur-sm group shadow-2xl transition-all duration-100 ease-out"
                                style={{
                                    transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg) translateZ(20px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Carousel Images */}
                                <div className="relative aspect-[4/3] transform-style-3d">
                                    {heroImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Forensic Audit ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>

                                {/* Carousel Controls */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 z-20"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 z-20"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {heroImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 px-4 md:px-8 bg-white/[0.02] border-b border-white/5">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('multi_outlet.social_leaks_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('multi_outlet.social_leaks')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('multi_outlet.social_verdict_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('multi_outlet.social_verdict')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('multi_outlet.social_diagnosed_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('multi_outlet.social_diagnosed')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost Calculator */}
            <section className="py-24 px-4 md:px-8 bg-white/[0.01] border-b border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">{t('multi_outlet.calc_title')}</h2>
                        <p className="text-muted-foreground">{t('multi_outlet.calc_desc')}</p>
                    </div>

                    <div className="max-w-md mx-auto bg-black/50 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{t('multi_outlet.calc_label')}</label>
                                <Input
                                    type="number"
                                    placeholder={t('multi_outlet.calc_placeholder')}
                                    className="text-center text-3xl font-black h-16 bg-zinc-900 border-white/10 text-white focus:border-primary"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNetworkSize(parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t('multi_outlet.calc_daily')}</p>
                                    <p className="text-2xl font-black text-red-500">{i18n.language === 'id' ? `Rp ${(networkSize * 450000).toLocaleString('id-ID')}` : `$${(networkSize * 32).toLocaleString()}`}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t('multi_outlet.calc_monthly')}</p>
                                    <p className="text-2xl font-black text-red-500">{i18n.language === 'id' ? `Rp ${(networkSize * 450000 * 30).toLocaleString('id-ID')}` : `$${(networkSize * 32 * 30).toLocaleString()}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits-First Features with Forensics Image */}
            <section id="benefits" className="py-24 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-6xl space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">{t('multi_outlet.benefits_title')}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{t('multi_outlet.benefits_desc')}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Benefits List */}
                        <div className="space-y-8">
                            {/* Benefit 1 */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-black">{t('multi_outlet.benefit1_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="multi_outlet.benefit1_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Benefit 2 */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-black">{t('multi_outlet.benefit2_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="multi_outlet.benefit2_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Benefit 3 */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-black">{t('multi_outlet.benefit3_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="multi_outlet.benefit3_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Benefit 4 */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-black">{t('multi_outlet.benefit4_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="multi_outlet.benefit4_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Forensics Image */}
                        <div className="relative">
                            <div className="relative rounded-2xl border border-primary/20 bg-zinc-900/50 overflow-hidden backdrop-blur-sm">
                                <img
                                    src="/assets/images/forensics.png"
                                    alt="Forensic Analysis Dashboard"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">{t('multi_outlet.benefits_img_badge')}</p>
                                    <p className="text-sm text-white/80">{t('multi_outlet.benefits_img_text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <Button asChild size="lg" className="h-16 px-12 font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20">
                            <Link to="/fip-lite">{t('multi_outlet.cta_health_score')}</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Demo Video */}
            <section className="py-24 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                        {t('multi_outlet.demo_badge')}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{t('multi_outlet.demo_title')}</h2>

                    <div className="relative aspect-video rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={t('demo_video.url')}
                            title="FIP Protocol Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 text-white font-bold text-center">
                        <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                            {t('multi_outlet.demo_cta')}
                        </a>
                    </Button>
                    <p className="text-xs text-muted-foreground/60 max-w-md mx-auto italic mt-2">
                        {t('multi_outlet.demo_disclaimer')}
                    </p>
                </div>
            </section>

            {/* Simplified Pricing - Updated for Single Entity */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20 relative overflow-hidden">
                <WavingDots color="rgba(56, 189, 248, 0.15)" className="opacity-50" />
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black">{t('multi_outlet.pricing_title')}</h2>
                        <p className="text-muted-foreground">{t('multi_outlet.pricing_desc')}</p>
                        {/* Single Entity Disclaimer */}
                        <p className="text-sm text-primary/80 max-w-2xl mx-auto mt-4">
                            {i18n.language === 'id'
                                ? 'Untuk bisnis satu lokasi atau operator tunggal. Jika Anda memiliki banyak outlet, gunakan Network Intelligence.'
                                : 'For single-location businesses or solo operators. If you have multiple outlets, use Network Intelligence.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Tier 1: Rescue Audit */}
                        <div className="p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-sm space-y-6 flex flex-col">
                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase text-white">Rescue Audit</h3>
                                <p className="text-xs text-primary font-bold uppercase tracking-widest">{i18n.language === 'id' ? 'Diagnosa Sekali Bedah' : 'One-Time Diagnostic Surgery'}</p>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white">$1,200</span>
                                    <span className="text-xs text-muted-foreground">/audit</span>
                                </div>

                                <ul className="space-y-3 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Diagnosa mendalam 16-pilar' : 'Deep 16-pillar diagnosis'}
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Laporan Forensic Leakage' : 'Forensic Leakage Report'}
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Rencana perbaikan nyata' : 'Actionable recovery roadmap'}
                                    </li>
                                </ul>
                            </div>

                            <Button asChild className="w-full h-12 font-black bg-white/10 hover:bg-white/20 text-white border border-white/20">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                    {i18n.language === 'id' ? 'MULAI BEDAH SEKARANG' : 'START RESCUE AUDIT'}
                                </a>
                            </Button>
                        </div>

                        {/* Tier 2: Integrity Program */}
                        <div className="p-8 rounded-2xl bg-primary/10 border-2 border-primary backdrop-blur-sm space-y-6 flex flex-col relative shadow-2xl shadow-primary/10">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-[10px] font-black uppercase rounded-full">
                                {t('pricing.popular')}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase text-white">Integrity Program</h3>
                                <p className="text-xs text-primary font-bold uppercase tracking-widest">{i18n.language === 'id' ? 'Perlindungan Margin Berkelanjutan' : 'Ongoing Margin Protection'}</p>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white">$1,800</span>
                                    <span className="text-xs text-muted-foreground">{i18n.language === 'id' ? '/kuartal' : '/quarter'}</span>
                                </div>

                                <ul className="space-y-3 text-xs text-white/80">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Audit Kuartalan (4x/tahun)' : 'Quarterly Audits (4x/year)'}
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Sesi Strategi On-Demand' : 'On-Demand Strategy Sessions'}
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        {i18n.language === 'id' ? 'Akses FIP™ Lite Dashboard' : 'FIP™ Lite Dashboard Access'}
                                    </li>
                                </ul>
                            </div>

                            <Button asChild className="w-full h-12 font-black bg-primary text-black hover:bg-white">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                    {i18n.language === 'id' ? 'MULAI PROGRAM INTEGRITAS' : 'START INTEGRITY PROGRAM'}
                                </a>
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-12 italic">
                        <ShieldCheck className="w-4 h-4 inline mr-1" />
                        {t('multi_outlet.pricing_guarantee')}
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('multi_outlet.faq_title', 'Common Questions')}</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <AccordionItem key={num} value={`item-${num}`} className="border border-border/50 bg-card/30 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-bold text-left">{t(`faq.q${num}`)}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <Trans i18nKey={`faq.a${num}`} components={{ 1: <strong className="text-foreground" />, br: <br /> }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/20 to-background">
                <div className="container mx-auto max-w-3xl text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <Trans i18nKey="multi_outlet.final_cta_title" components={{ 1: <span className="text-primary" /> }} />
                    </h2>
                    <div className="text-lg text-muted-foreground">
                        <Trans i18nKey="multi_outlet.final_cta_desc" components={{ 1: <strong className="text-foreground" />, br: <br /> }} />
                    </div>
                    <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group">
                        <Link to="/fip-lite">
                            <span className="flex items-center font-black">
                                {t('multi_outlet.cta_health_score')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {t('multi_outlet.final_cta_meta')}
                    </p>
                </div>
            </section>

            {/* Cross-Link Strategy */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5 bg-black/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-sm text-muted-foreground">
                        {t('multi_outlet.cross_link_label')} <Link to="/network-intelligence" onClick={() => window.scrollTo(0, 0)} className="text-primary font-bold hover:underline px-1">{t('multi_outlet.cross_link_cta')}</Link>
                    </p>
                </div>
            </section>

            {/* Footer Badge */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
                        {t('multi_outlet.footer_badge')}
                    </p>
                </div>
            </section>
        </div>
    )
}
