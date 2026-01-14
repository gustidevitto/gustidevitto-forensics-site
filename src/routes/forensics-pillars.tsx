import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Microscope } from 'lucide-react'
import pillarsData from '@/data/pillarsData.json'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/forensics-pillars')({
    component: ForensicsPillars,
})

function ForensicsPillars() {
    const { t } = useTranslation()

    return (
        <div className="container py-12 md:py-20 max-w-7xl mx-auto px-4">
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
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase">
                    {t('pillars_page.badge')}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                    {t('pillars_page.title')}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {t('pillars_page.subtitle')}
                </p>
            </div>

            {/* FFD™ v3 Visual Context */}
            <div className="mb-20">
                <div className="relative rounded-[2rem] border border-primary/20 bg-muted/30 overflow-hidden shadow-2xl group">
                    <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                {t('pillars_page.implementation_badge')}
                            </div>
                            <h2 className="text-3xl font-black tracking-tight leading-tight">
                                <Trans i18nKey="pillars_page.mri_title">
                                    Integrated MRI: <br />
                                    <span className="text-primary text-4xl">FFD™ v3 Digital Mirror</span>
                                </Trans>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                <Trans i18nKey="pillars_page.mri_desc">
                                    Ke-15 pilar di bawah ini bukan sekadar teori. Semuanya terintegrasi ke dalam <strong className="text-foreground">FFD™ v3 Dashboard</strong> — sebuah mesin diagnosis yang memetakan kesehatan finansial Anda secara real-time.
                                </Trans>
                            </p>
                            <div className="pt-2">
                                <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/5 h-12 px-6 font-bold">
                                    <Link to="/get-access">{t('pillars_page.demo_btn')}</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
                            <div className="relative rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                <img
                                    src="/assets/images/ffd1.png"
                                    alt="FFD™ v3 Interface"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <p className="absolute bottom-4 left-4 text-[10px] font-mono text-white/70 uppercase tracking-widest">
                                    Auth Level: L-7 // Visual Matrix
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillarsData.map((pillar, index) => (
                    <Link
                        key={pillar.id}
                        to="/pilar/$slug"
                        params={{ slug: pillar.id }}
                        className="group"
                    >
                        <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-card/50 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-black italic">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <CardHeader className="relative z-10">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">
                                        {t('pillars_page.pillar_label', { index: (index + 1).toString().padStart(2, '0') })}
                                    </span>
                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {t(`pillars.${pillar.id}.title`)}
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{t('pillars_page.field_language')}</span>
                                        <span className="font-semibold text-secondary dark:text-primary/90 text-sm">
                                            {t(`pillars.${pillar.id}.layer1`)}
                                        </span>
                                    </div>
                                </div>

                                <CardDescription className="text-sm line-clamp-3 min-h-[4.5rem]">
                                    {t(`pillars.${pillar.id}.definition`)}
                                </CardDescription>

                                <div className="pt-4 flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
                                    {t('pillars_page.view_analysis')} <ChevronRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-24 relative overflow-hidden rounded-[3rem] border border-primary/20 bg-card/50 backdrop-blur-xl p-8 md:p-16">
                <div className="absolute top-0 right-0 -m-12 opacity-5 pointer-events-none">
                    <Microscope className="w-64 h-64" />
                </div>

                <div className="relative z-10 text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold">{t('pillars_page.cta_title')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
                        {t('pillars_page.cta_quote')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button asChild size="lg" className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20">
                            <Link to="/get-access">
                                {t('pillars_page.cta_pcc')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold">
                            <Link to="/contact">
                                {t('pillars_page.cta_consult')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

