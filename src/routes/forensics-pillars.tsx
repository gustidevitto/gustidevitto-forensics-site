import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, PieChart, Banknote, LineChart, HeartHandshake, Tags, Anchor } from 'lucide-react'

export const Route = createFileRoute('/forensics-pillars')({
    component: ForensicsPillars,
})

function ForensicsPillars() {
    const pillars = [
        {
            title: "Operational Efficiency (Phantom Cost)",
            icon: <Activity className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Mendeteksi biaya tersembunyi (Cost of Idleness) dan inefisiensi tenaga kerja yang tidak tercatat di laporan laba rugi."
        },
        {
            title: "Margin Integrity (COGS)",
            icon: <PieChart className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Membedah struktur HPP dan Gross Margin untuk memisahkan biaya murni dari pemborosan dan shrinkage."
        },
        {
            title: "Liquidity Velocity (CCC)",
            icon: <Banknote className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Mengoptimalkan Cash Conversion Cycle agar modal tidak mati di stok, memastikan profit kertas jadi uang tunai."
        },
        {
            title: "Growth Economics (LTV:CAC)",
            icon: <LineChart className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Memastikan biaya akuisisi (CAC) jauh lebih kecil dari nilai jangka panjang pelanggan (LTV) sebelum scale-up."
        },
        {
            title: "Retention & Loyalty Gap",
            icon: <HeartHandshake className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Menutup \"ember bocor\" dengan menganalisis celah antara akuisisi pelanggan baru dan retensi pelanggan lama."
        },
        {
            title: "Transaction Quality (AOV)",
            icon: <Tags className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Strategi menaikkan Average Order Value untuk meningkatkan margin tanpa menambah biaya marketing."
        },
        {
            title: "Survival Threshold (BEP)",
            icon: <Anchor className="h-10 w-10 text-secondary dark:text-primary mb-4" />,
            desc: "Analisis titik impas dinamis untuk mengetahui batas aman penurunan omzet sebelum bisnis merugi."
        }
    ]

    return (
        <div className="container py-12 md:py-20 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">7 Pilar Forensik Bisnis</h1>
                <p className="text-xl text-muted-foreground">
                    Metodologi komprehensif kami diagnostik kesehatan bisnis Anda secara menyeluruh, bukan hanya dari permukaan.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar, index) => (
                    <Card key={index} className="border-muted hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="bg-primary/5 w-fit p-4 rounded-xl mb-2">
                                {pillar.icon}
                            </div>
                            <CardTitle className="text-xl">{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                {pillar.desc}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 text-center bg-muted/30 p-12 rounded-2xl border border-primary/10">
                <h2 className="text-2xl font-bold mb-4">Siap untuk Diagnosa Mendalam?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Jangan biarkan asumsi menghancurkan bisnis Anda. Dapatkan kepastian data sekarang.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                        <Link to="/get-access">
                            Mulai Audit Awal (Gratis di Calculator)
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/contact">
                            Hubungi Konsultan
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
