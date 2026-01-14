import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Scale, Microscope, Search } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/methodology')({
    component: MethodologyPage,
})

function MethodologyPage() {
    const { t } = useTranslation()
    return (
        <div className="container py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-24">
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

            {/* Title */}
            <header className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Microscope className="w-4 h-4" /> {t('methodology.hero_badge')}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('methodology.hero_title')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('methodology.hero_subtitle')}
                </p>
            </header>

            {/* Definition */}
            <section className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Search className="w-5 h-5" /></div>
                    {t('methodology.definition_title')}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    <Trans i18nKey="methodology.definition_text">
                        Financial Forensics is a diagnostic discipline that combines operational data analysis, statistical patterns, and cash flow audits to detect <strong className="text-foreground">Phantom Costs</strong> (invisible leaks) and systemic inefficiencies. Unlike conventional audits, this discipline focuses not just on "what" happened in the past, but "why" leakage occurred and "how" to stop it in <em>real-time</em>.
                    </Trans>
                </p>
            </section>

            {/* Comparison Table */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Scale className="w-5 h-5" /></div>
                    {t('methodology.comparison_title')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
                        <h3 className="font-bold text-xl">{t('methodology.accounting.title')}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t('methodology.accounting.desc')}</p>
                        <ul className="text-xs space-y-2 text-muted-foreground border-t pt-4 italic">
                            <li>{t('methodology.accounting.f1')}</li>
                            <li>{t('methodology.accounting.f2')}</li>
                            <li>{t('methodology.accounting.f3')}</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-4 shadow-lg scale-105">
                        <h3 className="font-bold text-xl text-primary">{t('methodology.forensics.title')}</h3>
                        <p className="text-sm text-foreground leading-relaxed">{t('methodology.forensics.desc')}</p>
                        <ul className="text-xs space-y-2 text-primary font-medium border-t border-primary/20 pt-4 italic">
                            <li>{t('methodology.forensics.f1')}</li>
                            <li>{t('methodology.forensics.f2')}</li>
                            <li>{t('methodology.forensics.f3')}</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
                        <h3 className="font-bold text-xl">{t('methodology.consulting.title')}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t('methodology.consulting.desc')}</p>
                        <ul className="text-xs space-y-2 text-muted-foreground border-t pt-4 italic">
                            <li>{t('methodology.consulting.f1')}</li>
                            <li>{t('methodology.consulting.f2')}</li>
                            <li>{t('methodology.consulting.f3')}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-muted/80 rounded-[2.5rem] p-10 md:p-16 border text-center space-y-6">
                <ShieldCheck className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-2xl font-bold">{t('attribution.title')}</h2>
                <p className="text-lg text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
                    {t('attribution.text')}
                </p>
                <div className="pt-4 flex justify-center gap-4">
                    <Button asChild variant="outline">
                        <Link to="/forensics-pillars">{t('methodology.cta_pillars')}</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/master-index">{t('methodology.cta_index')}</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
