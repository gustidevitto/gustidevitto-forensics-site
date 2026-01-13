import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign, Clock, Target, BadgeCheck, Activity, Microscope } from "lucide-react"
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
            title: 'FFD™ v3 — 15-Minute MRI',
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
            <title>Stop Guessing. Start Auditing. | Gusti Devitto™ Forensic Intelligence</title>
            <meta name="description" content="Institutional-grade forensic intelligence for SME owners & investors. Deteksi kebocoran profit bisnis multi-outlet (Bakso, Retail, F&B) dengan Neural AI. Financial Due Diligence Indonesia & Franchise Fraud Detection." />
            <meta name="keywords" content="Financial Due Diligence Indonesia, Franchise Fraud Detection, Neural Financial Audit, Forensic Accounting Tool for Investors, Audit UMKM, Kebocoran Profit, Phantom Cost Hunting" />
            <meta property="og:title" content="Gusti Devitto™ - Institutional-Grade Forensic Intelligence" />
            <meta property="og:description" content="Detect what accountants miss. 15-Minute Financial Diagnosis for multi-outlet owners (SME) and enterprise investors. Stop profit leakage now." />

            {/* Previous Schema Stays, maybe update it later if needed */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Apa itu Business Forensics di sini?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Business Forensics kami berfokus pada Phantom Cost Hunting (pencarian biaya siluman), bukan audit fraud kriminal. Kami mencari inefisiensi sistemik yang memakan profit sebelum menjadi kegagalan fatal."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Apakah ini tentang penipuan (fraud)?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Secara tradisional, financial forensics identik dengan investigasi kriminal. Namun, framework Gusti Devitto adalah ekstensi hulu yang berfokus pada diagnosa awal sebelum fraud terjadi (pre-fraud diagnostics) dengan mendeteksi kebocoran profit sistemik."
                            }
                        }
                    ]
                })}
            </script>
            {/* Hero Section - The Split-Gate */}
            <section id="owners" className="relative grid place-items-center lg:grid-cols-2 gap-8 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="flex flex-col gap-6 max-w-2xl animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black tracking-[0.2em] w-fit border border-primary/20 backdrop-blur-sm uppercase">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Auth Level: L-7 // Forensic Intelligence Unit</span>
                    </div>

                    {/* Headline - Institutional Grade */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.9] uppercase">
                        Stop Guessing. <br />
                        Start Auditing. <br />
                        <span className="text-primary">Institutional-Grade <br />Forensic Intelligence.</span>
                    </h1>

                    {/* Subheadline - Dual Segment Logic */}
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Whether you're a multi-outlet owner losing cash or an investor auditing a $10M target, <strong className="text-foreground font-bold">FFD™ v3 detects what accountants miss.</strong> Neural-powered. Private. 15-Minute Diagnosis.
                    </p>

                    {/* CTA - Side-by-Side Dual Logic */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" className="text-lg h-16 px-10 shadow-lg shadow-primary/30 bg-yellow-500 hover:bg-yellow-600 text-black font-black group relative overflow-hidden flex-1">
                            <Link to="/get-access">
                                <span className="relative z-10 flex items-center justify-center">
                                    JALANKAN GRATIS FFD
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-16 px-10 border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 text-amber-500 font-bold flex-1">
                            <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">
                                REQUEST ENTERPRISE DEMO
                            </a>
                        </Button>
                    </div>

                    {/* Guarantee Badge */}
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <BadgeCheck className="w-5 h-5 text-green-500" />
                        <span><strong className="text-foreground">Sovereign Standard</strong> — Data remains local. Direct access to FFD™ Proprietary Engine.</span>
                    </div>
                </div>

                {/* Hero Visual - The Carousel */}
                <div className="relative w-full max-w-xl mx-auto lg:mr-0 animate-slide-up h-[400px] flex items-center">
                    <div className="relative w-full h-[360px] overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-2xl">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'}`}
                            >
                                <div className="h-full flex flex-col">
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
                                            <div className="h-full relative">
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
                    </div>

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

                    {/* Floating ROI Box (Replaces Capacity Badge) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-black border border-amber-500/50 rounded-xl px-6 py-4 shadow-2xl animate-float z-20 hidden sm:block">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em] leading-none mb-1">Risk Intelligence</p>
                            <p className="text-xl font-black text-white">ROI: 15,000%</p>
                            <p className="text-[9px] text-muted-foreground max-w-[120px] leading-tight mt-1">
                                Finding a $1M leak for a $10K audit fee isn't math; it's survival.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Section: The Forensic Shield (Tier 1 & 2 Positioning) */}
            <section id="investors" className="py-20 px-4 md:px-8 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">
                            Beyond Small Business Optimization: <br />
                            <span className="text-amber-500">Risk Intelligence for High-Stakes Decisions.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-amber-500 uppercase">M&A Due Diligence</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Detect financial manipulation, revenue inflation, and cooked books before signing acquisition deals. <strong className="text-white">90% cheaper than Big 4 audits.</strong>
                            </p>
                        </div>
                        <div id="franchise" className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-amber-500 uppercase">Franchise Monitoring</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Real-time fraud detection across 100+ locations. Flag underreporting franchisees automatically using <strong className="text-white">Neural AI.</strong>
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-amber-500 uppercase">Loan Underwriting</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Statistical anomaly detection for banks and lenders to verify borrower health in <strong className="text-white">minutes, not weeks.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof & Authority: Trusted By */}
            <section className="py-12 border-y border-border/50 bg-background">
                <div className="container mx-auto px-4">
                    <p className="text-center text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase mb-8">Piloted with / Trusted by</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {/* Grayscale Placeholders for Logos */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">FINANCIAL UNIT A</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">INVESTOR GROUP B</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">RETAIL CHAIN C</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">FRANCHISE HQ D</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diagnostic Triage Teaser */}
            <section className="py-12 px-4 md:px-8 relative z-30 -mt-10 md:-mt-16">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                step: "01",
                                title: "Pilih Gejala",
                                desc: "Omzet ramai tapi kas tiris? Atau tim sibuk tapi profit stagnan?",
                                icon: <Activity className="w-5 h-5" />
                            },
                            {
                                step: "02",
                                title: "Input Data",
                                desc: "Ketik variabel dasar bisnis Anda ke dalam PCC Lite Diagnostic.",
                                icon: <Microscope className="w-5 h-5" />
                            },
                            {
                                step: "03",
                                title: "Lihat Verdict",
                                desc: "Dapatkan diagnosa instan: Apakah bisnis Anda sehat atau bocor?",
                                icon: <Target className="w-5 h-5" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl hover:border-primary/50 transition-all backdrop-blur-xl">
                                <div className="absolute top-4 right-6 text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">{item.step}</div>
                                <div className="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
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
                        <div className="text-sm text-muted-foreground">Bisnis Terdiagnosis</div>
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
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Kenapa Saya Membangun Ini?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Saya pernah berada di posisi Anda. Founder <strong className="text-foreground">Dachicken Indonesia</strong> — pioneer ayam panggang utuh 9 rasa pertama di Semarang. Saat pandemi menghantam dan banyak bisnis tumbang, Dachicken justru <strong className="text-primary">meroket</strong>.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Seminggu sekali saya bisa belanja aset perhiasan emas hasil dari antrean yang tak putus. Saya merasa telah menaklukkan badai.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                <strong className="text-destructive uppercase tracking-wide font-bold">Tapi saya membangun istana di atas pasir.</strong> Saat kompetitor raksasa datang membanting harga secara tidak masuk akal, saya sadar: saya tidak punya pertahanan finansial.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Aset perhiasan yang saya kumpulkan habis ludes demi menyelamatkan usaha yang hancur, tapi tetap gagal.
                            </p>
                            <p className="text-foreground leading-relaxed font-medium bg-primary/5 p-4 border-l-4 border-primary italic">
                                "Saya kehilangan mimpi itu bukan karena produk yang buruk, tapi karena saya buta terhadap pendarahan finansial di dalam. Itulah alasan saya mendirikan FFD™ v3—agar Anda tidak perlu membayar harga semahal yang saya bayar."
                            </p>
                            <div className="pt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">— <strong>Gusti Devitto (Vitto)</strong> | Financial Surgeon</p>
                                <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0 h-auto">
                                    <Link to="/about-gusti-devitto" className="flex items-center gap-1">
                                        Read Full Story <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </Button>
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
                                title: "OBESE GROWTH.",
                                symptom: "HIGH ALERT",
                                desc: "Omzet naik, tapi kas tiris. Semakin besar kamu tumbuh, semakin besar kamu merampok dirimu sendiri."
                            },
                            {
                                icon: <Users className="w-10 h-10 text-destructive" />,
                                title: "LABOR TRAP ANALYSIS.",
                                symptom: "EFFICIENCY LEAK",
                                desc: "Tim terlihat sibuk, tapi profit per jam kerja nol. Kamu sedang menjalankan panti sosial berkedok bisnis."
                            },
                            {
                                icon: <DollarSign className="w-10 h-10 text-destructive" />,
                                title: "PHANTOM PROFIT REVELATION.",
                                symptom: "FINANCIAL ILLUSION",
                                desc: "Profit di laporan hanyalah angka ego. Jika uangnya tidak ada di rekening, itu bukan profit, itu ilusi."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-card p-8 rounded-xl border border-border/50 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/5 hover:-translate-y-1"
                            >
                                <div className="mb-6 bg-destructive/10 w-fit p-4 rounded-xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                <p className="text-[10px] tracking-widest text-primary font-black mb-2 uppercase">{item.symptom}</p>
                                <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
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

            {/* The Solution - FFD v3 Dashboard Visual */}
            <section className="py-24 px-4 md:px-8 bg-muted/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                            <Target className="w-4 h-4" />
                            <span>The Surgical Tool</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">FFD™ v3: The Ultimate Dashboard</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Bukan sekadar spreadsheet. Ini adalah <strong className="text-foreground">Sistem Operasi Finansial</strong> — infrastruktur modular untuk mengunci setiap rupiah di tempatnya.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Features List */}
                        <div className="lg:col-span-5 space-y-4">
                            {[
                                {
                                    title: "Scenario Simulator",
                                    aka: "Mode 'Dukun'",
                                    desc: "Prediksi masa depan. Lihat apa yang terjadi pada profit jika Anda naikkan harga 5% atau tekan COGS."
                                },
                                {
                                    title: "15-Pillar Modular System",
                                    aka: "Advanced Diagnosis",
                                    desc: "Membedah anatomi bisnis dari Inventory Decay hingga LTGP Velocity secara brutal."
                                },
                                {
                                    title: "Phantom Cost Detector",
                                    aka: "Pemburu Uang Siluman",
                                    desc: "Menemukan kebocoran halus yang tidak tercatat: pungli, waste, dan inefisiensi tim."
                                },
                                {
                                    title: "Real-time Cash Runway",
                                    aka: "Sisa Napas Bisnis",
                                    desc: "Menghitung berapa bulan lagi bisnis Anda bisa bertahan dengan burn rate saat ini."
                                }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-base">{feature.title}</h3>
                                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{feature.aka}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dashboard Visual */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative rounded-2xl border border-primary/20 overflow-hidden shadow-2xl bg-background">
                                <img
                                    src="/assets/images/ffd.png"
                                    alt="FFD™ v3 Financial Forensics Dashboard"
                                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700"
                                />
                                {/* Scanning Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan pointer-events-none"></div>

                                {/* UI Tags */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-white/90">LIVE FEED: DIAGNOSTIC ACTIVE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Transparency Section */}
            <section id="pricing" className="py-24 px-4 md:px-8 border-t border-border/50 bg-background relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase">Transparent Intelligence Economics</h2>
                        <p className="text-muted-foreground text-lg">Predictable pricing for precise forensic intervention.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* SME Tier */}
                        <div className="p-8 rounded-2xl border border-border/50 bg-card/50 flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-xl font-black uppercase mb-1">SME Tier</h3>
                                <p className="text-xs text-primary font-bold tracking-widest uppercase">CFO-as-a-Service</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black">Rp 3jt - 5jt</p>
                                <p className="text-xs text-muted-foreground">per month / engagement</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Phantom Cost Hunting</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Monthly Operational MRI</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Margin Optimization</li>
                            </ul>
                            <Button asChild className="w-full bg-primary text-primary-foreground font-black">
                                <Link to="/get-access">ACTIVATE SME AUDIT</Link>
                            </Button>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="p-8 rounded-2xl border-2 border-amber-500 bg-black text-white relative flex flex-col scale-105 shadow-2xl">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-tighter">Recommended for Investors</div>
                            <div className="mb-6">
                                <h3 className="text-xl font-black uppercase mb-1 text-amber-500">Enterprise Tier</h3>
                                <p className="text-xs text-amber-500/80 font-bold tracking-widest uppercase">Due Diligence Intelligence</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black">$10,000</p>
                                <p className="text-xs text-gray-400">per Audit Engagement</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-500" /> Full M&A Due Diligence</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-500" /> Revenue Integrity Verification</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-500" /> Deep-Layer Neural Scan</li>
                            </ul>
                            <Button asChild className="w-full bg-amber-500 text-black font-black hover:bg-amber-600">
                                <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">BOOK ENTERPRISE AUDIT</a>
                            </Button>
                        </div>

                        {/* Franchise Tier */}
                        <div className="p-8 rounded-2xl border border-border/50 bg-card/50 flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-xl font-black uppercase mb-1">Franchise Tier</h3>
                                <p className="text-xs text-primary font-bold tracking-widest uppercase">Network Monitoring License</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black">Custom</p>
                                <p className="text-xs text-muted-foreground">Annual License Arrangement</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Multi-Outlet Neural Guard</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Automated Fraud Flagging</li>
                                <li className="text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Royalty Integrity Units</li>
                            </ul>
                            <Button asChild variant="outline" className="w-full border-primary/50 text-primary font-black hover:bg-primary/10">
                                <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">INQUIRE CUSTOM PLAN</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">"No Find, No Pitch" Guarantee</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        Saya tidak menjual harapan kosong. Jika dashboard FFD™ v3 bilang bisnis Anda <strong className="text-green-500">sehat (hijau)</strong>, konsultasi selesai. <strong className="text-foreground">Gratis. Tanpa pitch apapun.</strong>
                    </p>
                    <p className="text-muted-foreground">
                        Saya hanya menawarkan solusi berbayar jika saya <em>benar-benar menemukan</em> kebocoran yang bisa diselamatkan. <br />
                        <strong className="text-foreground">Fair deal?</strong>
                    </p>
                </div>
            </section>

            {/* Scientific Attribution Section */}
            <section className="py-16 px-4 md:px-8 border-y border-border/50 bg-muted/20">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black tracking-[0.2em] w-fit mx-auto border border-primary/20 backdrop-blur-sm uppercase">
                        Scientific Attribution
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed font-serif max-w-3xl mx-auto">
                        "While conventional financial forensics is traditionally defined as the investigation of fraud, crime, and financial litigation, Gusti Devitto’s Financial Forensics framework is a deliberate upstream extension. It focuses on systemic leakage and pre-fraud diagnostics—identifying the 'Phantom Costs' that erode margins before they become catastrophic. This methodology is proprietary and functions as the analytical core of FFD™ v3."
                    </p>
                </div>
            </section>

            {/* FAQ / Objection Handling */}
            <section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Pertanyaan yang Sering Muncul</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-0">
                        <AccordionTrigger className="text-left font-bold">Apakah ini tentang penipuan (fraud)?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Secara tradisional, <em>financial forensics</em> identik dengan investigasi kriminal atau fraud. Namun, framework Gusti Devitto adalah <strong className="text-foreground">ekstensi hulu (upstream extension)</strong> yang berfokus pada diagnosa awal sebelum fraud terjadi (<em>pre-fraud diagnostics</em>). Kami mencari kebocoran sistemik dan <em>Phantom Costs</em> yang memakan margin Anda secara halus, bukan sekadar mencari pelaku kejahatan. Fokus kami adalah penyelamatan profit melalui efisiensi sistemis.
                        </AccordionContent>
                    </AccordionItem>
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
                            Setiap diagnosis saya kerjakan sendiri — <strong className="text-foreground">tidak didelegasikan ke asisten</strong>. Kualitas lebih penting dari kuantitas. Jika Anda ingin dihandle oleh saya langsung, ini batasannya.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-left">Cocok untuk bisnis saya yang masih kecil?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            Jujur? <strong className="text-foreground">Belum tentu.</strong> FFD™ v3 paling efektif untuk bisnis dengan omzet minimal Rp 100 Juta/bulan dan sudah multi-outlet atau punya tim. Jika bisnis Anda masih solopreneur, mungkin belum saatnya.
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
                    <p className="text-lg text-muted-foreground mb-4">
                        Dalam 15 menit, Anda akan tahu persis kondisi kesehatan finansial bisnis Anda. <br />
                        <strong className="text-foreground">Bukan opini. Data.</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto italic">
                        "Jika dalam 15 menit saya tidak menemukan potensi kebocoran minimal Rp10 Juta di bisnis Anda, sesi selesai. Saya tidak akan membuang waktu Anda."
                    </p>
                    <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group">
                        <Link to="/get-access">
                            <span className="flex items-center font-black">
                                STOP THE BLEEDING NOW
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Slot terbatas. <strong className="text-foreground">No Find, No Pitch</strong> Guarantee.
                    </p>
                </div>
            </section>
        </div>
    )
}
