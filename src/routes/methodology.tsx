import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/methodology')({
    component: MethodologyPage,
})

function MethodologyPage() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            <title>{t('methodology.seo_title')}</title>

            {/* Knowledge Graph Enrichment */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "DefinedTermSet",
                    "name": t('methodology.hero_title'),
                    "hasDefinedTerm": [
                        {
                            "@type": "DefinedTerm",
                            "name": t('methodology.phantom_cost_name'),
                            "description": t('methodology.schema_phantom_desc'),
                            "termCode": "GD-PC-01"
                        },
                        {
                            "@type": "DefinedTerm",
                            "name": t('methodology.upstream_forensics_name'),
                            "description": t('methodology.schema_upstream_desc'),
                            "termCode": "GD-UF-01"
                        }
                    ]
                })}
            </script>

            {/* ═══ HERO — Not centered. Left-driven headline. ═══ */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] min-h-[50vh] flex flex-col justify-end">
                <div className="max-w-5xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-px bg-[#82C7A8]/40" />
                        <p className="text-[10px] text-[#82C7A8]/60 font-semibold tracking-[0.3em] uppercase">
                            {t('methodology.hero_badge')}
                        </p>
                    </div>
                    <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight leading-[0.9] uppercase max-w-4xl">
                        {t('methodology.hero_title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl font-light">
                        {t('methodology.hero_subtitle')}
                    </p>
                </div>
            </section>

            {/* ═══ DEFINITION — Wide prose, no icon-in-circle ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                    {/* Left label — sticky */}
                    <div className="lg:sticky lg:top-28">
                        <span className="text-[#82C7A8] font-semibold text-xs tracking-widest uppercase">Definition</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 leading-tight">
                            {t('methodology.definition_title')}
                        </h2>
                    </div>

                    {/* Right — prose */}
                    <div className="text-white/60 text-lg leading-relaxed font-light">
                        <Trans i18nKey="methodology.definition_text">
                            Financial Forensics is a diagnostic discipline that combines operational data analysis, statistical patterns, and cash flow audits to detect <strong className="text-white">Phantom Costs</strong> (invisible leaks) and systemic inefficiencies. Unlike conventional audits, this discipline focuses not just on "what" happened in the past, but "why" leakage occurred and "how" to stop it in <em className="text-amber-500/80">real-time</em>.
                        </Trans>
                    </div>
                </div>
            </section>

            {/* ═══ VERDICT — Not identical cards. Staggered layout. ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] bg-[#161618]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-[#82C7A8] font-semibold text-xs tracking-widest uppercase">Verdict Protocol</span>
                        <div className="w-12 h-px bg-[#82C7A8]/20" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-20 max-w-xl">
                        {t('methodology.verdict_title')}
                    </h2>

                    <div className="space-y-16">
                        {/* Fortress — left-aligned, wide */}
                        <div className="max-w-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-green-400 font-bold text-xs uppercase tracking-widest">{t('methodology.verdict_fortress_title')}</span>
                            </div>
                            <p className="text-white/60 leading-relaxed">
                                {t('methodology.verdict_fortress_desc')}
                            </p>
                        </div>

                        {/* Vulnerable — right-aligned, narrower */}
                        <div className="max-w-md md:ml-auto">
                            <div className="flex items-center gap-3 mb-4 md:justify-end">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest">{t('methodology.verdict_vulnerable_title')}</span>
                            </div>
                            <p className="text-white/60 leading-relaxed md:text-right">
                                {t('methodology.verdict_vulnerable_desc')}
                            </p>
                        </div>

                        {/* Critical — left-aligned, with urgency */}
                        <div className="max-w-lg border-l-2 border-red-500/40 pl-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-red-400 font-bold text-xs uppercase tracking-widest">{t('methodology.verdict_critical_title')}</span>
                            </div>
                            <p className="text-white/60 leading-relaxed">
                                {t('methodology.verdict_critical_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ COMPARISON — Not identical cards. Asymmetric. ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-[#82C7A8] font-semibold text-xs tracking-widest uppercase">Comparison</span>
                        <div className="w-12 h-px bg-[#82C7A8]/20" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 max-w-xl">
                        {t('methodology.comparison_title')}
                    </h2>

                    {/* Table-like layout, not card grid */}
                    <div className="mt-16 space-y-0 divide-y divide-white/[0.06]">
                        {/* Row 1: Accounting */}
                        <div className="grid md:grid-cols-[200px_1fr_1fr] gap-4 md:gap-8 py-8 items-start">
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">{t('methodology.accounting.title')}</h3>
                            <p className="text-sm text-white/60 leading-relaxed">{t('methodology.accounting.desc')}</p>
                            <div className="text-xs text-white/40 italic space-y-1">
                                <p>{t('methodology.accounting.f1')}</p>
                                <p>{t('methodology.accounting.f2')}</p>
                                <p>{t('methodology.accounting.f3')}</p>
                            </div>
                        </div>

                        {/* Row 2: Forensics — highlighted */}
                        <div className="grid md:grid-cols-[200px_1fr_1fr] gap-4 md:gap-8 py-8 items-start glass-blue -mx-4 px-4 md:-mx-8 md:px-8 border-l-2 border-[#0A84FF]/30">
                            <h3 className="text-sm font-bold text-[#0A84FF] uppercase tracking-widest">{t('methodology.forensics.title')}</h3>
                            <p className="text-sm text-white/60 leading-relaxed font-medium">{t('methodology.forensics.desc')}</p>
                            <div className="text-xs text-[#0A84FF]/60 italic space-y-1 font-medium">
                                <p>{t('methodology.forensics.f1')}</p>
                                <p>{t('methodology.forensics.f2')}</p>
                                <p>{t('methodology.forensics.f3')}</p>
                            </div>
                        </div>

                        {/* Row 3: Consulting */}
                        <div className="grid md:grid-cols-[200px_1fr_1fr] gap-4 md:gap-8 py-8 items-start">
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">{t('methodology.consulting.title')}</h3>
                            <p className="text-sm text-white/60 leading-relaxed">{t('methodology.consulting.desc')}</p>
                            <div className="text-xs text-white/40 italic space-y-1">
                                <p>{t('methodology.consulting.f1')}</p>
                                <p>{t('methodology.consulting.f2')}</p>
                                <p>{t('methodology.consulting.f3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ LOOP — Not numbered circles. Horizontal flow. ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] bg-[#161618]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[#82C7A8] font-semibold text-xs tracking-widest uppercase">Process</span>
                        <div className="w-12 h-px bg-[#82C7A8]/20" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        {t('methodology.loop_title')}
                    </h2>
                    <p className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-20">
                        {t('methodology.loop_subtitle')}
                    </p>

                    {/* Horizontal progression — not card grid */}
                    <div className="relative">
                        {/* Connecting line */}
                        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-[#0A84FF]/20 via-[#0A84FF]/10 to-[#0A84FF]/20 hidden md:block" />

                        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                            <div className="relative">
                                <div className="text-[#0A84FF] font-semibold text-sm tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#0A84FF] relative z-10" />
                                    01
                                </div>
                                <h3 className="text-lg font-bold text-white/90 mb-3">{t('methodology.loop_stage1_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('methodology.loop_stage1_desc')}</p>
                            </div>

                            <div className="relative">
                                <div className="text-[#0A84FF] font-semibold text-sm tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#0A84FF] relative z-10" />
                                    02
                                </div>
                                <h3 className="text-lg font-bold text-white/90 mb-3">{t('methodology.loop_stage2_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('methodology.loop_stage2_desc')}</p>
                            </div>

                            <div className="relative">
                                <div className="text-[#0A84FF] font-semibold text-sm tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#0A84FF] relative z-10" />
                                    03
                                </div>
                                <h3 className="text-lg font-bold text-white/90 mb-3">{t('methodology.loop_stage3_title')}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{t('methodology.loop_stage3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ ATTRIBUTION — Not a centered card ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                            {t('attribution.title')}
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed font-light italic max-w-xl">
                            {t('attribution.text')}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild>
                                <Link to="/forensics-pillars">{t('methodology.cta_pillars')}</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/master-index">{t('methodology.cta_index')}</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="shrink-0 hidden md:block">
                        <div className="text-[9px] font-medium text-white/40 uppercase tracking-[0.4em] space-y-1 text-right">
                            <p>FIP™ PROTOCOL V4.00</p>
                            <p>© 2026 GUSTI DEVITTO</p>
                            <p>ALL RIGHTS RESERVED</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
