import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { PAYMENT_LINKS } from "@/config/paymentLinks"

// @ts-ignore
export const Route = createFileRoute('/investasi')({
    component: Offerings,
})

function Offerings() {
    const plans = [
        {
            name: "The Vital Sign Check",
            price: "Rp 500.000",
            desc: "Diagnosis awal dan cepat untuk menemukan \"pendarahan\" utama dalam operasional bisnis Anda.",
            features: [
                "1x 45 Menit Rapid Consultation (Online)",
                "Single Metric Forensics Analysis (Fokus Kebocoran Terbesar)",
                "The \"Red Flag\" Report (3 Kebocoran Utama)",
                "Quick Win Action Plan (1 Langkah Instan)"
            ],
            cta: "Amankan Slot Diagnosa",
            variant: "outline",
            highlight: false
        },
        {
            name: "The Surgical Blueprint",
            price: "Rp 2.000.000",
            desc: "Peta jalan strategis yang mendalam untuk perbaikan struktur cost dan peningkatan margin.",
            features: [
                "Total 180 Menit Strategy Session (2x Sesi @90 Menit)",
                "Forensic Data Review (Analisa Data 3 Bulan Terakhir)",
                "7-Pillars Business Health Score",
                "The Roadmap to Profit (Dokumen Strategi)",
                "Rekaman Sesi dan Materi Presentasi"
            ],
            cta: "Jadwalkan Bedah Bisnis",
            variant: "default",
            highlight: true
        },
        {
            name: "The Turnaround Protocol",
            price: "Rp 19.900.000",
            desc: "Pendampingan intensif 30 hari penuh untuk perombakan sistem total dan coaching implementasi.",
            features: [
                "30-Day Full System Audit & Mentoring",
                "4x Sesi Tatap Muka Mingguan (@90 Menit)",
                "Custom SOP & KPI Architecture Development",
                "Team Alignment Workshop Online",
                "Financial Dashboard Setup",
                "Akses Prioritas Harian via Chat/Teks"
            ],
            cta: "Apply for Mentoring",
            variant: "outline",
            highlight: false
        }
    ]

    const handlePayment = (plan: typeof plans[0]) => {
        let link = ""
        if (plan.name === "The Vital Sign Check") link = PAYMENT_LINKS.TIER_1
        else if (plan.name === "The Surgical Blueprint") link = PAYMENT_LINKS.TIER_2

        if (link) {
            window.open(link, '_blank')
        } else {
            // Fallback if link is not set yet (Pre-Midtrans)
            alert(`[System Info]\n\nPayment Link for ${plan.name} is currently being generated.\n\nPlease contact Admin via WhatsApp for manual invoice.`)
        }
    }

    const handleConsultation = (plan: typeof plans[0]) => {
        // High-ticket items use WhatsApp for personal touch
        const message = `Halo Gusti Devitto, saya tertarik untuk program *${plan.name}* (Price: ${plan.price}).\n\nMohon info prosedur aplikasinya.`
        const url = `https://wa.me/628895440515?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="container px-4 md:px-8 py-20 mx-auto overflow-hidden">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Investasi Profitabilitas</h1>
                <p className="text-xl text-muted-foreground">
                    Pilih tingkat kedalaman forensik yang sesuai dengan urgensi dan skala bisnis Anda saat ini.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto max-w-7xl">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col p-8 rounded-xl border bg-card text-card-foreground shadow-sm ${plan.highlight
                            ? 'border-secondary ring-1 ring-secondary dark:border-primary dark:ring-primary md:scale-105 shadow-xl z-10'
                            : 'hover:border-primary/50 transition-colors'
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground dark:bg-primary dark:text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Best Value
                            </div>
                        )}
                        <div className="mb-8">
                            <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold mb-2 text-primary">{plan.price}</div>
                            <p className="text-sm text-muted-foreground">{plan.desc}</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm">
                                    <Check className={`h-4 w-4 mt-1 ${plan.highlight ? 'text-secondary dark:text-primary' : 'text-primary'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            className={`w-full font-bold ${plan.highlight ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90' : ''}`}
                            variant={plan.highlight ? 'default' : 'outline'}
                            onClick={() => {
                                if (plan.name === "The Turnaround Protocol") {
                                    handleConsultation(plan)
                                } else {
                                    handlePayment(plan)
                                }
                            }}
                        >
                            {plan.cta}
                        </Button>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center bg-muted/50 p-8 rounded-xl border max-w-4xl mx-auto">
                <h3 className="font-semibold text-lg mb-2">Butuh solusi khusus?</h3>
                <p className="text-muted-foreground mb-6">
                    Kami menyediakan layanan audit korporasi (Enterprise) untuk bisnis dengan omzet &gt;10M/tahun.
                </p>
                <Button variant="link" className="text-primary" asChild>
                    <a href="/contact">Hubungi Tim Kami &rarr;</a>
                </Button>
            </div>
        </div>
    )
}
