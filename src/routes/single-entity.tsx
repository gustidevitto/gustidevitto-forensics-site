import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, type ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"

export const Route = createFileRoute('/single-entity')({
    component: SingleEntityPage,
})

function SingleEntityPage() {
    const { t, i18n } = useTranslation()
    const [networkSize, setNetworkSize] = useState(0)
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
    }, [heroImages.length])

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
            className="flex flex-col min-h-screen bg-[#0a1628] text-white perspective-1000 overflow-x-hidden relative"
        >
            {/* Dynamic Spotlight Effect - "The Forensic Torch" */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
                style={{
                    background: `radial-gradient(800px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(56, 189, 248, 0.1), transparent 50%)`
                }}
            />

            {/* Ambient Background Elements with Parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse transition-transform duration-[50ms] ease-linear"
                    style={{ transform: `translate(calc(-50% + ${mousePos.x * -40}px), calc(-50% + ${mousePos.y * -40}px))` }}
                ></div>
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700 transition-transform duration-[50ms] ease-linear"
                    style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
                ></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05] transition-transform duration-[50ms] ease-linear"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
                    }}></div>
            </div>
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('single_entity.seo_desc')} />
            <meta name="keywords" content={t('single_entity.seo_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />

            {/* Hero Section */}
            <section className="relative py-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(600px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(56, 189, 248, 0.1), transparent 40%)`
                    }}
                />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <Activity className="w-3 h-3" /> {t('single_entity.hero_badge')}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                                {t('single_entity.hero_title')} <br />
                                <span className="text-primary">{t('single_entity.hero_title_accent')}</span>
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {t('single_entity.hero_desc')}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                                <Button asChild size="lg" className="h-16 px-10 text-lg font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20">
                                    <Link to="/calculator">
                                        {t('single_entity.cta_health_score')}
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-16 px-10 border-white/10 hover:bg-white/5 text-white font-bold">
                                    <a href="#benefits">{t('single_entity.cta_see_catch')}</a>
                                </Button>
                            </div>

                            <p className="text-sm text-muted-foreground/60 italic">
                                {t('single_entity.hero_meta')}
                            </p>
                        </div>

                        <div className="relative perspective-1000 hidden lg:block">
                            <div
                                className="relative rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden backdrop-blur-sm group shadow-2xl transition-all duration-100 ease-out"
                                style={{
                                    transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg) translateZ(20px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <div className="relative aspect-[4/3] transform-style-3d">
                                    {heroImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <img src={img} alt={`Analysis ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>

                                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 z-20"><ChevronLeft className="w-5 h-5" /></button>
                                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 z-20"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Stats */}
            <section className="py-16 px-4 md:px-8 bg-white/[0.02] border-b border-white/5">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center uppercase tracking-widest">
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_leaks_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_leaks')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_verdict_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_verdict')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_diagnosed_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_diagnosed')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Calculator */}
            <section className="py-24 px-4 md:px-8 bg-black border-b border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">{t('single_entity.calc_title')}</h2>
                        <p className="text-muted-foreground">{t('single_entity.calc_desc')}</p>
                    </div>

                    <div className="max-w-md mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{t('single_entity.calc_label')}</label>
                                <Input
                                    type="number"
                                    placeholder={t('single_entity.calc_placeholder')}
                                    className="text-center text-3xl font-black h-16 bg-black border-white/10 text-white focus:border-primary"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNetworkSize(parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t('single_entity.calc_daily')}</p>
                                    <p className="text-2xl font-black text-red-500">${(networkSize * 0.0006).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t('single_entity.calc_monthly')}</p>
                                    <p className="text-2xl font-black text-red-500">${(networkSize * 0.018).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section id="benefits" className="py-24 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-6xl space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">{t('single_entity.benefits_title')}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{t('single_entity.benefits_desc')}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all flex gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                    <div className="space-y-1">
                                        <h3 className="font-black text-lg">{t(`single_entity.benefit${i}_title`)}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            <Trans i18nKey={`single_entity.benefit${i}_desc`} components={{ 1: <span className="text-primary font-bold" /> }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative rounded-2xl border border-primary/20 bg-zinc-900/50 overflow-hidden">
                            <img src="/assets/images/forensics.png" alt="Audit" className="w-full h-auto opacity-70" />
                            <div className="absolute bottom-6 left-6">
                                <p className="text-[10px] font-black uppercase text-primary mb-1">{t('single_entity.benefits_img_badge')}</p>
                                <p className="text-sm text-white font-bold">{t('single_entity.benefits_img_text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20 relative overflow-hidden">
                <WavingDots color="rgba(56, 189, 248, 0.15)" className="opacity-50" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <div className="space-y-4 mb-16">
                        <h2 className="text-3xl font-black uppercase">{t('single_entity.pricing_title')}</h2>
                        <p className="text-muted-foreground">{t('single_entity.pricing_desc')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Rescue Audit */}
                        <div className="p-8 rounded-2xl bg-black border border-white/10 text-left space-y-6 flex flex-col">
                            <h3 className="text-xl font-black uppercase">Rescue Audit</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black">$1,200</span>
                                <span className="text-xs text-muted-foreground">/audit</span>
                            </div>
                            <ul className="space-y-3 flex-1">
                                {[1, 2, 3, 4].map(i => (
                                    <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        {t(`single_entity.pricing_paid_f${i}`)}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-black">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">BOOK RESCUE AUDIT</a>
                            </Button>
                        </div>

                        {/* Integrity Program */}
                        <div className="p-8 rounded-2xl bg-primary/10 border-2 border-primary text-left space-y-6 flex flex-col relative shadow-2xl shadow-primary/20">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-[10px] font-black rounded-full uppercase">RECOMMENDED</div>
                            <h3 className="text-xl font-black uppercase">Integrity Program</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black">$1,800</span>
                                <span className="text-xs text-muted-foreground">/quarter</span>
                            </div>
                            <ul className="space-y-3 flex-1">
                                <li className="flex gap-2 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                    {i18n.language === 'id' ? 'Audit Kuartalan (4x/tahun)' : 'Quarterly Audits (4x/year)'}
                                </li>
                                <li className="flex gap-2 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                    {i18n.language === 'id' ? 'Sesi Strategi On-Demand' : 'On-Demand Strategy Sessions'}
                                </li>
                                <li className="flex gap-2 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                    {t('single_entity.pricing_paid_f3')}
                                </li>
                            </ul>
                            <Button asChild className="w-full bg-primary text-black hover:bg-white font-black">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">ACTIVATE INTEGRITY</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl">
                <h2 className="text-2xl md:text-4xl font-black text-center mb-12 uppercase">{t('single_entity.faq_title', 'Common Questions')}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <AccordionItem key={num} value={`item-${num}`} className="border border-white/10 bg-zinc-900/50 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left py-6">{t(`faq.q${num}`)}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-6">
                                <Trans i18nKey={`faq.a${num}`} components={{ 1: <strong className="text-white" />, br: <br /> }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 md:px-8 text-center bg-gradient-to-b from-transparent to-primary/10">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl font-black">
                        <Trans i18nKey="single_entity.final_cta_title" components={{ 1: <span className="text-primary" /> }} />
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        <Trans i18nKey="single_entity.final_cta_desc" components={{ 1: <strong className="text-white" />, br: <br /> }} />
                    </p>
                    <div className="space-y-4">
                        <Button asChild size="lg" className="h-16 px-12 text-lg font-black bg-primary text-black shadow-2xl shadow-primary/30">
                            <Link to="/calculator">{t('single_entity.cta_health_score')}</Link>
                        </Button>
                        <p className="text-xs text-muted-foreground italic flex items-center justify-center gap-2">
                            <Clock className="w-3 h-3" /> {t('single_entity.final_cta_meta')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Cross-Link */}
            <section className="py-12 border-t border-white/5 bg-zinc-900/30 text-center">
                <p className="text-sm text-muted-foreground">
                    {t('single_entity.cross_link_label')} <Link to="/network-intelligence" className="text-primary font-bold hover:underline px-1">{t('single_entity.cross_link_cta')}</Link>
                </p>
            </section>

            {/* Footer Badge */}
            <section className="py-8 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {t('single_entity.footer_badge')}
                </p>
            </section>
        </div>
    )
}
