import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign, AlertTriangle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section Revamp */}
            <section className="relative grid place-items-center lg:grid-cols-2 gap-8 py-20 px-4 md:px-8 bg-gradient-to-br from-background via-secondary/10 to-background overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>

                <div className="flex flex-col gap-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit border border-primary/20">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Metodologi Forensik Teruji</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Profit Bisnis Anda <span className="text-primary italic">Bocor</span> Tanpa Jejak?
                        <br />
                        Temukan "Phantom Cost" dalam 5 Menit.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Jangan biarkan Omzet Semu menipu Anda. Diagnosa kesehatan finansial bisnis Anda sekarang dengan metodologi forensik, tanpa install software apapun.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" className="text-lg h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link to="/get-access">
                                Cek Kesehatan Bisnis (Gratis) <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-lg mx-auto lg:mr-0 rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 grid place-items-center group">
                    <div className="absolute inset-0 bg-[url('/assets/images/hero-image.jpg')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                    <div className="relative z-10 p-8 text-center">
                        <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-primary/20 shadow-xl">
                            <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">90% Bisnis Merugi Tanpa Sadar</h3>
                            <p className="text-muted-foreground text-sm">
                                "Apakah profit di laporan keuangan Anda benar-benar ada di rekening bank?"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="bg-secondary/5 border-y border-border/50 py-8">
                <div className="container mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                    <div>
                        <div className="text-3xl font-bold text-primary">Rp 50M+</div>
                        <div className="text-sm text-muted-foreground">Phantom Cost Terdeteksi</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">300+</div>
                        <div className="text-sm text-muted-foreground">Bisnis Terdiagnosa</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">Zero</div>
                        <div className="text-sm text-muted-foreground">Software Installation Needed</div>
                    </div>
                </div>
            </section>

            {/* The Ugly Truth Section */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Mengapa Bisnis Ramai Tapi Saldo Tipis?</h2>
                        <p className="text-muted-foreground text-lg">
                            Kebocoran profit jarang terjadi karena satu ledakan besar. Ia terjadi karena ribuan "tetesan kecil" yang tidak Anda sadari setiap hari.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingDown className="w-12 h-12 text-secondary dark:text-primary" />,
                                title: "Invisible Shrinkage",
                                desc: "Stok hilang, bahan baku terbuang, dan 'kecelakaan' kecil yang jika diakumulasi setahun setara dengan profit 1 cabang baru."
                            },
                            {
                                icon: <Users className="w-12 h-12 text-secondary dark:text-primary" />,
                                title: "Labor Inefficiency",
                                desc: "Menggaji karyawan untuk 'idle time'. Tanpa pengukuran produktivitas yang presisi, payroll Anda hanya menjadi beban tetap tanpa ROI."
                            },
                            {
                                icon: <DollarSign className="w-12 h-12 text-secondary dark:text-primary" />,
                                title: "Pricing Errors",
                                desc: "Menjual produk dengan margin yang salah karena gagal menghitung HPP aktual (termasuk overhead & variable cost tersembunyi)."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors shadow-sm text-center md:text-left">
                                <div className="mb-6 bg-primary/10 w-fit p-4 rounded-full mx-auto md:mx-0">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Objection Handling */}
            <section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequent Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Apa bedanya Gusti Devitto Forensics dengan Akuntan/Konsultan Pajak?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Akuntan merapikan catatan masa lalu untuk kepatuhan (pajak/laporan). Kami adalah <strong>Auditor Forensik Operasional</strong>. Kami membedah "masa depan" profit Anda dengan mencari kebocoran dlam operasional harian yang tidak tercatat di jurnal akuntansi standar.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Apakah data keuangan saya aman?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            <strong>Sangat Aman.</strong> Kami bekerja di bawah NDA (Non-Disclosure Agreement) ketat. Kami tidak meminta akses login bank atau otoritas transfer. Kami hanya menganalisis pola data operasional dan arus kas untuk menemukan anomali.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Apakah investasi di Program Audit (Tier 3) sepadan?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Klien kami rata-rata menemukan penghematan (cost saving) sebesar <strong>5x - 10x lipat</strong> dari nilai investasi program dalam 3 bulan pertama. Jika kami bisa menyelamatkan Rp 200 Juta yang biasanya hilang percuma tahun lalu, investasi Rp 19.9 Juta adalah "no-brainer".
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Masih ada keraguan?</p>
                    <Button asChild variant="outline">
                        <Link to="/contact">Konsultasi Dulu via WhatsApp</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
