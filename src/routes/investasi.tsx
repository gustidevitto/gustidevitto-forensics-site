import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check, Clock, ShieldCheck, ArrowRight, X, MessageCircle, CreditCard } from "lucide-react"
import { PAYMENT_LINKS } from "@/config/paymentLinks"

export const Route = createFileRoute('/investasi')({
    component: Offerings,
})

function Offerings() {
    const [isTier3ModalOpen, setIsTier3ModalOpen] = useState(false)

    const plans = [
        {
            id: "tier1",
            name: "Vital Sign Check",
            subtitle: "Diagnosis Awal",
            price: "Rp 500.000",
            oneTime: true,
            desc: "15-Minute MRI. Cukup satu sesi untuk melihat \"pendarahan\" terbesar di bisnis Anda.",
            features: [
                "1x 45 Menit Rapid Zoom Call",
                "FFD™ v3 Single-Metric Analysis",
                "Laporan \"Red Flag\" (Top 3 Kebocoran)",
                "1 Quick Win Action Plan"
            ],
            ideal: "Ideal untuk: validasi cepat, second opinion",
            cta: "Pesan Slot Diagnosis",
            variant: "outline" as const,
            highlight: false
        },
        {
            id: "tier2",
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
            id: "tier3",
            name: "Turnaround Protocol",
            subtitle: "Mentoring 30 Hari",
            price: "Rp 19.900.000",
            oneTime: false,
            desc: "Pendampingan intensif. Bukan hanya diagnosis — implementasi sampai tuntas.",
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

    const handleAction = (plan: typeof plans[0]) => {
        if (plan.id === "tier3") {
            setIsTier3ModalOpen(true)
            return
        }

        let link = ""
        if (plan.id === "tier1") link = PAYMENT_LINKS.TIER_1
        else if (plan.id === "tier2") link = PAYMENT_LINKS.TIER_2

        if (link) {
            window.open(link, '_blank')
        }
    }

    const handleWhatsApp = (planName: string, price: string) => {
        const message = `Halo Vitto, saya tertarik dengan program *${planName}* (${price}).\n\nBoleh info proses aplikasinya?`
        const url = `https://wa.me/628895440515?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="container py-12 md:px-8 relative">
            <title>Investasi Diagnosis & Mentoring - Gusti Devitto™</title>
            <meta name="description" content="Pilih level diagnosis untuk bisnis Anda. Dari Rapid MRI 15 menit hingga Bedah Bisnis Mendalam. Khusus untuk Phantom Cost Hunting." />

            {/* Product/Service Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": plans.map((plan, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": plan.name,
                        "description": plan.desc
                    }))
                })}
            </script>

            <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                    <Clock className="w-4 h-4" />
                    <span>3 dari 5 slot tersisa bulan ini</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Pilih Level Diagnosis</h1>
                <p className="text-xl text-muted-foreground max-w-2xl text-balance">
                    Tidak ada paket "all-in-one" karena setiap bisnis punya tingkat urgensi berbeda.
                    <strong className="text-foreground block mt-1">Pilih yang sesuai kebutuhan Anda.</strong>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto max-w-7xl pb-10">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${plan.highlight
                            ? 'border-primary ring-2 ring-primary/20 md:scale-105 shadow-2xl shadow-primary/10 z-10 bg-card text-card-foreground'
                            : 'border-border/50 hover:border-primary/50 hover:shadow-lg bg-card text-card-foreground'
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg whitespace-nowrap">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <p className="text-sm text-primary font-medium mb-1 font-mono tracking-wider">{plan.subtitle.toUpperCase()}</p>
                            <h3 className="font-bold text-2xl mb-1">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                                <span className="text-sm text-muted-foreground">{plan.oneTime ? "(one-time)" : "/program"}</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{plan.desc}</p>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm">
                                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-green-500'}`} />
                                    <span className="text-muted-foreground/90">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-border/50 mt-auto">
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4 opacity-70 italic">{plan.ideal}</p>
                            <Button
                                className={`w-full font-bold h-12 group transition-all duration-300 ${plan.highlight
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                                    : 'hover:border-primary/50'}`}
                                variant={plan.variant}
                                onClick={() => handleAction(plan)}
                            >
                                {plan.cta}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tier 3 Modal */}
            {isTier3ModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setIsTier3ModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-primary/5 p-8 border-b border-primary/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsTier3ModalOpen(false)}
                                    className="rounded-full hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Priority Intervention</p>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground balance leading-tight">
                                The Turnaround Protocol: <br />
                                <span className="text-primary italic">Saat Intuisi Tidak Lagi Cukup.</span>
                            </h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <p className="text-lg text-muted-foreground leading-relaxed italic">
                                "Protokol ini bukan sekadar audit; ini adalah intervensi 30 hari yang dirancang khusus untuk bisnis yang berada di titik kritis. Apakah Anda akan terus berekspansi dengan 'bocor alus' yang semakin membesar, atau melakukan pembedahan total untuk mengunci profitabilitas jangka panjang?"
                            </p>

                            <div className="space-y-6">
                                <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest bg-primary/5 w-fit px-2 py-1 rounded">Dalam level ini, Gusti Devitto akan turun tangan secara personal:</p>

                                <div className="grid gap-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Surgical Deep-Dive</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">Membedah data finansial 3 bulan terakhir untuk menemukan pola kebocoran yang disamarkan oleh laporan keuangan standar.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Systemic Fix</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">Kami tidak hanya memberi tahu di mana letak masalahnya, tapi menyusun Custom SOP dan KPI untuk memastikan celah tersebut tertutup secara permanen.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Team Alignment</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">Memastikan seluruh tim Anda bergerak dengan satu angka kebenaran yang sama, menghilangkan ego departemen demi kesehatan cashflow.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">The Surgeon's Priority</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">Akses jalur cepat melalui WhatsApp pribadi untuk diskusi strategis selama masa intervensi 30 hari.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm font-medium text-foreground p-4 bg-muted/50 rounded-xl border-l-4 border-primary italic">
                                "Ini adalah langkah terakhir bagi Founder yang menolak membiarkan inefisiensi menghancurkan kerja keras bertahun-tahun."
                            </p>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="p-8 bg-muted/30 border-t border-border/50 grid sm:grid-cols-2 gap-4">
                            <Button
                                className="h-14 text-lg font-black shadow-xl shadow-primary/20 group"
                                onClick={() => window.open(PAYMENT_LINKS.TIER_3, '_blank')}
                            >
                                <CreditCard className="mr-2 w-5 h-5" />
                                Bayar Sekarang
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-14 text-lg font-bold border-primary/20 hover:bg-primary/5 hover:border-primary/50 group"
                                onClick={() => handleWhatsApp("Turnaround Protocol", "Rp 19.900.000")}
                            >
                                <MessageCircle className="mr-2 w-5 h-5" />
                                Diskusi via WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Section - Enterprise */}
            <div className="mt-20 text-center bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 p-10 rounded-2xl border border-border/50 max-w-4xl mx-auto mb-20 animate-fade-in">
                <h3 className="font-bold text-xl mb-2 tracking-tight">Bisnis Anda Lebih Besar?</h3>
                <p className="text-muted-foreground mb-6">
                    Untuk bisnis dengan omzet &gt;Rp 10 Miliar/tahun, saya menyediakan <strong className="text-foreground">Enterprise Audit</strong> dengan scope custom.
                </p>
                <Button variant="outline" size="lg" asChild className="group h-12">
                    <Link to="/contact">
                        Diskusikan Kebutuhan Anda
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>

            {/* FAQ Teaser */}
            <div className="mt-16 text-center border-t border-border/50 pt-8 opacity-70">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                    Punya pertanyaan? <Link to="/" className="text-primary underline hover:no-underline ml-1">Baca FAQ lengkap</Link>
                </p>
            </div>
        </div>
    )
}

