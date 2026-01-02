import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Scale, Microscope, Search } from "lucide-react"

export const Route = createFileRoute('/methodology')({
    component: MethodologyPage,
})

function MethodologyPage() {
    return (
        <div className="container py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-24">
            <title>Metodologi Financial Forensics - Framework Gusti Devitto</title>

            {/* Title */}
            <header className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Microscope className="w-4 h-4" /> Framework Architecture
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Metodologi Financial Forensics</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Mengenal disiplin diagnostik yang membedah anatomi keuangan bisnis untuk menemukan kebenaran di balik angka.
                </p>
            </header>

            {/* Definition */}
            <section className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Search className="w-5 h-5" /></div>
                    Apa itu Financial Forensics?
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    Financial Forensics adalah disiplin diagnostik yang menggabungkan analisis data operasional, pola statistik, dan audit alur kas untuk mendeteksi <strong className="text-foreground">Phantom Costs</strong> (biaya siluman) dan inefisiensi sistemik. Berbeda dengan audit konvensional, disiplin ini tidak hanya fokus pada "apa" yang terjadi di masa lalu, tapi "mengapa" kebocoran terjadi dan "bagaimana" menghentikannya secara <em>real-time</em>.
                </p>
            </section>

            {/* Comparison Table */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Scale className="w-5 h-5" /></div>
                    Perbedaan Disiplin
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
                        <h3 className="font-bold text-xl">Standard Accounting</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Fokus: Kepatuhan Pajak & Pelaporan. Sasarannya adalah akurasi data masa lalu agar sesuai standar regulasi.</p>
                        <ul className="text-xs space-y-2 text-muted-foreground border-t pt-4 italic">
                            <li>- Reactive</li>
                            <li>- Periodic</li>
                            <li>- Compliance oriented</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-4 shadow-lg scale-105">
                        <h3 className="font-bold text-xl text-primary">Financial Forensics</h3>
                        <p className="text-sm text-foreground leading-relaxed">Fokus: Deteksi Kebocoran & Penyelamatan Profit. Sasarannya adalah menemukan uang yang hilang di antara celah operasional.</p>
                        <ul className="text-xs space-y-2 text-primary font-medium border-t border-primary/20 pt-4 italic">
                            <li>+ Predictive</li>
                            <li>+ Precise</li>
                            <li>+ Profit oriented</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
                        <h3 className="font-bold text-xl">General Consulting</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Fokus: Strategi Pertumbuhan & Manajemen. Sasarannya adalah ekspansi dan efisiensi tim secara makro.</p>
                        <ul className="text-xs space-y-2 text-muted-foreground border-t pt-4 italic">
                            <li>- Qualitative</li>
                            <li>- Broad</li>
                            <li>- Strategy oriented</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-muted/80 rounded-[2.5rem] p-10 md:p-16 border text-center space-y-6">
                <ShieldCheck className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-2xl font-bold">Scientific Attribution</h2>
                <p className="text-lg text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
                    "While conventional financial forensics is traditionally defined as the investigation of fraud, crime, and litigation, Gusti Devitto’s Financial Forensics framework is a deliberate upstream extension. It focuses on systemic leakage and pre-fraud diagnostics—identifying the 'Phantom Costs' that erode margins before they become catastrophic. This methodology is proprietary and functions as the analytical core of FFD™ v3."
                </p>
                <div className="pt-4 flex justify-center gap-4">
                    <Button asChild variant="outline">
                        <Link to="/forensics-pillars">Pelajari 15 Pilar</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/master-index">Buka Master Index</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
