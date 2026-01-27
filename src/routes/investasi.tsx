import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Globe, Lock, Cpu, BarChart3 } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { HowFIPWorks } from "@/components/HowFIPWorks"

export const Route = createFileRoute('/investasi')({
    component: InvestasiPage,
})

function InvestasiPage() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()

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
                "Corrective Action Plan"
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
                "Everything in Rescue Audit",
                t('pricing.feature_checkins'),
                "Quarterly Forensic Analysis",
                "Continuous Variance Monitoring"
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
                "16-Pillar Network Diagnostic",
                "Outlier Detection Training",
                "Systemic Fraud Vector Mapping",
                "50% Refund Guarantee"
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
                "Continuous Network Intelligence",
                "Strategic Crisis Briefings",
                "Master Lab Configuration",
                "Unlimited Pattern Training"
            ],
            cta: t('pricing.cta_enterprise'),
            link: "/network-intelligence",
            highlight: true
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            {/* SEO Meta Tags */}
            <title>{t('investasi.seo_title')} - Forensic Economics</title>
            <meta name="description" content={t('investasi.seo_desc')} />

            {/* Hero Header */}
            <section className="pt-24 pb-16 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                        <Lock className="w-3 h-3" /> {t('investasi.hero_badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                        <Trans i18nKey="investasi.hero_title">
                            Transparent <span className="text-primary">Intelligence</span> Economics
                        </Trans>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('investasi.hero_subtitle')}
                    </p>
                </div>
            </section>

            {/* 01. SME SECTION */}
            <section className="py-24 px-4 md:px-8 border-b border-white/5 bg-zinc-900/10">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
                        <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                            <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">{t('investasi.sme_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">1 Entity • 1 P&L • Single Operator</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                        {smePlans.map((plan) => (
                            <div key={plan.id} className={`p-10 rounded-3xl border ${plan.highlight ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/5' : 'border-border/50 bg-[#111111]'} flex flex-col relative`}>
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-6 bg-primary text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{t('pricing.popular')}</div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase mb-1">{plan.name}</h3>
                                    <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-8 items-baseline flex gap-1">
                                    <span className="text-5xl font-black text-white">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed italic border-l-2 border-primary/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className={`w-full h-16 font-black uppercase ${plan.highlight ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-primary hover:text-black'}`}>
                                    <Link to={plan.link as any}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 02. NETWORK SECTION */}
            <section className="py-24 px-4 md:px-8 bg-zinc-900/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12 justify-end text-right">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-black uppercase tracking-tight">{t('investasi.high_stakes_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">2+ Entities • Portfolio • Network Intelligence</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 order-1 md:order-2 self-end md:self-auto">
                            <BarChart3 className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl ml-auto">
                        {networkPlans.map((plan) => (
                            <div key={plan.id} className={`p-10 rounded-3xl border ${plan.highlight ? 'border-blue-500 bg-blue-500/5 shadow-2xl shadow-blue-500/5' : 'border-border/50 bg-[#111111]'} flex flex-col relative`}>
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-6 bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">ENTERPRISE HUB</div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase mb-1">{plan.name}</h3>
                                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-8 items-baseline flex gap-1">
                                    <span className="text-5xl font-black text-white">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className={`w-full h-16 font-black uppercase ${plan.highlight ? 'bg-blue-500 text-white hover:bg-white hover:text-black' : 'bg-white/10 text-white hover:bg-blue-500'}`}>
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
