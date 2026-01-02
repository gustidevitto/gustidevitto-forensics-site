import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Microscope } from 'lucide-react'
import pillarsData from '@/data/pillarsData.json'

export const Route = createFileRoute('/forensics-pillars')({
    component: ForensicsPillars,
})

function ForensicsPillars() {
    return (
        <div className="container py-12 md:py-20 max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase">
                    Core Methodology
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                    15 Pilar Financial Forensics
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Framework diagnostik modular untuk membedah anatomi bisnis Anda. Dari "Bahasa Lapangan" hingga "Istilah Forensik", kami mengungkap apa yang disembunyikan laporan keuangan standar.
                </p>
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
                                        Pilar {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {pillar.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Bahasa Lapangan:</span>
                                        <span className="font-semibold text-secondary dark:text-primary/90 text-sm">
                                            {pillar.layer1_term}
                                        </span>
                                    </div>
                                </div>

                                <CardDescription className="text-sm line-clamp-3 min-h-[4.5rem]">
                                    {pillar.definition}
                                </CardDescription>

                                <div className="pt-4 flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
                                    Lihat Analisis Forensik <ChevronRight className="w-4 h-4" />
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
                    <h2 className="text-3xl md:text-4xl font-extrabold">Ingin Tahu Angka Bisnis Anda?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
                        "Jangan biarkan asumsi menghancurkan bisnis Anda. Gunakan Framework 15 Pilar untuk mendapatkan kejernihan profit yang sesungguhnya."
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button asChild size="lg" className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20">
                            <Link to="/get-access">
                                Jalankan Diagnosa PCC Lite
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold">
                            <Link to="/contact">
                                Konsultasi Strategis
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

