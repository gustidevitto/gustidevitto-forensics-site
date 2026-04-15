import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import pillarsData from '@/data/pillarsData.json'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/master-index')({
    component: MasterIndex,
})

function MasterIndex() {
    const { t } = useTranslation()
    const sortedPillars = [...pillarsData].sort((a, b) => a.title.localeCompare(b.title))

    const coreConcepts = [
        { name: t('master_index.concepts.phantom_cost_name'), desc: t('master_index.concepts.phantom_cost') },
        { name: t('master_index.concepts.cash_velocity_name'), desc: t('master_index.concepts.cash_velocity') },
        { name: t('master_index.concepts.risk_exposure_name'), desc: t('master_index.concepts.risk_exposure') },
        { name: t('master_index.concepts.burn_rate_name'), desc: t('master_index.concepts.burn_rate') }
    ]

    const narrativePatterns = [
        { name: t('master_index.narratives.efficient_suicide_name'), desc: t('master_index.narratives.efficient_suicide') },
        { name: t('master_index.narratives.obese_growth_name'), desc: t('master_index.narratives.obese_growth') },
        { name: t('master_index.narratives.labor_trap_name'), desc: t('master_index.narratives.labor_trap') }
    ]

    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            <title>{t('master_index.seo_title')}</title>

            {/* ═══ HERO — Reference visual + left text ═══ */}
            <section className="relative border-b border-white/[0.05] overflow-hidden">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] items-stretch">
                    {/* Left — Title */}
                    <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-8 h-px bg-[#BFA26A]/40" />
                            <p className="text-[10px] text-[#BFA26A]/60 font-semibold tracking-[0.3em] uppercase">
                                {t('master_index.hero_badge')}
                            </p>
                        </div>
                        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[0.9] uppercase">
                            <Trans i18nKey="master_index.hero_title">Financial Forensics <br />Framework</Trans>
                        </h1>
                        <p className="text-white/40 text-base leading-relaxed max-w-md font-light">
                            by <Link to="/about-gusti-devitto" className="text-[#BFA26A] hover:text-white transition-colors font-semibold">{t('master_index.by_author')}</Link>
                        </p>
                        <p className="text-white/30 text-base leading-relaxed max-w-md font-light">
                            {t('master_index.hero_subtitle')}
                        </p>
                    </div>

                    {/* Right — Framework image */}
                    <div className="relative min-h-[200px] lg:min-h-0 border-l border-white/[0.04]">
                        <img
                            src="/assets/images/ffd.png"
                            alt="FIP™ Framework Visual"
                            className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale-[0.5]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1e] via-[#1c1c1e]/40 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ═══ PILLAR INDEX — Table rows, not grid cards ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-[#BFA26A] font-semibold text-xs tracking-widest uppercase">Pillar Index</span>
                        <div className="w-12 h-px bg-[#BFA26A]/20" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-12">{t('master_index.pillars_title')}</h2>

                    <div className="divide-y divide-white/[0.04]">
                        {sortedPillars.map((pillar) => (
                            <Link
                                key={pillar.id}
                                to="/pilar/$slug"
                                params={{ slug: pillar.id }}
                                className="group flex items-center gap-6 py-4 hover:glass -mx-4 px-4 rounded-squircle-sm transition-all duration-200"
                            >
                                <span className="text-white/70 font-semibold group-hover:text-white transition-colors flex-1 truncate">
                                    {t(`pillars.${pillar.id}.title`)}
                                </span>
                                <span className="text-xs text-white/20 hidden md:block truncate max-w-xs">
                                    {t(`pillars.${pillar.id}.layer1`)}
                                </span>
                                <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-[#0A84FF] group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={2} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CORE CONCEPTS — Not a 2x2 card grid ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] bg-[#161618]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-[#BFA26A] font-semibold text-xs tracking-widest uppercase">Core Concepts</span>
                        <div className="w-12 h-px bg-[#BFA26A]/20" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-16">{t('master_index.concepts_title')}</h2>

                    <div className="space-y-12">
                        {coreConcepts.map((concept, i) => (
                            <div key={concept.name} className={`grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 ${i % 2 !== 0 ? 'md:ml-24' : ''}`}>
                                <h3 className="text-sm font-semibold text-[#BFA26A]/70 uppercase tracking-wider">{concept.name}</h3>
                                <p className="text-white/40 leading-relaxed font-light">{concept.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ NARRATIVE PATTERNS — Not identical bordered cards ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-red-400 font-semibold text-xs tracking-widest uppercase">Warning Patterns</span>
                        <div className="w-12 h-px bg-red-500/20" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-16">{t('master_index.narrative_title')}</h2>

                    <div className="space-y-16">
                        {narrativePatterns.map((pattern, i) => (
                            <div key={pattern.name} className={`max-w-xl ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                                <div className={`flex items-center gap-3 mb-4 ${i % 2 !== 0 ? 'md:justify-end' : ''}`}>
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <h3 className="text-base font-bold text-red-400">{pattern.name}</h3>
                                </div>
                                <p className={`text-white/40 leading-relaxed ${i % 2 !== 0 ? 'md:text-right' : ''}`}>{pattern.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER CTA ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">{t('master_index.footer_title')}</h2>
                        <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl">
                            {t('master_index.footer_desc')}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild>
                                <Link to="/fip-lite">{t('master_index.cta_pcc')}</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/investasi">{t('master_index.cta_investasi')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
