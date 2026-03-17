import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import pillarsData from '@/data/pillarsData.json'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/forensics-pillars')({
    component: ForensicsPillars,
})

function ForensicsPillars() {
    const { t } = useTranslation()

    return (
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative">
            <title>{t('pillars_page.seo_title')}</title>
            <meta name="description" content={t('pillars_page.seo_desc')} />

            {/* JSON-LD DefinedTermSet Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "DefinedTermSet",
                    "@id": "https://www.gustidevitto.com/#methodology",
                    "name": t('pillars_page.title'),
                    "creator": { "@id": "https://www.gustidevitto.com/#person" },
                    "hasDefinedTerm": pillarsData.map((p, i) => ({
                        "@type": "DefinedTerm",
                        "name": t(`pillars.${p.id}.title`),
                        "description": t(`pillars.${p.id}.definition`),
                        "termCode": `PILLAR-${(i + 1).toString().padStart(2, '0')}`
                    }))
                })}
            </script>

            {/* ═══ HERO — Left-anchored, not centered ═══ */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] min-h-[50vh] flex flex-col justify-end">
                <div className="max-w-5xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-px bg-amber-400/60" />
                        <p className="text-[10px] text-white/30 font-medium tracking-[0.3em] uppercase">
                            {t('pillars_page.badge')}
                        </p>
                    </div>
                    <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-[0.9] uppercase max-w-4xl">
                        {t('pillars_page.title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-white/40 max-w-2xl font-light leading-relaxed">
                        {t('pillars_page.subtitle')}
                    </p>
                </div>
            </section>

            {/* ═══ FIP™ Protocol Context — Asymmetric, not centered card ═══ */}
            <section className="relative border-b border-white/[0.05] overflow-hidden">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] items-stretch">
                    {/* Left — The claim */}
                    <div className="py-20 px-6 md:px-12 lg:px-20 space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em]">
                                {t('pillars_page.implementation_badge')}
                            </span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter leading-tight">
                            <Trans i18nKey="pillars_page.mri_title">
                                Integrated MRI: <br />
                                <span className="text-amber-500 text-4xl">FIP™ Digital Mirror</span>
                            </Trans>
                        </h2>
                        <p className="text-white/40 leading-relaxed font-light">
                            <Trans i18nKey="pillars_page.mri_desc">
                                 Ke-25 pilar di bawah ini bukan sekadar teori. Semuanya terintegrasi ke dalam <strong className="text-white/70">FIP™ Protocol Interface</strong> — sebuah mesin diagnosis yang memetakan kesehatan finansial Anda secara real-time.
                            </Trans>
                        </p>
                        <Button asChild className="h-auto py-4 px-8 bg-amber-500 text-black hover:bg-white rounded-none font-bold uppercase tracking-widest text-xs transition-colors">
                            <Link to="/fip-lite">{t('pillars_page.demo_btn')}</Link>
                        </Button>
                    </div>

                    {/* Right — Dashboard bleeds */}
                    <div className="relative min-h-[300px] lg:min-h-0 border-l border-white/[0.04]">
                        <img
                            src="/assets/images/ffd1.png"
                            alt="FIP™ Protocol Interface"
                            className="absolute inset-0 w-full h-full object-cover object-left opacity-40 grayscale-[0.3] contrast-[1.1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#060a12] via-[#060a12]/30 to-transparent" />
                        <div className="absolute bottom-6 right-6 text-right">
                            <p className="text-[10px] font-mono text-amber-500/50 uppercase tracking-[0.2em]">{t('about_page.auth_level')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PILLAR INDEX — Not identical rounded cards. Table-like rows. ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">Index</span>
                        <div className="w-12 h-[1px] bg-amber-500/30" />
                    </div>

                    <div className="divide-y divide-white/[0.04]">
                        {pillarsData.map((pillar, index) => (
                            <Link
                                key={pillar.id}
                                to="/pilar/$slug"
                                params={{ slug: pillar.id }}
                                className="group flex items-start md:items-center gap-4 md:gap-8 py-6 md:py-8 hover:bg-white/[0.01] -mx-4 px-4 transition-colors"
                            >
                                {/* Number */}
                                <span className="text-amber-500/30 font-mono text-xs tracking-widest shrink-0 w-8 mt-1 md:mt-0 group-hover:text-amber-500 transition-colors">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>

                                {/* Title + Layer1 */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-bold text-white/80 group-hover:text-white transition-colors truncate">
                                        {t(`pillars.${pillar.id}.title`)}
                                    </h3>
                                    <p className="text-xs text-white/30 mt-1 truncate">
                                        {t(`pillars.${pillar.id}.layer1`)}
                                    </p>
                                </div>

                                {/* Definition — hidden on mobile */}
                                <p className="hidden lg:block text-sm text-white/25 max-w-xs truncate shrink-0 group-hover:text-white/40 transition-colors">
                                    {t(`pillars.${pillar.id}.definition`)}
                                </p>

                                {/* Arrow */}
                                <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA — Not centered card with rounded corners ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#03060a] border-t border-white/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                            {t('pillars_page.cta_title')}
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed font-light italic max-w-xl">
                            {t('pillars_page.cta_quote')}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild className="h-auto py-4 px-8 bg-amber-500 text-black hover:bg-white rounded-none font-bold uppercase tracking-widest text-xs transition-colors">
                                <Link to="/fip-lite">{t('pillars_page.cta_pcc')}</Link>
                            </Button>
                            <Button asChild variant="outline" className="h-auto py-4 px-8 border-white/10 text-white/60 hover:text-white hover:border-white rounded-none font-bold uppercase tracking-widest text-xs transition-colors">
                                <Link to="/contact">{t('pillars_page.cta_consult')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
