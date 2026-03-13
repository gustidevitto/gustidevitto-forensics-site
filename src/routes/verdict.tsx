import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/verdict')({
    component: VerdictPage,
})

function VerdictPage() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative">
            <title>{t('verdict_page.seo_title')}</title>

            {/* ═══ HERO ═══ */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-5xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-px bg-amber-400/60" />
                        <p className="text-[10px] text-white/30 font-medium tracking-[0.3em] uppercase">
                            {t('verdict_page.hero_badge')}
                        </p>
                    </div>
                    <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] uppercase">
                        {t('verdict_page.hero_title')}
                    </h1>
                    <p className="mt-6 text-lg text-white/40 max-w-xl font-light leading-relaxed">
                        {t('verdict_page.hero_subtitle')}
                    </p>
                </div>
            </section>

            {/* ═══ Dimensions — Staggered, not identical cards ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto space-y-24">

                    {/* Dimension A: Oksigen — Left */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="text-yellow-500 font-mono text-xs tracking-widest uppercase">{t('verdict_page.dim_a_title')}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_a_runway_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_a_runway_desc')}</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_a_burn_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_a_burn_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Dimension B: Penyakit — Right */}
                    <div className="max-w-2xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-red-500 font-mono text-xs tracking-widest uppercase">{t('verdict_page.dim_b_title')}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div className="md:text-right">
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_b_leakage_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_b_leakage_desc')}</p>
                            </div>
                            <div className="md:text-right">
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_b_ratio_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_b_ratio_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Dimension C: Masa Depan — Left, with border emphasis */}
                    <div className="max-w-2xl border-l-2 border-green-500/30 pl-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-green-500 font-mono text-xs tracking-widest uppercase">{t('verdict_page.dim_c_title')}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_c_ltgp_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_c_ltgp_desc')}</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white/90 mb-2">{t('verdict_page.dim_c_bep_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('verdict_page.dim_c_bep_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Disclaimer ═══ */}
            <section className="py-12 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] bg-[#03060a]">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm text-white/30 leading-relaxed italic">
                        <strong className="text-white/50 not-italic">{t('verdict_page.disclaimer_title')}</strong> {t('verdict_page.disclaimer_text')}
                    </p>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-5xl">
                    <Button asChild className="h-auto py-6 px-10 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none group">
                        <Link to="/fip-lite" className="flex flex-col items-start">
                            <span className="flex items-center text-xl font-black">
                                {t('verdict_page.cta_verdict')}
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">
                                Free Diagnostic Available
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
