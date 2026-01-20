import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Globe, Lock, Cpu, BarChart3, Building2, Briefcase } from "lucide-react"
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
            id: "starter",
            name: t('pricing.starter_title'),
            badge: t('pricing.starter_badge'),
            price: t('investasi.price_starter'),
            period: t('investasi.per_starter'),
            desc: t('investasi.sme_starter_desc'),
            features: [
                t('pricing.feature_starter_1'),
                t('pricing.feature_starter_2'),
                t('investasi.sme_f3'),
                t('investasi.sme_f4')
            ],
            cta: t('pricing.cta_starter'),
            link: "/fip-lite"
        },
        {
            id: "growth",
            name: t('pricing.growth_title'),
            badge: t('pricing.popular'),
            price: t('investasi.price_growth'),
            period: t('investasi.per_growth'),
            desc: t('investasi.sme_growth_desc'),
            features: [
                t('pricing.feature_everything_starter'),
                t('pricing.feature_checkins'),
                t('pricing.feature_strategy'),
                t('pricing.feature_simulation'),
                t('investasi.sme_growth_f5')
            ],
            cta: t('pricing.cta_growth'),
            link: "/fip-lite",
            highlight: true
        },
        {
            id: "scale",
            name: t('pricing.scale_title'),
            badge: t('pricing.scale_badge'),
            price: t('investasi.price_scale'),
            period: t('investasi.per_scale'),
            desc: t('investasi.sme_scale_desc'),
            features: [
                t('pricing.feature_everything_growth'),
                t('pricing.feature_pulse'),
                t('pricing.feature_neural'),
                t('pricing.feature_priority'),
                t('investasi.sme_scale_f5')
            ],
            cta: t('pricing.cta_scale'),
            link: "/fip-lite"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <title>{t('investasi.seo_title')}</title>
            <meta name="description" content={t('investasi.seo_desc')} />

            {/* SEO/GEO Advanced Schema */}
            <script type="application/ld+json">
                {JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Financial Forensics Audit",
                        "serviceType": t('investasi.schema_price_name'),
                        "description": t('investasi.schema_price_desc'),
                        "provider": {
                            "@id": "https://www.gustidevitto.com/#organization"
                        },
                        "offers": [
                            { "@type": "Offer", "name": t('pricing.starter_title'), "price": "15000000", "priceCurrency": "IDR" },
                            { "@type": "Offer", "name": t('pricing.growth_title'), "price": "12000000", "priceCurrency": "IDR" },
                            { "@type": "Offer", "name": t('pricing.scale_title'), "price": "150000000", "priceCurrency": "IDR" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": t('nav.home'),
                                "item": "https://www.gustidevitto.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": t('nav.pricing'),
                                "item": "https://www.gustidevitto.com/investasi"
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": t('investasi.faq_q1'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('investasi.faq_a1')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('investasi.faq_q2'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('investasi.faq_a2')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('investasi.faq_q3'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('investasi.faq_a3')
                                }
                            }
                        ]
                    }
                ])}
            </script>

            {/* Hero Header */}
            <section className="pt-20 pb-12 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
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
            <section className="py-24 px-4 md:px-8 bg-muted/5 relative">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                            <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">{t('investasi.sme_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">{t('investasi.sme_subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {smePlans.map((plan) => (
                            <div key={plan.id} className={`p-8 rounded-3xl border ${plan.highlight ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-2xl shadow-primary/5' : 'border-border/50 bg-[#111111]'} flex flex-col relative group transition-all`}>
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-6 bg-[#FF0080] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{t('pricing.popular')}</div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase mb-1">{plan.name}</h3>
                                    <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-8 items-baseline flex gap-1">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed italic border-l-2 border-primary/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className={`w-full h-14 font-black uppercase text-sm ${plan.highlight ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-primary hover:text-black'}`}>
                                    <Link to={plan.link as any}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HYBRID EVOLUTION SECTION */}
            <HowFIPWorks />

            {/* 02. HIGH-STAKES SECTION */}
            <section className="py-24 px-4 md:px-8 border-y border-white/5 relative bg-[#0a0a0a]">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-4 mb-16 justify-center md:justify-start text-center md:text-left">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                            <BarChart3 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">{t('investasi.high_stakes_title')}</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">{t('investasi.high_stakes_subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
                        {/* Enterprise Tier */}
                        <div className="p-10 rounded-[2.5rem] border-2 border-primary bg-[#121212] flex flex-col relative shadow-[0_0_50px_rgba(255,215,0,0.1)] ring-1 ring-primary/20 group">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl whitespace-nowrap z-30 border border-black/10">{t('investasi.enterprise_badge')}</div>

                            <div className="mb-10 mt-6 relative z-10">
                                <Building2 className="w-12 h-12 text-primary mb-4 opacity-70" />
                                <h3 className="text-4xl font-black uppercase mb-1 text-primary tracking-tighter">{t('pricing.enterprise_title')}</h3>
                                <p className="text-xs text-primary/80 font-bold tracking-[0.3em] uppercase">{t('investasi.enterprise_desc')}</p>
                            </div>

                            <div className="mb-12 relative z-10">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-6xl font-black text-white">{t('investasi.price_enterprise')}</p>
                                    <span className="text-[#FF0080] font-black text-xs animate-pulse">{t('investasi.enterprise_auth')}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 uppercase font-bold tracking-widest bg-white/5 w-fit px-2 py-1 rounded">{t('pricing.per_audit')}</p>
                                <p className="text-xs text-primary/60 mt-4 italic max-w-xs leading-relaxed border-l border-primary/30 pl-3">
                                    "{t('investasi.enterprise_comparator')}"
                                </p>
                            </div>

                            <ul className="space-y-6 mb-16 flex-1 relative z-10">
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_ma')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_revenue')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_neural_scan')}</span>
                                </li>
                            </ul>

                            <Button asChild className="w-full bg-primary text-black font-black hover:bg-white h-20 text-xl shadow-[0_15px_30px_rgba(255,215,0,0.3)] relative z-10 uppercase italic">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">{t('investasi.enterprise_cta')}</a>
                            </Button>
                        </div>

                        {/* Franchise Tier */}
                        <div className="p-10 rounded-3xl border border-white/10 bg-muted/5 flex flex-col relative hover:border-primary/30 transition-all group">
                            <div className="mb-10">
                                <Briefcase className="w-12 h-12 text-white/40 mb-4" />
                                <h3 className="text-4xl font-black uppercase mb-1 text-white tracking-tighter">{t('pricing.franchise_title')}</h3>
                                <p className="text-xs text-primary font-bold tracking-[0.3em] uppercase">{t('investasi.franchise_subtitle')}</p>
                            </div>

                            <div className="mb-12">
                                <p className="text-5xl font-black text-white">{t('investasi.custom')}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2 border border-white/10 w-fit px-2 py-1">{t('pricing.annual_license')}</p>
                            </div>

                            <ul className="space-y-6 mb-16 flex-1">
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>{t('pricing.feature_multi_outlet')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>{t('pricing.feature_fraud')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>{t('pricing.feature_royalty')}</span>
                                </li>
                            </ul>

                            <Button asChild variant="outline" className="w-full h-16 border-primary/50 text-white font-black hover:bg-primary hover:text-black uppercase">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">{t('investasi.franchise_cta')}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Compliance Footer */}
            <section className="py-20 px-4 md:px-8 bg-[#050505]">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <Globe className="w-12 h-12 text-primary/40 mx-auto" />
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-black">{t('investasi.attribution_title')}</p>
                        <p className="text-lg md:text-xl text-gray-400 font-serif italic selection:bg-primary selection:text-black">
                            {t('investasi.attribution_text')}
                        </p>
                    </div>
                    <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="rounded-full bg-primary text-black font-black px-10">
                            <Link to="/fip-lite">{t('investasi.cta_start')}</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 text-white font-bold px-10">
                            <Link to="/methodology">{t('investasi.cta_methodology')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer Attribution */}
            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-muted-foreground/50 uppercase tracking-[0.5em]">
                {t('investasi.footer_rights', { year: currentYear })}
            </footer>
        </div>
    )
}

