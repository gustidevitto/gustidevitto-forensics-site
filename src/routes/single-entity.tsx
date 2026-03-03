import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Clock, ShieldCheck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"
import { ForensicCaseFiles } from "@/components/ForensicCaseFiles"
import PricingModal from '@/components/PricingModal';

export const Route = createFileRoute('/single-entity')({
    component: SingleEntityPage,
})

function SingleEntityPage() {
    const { t } = useTranslation()
    const [networkSize, setNetworkSize] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<any>(null);
    const [commitmentType, setCommitmentType] = useState<any>(null);

    const openModal = (tier: any, type: any) => {
        setSelectedTier(tier);
        setCommitmentType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTier(null);
        setCommitmentType(null);
    };

    const tiers = [
        {
            id: 'diagnostic',
            name: 'DIAGNOSTIC',
            tagline: 'Find the bleeding',
            positioning: 'Am I sick?',
            color: 'green',
            pricing: {
                oneTime: 1500,
                quarterly: { total: 3825, perAudit: 1275, audits: 3 },
                annual: { total: 4500, perAudit: 1125, audits: 4, access: true }
            },
            features: {
                included: [
                    '8 Core Forensic Pillars',
                    'Syndrome Detection',
                    'Anomaly Detection',
                    'Basic Health Score',
                    'Executive Summary PDF',
                    'Multi-currency support',
                    'Bilingual reports (EN/ID)'
                ],
                excluded: [
                    'Full 19 pillars',
                    'Logic trace analysis',
                    'Multi-outlet analysis',
                    'AI neural intelligence'
                ]
            },
            bestFor: [
                '1-3 outlets',
                '$500K-$2M revenue',
                'First-time diagnostic',
                'Budget entry point'
            ]
        },
        {
            id: 'forensic',
            name: 'FORENSIC',
            tagline: 'Understand the disease',
            positioning: 'Why am I sick, and what\'s the cure?',
            color: 'blue',
            pricing: {
                oneTime: 3500,
                quarterly: { total: 8925, perAudit: 2975, audits: 3 },
                annual: { total: 10500, perAudit: 2625, audits: 4, access: true }
            },
            features: {
                included: [
                    'Everything in DIAGNOSTIC',
                    'Full 19 Forensic Pillars',
                    'Logic Trace Analysis',
                    'Decision Intelligence Engine',
                    'Data Integrity Scoring',
                    'Advanced Analytics™',
                    'Detailed Report (15-20 pages)'
                ],
                excluded: [
                    'Multi-outlet network analysis',
                    'Franchise intelligence',
                    'AI neural learning',
                    'Wealth impact analysis'
                ]
            },
            bestFor: [
                '3-8 outlets',
                '$2M-$10M revenue',
                'Comprehensive structural fix',
                'Action-oriented'
            ]
        }
    ];

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

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

    return (
        <div
            className="flex-1 flex flex-col bg-[#0a1628] text-white relative"
        >
            {/* Automatic Spotlight Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 animate-spotlight-roam opacity-20"
                    style={{
                        background: `radial-gradient(800px circle at center, rgba(56, 189, 248, 0.15), transparent 50%)`
                    }}
                />
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}></div>
            </div>
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('single_entity.seo_desc')} />
            <meta name="keywords" content={t('single_entity.seo_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />

            {/* Hero Section */}
            <section className="relative py-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
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
                                    <Link to="/fip-lite">
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
                                className="relative rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden backdrop-blur-sm group shadow-2xl transition-all duration-500 hover:scale-[1.02]"
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
                    <div className="grid md:grid-cols-3 gap-0 text-center uppercase tracking-widest">
                        <div className="space-y-2 py-6 md:border-r border-white/5">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_leaks_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_leaks')}</div>
                        </div>
                        <div className="space-y-2 py-6 md:border-r border-white/5">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_verdict_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_verdict')}</div>
                        </div>
                        <div className="space-y-2 py-6">
                            <div className="text-4xl font-black text-primary">{t('single_entity.social_diagnosed_val')}</div>
                            <div className="text-xs text-muted-foreground">{t('single_entity.social_diagnosed')}</div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Case Studies / War Stories */}
            <ForensicCaseFiles />

            {/* Quick Calculator */}
            <section className="py-24 px-4 md:px-8 bg-[#060810] border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Quick Estimate</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {t('single_entity.calc_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('single_entity.calc_desc')}
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-8 bg-primary hover:bg-white text-black font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all">
                                    <Link to="/fip-lite">
                                        Try Free Diagnostic <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Interactive Calculator Card */}
                        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block font-bold">
                                        Enter your monthly revenue
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 150,000"
                                            className="text-right text-3xl font-mono h-20 bg-black/50 border-white/10 text-white focus:border-primary/50 focus:ring-0 pl-12 pr-6 rounded-xl"
                                            onChange={(e) => setNetworkSize(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-red-400/70 mb-1">Est. Daily Leakage</p>
                                            <p className="text-xl font-mono font-bold text-red-400">${(networkSize * 0.0006).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-red-500/30" />
                                    </div>

                                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-primary/70 mb-2">Projected Annual Loss</p>
                                        <p className="text-4xl font-mono font-black text-white tracking-tight">
                                            $<span className="text-primary">{(networkSize * 0.018 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </p>
                                        <p className="text-[10px] text-muted-foreground mt-2 italic">
                                            *Based on industry average trapped cost rate (~1.8%/mo)
                                        </p>
                                    </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tiers.map((tier) => {
                            const colorMap: Record<string, { base: string; text: string; bg: string; border: string }> = {
                                green: { base: 'green', text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500' },
                                blue: { base: 'blue', text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500' },
                                amber: { base: 'amber', text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500' },
                                red: { base: 'red', text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' }
                            };
                            const theme = colorMap[tier.color] || colorMap.green;

                            return (
                                <div key={tier.id} className={`border rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-${theme.base}-500/20 bg-black/40 hover:shadow-${theme.base}-500/10 relative overflow-hidden group text-left`}>
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${theme.base}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                                    <div className="mb-6 text-center">
                                        <h3 className={`text-3xl font-black ${theme.text} tracking-tight mb-2`}>{tier.name}</h3>
                                        <p className="italic text-muted-foreground font-serif text-lg">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-4 my-6 flex-grow">
                                        {/* One-Time Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                            <div className="text-left">
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">One-Time Audit</h4>
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">${tier.pricing.oneTime.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground">Single Comprehensive Audit</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                Select
                                            </Button>
                                        </div>

                                        {/* Quarterly Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                            <div className="text-left">
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">Quarterly Program</h4>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-white">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">Total</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.quarterly.perAudit.toLocaleString()} / audit
                                                    </div>
                                                    <div className="text-xs text-muted-foreground italic">
                                                        3x Audits (Monthly)
                                                    </div>
                                                    <span className="text-xs text-green-400 font-bold mt-1">Save ${(tier.pricing.oneTime * 3 - tier.pricing.quarterly.total).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                Select
                                            </Button>
                                        </div>

                                        {/* Annual Option */}
                                        <div className={`p-5 border border-${theme.base}-500/30 rounded-lg bg-${theme.base}-500/10 hover:bg-${theme.base}-500/20 transition-colors flex items-center justify-between relative ring-1 ring-${theme.base}-500/20`}>
                                            <div className={`absolute -top-3 left-4 ${theme.bg} text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg`}>Recommended</div>
                                            <div className="text-left mt-1">
                                                <h4 className={`font-bold uppercase tracking-widest text-xs ${theme.text} mb-1`}>Annual Partnership</h4>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-white">${tier.pricing.annual.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">/ Year</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.annual.perAudit.toLocaleString()} / audit
                                                    </div>
                                                    <div className="text-xs text-muted-foreground italic">
                                                        4x Audits (Quarterly)
                                                    </div>
                                                    <span className="text-xs text-green-400 font-bold mt-1">Save ${(tier.pricing.oneTime * 4 - tier.pricing.annual.total).toLocaleString()} + Benefits</span>
                                                </div>
                                            </div>
                                            <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.bg} text-black hover:bg-white hover:text-black border-none font-bold transition-all shadow-lg shadow-${theme.base}-500/20 h-auto py-2`}>
                                                Select
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <div className="mb-4">
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Key Features</p>
                                            <ul className="space-y-3">
                                                {tier.features.included.slice(0, 5).map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                        <ShieldCheck className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
                                                        <span className="leading-snug">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/5">
                                            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">Best for:</p>
                                            <ul className="space-y-1">
                                                {tier.bestFor.slice(0, 2).map((item, i) => (
                                                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                                                        <span className={`w-1 h-1 rounded-full bg-${theme.base}-500/50`}></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-8 border-b border-white/5">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-black text-center mb-12">{t('single_entity.faq_title', 'Common Questions')}</h2>
                    <Accordion type="single" collapsible className="space-y-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <AccordionItem key={num} value={`item-${num}`} className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-5">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-5">{t(`faq.q${num}`)}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                                    <Trans i18nKey={`faq.a${num}`} components={{ 1: <strong className="text-white" />, br: <br /> }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4 md:px-8 text-center bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-black">
                        <Trans i18nKey="single_entity.final_cta_title" components={{ 1: <span className="text-primary" /> }} />
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        <Trans i18nKey="single_entity.final_cta_desc" components={{ 1: <strong className="text-white" />, br: <br /> }} />
                    </p>
                    <div className="space-y-4 pt-4">
                        <Button asChild size="lg" className="h-16 px-12 text-lg font-black bg-primary text-black hover:bg-white shadow-xl shadow-primary/20 transition-all">
                            <Link to="/fip-lite">{t('single_entity.cta_health_score')}</Link>
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
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div >
    )
}
