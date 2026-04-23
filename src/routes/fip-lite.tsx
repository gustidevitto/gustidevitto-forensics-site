import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Zap, Activity, ShieldAlert, ArrowRight } from 'lucide-react'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/fip-lite')({
    component: FipLiteHub,
})

function FipLiteHub() {
    const { t } = useTranslation()

    const diagnostics = [
        {
            id: 'cash-autopsy',
            title: t('fip_lite_hub.card_cash_title', 'Cash Autopsy'),
            desc: t('fip_lite_hub.card_cash_desc', 'Revenue looks good, but the bank account is empty. Find your actual runway, burn rate, and calculate immediate insolvency risk.'),
            icon: ShieldAlert,
            accentClass: 'text-red-400',
            glassTint: 'bg-red-500/[0.06]',
            borderTint: 'border-red-500/[0.12]',
            cta: t('fip_lite_hub.card_cash_cta', 'Run Survival Scan'),
            href: '/cash-autopsy'
        },
        {
            id: 'margin-audit',
            title: t('fip_lite_hub.card_margin_title', 'Margin Audit'),
            desc: t('fip_lite_hub.card_margin_desc', 'Your team is busy, but profit is flat. Isolate your exact GP Leakage, labor inefficiency, and unrecorded operational waste.'),
            icon: Activity,
            accentClass: 'text-[#AF52DE]',
            glassTint: 'bg-[#AF52DE]/[0.05]',
            borderTint: 'border-[#AF52DE]/[0.12]',
            cta: t('fip_lite_hub.card_margin_cta', 'Run Efficiency Audit'),
            href: '/margin-audit'
        },
        {
            id: 'growth-scan',
            title: t('fip_lite_hub.card_growth_title', 'Scalability Scan'),
            desc: t('fip_lite_hub.card_growth_desc', 'You want to expand, but something feels off. Calculate your true contribution margin, dynamic break-even, and acquisition viability.'),
            icon: Zap,
            accentClass: 'text-[#0A84FF]',
            glassTint: 'bg-[#0A84FF]/[0.05]',
            borderTint: 'border-[#0A84FF]/[0.12]',
            cta: t('fip_lite_hub.card_growth_cta', 'Run Growth Scan'),
            href: '/growth-scan'
        }
    ]

    return (
        <div className="min-h-screen bg-[#1c1c1e] text-white font-sans selection:bg-[#0A84FF]/20">
            <title>{t('fip_lite_hub.seo_title', 'Free Diagnostics | Gusti Devitto')}</title>
            <meta name="description" content={t('fip_lite_hub.seo_desc', 'Specialized free forensic diagnostics for your business operations.')} />

            <div className="relative pt-32 pb-24 overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0A84FF]/[0.05] rounded-full blur-[160px] animate-subtle-glow" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center space-y-5"
                    >
                        {/* Glass pill badge */}
                        <div className="inline-flex items-center px-3 py-1.5 glass rounded-squircle-sm text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
                            {t('fip_lite_hub.hero_badge', 'FIP™ Lite Triage')}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9]">
                            <Trans i18nKey="fip_lite_hub.hero_title">
                                Where is the <span className="text-white/40 italic">leak?</span>
                            </Trans>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-3xl mx-auto font-light">
                            {t('fip_lite_hub.hero_subtitle', 'Standard calculators give you generic numbers. Our forensic triage analyzes your specific blindspots. Choose your focus area.')}
                        </p>
                    </motion.div>

                    {/* Diagnostic cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
                        {diagnostics.map((diag, i) => (
                            <motion.div
                                key={diag.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="group"
                            >
                                <Link to={diag.href} className="block h-full">
                                    <div className={`h-full glass rounded-squircle-xl p-7 flex flex-col relative overflow-hidden hover:glass-elevated transition-all duration-300 group-hover:scale-[1.01] border ${diag.borderTint}`}>

                                        {/* Subtle tinted corner */}
                                        <div className={`absolute top-0 right-0 w-48 h-48 ${diag.glassTint} rounded-full blur-2xl pointer-events-none`} />

                                        {/* Icon — squircle container */}
                                        <div className={`w-11 h-11 flex items-center justify-center glass rounded-squircle-sm mb-7 z-10 border ${diag.borderTint}`}>
                                            <diag.icon className={`w-5 h-5 ${diag.accentClass}`} strokeWidth={1.5} />
                                        </div>

                                        <h3 className={`text-xl font-bold uppercase tracking-tight mb-3 z-10 ${diag.accentClass}`}>
                                            {diag.title}
                                        </h3>

                                        <p className="text-white/40 leading-relaxed mb-8 z-10 flex-grow font-light text-sm">
                                            {diag.desc}
                                        </p>

                                        <div className="z-10 mt-auto">
                                            <div className={`flex items-center text-sm font-semibold uppercase tracking-widest ${diag.accentClass} opacity-60 group-hover:opacity-100 transition-opacity`}>
                                                {diag.cta}
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.015] border-t border-white/[0.05] py-10 text-center mt-8">
                <div className="container mx-auto px-6">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                        {t('global.nav_status', 'System: Operational')} · {t('fip_lite_hub.badge', 'Forensic Diagnostics')}
                    </p>
                </div>
            </div>
        </div>
    )
}
