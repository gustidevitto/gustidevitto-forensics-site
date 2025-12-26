import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Check, Clock, ShieldCheck, ArrowRight } from "lucide-react"
import { PAYMENT_LINKS } from "@/config/paymentLinks"

export const Route = createFileRoute('/investasi')({
    component: Offerings,
})

function Offerings() {
    const plans = [
        {
            name: "Vital Sign Check",
            subtitle: "Diagnosa Awal",
            price: "Rp 500.000",
            oneTime: true,
            desc: "15-Minute MRI. Cukup satu sesi untuk melihat \"pendarahan\" terbesar di bisnis Anda.",
            features: [
                "1x 45 Menit Rapid Zoom Call",
                "FFD™ v2 Single-Metric Analysis",
                "Laporan \"Red Flag\" (Top 3 Kebocoran)",
                "1 Quick Win Action Plan"
            ],
            ideal: "Ideal untuk: validasi cepat, second opinion",
            cta: "Pesan Slot Diagnosa",
            variant: "outline" as const,
            highlight: false
        },
        {
            name: "Surgical Blueprint",
            subtitle: "Bedah Bisnis Mendalam",
            price: "Rp 2.000.000",
            oneTime: true,
            desc: "Deep-dive analysis. Peta jalan strategi untuk memperbaiki struktur cost dan margin secara sistematis.",
            features: [
                "2x 90 Menit Strategy Session",
                "Full 7-Pillar Health Radar",
                "Data Forensics 3 Bulan Terakhir",
                "Dokumen Roadmap to Profit",
                "Rekaman Sesi + Slide Materi",
                "Scenario Simulator Access (7 hari)"
            ],
            ideal: "Ideal untuk: bisnis multi-outlet, planning kuartal",
            cta: "Jadwalkan Bedah Bisnis",
            variant: "default" as const,
            highlight: true
        },
        {
            name: "Turnaround Protocol",
            subtitle: "Mentoring 30 Hari",
            price: "Rp 19.900.000",
            oneTime: false,
            desc: "Pendampingan intensif. Bukan hanya diagnosa — implementasi sampai tuntas.",
            features: [
                "30 Hari Full System Audit",
                "4x Sesi Tatap Muka (@90 Menit)",
                "Custom SOP & KPI Development",
                "Team Alignment Workshop",
                "Financial Dashboard Setup",
                "Akses Prioritas Harian (Chat/Call)"
            ],
            ideal: "Ideal untuk: turnaround kritis, scale-up preparation",
            cta: "Apply Sekarang",
            variant: "outline" as const,
            highlight: false
        }
    ]

    const handlePayment = (plan: typeof plans[0]) => {
        let link = ""
        if (plan.name === "Vital Sign Check") link = PAYMENT_LINKS.TIER_1
        else if (plan.name === "Surgical Blueprint") link = PAYMENT_LINKS.TIER_2

        if (link) {
            window.open(link, '_blank')
        } else {
            alert(`[System Info]\n\nPayment Link for ${plan.name} is currently being generated.\n\nPlease contact Admin via WhatsApp for manual invoice.`)
        }
    }

    const handleConsultation = (plan: typeof plans[0]) => {
        const message = `Halo Vitto, saya tertarik dengan program *${plan.name}* (${plan.price}).\n\nBoleh info proses aplikasinya?`
        const url = `https://wa.me/628895440515?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="container px-4 md:px-8 py-20 mx-auto overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                    <Clock className="w-4 h-4" />
                    <span>3 dari 5 slot tersisa bulan ini</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Pilih Level Diagnosa</h1>
                <p className="text-xl text-muted-foreground">
                    Tidak ada paket "all-in-one" karena setiap bisnis punya tingkat urgensi berbeda. <br className="hidden md:block" />
                    <strong className="text-foreground">Pilih yang sesuai kebutuhan Anda.</strong>
                </p>
            </div>

            {/* Guarantee Badge */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span>No Find, No Pitch Guarantee — Bisnis sehat? Gratis.</span>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto max-w-7xl">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${plan.highlight
                            ? 'border-primary ring-2 ring-primary/20 md:scale-105 shadow-2xl shadow-primary/10 z-10 bg-card text-card-foreground'
                            : 'border-amber-200/50 dark:border-border/50 hover:border-primary/50 hover:shadow-lg bg-amber-500/5 dark:bg-card text-card-foreground'
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <p className="text-sm text-primary font-medium mb-1">{plan.subtitle}</p>
                            <h3 className="font-bold text-2xl mb-1">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                                <span className="text-sm text-muted-foreground">{plan.oneTime ? "(one-time)" : "/program"}</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">{plan.desc}</p>

                        <ul className="space-y-3 mb-6 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm">
                                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-green-500'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="text-xs text-muted-foreground italic mb-4">{plan.ideal}</p>

                        <Button
                            className={`w-full font-bold h-12 group ${plan.highlight
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                                : ''}`}
                            variant={plan.variant}
                            onClick={() => {
                                if (plan.name === "Turnaround Protocol") {
                                    handleConsultation(plan)
                                } else {
                                    handlePayment(plan)
                                }
                            }}
                        >
                            {plan.cta}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Bottom Section - Enterprise */}
            <div className="mt-20 text-center bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 p-10 rounded-2xl border border-border/50 max-w-4xl mx-auto">
                <h3 className="font-bold text-xl mb-2">Bisnis Anda Lebih Besar?</h3>
                <p className="text-muted-foreground mb-6">
                    Untuk bisnis dengan omzet &gt;Rp 10 Miliar/tahun, saya menyediakan <strong className="text-foreground">Enterprise Audit</strong> dengan scope custom.
                </p>
                <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">
                        Diskusikan Kebutuhan Anda
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>

            {/* FAQ Teaser */}
            <div className="mt-16 text-center">
                <p className="text-muted-foreground">
                    Punya pertanyaan tentang program? <Link to="/" className="text-primary underline hover:no-underline">Baca FAQ lengkap</Link>
                </p>
            </div>
        </div>
    )
}
