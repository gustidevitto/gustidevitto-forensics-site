import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { BadgeCheck, ShieldCheck, Activity, Microscope, Target, ArrowRight, Brain, Zap, Search } from "lucide-react"

export const Route = createFileRoute('/about-gusti-devitto')({
    component: AboutGustiDevitto,
})

function AboutGustiDevitto() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* SEO & GEO Meta Tags */}
            <title>Profile | Gusti Devitto</title>
            <meta name="description" content="Gusti Devitto (Vitto) adalah spesialis Financial Forensics untuk bisnis multi-outlet. Kreator FFD™ v3 dan Neural Pattern Auditing yang berfokus mendiagnosis Phantom Cost dan inefisiensi operasional." />

            {/* JSON-LD Schemas */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Person",
                            "@id": "https://www.gustidevitto.com/#person",
                            "name": "Gusti Devitto",
                            "alternateName": "Vitto",
                            "jobTitle": "Financial Forensics Specialist",
                            "description": "Gusti Devitto (Vitto) adalah spesialis Financial Forensics untuk bisnis multi-outlet. Kreator FFD™ v3 dan Neural Pattern Auditing yang berfokus mendiagnosis Phantom Cost dan inefisiensi operasional.",
                            "image": "https://www.gustidevitto.com/assets/images/aboutme.jpg",
                            "knowsAbout": ["Financial Auditing", "Neural Pattern Auditing", "Business Intelligence", "Phantom Cost", "Unit Economics", "Profit Optimization"],
                            "url": "https://www.gustidevitto.com/about-gusti-devitto",
                            "founder": {
                                "@type": "Organization",
                                "name": "LAPA"
                            }
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.gustidevitto.com/"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "About Gusti Devitto",
                                    "item": "https://www.gustidevitto.com/about-gusti-devitto"
                                }
                            ]
                        }
                    ]
                })}
            </script>

            {/* Hero Section - The Surgeon Profile */}
            <section className="relative py-20 px-4 md:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                </div>

                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Profile Image with Surgical Aesthetic */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl bg-card border border-border/50 overflow-hidden shadow-2xl">
                                    <img
                                        src="/assets/images/aboutme.jpg"
                                        alt="Gusti Devitto - Financial Forensics Specialist"
                                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Overlay Elements */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-md border border-primary/20 w-fit">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Auth Level: L-7 // Forensic Expert</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute -top-6 -left-6 md:top-12 md:-left-8 bg-card border border-primary/30 p-4 rounded-xl shadow-xl animate-float hidden sm:block">
                                <Activity className="w-8 h-8 text-primary mb-2" />
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Diagnosis Core</p>
                                <p className="text-xl font-black text-foreground">FFD™ v3</p>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="space-y-8 order-1 lg:order-2">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4" />
                                    The Surgeon
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                                    Meet The Surgeon: <br />
                                    <span className="text-primary">Presisi di Balik Angka</span>
                                </h1>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Halo, saya <strong className="text-foreground">Gusti Devitto</strong> (biasa dipanggil <strong className="text-foreground">Vitto</strong>).
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Saya bukan akuntan pajak, dan saya bukan perencana keuangan konvensional. Saya adalah seorang <strong className="text-primary">Financial Forensics Specialist</strong> yang berdedikasi membantu <em>founder</em> bisnis multi-outlet dan <em>brand owners</em> untuk membedah apa yang sebenarnya terjadi di balik laporan keuangan mereka.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Dalam dunia bisnis yang bergerak cepat, seringkali "bocor halus" tidak terlihat di permukaan. Fokus saya adalah menemukan kebocoran tersebut—apa yang saya sebut sebagai <strong className="text-foreground underline decoration-primary decoration-2 underline-offset-4">Phantom Costs</strong>—dan memperbaikinya sebelum menjadi pendarahan fatal.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-8 font-black tracking-wide text-lg">
                                    <Link to="/get-access">
                                        SIAP UNTUK DIAGNOSIS?
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-3 px-6 py-2 border border-border/50 rounded-xl bg-muted/20">
                                    <BadgeCheck className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-muted-foreground">Certified Forensic Methodology</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Evolution Section */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-12 items-start">
                        <div className="md:col-span-1">
                            <div className="sticky top-24 space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Evolusi: Dari LAPA ke Forensik Digital</h2>
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                Perjalanan saya tidak dimulai di ruang rapat korporat, melainkan dari lapangan. Saya mendirikan <strong className="text-foreground">LAPA</strong>, sebuah inisiatif yang awalnya menargetkan UMKM dan solopreneur rumahan.
                            </p>
                            <p className="bg-background/50 p-6 rounded-2xl border-l-4 border-primary italic">
                                "Bisnis yang sedang scaling (tumbuh membesar) memiliki risiko kematian yang jauh lebih tinggi daripada bisnis yang baru mulai."
                            </p>
                            <p>
                                Namun, dalam prosesnya, saya menemukan fakta keras: Masalahnya bukan pada penjualan, melainkan pada <strong className="text-foreground uppercase tracking-wider font-bold">Inefisiensi Tersembunyi</strong>.
                            </p>
                            <p>
                                Dari pengalaman tersebut, saya melakukan <em className="text-primary italic font-medium">pivot strategis</em>. Saya meninggalkan pendekatan generalis dan membangun sistem diagnosis mendalam yang kini menjadi fondasi layanan saya.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Section - FFD & Neural Engine */}
            <section className="py-24 px-4 md:px-8 relative overflow-hidden">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Metodologi: FFD™ & Neural Pattern Auditing</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Saya tidak percaya pada "asumsi". Saya percaya pada data yang deterministik.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                            <Brain className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4">Mendeteksi Anomali</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Menggunakan <strong className="text-foreground underline decoration-primary/30">pattern recognition</strong> untuk melihat ketidakwajaran dalam COGS (Cost of Goods Sold) dan <em className="italic">Wastage</em> yang sering tidak terdeteksi audit biasa.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                            <Activity className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4">Kesehatan Arus Kas</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Memetakan secara presisi melalui analisis <strong className="text-foreground uppercase tracking-tighter">Cash Conversion Cycle (CCC)</strong> dan <em className="italic">A-R Gaps</em> untuk memastikan likuiditas Anda nyata.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                            <Microscope className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4">Efisiensi Nyata</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Menghitung <strong className="text-foreground">Unit Economics</strong> yang presisi, termasuk LTV:CAC dan <em className="italic font-medium">Break-Even Point</em> dinamis yang menyesuaikan dengan fluktuasi market.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 space-y-6">
                        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center gap-8 shadow-inner">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <p className="text-sm font-mono text-primary uppercase font-bold tracking-[0.3em]">Proprietary Engine // FFD™ v3</p>
                                <p className="text-muted-foreground">
                                    Sistem ini bukan sekadar spreadsheet, melainkan kerangka kerja audit yang dilengkapi dengan <strong className="text-foreground">Neural Engine</strong> untuk diagnosis deterministik tingkat tinggi.
                                </p>
                            </div>
                            <Button variant="secondary" className="px-8 h-12 font-bold cursor-default">
                                Neural Pattern Auditing ACTIVE
                            </Button>
                        </div>

                        <div className="relative rounded-2xl border border-border/50 overflow-hidden shadow-2xl group">
                            <img
                                src="/assets/images/ffd1.png"
                                alt="Dashboard Preview"
                                className="w-full h-auto grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.01]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] bg-background/50 backdrop-blur-sm px-4 py-1 rounded-full border border-border/50">
                                Visual Interface: FFD™ v3 Surgical MRI
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why The Surgeon Section */}
            <section className="py-20 px-4 md:px-8 bg-muted/20 border-y border-border/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-primary/20 flex items-center justify-center text-primary shrink-0 animate-pulse">
                            <Search className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Mengapa "The Surgeon"?</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Klien saya sering menyebut pendekatan saya seperti <strong className="text-foreground">"bedah operasi"</strong>. Saya tidak memberikan "obat generik" berupa saran motivasi bisnis.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Saya masuk ke dalam data Anda, melakukan diagnosis spesifik, memotong inefisiensi (<em className="text-destructive font-medium">jaringan mati</em>), dan menjahit kembali sistem operasional Anda agar lebih sehat dan <strong className="text-primary font-bold">profitable</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Diagnostic */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto max-w-3xl text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight underline decoration-primary decoration-4 underline-offset-8">Siap untuk Diagnosis?</h2>
                        <p className="text-xl text-muted-foreground pt-4">
                            Jika Anda memiliki bisnis dengan omzet yang tumbuh tapi profit yang stagnan, mungkin saatnya kita bicara.
                        </p>
                        <p className="text-xl font-medium italic text-foreground">
                            "Bukan sebagai motivator, tapi sebagai mitra bedah data Anda."
                        </p>
                    </div>

                    <div className="pt-8">
                        <Button asChild size="lg" className="h-16 px-12 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-transform group">
                            <Link to="/get-access" className="flex items-center">
                                HUBUNGI SAYA UNTUK AUDIT AWAL
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-12">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="w-5 h-5 text-primary" />
                            <span>Focus: Multi-outlet Businesses</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span>Auth Level: L-7 Verified</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
