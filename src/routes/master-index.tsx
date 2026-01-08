import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { BookOpen, Layers, ShieldAlert, Target } from "lucide-react"
import pillarsData from '@/data/pillarsData.json'

export const Route = createFileRoute('/master-index')({
    component: MasterIndex,
})

function MasterIndex() {
    const sortedPillars = [...pillarsData].sort((a, b) => a.title.localeCompare(b.title))

    const coreConcepts = [
        { name: "Phantom Cost", desc: "Kebocoran profit yang tidak tercatat di laporan laba rugi standar." },
        { name: "Cash Velocity", desc: "Kecepatan perputaran kas dari modal kerja menjadi profit cair." },
        { name: "Risk Exposure", desc: "Tingkat kerentanan bisnis terhadap fluktuasi biaya dan utang." },
        { name: "Burn Rate Awareness", desc: "Kesadaran penuh atas kecepatan penggunaan kas setiap detiknya." }
    ]

    const narrativePatterns = [
        { name: "Efficient Suicide", desc: "Pertumbuhan omzet yang semakin besar namun margin semakin tipis hingga membunuh kas." },
        { name: "Obese Growth", desc: "Ekspansi ugal-ugalan tanpa penguatan infrastruktur kontrol finansial." },
        { name: "Labor Trap", desc: "Tim besar dengan produktivitas per jam kerja yang stagnan atau menurun." }
    ]

    return (
        <div className="container py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-24">
            <title>Master Index - Financial Forensics Framework by Gusti Devitto</title>

            {/* Hero */}
            <header className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" /> Single Source of Truth
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Financial Forensics Framework <br />
                    <Link to="/about-gusti-devitto" className="text-primary hover:underline">by Gusti Devitto</Link>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Indeks kanonikal untuk semua terminologi, metrik, dan metodologi diagnostik dalam ekosistem Financial Forensics.
                </p>
            </header>

            {/* Pillar Index */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Layers className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">15 Pillars Index (Alphabetical)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sortedPillars.map((pillar) => (
                        <Link
                            key={pillar.id}
                            to="/pilar/$slug"
                            params={{ slug: pillar.id }}
                            className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all group"
                        >
                            <span className="font-bold group-hover:text-primary transition-colors">{pillar.title}</span>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{pillar.layer1_term}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Core Concepts */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Target className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Core Concepts</h2>
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
                    <h2 className="text-2xl font-bold">Cross-Narrative Patterns</h2>
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
                    <h2 className="text-2xl md:text-3xl font-bold">Mulai Diagnosa Bisnis Anda</h2>
                    <p className="text-muted-foreground">
                        Gunakan PCC Lite untuk diagnosa awal, atau FFD™ v3 untuk pemetaan 15 pilar secara sistemik.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="h-12 px-8 font-bold">
                            <Link to="/get-access">Buka PCC Lite</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 font-bold">
                            <Link to="/investasi">Lihat Tier Investasi</Link>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
