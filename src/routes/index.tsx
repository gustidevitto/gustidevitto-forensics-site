import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign, Clock, Target, Stethoscope, BadgeCheck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        {
            id: 'dashboard',
            type: 'component',
            title: 'FFD™ v2 — 15-Minute MRI',
            content: (
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Phantom Cost Terdeteksi</p>
                            <p className="text-2xl font-bold text-destructive">Rp 47.8 Juta<span className="text-sm font-normal">/bulan</span></p>
                        </div>
                        <TrendingDown className="w-10 h-10 text-destructive opacity-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Cash Runway</p>
                            <p className="text-lg font-bold text-yellow-500">2.3 bulan</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Margin Leak</p>
                            <p className="text-lg font-bold text-orange-500">-8.2%</p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                        <p className="text-sm italic text-muted-foreground">
                            "Anda tidak butuh omzet lebih besar. <br />Anda butuh ember yang tidak bocor."
                        </p>
                        <p className="text-sm font-medium mt-2">— Vitto</p>
                    </div>
                </div>
            )
        },
        {
            id: 'dachicken',
            type: 'image',
            title: 'Real World Experience',
            src: '/assets/images/dachicken.png',
            desc: 'Dachicken Indonesia: 7 years of operational mastery and the hard lessons of cashflow.'
        },
        {
            id: 'forensics',
            type: 'image',
            title: 'Deep-Dive Analytics',
            src: '/assets/images/forensics.png',
            desc: 'The Scenario Simulator: Predicting your business future with surgical precision.'
        },
        {
            id: 'audit',
            type: 'image',
            title: 'Expert Diagnosis',
            src: '/assets/images/audit.png',
            desc: 'We don\'t just look at numbers. We hunt for the "Phantom Costs" that standard accounting misses.'
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <title>Gusti Devitto™ - Business Forensics & Phantom Cost Hunter</title>
            <meta name="description" content="Deteksi kebocoran profit bisnis multi-outlet Anda. Kami bukan mencari fraud, melainkan memburu Phantom Cost yang memakan margin operasional Anda." />
            <meta property="og:title" content="Gusti Devitto™ - Stop Kebocoran Profit Bisnis Anda" />
            <meta property="og:description" content="Spesialis Phantom Cost Hunting untuk owner multi-outlet. Diagnosa gratis 15 menit." />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "Apa itu Business Forensics di sini?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Business Forensics kami berfokus pada Phantom Cost Hunting (pencarian biaya siluman), bukan audit fraud kriminal. Kami mencari inefisiensi sistem yang memakan profit."
                        }
                    }]
                })}
            </script>
            {/* Hero Section - Storyselling */}
            <section className="relative grid place-items-center lg:grid-cols-2 gap-8 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="flex flex-col gap-6 max-w-2xl animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit border border-primary/20 backdrop-blur-sm">
                        <Stethoscope className="w-4 h-4" />
                        <span>Financial Forensics Specialist</span>
                    </div>

                    {/* Headline - The Pain */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Omzet Ramai, <br className="hidden sm:block" />
                        <span className="text-primary">Tapi Kok Saldo Tipis?</span>
                    </h1>

                    {/* Subheadline - Empathy & Agitation */}
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Saya tahu persis rasanya — <em>kerja keras dari subuh sampai malam</em>, outlet ramai, tim sibuk, tapi akhir bulan selalu bertanya: <strong className="text-foreground">"Kemana perginya uangnya?"</strong>
                    </p>

                    {/* The Promise */}
                    <p className="text-base text-muted-foreground border-l-4 border-primary pl-4 italic">
                        Dalam 15 menit, saya bisa tunjukkan <span className="text-foreground font-medium">di mana bocornya</span> — tanpa bongkar gudang, tanpa interogasi tim Anda berjam-jam. Pure data diagnosis.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" className="text-lg h-14 px-8 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden">
                            <Link to="/get-access">
                                <span className="relative z-10 flex items-center">
                                    Diagnosa Gratis (15 Menit)
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 border-border/50 hover:border-primary/50 hover:bg-primary/5">
                            <Link to="/forensics-pillars">
                                Lihat Metodologi
                            </Link>
                        </Button>
                    </div>

                    {/* Guarantee Badge */}
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <BadgeCheck className="w-5 h-5 text-green-500" />
                        <span><strong className="text-foreground">No Find, No Pitch</strong> — Jika bisnis Anda sehat, konsultasi selesai. Gratis.</span>
                    </div>
                </div>

                {/* Hero Visual - The Carousel */}
                <div className="relative w-full max-w-xl mx-auto lg:mr-0 animate-slide-up h-[400px]">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-md shadow-2xl h-full flex flex-col">
                                {/* Header Bar */}
                                <div className="bg-primary/10 px-6 py-4 border-b border-border/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <span className="ml-4 text-xs font-semibold text-primary tracking-widest uppercase">{slide.title}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono">{index + 1} / {slides.length}</span>
                                </div>

                                {/* Slide Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    {slide.type === 'component' ? (
                                        slide.content
                                    ) : (
                                        <div className="h-full relative group">
                                            <img
                                                src={slide.src}
                                                alt={slide.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6">
                                                <p className="text-sm font-medium text-foreground leading-relaxed">
                                                    {slide.desc}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-6' : 'bg-primary/20 hover:bg-primary/40'}`}
                            />
                        ))}
                    </div>

                    {/* Floating Badge (stays outside carousel) */}
                    <div className="absolute -bottom-4 -right-4 md:-right-8 bg-card border border-border/50 rounded-xl px-4 py-3 shadow-lg animate-float z-20">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Kapasitas Bulan Ini</p>
                                <p className="text-sm font-bold">3 dari 5 slot tersisa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar - Real Metrics */}
            <section className="bg-card/50 border-y border-border/50 py-8 animate-fade-in-up">
                <div className="container mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">Rp 2.1M+</div>
                        <div className="text-sm text-muted-foreground">Kebocoran Terungkap</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">43+</div>
                        <div className="text-sm text-muted-foreground">Bisnis Terdiagnosa</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">15 min</div>
                        <div className="text-sm text-muted-foreground">MRI Diagnosis Time</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">Zero</div>
                        <div className="text-sm text-muted-foreground">Jargon Akuntansi</div>
                    </div>
                </div>
            </section>

            {/* Origin Story Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-5 gap-8 items-center">
                        {/* Photo Placeholder */}
                        <div className="md:col-span-2 flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/assets/images/devitto-forensics.jpg"
                                        alt="Gusti Devitto"
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    Est. 2019
                                </div>
                            </div>
                        </div>

                        {/* Story */}
                        <div className="md:col-span-3 space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold">Kenapa Saya Membangun Ini?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Saya pernah berada di posisi Anda. Founder <strong className="text-foreground">Dachicken Indonesia</strong> — bisnis ayam panggang utuh pertama di Semarang dengan 9 varian rasa. Kita menggebrak pasar, menjadi pioneer, dan meroket tajam.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Bahkan saat pandemi Covid-19 menghantam dan banyak bisnis tumbang, Dachicken justru <strong className="text-primary italic">meroket</strong>. Antrean panjang, omzet meledak. Dari luar, saya terlihat seperti pemenang.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Tapi di balik layar? <strong className="text-destructive">Cashflow seret.</strong> Setelah 7 tahun berjuang, bisnis yang saya bangun dengan keringat itu kolaps. Bukan karena kurang pelanggan, tapi karena "Uang Siluman" yang memakan profit dari dalam tanpa terdeteksi.
                            </p>
                            <p className="text-foreground leading-relaxed font-medium">
                                Kegagalan itu mahal harganya. Itulah alasan saya mendirikan FFD™ — agar tidak ada Founder lain yang harus kehilangan mimpinya karena lubang finansial yang tak terlihat.
                            </p>
                            <div className="pt-4">
                                <p className="text-sm text-muted-foreground">— <strong>Gusti Devitto (Vitto)</strong>, 43 tahun | Financial Forensics Specialist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Ugly Truth Section - Emotional Hooks */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Tanda-Tanda <span className="text-destructive">"Uang Siluman"</span> di Bisnis Anda</h2>
                        <p className="text-muted-foreground text-lg">
                            Ini bukan soal manajemen buruk. Ini soal <strong className="text-foreground">lubang yang tak terlihat</strong> di sistem yang Anda pikir sudah berjalan.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingDown className="w-10 h-10 text-destructive" />,
                                title: "Omzet Naik, Saldo Turun",
                                symptom: "Sudah sering denger ini?",
                                desc: "Penjualan bulan ini lebih besar dari bulan lalu. Tapi akhir bulan, saldo bank malah lebih tipis. Kemana perginya selisihnya?"
                            },
                            {
                                icon: <Users className="w-10 h-10 text-destructive" />,
                                title: "Kerja Keras, Sisa Dikit",
                                symptom: "Merasa jadi relawan di bisnis sendiri?",
                                desc: "Tim Anda gajian tepat waktu. Supplier dibayar. Tapi Anda sendiri? Ambil sisa. Atau malah nombok dari kantong pribadi."
                            },
                            {
                                icon: <DollarSign className="w-10 h-10 text-destructive" />,
                                title: "Profit di Laporan, Bukan di Rekening",
                                symptom: "Ilusi yang berbahaya.",
                                desc: "Laporan keuangan bilang untung. Tapi coba cek saldo bank — tidak pernah sinkron. Ada jurang antara 'profit kertas' dan 'profit tunai'."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-card p-8 rounded-xl border border-border/50 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/5 hover:-translate-y-1"
                            >
                                <div className="mb-6 bg-destructive/10 w-fit p-4 rounded-xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                <p className="text-sm text-primary font-medium mb-2">{item.symptom}</p>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Transition to Solution */}
                    <div className="text-center mt-16 max-w-2xl mx-auto">
                        <p className="text-lg text-muted-foreground">
                            Tenang. Ini <strong className="text-foreground">bukan akhir cerita</strong>. <br />
                            Kebocoran bisa ditemukan. Dan bisa ditutup.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Solution - FFD v2 */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                            <Target className="w-4 h-4" />
                            <span>The Solution</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">FFD™ v2: Financial Forensics Dashboard</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Bukan spreadsheet biasa. Ini adalah <strong className="text-foreground">MRI untuk bisnis Anda</strong> — melihat apa yang tidak bisa dilihat di permukaan.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Scenario Simulator",
                                aka: "Mode 'Dukun'",
                                desc: "Prediksi masa depan. Lihat apa yang terjadi pada profit dan cash runway jika Anda naikkan harga 5%, tekan COGS, atau tambah volume."
                            },
                            {
                                title: "7-Pillar Health Radar",
                                aka: "Full Body Check-up",
                                desc: "Diagnosa visual kesehatan bisnis: Margin, Inventory, Cashflow, Risk, dan lainnya. Dalam satu layar, Anda tahu mana yang 'merah'."
                            },
                            {
                                title: "Phantom Cost Detector",
                                aka: "Pemburu Uang Siluman",
                                desc: "Menemukan kebocoran halus yang tidak tercatat: pungli, waste bahan baku, inefisiensi tim yang 'terlihat sibuk' tapi tidak produktif."
                            },
                            {
                                title: "Real-time Cash Runway",
                                aka: "Sisa Napas Bisnis",
                                desc: "Menghitung berapa bulan lagi bisnis Anda bisa bertahan dengan burn rate saat ini. Bukan dihitung manual — otomatis dari data."
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">{feature.aka}</span>
                                </div>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">"No Find, No Pitch" Guarantee</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        Saya tidak menjual harapan kosong. Jika dashboard FFD™ v2 bilang bisnis Anda <strong className="text-green-500">sehat (hijau)</strong>, konsultasi selesai. <strong className="text-foreground">Gratis. Tanpa pitch apapun.</strong>
                    </p>
                    <p className="text-muted-foreground">
                        Saya hanya menawarkan solusi berbayar jika saya <em>benar-benar menemukan</em> kebocoran yang bisa diselamatkan. <br />
                        <strong className="text-foreground">Fair deal?</strong>
                    </p>
                </div>
            </section>

            {/* FAQ / Objection Handling */}
            <section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Pertanyaan yang Sering Muncul</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">Bedanya dengan Akuntan atau Konsultan Pajak?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Akuntan merapikan catatan masa lalu untuk kepatuhan (pajak, laporan). Saya adalah <strong className="text-foreground">Forensics Specialist</strong> — membedah <em>operasional</em> untuk menemukan kebocoran yang tidak tercatat di jurnal akuntansi standar. Beda bidang, beda tujuan.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left">Apa saya harus buka-bukaan data keuangan?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Hanya data operasional dasar: omzet, HPP, gaji, dan inventory (jika ada). Saya <strong className="text-foreground">tidak minta akses login bank</strong> dan tidak punya otoritas transfer apapun. Data Anda aman.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left">Kenapa cuma 5 slot per bulan?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Saya solopreneur. Setiap diagnosa saya kerjakan sendiri — <strong className="text-foreground">tidak didelegasikan ke asisten</strong>. Kualitas lebih penting dari kuantitas. Jika Anda ingin dihandle oleh saya langsung, ini batasannya.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-left">Cocok untuk bisnis saya yang masih kecil?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Jujur? <strong className="text-foreground">Belum tentu.</strong> FFD™ v2 paling efektif untuk bisnis dengan omzet minimal Rp 100 Juta/bulan dan sudah multi-outlet atau punya tim. Jika bisnis Anda masih solopreneur, mungkin belum saatnya.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Masih ada yang mengganjal?</p>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/contact">Chat Langsung via WhatsApp</Link>
                    </Button>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/20 to-background">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Siap Berhenti <span className="text-primary">Menebak-nebak</span>?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Dalam 15 menit, Anda akan tahu persis kondisi kesehatan finansial bisnis Anda. <br />
                        <strong className="text-foreground">Bukan opini. Data.</strong>
                    </p>
                    <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group">
                        <Link to="/get-access">
                            <span className="flex items-center">
                                Jadwalkan Diagnosa Gratis
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Slot terbatas. Hanya 5 diagnosa per bulan.
                    </p>
                </div>
            </section>
        </div>
    )
}
