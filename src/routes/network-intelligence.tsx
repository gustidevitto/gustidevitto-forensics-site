import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ShieldAlert, Maximize2, X, Activity, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"

export const Route = createFileRoute('/network-intelligence')({
    component: NetworkIntelligencePage,
})

function NetworkIntelligencePage() {
    const { t } = useTranslation()
    const [showMasterLab, setShowMasterLab] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const heroImages = [
        '/assets/images/audit.png',
        '/assets/images/forensic_dashboard.png',
        '/assets/images/network_monitoring.png',
        '/assets/images/dachicken.png'
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === 'undefined') return
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMousePos({ x, y })
    }

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

    return (
        <div
            onMouseMove={handleMouseMove}
            className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] text-white perspective-1000 overflow-x-hidden"
        >
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')} - Enterprise Network Intelligence</title>
            <meta name="description" content={t('network_intelligence.seo_desc')} />
            <meta name="keywords" content={t('network_intelligence.seo_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />

            {/* Hero Section with Carousel */}
            <section className="relative py-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
                {/* Dynamic Spotlight Effect - "The Forensic Torch" (Red for Enterprise) */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
                    style={{
                        background: `radial-gradient(800px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(220, 38, 38, 0.2), transparent 50%)`
                    }}
                />

                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] opacity-50 animate-pulse transition-transform duration-[50ms] ease-linear"
                        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[100px] transition-transform duration-[50ms] ease-linear"
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
                                <Activity className="w-3 h-3" /> {t('network_intelligence.hero_badge')}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                                {t('network_intelligence.hero_title')} <br />
                                <span className="text-primary">{t('network_intelligence.hero_title_accent')}</span>
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {t('network_intelligence.hero_desc')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button asChild size="lg" className="h-16 px-10 text-lg font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20 group">
                                    <Link to="/investasi">
                                        {t('network_intelligence.cta_demo')}
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <div className="flex flex-col justify-center px-6 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{t('network_intelligence.clearance_label')}</div>
                                    <div className="text-sm font-black text-primary">{t('network_intelligence.clearance_value')}</div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground/60 italic">
                                {t('network_intelligence.hero_meta')}
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
                                                alt={`Network Analysis ${idx + 1}`}
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
                            <div className="text-4xl font-black text-primary">{t('network_intelligence.social_nodes_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('network_intelligence.social_nodes')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('network_intelligence.social_leakage_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('network_intelligence.social_leakage')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('network_intelligence.social_compliance_val')}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('network_intelligence.social_compliance')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits-First Features with Forensics Image */}
            <section id="benefits" className="py-24 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-6xl space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">{t('network_intelligence.benefits_title')}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{t('network_intelligence.benefits_desc')}</p>
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
                                        <h3 className="text-xl font-black">{t('network_intelligence.benefit1_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="network_intelligence.benefit1_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
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
                                        <h3 className="text-xl font-black">{t('network_intelligence.benefit2_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="network_intelligence.benefit2_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
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
                                        <h3 className="text-xl font-black">{t('network_intelligence.benefit3_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="network_intelligence.benefit3_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
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
                                        <h3 className="text-xl font-black">{t('network_intelligence.benefit4_title')}</h3>
                                        <div className="text-sm text-muted-foreground leading-relaxed">
                                            <Trans i18nKey="network_intelligence.benefit4_desc" components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Forensics Image */}
                        <div className="relative">
                            <div className="relative rounded-2xl border border-primary/20 bg-zinc-900/50 overflow-hidden backdrop-blur-sm">
                                <img
                                    src="/assets/images/network_monitoring.png"
                                    alt="Network Intelligence Visualization"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">{t('network_intelligence.benefits_img_badge')}</p>
                                    <p className="text-sm text-white/80">{t('network_intelligence.benefits_img_text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <Button asChild size="lg" className="h-16 px-12 font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20">
                            <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                {t('network_intelligence.demo_cta')}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Master Lab Showcase */}
            <section className="py-24 px-4 md:px-8 bg-white/[0.01] border-b border-white/5">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                                {t('network_intelligence.master_lab_badge')}
                            </div>
                            <h2 className="text-4xl font-black tracking-tight">{t('network_intelligence.master_lab_title')}</h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                {t('network_intelligence.master_lab_desc')}
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all">
                                    <Activity className="text-primary w-8 h-8 mb-4" />
                                    <h4 className="font-bold uppercase text-sm mb-2">{t('network_intelligence.master_lab_f1_title')}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed uppercase">{t('network_intelligence.master_lab_f1_desc')}</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all">
                                    <ShieldAlert className="text-primary w-8 h-8 mb-4" />
                                    <h4 className="font-bold uppercase text-sm mb-2">{t('network_intelligence.master_lab_f2_title')}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed uppercase">{t('network_intelligence.master_lab_f2_desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative group rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden cursor-pointer h-[500px] transition-all hover:border-primary/50 hover:shadow-[0_0_80px_rgba(212,175,55,0.15)] backdrop-blur-sm"
                            onClick={() => setShowMasterLab(true)}
                        >
                            <img
                                src="/assets/images/ffdv4masterlab.png"
                                alt="Master Lab Interface"
                                className="w-full h-full object-cover object-top opacity-50 transition-all group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                <Maximize2 className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">{t('network_intelligence.master_lab_cta')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Video */}
            <section className="py-24 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                        {t('network_intelligence.demo_badge')}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{t('network_intelligence.demo_title')}</h2>

                    <div className="relative aspect-video rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={t('demo_video.url')}
                            title="Network Analysis Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 text-white font-bold h-14 px-10">
                            <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                {t('network_intelligence.demo_cta')}
                            </a>
                        </Button>

                        {/* CPA Diplomacy Layer */}
                        <div className="max-w-3xl w-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <ShieldAlert className="w-24 h-24 text-primary -mr-8 -mt-8 rotate-12" />
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                    <Activity className="w-3 h-3" /> {t('network_intelligence.cpa_partner_badge')}
                                </div>
                                <h3 className="text-2xl font-black text-white">{t('network_intelligence.cpa_partner_title')}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    <Trans
                                        i18nKey="network_intelligence.cpa_partner_desc"
                                        components={{ 1: <span className="text-primary font-bold" /> }}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Simplified Pricing - Enterprise */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20 relative overflow-hidden">
                <WavingDots color="rgba(30, 58, 138, 0.3)" className="opacity-50" />
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{t('network_intelligence.pilot_title')}</h2>
                        <p className="text-muted-foreground">{t('network_intelligence.pilot_desc')}</p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-b from-primary/20 to-black border-2 border-primary shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="px-3 py-1 bg-primary text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                                    {t('network_intelligence.pilot_grade', 'Enterprise Grade')}
                                </div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black uppercase text-white">{t('network_intelligence.pilot_card_title')}</h3>
                                    <p className="text-primary font-bold">{t('network_intelligence.pilot_card_sub')}</p>
                                </div>

                                <div className="py-6 border-y border-white/10 space-y-2">
                                    <div className="text-5xl font-black text-white">{t('network_intelligence.pilot_price')}</div>
                                    <div className="text-sm text-muted-foreground">{t('network_intelligence.pilot_price_meta')}</div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase text-primary tracking-widest">{t('network_intelligence.pilot_includes_label')}</h4>
                                        <ul className="space-y-4 text-sm text-white/80">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                    {t(`network_intelligence.pilot_f${i}`)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase text-primary tracking-widest">{t('network_intelligence.pilot_guarantee_label')}</h4>
                                        <p className="text-sm text-white/80 italic leading-relaxed">
                                            {t('network_intelligence.pilot_guarantee_text')}
                                        </p>
                                        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">{t('network_intelligence.pilot_slots')}</p>
                                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className="w-1/3 h-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button asChild className="w-full h-16 text-lg font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20">
                                    <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                        {t('network_intelligence.pilot_cta')}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-8 bg-white/[0.01] border-y border-white/5">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('network_intelligence.faq_title', 'Common Questions')}</h2>
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
            <section className="py-32 px-4 md:px-8">
                <div className="container mx-auto max-w-3xl text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        {t('network_intelligence.final_cta_title')} <span className="text-primary">{t('network_intelligence.final_cta_title_accent')}</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('network_intelligence.final_cta_desc')}
                    </p>
                    <div className="pt-4">
                        <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group">
                            <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                <span className="flex items-center font-black">
                                    {t('network_intelligence.cta_demo')}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Cross-Link Strategy */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5 bg-black/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-sm text-muted-foreground">
                        {t('network_intelligence.cross_link_label')} <Link to="/single-entity" onClick={() => window.scrollTo(0, 0)} className="text-primary font-bold hover:underline px-1">{t('network_intelligence.cross_link_cta')}</Link>
                    </p>
                </div>
            </section>

            {/* Footer Badge */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
                        {t('single_entity.footer_badge')}
                    </p>
                </div>
            </section>

            {/* Master Lab Modal */}
            {showMasterLab && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowMasterLab(false)}>
                    <button className="absolute top-8 right-8 text-white"><X className="w-10 h-10" /></button>
                    <img
                        src="/assets/images/ffdv4masterlab.png"
                        alt="Master Lab Full View"
                        className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}
