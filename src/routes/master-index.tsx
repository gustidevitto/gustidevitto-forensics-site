import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { BookOpen, Layers, ShieldAlert, Target } from "lucide-react"
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
        <div className="container py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-24">
            <title>{t('master_index.seo_title')}</title>

            {/* Hero */}
            <header className="text-center space-y-8 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-[3rem] blur-2xl opacity-50"></div>
                <div className="relative mx-auto max-w-2xl h-48 rounded-2xl overflow-hidden border border-border shadow-xl mb-8">
                    <img
                        src="/assets/images/ffd.png"
                        alt="FIP™ Framework Visual"
                        className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                </div>
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-4 h-4" /> {t('master_index.hero_badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
                        <Trans i18nKey="master_index.hero_title">Financial Forensics <br /> Framework</Trans> <br />
                        <Link to="/about-gusti-devitto" className="text-primary hover:underline">{t('master_index.by_author')}</Link>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('master_index.hero_subtitle')}
                    </p>
                </div>
            </header>

            {/* Pillar Index */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Layers className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">{t('master_index.pillars_title')}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sortedPillars.map((pillar) => (
                        <Link
                            key={pillar.id}
                            to="/pilar/$slug"
                            params={{ slug: pillar.id }}
                            className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all group"
                        >
                            <span className="font-bold group-hover:text-primary transition-colors">{t(`pillars.${pillar.id}.title`)}</span>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{t(`pillars.${pillar.id}.layer1`)}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Core Concepts */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Target className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">{t('master_index.concepts_title')}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {coreConcepts.map((concept) => (
                        <div key={concept.name} className="p-6 rounded-2xl bg-muted/30 border">
                            <h3 className="text-lg font-bold mb-2">{concept.name}</h3>
                            <p className="text-muted-foreground text-sm">{concept.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cross-Narrative Patterns */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                    <ShieldAlert className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">{t('master_index.narrative_title')}</h2>
                </div>
                <div className="grid md:grid-cols-1 gap-4">
                    {narrativePatterns.map((pattern) => (
                        <div key={pattern.name} className="p-6 rounded-2xl bg-card border border-destructive/20 hover:border-destructive/40 transition-colors">
                            <h3 className="text-lg font-bold text-destructive mb-1">{pattern.name}</h3>
                            <p className="text-muted-foreground text-sm">{pattern.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="pt-16 border-t">
                <div className="bg-primary/5 rounded-[2rem] p-8 md:p-12 text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold">{t('master_index.footer_title')}</h2>
                    <p className="text-muted-foreground">
                        {t('master_index.footer_desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="h-12 px-8 font-bold">
                            <Link to="/fip-lite">{t('master_index.cta_pcc')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 font-bold">
                            <Link to="/investasi">{t('master_index.cta_investasi')}</Link>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
