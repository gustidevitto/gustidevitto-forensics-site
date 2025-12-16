import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

// @ts-ignore
export const Route = createFileRoute('/investasi')({
    component: Offerings,
})

function Offerings() {
    const tiers = [
        {
            name: "Basic Audit",
            price: "Mulai Rp 15 Juta",
            desc: "Cocok untuk UMKM yang ingin merapikan sistem dasar.",
            features: [
                "Audit Laporan Keuangan",
                "Cek Kepatuhan Pajak Dasar",
                "Rekomendasi SOP Sederhana",
                "Laporan Risiko High-Level"
            ],
            cta: "Pilih Basic",
            popular: false
        },
        {
            name: "Full Forensic",
            price: "Mulai Rp 45 Juta",
            desc: "Deep dive untuk bisnis yang mencurigai adanya kebocoran.",
            features: [
                "Semua fitur Basic",
                "Investigasi Fraud Mendalam",
                "Audit Stok & Aset Fisik",
                "Wawancara Karyawan & Intelijen",
                "Pendampingan Implementasi SOP"
            ],
            cta: "Pilih Full Forensic",
            popular: true
        },
        {
            name: "Retainer Partner",
            price: "Custom",
            desc: "Pendampingan bulanan untuk menjaga kesehatan bisnis jangka panjang.",
            features: [
                "Monitoring Transaksi Bulanan",
                "Sesi Konsultasi Strategis Rutin",
                "Akses Prioritas Tim Forensik",
                "Setup Sistem ERP & Kontrol",
                "Training & Integritas Karyawan"
            ],
            cta: "Hubungi Kami",
            popular: false
        }
    ]

    return (
        <div className="container py-20">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Layanan & Investasi</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Pilih paket yang sesuai dengan skala bisnis dan urgensi masalah Anda.
                    Investasi pada keamanan profit, bukan biaya.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {tiers.map((tier, index) => (
                    <Card key={index} className={`flex flex-col relative ${tier.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-muted'}`}>
                        {tier.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Paling Populer
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{tier.name}</CardTitle>
                            <div className="text-3xl font-bold mt-2">{tier.price}</div>
                            <CardDescription className="mt-2">{tier.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-3">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-primary shrink-0" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full" variant={tier.popular ? "default" : "outline"}>
                                <Link to="/contact">{tier.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
