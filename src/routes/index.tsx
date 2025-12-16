import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative grid place-items-center lg:grid-cols-2 gap-8 py-20 px-4 md:px-8 bg-gradient-to-br from-background via-secondary/10 to-background overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>

                <div className="flex flex-col gap-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit border border-primary/20">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Dipercaya oleh Bisnis Top</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Hentikan <span className="text-primary italic">Kebocoran</span> Finansial Bisnis Anda.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        90% bisnis kehilangan profit tanpa disadari akibat <i>Phantom Costs</i>.
                        Identifikasi, hitung, dan eliminasi biaya tersembunyi dengan metodologi forensik kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" className="text-lg h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link to="/get-access">
                                Cek Risiko Bisnis (Gratis) <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-12 px-8">
                            <Link to="/forensics-pillars">
                                Pelajari 7 Pilar Forensik
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-lg mx-auto lg:mr-0 rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 grid place-items-center group">
                    {/* Placeholder for Hero Image */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                    <div className="relative z-10 p-8 text-center">
                        <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-primary/20 shadow-xl">
                            <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Apakah Uang Anda Menguap?</h3>
                            <p className="text-muted-foreground text-sm">
                                "Biaya yang tidak terlihat adalah biaya yang paling mematikan."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Pillars Teaser */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Mengapa Forensik Bisnis?</h2>
                        <p className="text-muted-foreground">
                            Kami tidak hanya melihat laporan keuangan, kami membedah operasional untuk menemukan inefisiensi yang menggerogoti profit Anda dari dalam.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <AlertTriangle className="w-10 h-10 text-primary" />,
                                title: "Deteksi Dini",
                                desc: "Temukan 'Phantom Costs' sebelum menjadi kerugian permanen dalam neraca Anda."
                            },
                            {
                                icon: <TrendingUp className="w-10 h-10 text-primary" />,
                                title: "Optimasi Profit",
                                desc: "Ubah biaya terbuang menjadi profit margin yang sehat tanpa menambah penjualan."
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                                title: "Keamanan Sistem",
                                desc: "Bangun sistem kontrol yang tahan terhadap kebocoran dan fraud internal."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors shadow-sm">
                                <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
