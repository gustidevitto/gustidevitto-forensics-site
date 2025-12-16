import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Microscope, Scale, FileSearch, ShieldAlert, BarChart3, Users, LockKeyhole } from 'lucide-react'

export const Route = createFileRoute('/forensics-pillars')({
    component: ForensicsPillars,
})

function ForensicsPillars() {
    const pillars = [
        {
            title: "Auditing Operasional",
            icon: <Microscope className="h-10 w-10 text-primary mb-4" />,
            desc: "Kami menyelidiki setiap proses dari gudang hingga kasir untuk menemukan inefisiensi tersembunyi."
        },
        {
            title: "Analisis Kecurangan (Fraud)",
            icon: <ShieldAlert className="h-10 w-10 text-primary mb-4" />,
            desc: "Mendeteksi pola pencurian, penggelapan, atau manipulasi data oleh pihak internal maupun eksternal."
        },
        {
            title: "Forensik Data Digital",
            icon: <FileSearch className="h-10 w-10 text-primary mb-4" />,
            desc: "Mengembalikan data yang dihapus dan melacak jejak digital transaksi yang mencurigakan."
        },
        {
            title: "Kepatuhan Hukum (Compliance)",
            icon: <Scale className="h-10 w-10 text-primary mb-4" />,
            desc: "Memastikan bisnis Anda berjalan sesuai regulasi untuk menghindari denda dan sanksi hukum."
        },
        {
            title: "Efisiensi Sumber Daya Manusia",
            icon: <Users className="h-10 w-10 text-primary mb-4" />,
            desc: "Mengukur produktivitas riil vs gaji yang dibayarkan. Apakah tim Anda aset atau beban?"
        },
        {
            title: "Keamanan Aset",
            icon: <LockKeyhole className="h-10 w-10 text-primary mb-4" />,
            desc: "Sistem kontrol stok dan aset fisik untuk mencegah penyusutan (shrinkage) yang tidak wajar."
        },
        {
            title: "Profitabilitas & Cashflow",
            icon: <BarChart3 className="h-10 w-10 text-primary mb-4" />,
            desc: "Analisis mendalam arus kas untuk memastikan profit di atas kertas menjadi uang tunai di bank."
        }
    ]

    return (
        <div className="container py-12 md:py-20 max-w-6xl">
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
