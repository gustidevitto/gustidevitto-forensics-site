import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Zap } from "lucide-react"

export const Route = createFileRoute('/verdict')({
    component: VerdictPage,
})

function VerdictPage() {
    return (
        <div className="container py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-20">
            <title>Executive Financial Verdict - Financial Forensics Synthesis</title>

            {/* Intro */}
            <header className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> Executive Synthesis
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Executive Financial Verdict</h1>
                <p className="text-xl text-muted-foreground">
                    Sintesis diagnostik tingkat eksekutif. Halaman ini memetakan variabel kritis bisnis ke dalam tiga dimensi keputusan: Oksigen, Penyakit, dan Masa Depan.
                </p>
            </header>

            {/* Section A: Status Oksigen */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold font-mono">DIMENSI A: STATUS OKSIGEN</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Cash Runway</h3>
                        <p className="text-sm text-muted-foreground">Menentukan sisa hari ('sisa napas') operasional bisnis tanpa adanya inflow baru.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Net Burn Rate</h3>
                        <p className="text-sm text-muted-foreground">Kecepatan pembakaran modal setiap bulan untuk menjaga operasional tetap berjalan.</p>
                    </div>
                </div>
            </section>

            {/* Section B: Status Penyakit */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Zap className="w-6 h-6 text-destructive" />
                    <h2 className="text-2xl font-bold font-mono">DIMENSI B: STATUS PENYAKIT (LEAKAGE)</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">GP Leakage Rate</h3>
                        <p className="text-sm text-muted-foreground">Persentase kebocoran profit siluman (Phantom Costs) yang terdeteksi dalam operasional.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Quick Ratio Risk</h3>
                        <p className="text-sm text-muted-foreground">Kerentanan terhadap kewajiban jangka pendek tanpa dukungan likuiditas instan.</p>
                    </div>
                </div>
            </section>

            {/* Section C: Status Masa Depan */}
            <section className="space-y-6 p-8 rounded-3xl bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Zap className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold font-mono">DIMENSI C: STATUS MASA DEPAN</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">LTGP : CAC Ratio</h3>
                        <p className="text-sm text-muted-foreground">Efisiensi akuisisi pelanggan vs potensi keuntungan jangka panjang yang dihasilkan.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Dynamic BEP</h3>
                        <p className="text-sm text-muted-foreground">Titik balik modal yang bergerak mengikuti realitas biaya harian yang sebenarnya.</p>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="p-6 rounded-2xl bg-muted/50 border italic text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> Executive Financial Verdict adalah halaman diagnostik statistik yang didasarkan pada metodologi Financial Forensics Gusti Devitto. Hasil yang ditampilkan bersifat informatif untuk membantu pengambilan keputusan strategis, bukan saran investasi atau nasihat hukum formal.
            </div>

            {/* Footer CTA */}
            <footer className="text-center pt-8">
                <Button asChild size="lg" className="h-14 px-10 group">
                    <Link to="/get-access">
                        Get Your Business Verdict
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </footer>
        </div>
    )
}
