import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Globe, Lock, Cpu, BarChart3 } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { HowFIPWorks } from "@/components/HowFIPWorks"

import { useState } from 'react'

export const Route = createFileRoute('/investasi')({
    component: InvestasiPage,
})

function InvestasiPage() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === 'undefined') return
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMousePos({ x, y })
    }

    const smePlans = [
        {
            id: "rescue",
            name: t('pricing.starter_title'), // Rescue Audit
            badge: t('pricing.starter_badge'), // One-Time Surgery
            price: t('investasi.price_starter'), // $1,200
            period: t('investasi.per_starter'), // per audit
            desc: "Critical one-time diagnostic surgery to identify root causes of profit leakage.",
            features: [
                t('pricing.feature_starter_1'),
                t('pricing.feature_starter_2'),
                t('pricing.feature_strategy'),
                t('investasi.feature_corrective')
            ],
            cta: t('pricing.cta_starter'),
            link: "/single-entity"
        },
        {
            id: "integrity",
            name: t('pricing.growth_title'), // Integrity Program
            badge: t('pricing.growth_badge'), // Ongoing Protection
            price: t('investasi.price_growth'), // $1,800
            period: t('investasi.per_growth'), // /quarter
            desc: "Quarterly forensic oversight to ensure sustained operational integrity.",
            features: [
                t('investasi.feature_everything'),
                t('pricing.feature_checkins'),
                t('investasi.feature_quarterly'),
                t('investasi.feature_variance')
            ],
            cta: t('pricing.cta_growth'),
            link: "/single-entity",
            highlight: true
        }
    ]

    const networkPlans = [
        {
            id: "pilot",
            name: t('pricing.scale_title'), // Network Pilot
            badge: t('pricing.scale_badge'), // Validation Stage
            price: t('investasi.price_scale'), // $3,500
            period: t('investasi.per_scale'), // /3 months
            desc: " Battlefield test for networks to surface hidden systemic failure patterns.",
            features: [
                t('investasi.feature_pillars'),
                t('investasi.feature_outlier'),
                t('investasi.feature_fraud'),
                t('investasi.feature_refund')
            ],
            cta: t('pricing.cta_scale'),
            link: "/network-intelligence"
        },
        {
            id: "annual",
            name: t('pricing.enterprise_title'), // Annual Plan
            badge: t('pricing.enterprise_badge'), // Full Surveillance
            price: t('investasi.price_enterprise'), // $12,000
            period: t('investasi.per_enterprise'), // /year
            desc: "Year-round institutional-grade forensic surveillance for total network control.",
            features: [
                t('investasi.feature_continuous'),
                t('investasi.feature_crisis'),
                t('investasi.feature_lab'),
                t('investasi.feature_pattern')
            ],
            cta: t('pricing.cta_enterprise'),
            link: "/network-intelligence",
            highlight: true
        }
    ]

    return (
        <div
            onMouseMove={handleMouseMove}
            className="flex-1 flex flex-col bg-[#0a0a0a] text-white relative transition-colors duration-500"
        >
            {/* Dynamic Spotlight Effect - "The Forensic Torch" */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
                style={{
                    background: `radial-gradient(800px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(56, 189, 248, 0.08), transparent 50%)`
                }}
            />

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div
                    className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
                    style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
                ></div>
                <div
                    className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"
                    style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
                ></div>
            </div>

            {/* SEO Meta Tags */}
            <title>{t('investasi.seo_title')} - Forensic Economics</title>
            <meta name="description" content={t('investasi.seo_desc')} />

            {/* Hero Header */}
            <section className="pt-32 pb-24 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a] relative z-10">
                <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 animate-bounce-subtle">
                        <Lock className="w-3 h-3" /> {t('investasi.hero_badge')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                        <Trans i18nKey="investasi.hero_title">
                            Transparent <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">Intelligence</span> Economics
                        </Trans>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-primary/30 pl-8 py-2">
                        {t('investasi.hero_subtitle')}
                    </p>
                </div>
            </section>

            {/* 01. SME SECTION */}
            <section className="py-24 px-4 md:px-8 border-b border-white/5 bg-zinc-900/10 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 animate-fade-in">
                        <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
                            <Cpu className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black uppercase tracking-tight">{t('investasi.sme_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">1 Entity • 1 P&L • Single Operator</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
                        {smePlans.map((plan, idx) => (
                            <div
                                key={plan.id}
                                className={`p-10 rounded-[2.5rem] border ${plan.highlight ? 'border-primary bg-primary/5 shadow-2x-strong shadow-primary/10' : 'border-border/50 bg-[#111111]'} flex flex-col relative transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-900/80 group animate-fade-in delay-${idx * 200}`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-10 bg-primary text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{t('pricing.popular')}</div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-3xl font-black text-white uppercase mb-1 group-hover:text-primary transition-colors">{plan.name}</h3>
                                    <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-10 items-baseline flex gap-1">
                                    <span className="text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm font-bold">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-10 leading-relaxed italic border-l-2 border-primary/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-12 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className={`w-full h-20 text-lg font-black uppercase rounded-2xl transition-all duration-300 ${plan.highlight ? 'bg-primary text-black hover:bg-white hover:scale-105' : 'bg-white/10 text-white hover:bg-primary hover:text-black hover:scale-105'}`}>
                                    <Link to={plan.link as any}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 02. NETWORK SECTION */}
            <section className="py-24 px-4 md:px-8 bg-zinc-900/20 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 justify-end text-right animate-fade-in">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl font-black uppercase tracking-tight">{t('investasi.high_stakes_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">2+ Entities • Portfolio • Network Intelligence</p>
                        </div>
                        <div className="h-16 w-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/10 order-1 md:order-2 self-end md:self-auto">
                            <BarChart3 className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl ml-auto">
                        {networkPlans.map((plan, idx) => (
                            <div
                                key={plan.id}
                                className={`p-10 rounded-[2.5rem] border ${plan.highlight ? 'border-blue-500 bg-blue-500/5 shadow-2x-strong shadow-blue-500/10' : 'border-border/50 bg-[#111111]'} flex flex-col relative transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-900/80 group animate-fade-in delay-${idx * 200}`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-10 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{t('investasi.enterprise_hub')}</div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-3xl font-black text-white uppercase mb-1 group-hover:text-blue-400 transition-colors">{plan.name}</h3>
                                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-10 items-baseline flex gap-1">
                                    <span className="text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm font-bold">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-10 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-12 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className={`w-full h-20 text-lg font-black uppercase rounded-2xl transition-all duration-300 ${plan.highlight ? 'bg-blue-500 text-white hover:bg-white hover:text-black hover:scale-105' : 'bg-white/10 text-white hover:bg-blue-500 hover:scale-105'}`}>
                                    <Link to={plan.link as any}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Mini */}
            <HowFIPWorks />

            {/* Attribution / Footer Copy */}
            <section className="py-24 px-4 md:px-8 bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <Globe className="w-12 h-12 text-primary/40 mx-auto" />
                    <div className="space-y-4 text-center">
                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-black">{t('investasi.attribution_title')}</p>
                        <p className="text-xl text-gray-400 font-serif italic max-w-2xl mx-auto">
                            {t('investasi.attribution_text')}
                        </p>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.5em]">
                {t('investasi.footer_rights', { year: currentYear })}
            </footer>
        </div>
    )
}
