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
            color: 'text-red-500',
            bg: 'from-red-500/10 to-transparent',
            cta: t('fip_lite_hub.card_cash_cta', 'Run Survival Scan'),
            href: '/cash-autopsy'
        },
        {
            id: 'margin-audit',
            title: t('fip_lite_hub.card_margin_title', 'Margin Audit'),
            desc: t('fip_lite_hub.card_margin_desc', 'Your team is busy, but profit is flat. Isolate your exact GP Leakage, labor inefficiency, and unrecorded operational waste.'),
            icon: Activity,
            color: 'text-amber-500',
            bg: 'from-amber-500/10 to-transparent',
            cta: t('fip_lite_hub.card_margin_cta', 'Run Efficiency Audit'),
            href: '/margin-audit'
        },
        {
            id: 'growth-scan',
            title: t('fip_lite_hub.card_growth_title', 'Scalability Scan'),
            desc: t('fip_lite_hub.card_growth_desc', 'You want to expand, but something feels off. Calculate your true contribution margin, dynamic break-even, and acquisition viability.'),
            icon: Zap,
            color: 'text-emerald-500',
            bg: 'from-emerald-500/10 to-transparent',
            cta: t('fip_lite_hub.card_growth_cta', 'Run Growth Scan'),
            href: '/growth-scan'
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <title>{t('fip_lite_hub.seo_title', 'Free Diagnostics | Gusti Devitto')}</title>
            <meta name="description" content={t('fip_lite_hub.seo_desc', 'Specialized free forensic diagnostics for your business operations.')} />

            <div className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.4),rgba(0,0,0,1)_70%)]" />
                
                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-4 backdrop-blur-md">
                            {t('fip_lite_hub.hero_badge', 'FIP™ Lite Triage')}
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            <Trans i18nKey="fip_lite_hub.hero_title">
                                Where is the <span className="text-white/40 italic">leak?</span>
                            </Trans>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl mx-auto font-light">
                            {t('fip_lite_hub.hero_subtitle', 'Standard calculators give you generic numbers. Our forensic triage analyzes your specific blindspots. Choose your focus area.')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                        {diagnostics.map((diag, i) => (
                            <motion.div
                                key={diag.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="group relative"
                            >
                                <Link to={diag.href} className="block h-full">
                                    <div className="h-full bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 p-8 flex flex-col relative overflow-hidden backdrop-blur-sm">
                                        
                                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${diag.bg} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
                                        
                                        <div className={`w-12 h-12 flex items-center justify-center bg-black border border-white/10 mb-8 z-10 ${diag.color}`}>
                                            <diag.icon className="w-6 h-6" strokeWidth={1.5} />
                                        </div>

                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-4 z-10 group-hover:text-white transition-colors duration-300">
                                            {diag.title}
                                        </h3>
                                        
                                        <p className="text-white/40 leading-relaxed mb-8 z-10 flex-grow font-light">
                                            {diag.desc}
                                        </p>

                                        <div className="z-10 mt-auto">
                                            <div className="flex items-center text-sm font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                                                {diag.cta}
                                                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                        
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-white/[0.01] border-t border-white/5 py-12 text-center mt-12">
                <div className="container mx-auto px-6">
                    <p className="text-[10px] uppercase font-mono tracking-widest text-white/30">
                        {t('global.nav_status', 'System: Operational')} // {t('fip_lite_hub.badge', 'Forensic Diagnostics')}
                    </p>
                </div>
            </div>
        </div>
    )
}
