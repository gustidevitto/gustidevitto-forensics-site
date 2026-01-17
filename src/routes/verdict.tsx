import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Zap } from "lucide-react"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/verdict')({
    component: VerdictPage,
})

function VerdictPage() {
    const { t } = useTranslation()
    return (
        <div className="container py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-20">
            <title>{t('verdict_page.seo_title')}</title>

            {/* Intro */}
            <header className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> {t('verdict_page.hero_badge')}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('verdict_page.hero_title')}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('verdict_page.hero_subtitle')}
                </p>
            </header>

            {/* Section A: Status Oksigen */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    < Zap className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold font-mono">{t('verdict_page.dim_a_title')}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_a_runway_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_a_runway_desc')}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_a_burn_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_a_burn_desc')}</p>
                    </div>
                </div>
            </section>

            {/* Section B: Status Penyakit */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                    <h2 className="text-2xl font-bold font-mono">{t('verdict_page.dim_b_title')}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_b_leakage_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_b_leakage_desc')}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_b_ratio_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_b_ratio_desc')}</p>
                    </div>
                </div>
            </section>

            {/* Section C: Status Masa Depan */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Zap className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold font-mono">{t('verdict_page.dim_c_title')}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_c_ltgp_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_c_ltgp_desc')}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{t('verdict_page.dim_c_bep_title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('verdict_page.dim_c_bep_desc')}</p>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="p-6 rounded-2xl bg-muted/50 border italic text-sm text-muted-foreground">
                <strong>{t('verdict_page.disclaimer_title')}</strong> {t('verdict_page.disclaimer_text')}
            </div>

            {/* Footer CTA */}
            <footer className="text-center pt-8">
                <Button asChild size="lg" className="h-14 px-10 group">
                    <Link to="/fip-lite">
                        {t('verdict_page.cta_verdict')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </footer>
        </div>
    )
}
