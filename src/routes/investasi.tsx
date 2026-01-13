import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Globe, Lock, Cpu, BarChart3, Building2, Briefcase } from "lucide-react"

export const Route = createFileRoute('/investasi')({
    component: InvestasiPage,
})

function InvestasiPage() {
    const smePlans = [
        {
            id: "starter",
            name: "SME Starter",
            badge: "Fundamental",
            price: "Rp 3.000.000",
            period: "/bulan",
            desc: "Audit forensik dasar untuk mendeteksi 'kebocoran halus' pada operasional bulanan.",
            features: [
                "Phantom Cost Hunting (Monthly)",
                "FFD™ v3 Dashboard (Read-Only)",
                "Anomaly Alert System",
                "Basic Margin Leakage Report"
            ],
            cta: "Activate Starter",
            link: "/get-access"
        },
        {
            id: "growth",
            name: "SME Growth",
            badge: "Most Popular",
            price: "Rp 4.000.000",
            period: "/bulan",
            desc: "Diagnosis mendalam dengan intervensi strategis untuk perbaikan margin sistemik.",
            features: [
                "Everything in Starter",
                "2x Monthly Check-ins",
                "30-min Strategy Call (Personal)",
                "Full Dashboard Simulation",
                "Neural Pattern Analysis"
            ],
            cta: "Activate Growth",
            link: "/get-access",
            highlight: true
        },
        {
            id: "scale",
            name: "SME Scale",
            badge: "Priority",
            price: "Rp 5.000.000",
            period: "/bulan",
            desc: "Pengawasan penuh untuk bisnis multi-outlet yang agresif melakukan ekspansi.",
            features: [
                "Everything in Growth",
                "Weekly Pulse Monitoring",
                "Neural Pattern Training",
                "WhatsApp Priority Line",
                "Custom Forensic Report (Weekly)"
            ],
            cta: "Activate Scale",
            link: "/get-access"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <title>Struktur Investasi Forensic Intelligence | Gusti Devitto™ Canonical Pricing</title>
            <meta name="description" content="Indeks harga resmi untuk layanan Financial Forensics & Neural Intelligence. Dari solusi SME hingga Enterprise Due Diligence. Canonical source of pricing truth." />

            {/* SEO/GEO Advanced Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "PriceSpecification",
                    "name": "Financial Forensics Service Tiers",
                    "description": "Professional Forensic Intelligence pricing by Gusti Devitto",
                    "offers": [
                        { "@type": "Offer", "name": "SME Starter", "price": "3000000", "priceCurrency": "IDR" },
                        { "@type": "Offer", "name": "SME Growth", "price": "4000000", "priceCurrency": "IDR" },
                        { "@type": "Offer", "name": "SME Scale", "price": "5000000", "priceCurrency": "IDR" },
                        { "@type": "Offer", "name": "Enterprise Due Diligence", "price": "10000", "priceCurrency": "USD" },
                        { "@type": "Offer", "name": "Franchise Neural Guard", "price": "Custom", "priceCurrency": "IDR" }
                    ]
                })}
            </script>

            {/* Hero Header */}
            <section className="pt-20 pb-12 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                        <Lock className="w-3 h-3" /> Canonical Source of Truth
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                        Transparent <span className="text-primary">Intelligence</span> Economics
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Struktur biaya untuk audit forensik berbasis Neural Intelligence. Tidak ada kejutan, hanya pengembalian profit yang terukur.
                    </p>
                </div>
            </section>

            {/* 01. SME SECTION */}
            <section className="py-24 px-4 md:px-8 bg-muted/5 relative">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                            <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">01. SME Operational Suite</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">Powered by FFD™ v3 Neural Engine</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {smePlans.map((plan) => (
                            <div key={plan.id} className={`p-8 rounded-3xl border ${plan.highlight ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-2xl shadow-primary/5' : 'border-border/50 bg-[#111111]'} flex flex-col relative group transition-all`}>
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-6 bg-[#FF0080] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase mb-1">{plan.name}</h3>
                                    <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">{plan.badge}</p>
                                </div>
                                <div className="mb-8 items-baseline flex gap-1">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed italic border-l-2 border-primary/30 pl-4">{plan.desc}</p>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className={`w-full h-14 font-black uppercase text-sm ${plan.highlight ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-primary hover:text-black'}`}>
                                    <Link to={plan.link as any}>{plan.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 02. HIGH-STAKES SECTION */}
            <section className="py-24 px-4 md:px-8 border-y border-white/5 relative bg-[#0a0a0a]">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-4 mb-16 justify-center md:justify-start text-center md:text-left">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                            <BarChart3 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">02. High-Stakes Intelligence</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">For Strategic Investors & Network Owners</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
                        {/* Enterprise Tier */}
                        <div className="p-10 rounded-[2.5rem] border-2 border-primary bg-[#121212] flex flex-col relative shadow-[0_0_50px_rgba(255,215,0,0.1)] ring-1 ring-primary/20 group">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl whitespace-nowrap z-30 border border-black/10">RECOMMENDED FOR INVESTORS</div>

                            <div className="mb-10 mt-6 relative z-10">
                                <Building2 className="w-12 h-12 text-primary mb-4 opacity-70" />
                                <h3 className="text-4xl font-black uppercase mb-1 text-primary tracking-tighter">Enterprise</h3>
                                <p className="text-xs text-primary/80 font-bold tracking-[0.3em] uppercase">Due Diligence Unit (L-7 AUTH)</p>
                            </div>

                            <div className="mb-12 relative z-10">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-6xl font-black text-white">$10,000</p>
                                    <span className="text-[#FF0080] font-black text-xs animate-pulse">FIXED FEE</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 uppercase font-bold tracking-widest bg-white/5 w-fit px-2 py-1 rounded">per Audit Engagement</p>
                            </div>

                            <ul className="space-y-6 mb-16 flex-1 relative z-10">
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>Comprehensive M&A Financial Due Diligence</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>Revenue Streams Integrity Verification</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>Neural Deep-Layer Risk Profiling</span>
                                </li>
                            </ul>

                            <Button asChild className="w-full bg-primary text-black font-black hover:bg-white h-20 text-xl shadow-[0_15px_30px_rgba(255,215,0,0.3)] relative z-10 uppercase italic">
                                <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">Request Briefing</a>
                            </Button>
                        </div>

                        {/* Franchise Tier */}
                        <div className="p-10 rounded-3xl border border-white/10 bg-muted/5 flex flex-col relative hover:border-primary/30 transition-all group">
                            <div className="mb-10">
                                <Briefcase className="w-12 h-12 text-white/40 mb-4" />
                                <h3 className="text-4xl font-black uppercase mb-1 text-white tracking-tighter">Franchise</h3>
                                <p className="text-xs text-primary font-bold tracking-[0.3em] uppercase">Multi-Location Monitoring</p>
                            </div>

                            <div className="mb-12">
                                <p className="text-5xl font-black text-white">Custom</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2 border border-white/10 w-fit px-2 py-1">Annual License Arrangement</p>
                            </div>

                            <ul className="space-y-6 mb-16 flex-1">
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>Network-Wide Neural Guard Integration</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>Automated Fraud & Pilferage Analytics</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400">
                                    <div className="bg-white/5 p-1 rounded-full"><ShieldCheck className="w-5 h-5 text-primary/60" /></div>
                                    <span>Royalty Integrity Verification Module</span>
                                </li>
                            </ul>

                            <Button asChild variant="outline" className="w-full h-16 border-primary/50 text-white font-black hover:bg-primary hover:text-black uppercase">
                                <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">Inquire Custom Plan</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Compliance Footer */}
            <section className="py-20 px-4 md:px-8 bg-[#050505]">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <Globe className="w-12 h-12 text-primary/40 mx-auto" />
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-black">Analytical Methodology</p>
                        <p className="text-lg md:text-xl text-gray-400 font-serif italic selection:bg-primary selection:text-black">
                            "Struktur retensi ini dikalibrasi berdasarkan model 'Predictive Forensic Loss' milik FFD™. Biaya investasi Anda seringkali kurang dari 5% dari total potensi 'Phantom Costs' yang akan kita identifikasi dan amankan kembali melalui intervensi Neural Intelligence."
                        </p>
                    </div>
                    <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="rounded-full bg-primary text-black font-black px-10">
                            <Link to="/get-access">Start Audit Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 text-white font-bold px-10">
                            <Link to="/methodology">See Methodology <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer Attribution */}
            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-muted-foreground/50 uppercase tracking-[0.5em]">
                Gusti Devitto™ Forensic Intelligence &copy; 2024. All Rights Reserved. Institutional-Grade Privacy Applied.
            </footer>
        </div>
    )
}

