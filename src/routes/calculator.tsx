import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CurrencyInput } from '@/components/ui/currency-input'
import { usePhantomCalculator } from '@/hooks/use-phantom-calculator'
import { formatRupiah } from '@/lib/format'
import { AlertTriangle, Download, RefreshCcw, ArrowRight, TrendingDown } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/calculator')({
    component: Calculator,
    beforeLoad: ({ location }) => {
        const token = localStorage.getItem('pcc_session_token')
        if (!token) {
            throw redirect({
                to: '/get-access',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

function Calculator() {
    const {
        omzet, setOmzet,
        biayaBaku, setBiayaBaku,
        gaji, setGaji,
        jamKosong, setJamKosong,
        biayaLain, setBiayaLain,
        kerugianBahanBaku,
        kerugianJamKosong,
        totalPhantomCost,
        reset
    } = usePhantomCalculator()

    // Calculate severity level
    const getSeverity = () => {
        if (totalPhantomCost === 0) return { level: 'neutral', label: 'Masukkan data', color: 'text-muted-foreground' }
        if (totalPhantomCost < 5000000) return { level: 'low', label: 'Ringan', color: 'text-green-500' }
        if (totalPhantomCost < 20000000) return { level: 'medium', label: 'Perlu Perhatian', color: 'text-yellow-500' }
        if (totalPhantomCost < 50000000) return { level: 'high', label: 'Serius', color: 'text-orange-500' }
        return { level: 'critical', label: 'Kritis', color: 'text-destructive' }
    }

    const severity = getSeverity()

    const handleExport = () => {
        const csvContent = [
            ["Parameter", "Nilai (IDR)"],
            ["Omzet Bulanan", omzet],
            ["Total Biaya Bahan Baku", biayaBaku],
            ["Total Gaji Karyawan", gaji],
            ["Rata-rata Jam Kosong/Hari", jamKosong],
            ["Biaya Siluman (Pungli/Lainnya)", biayaLain],
            ["", ""],
            ["HASIL ANALISIS", ""],
            ["Kerugian Bahan Baku (Est. 12.5%)", kerugianBahanBaku],
            ["Kerugian Produktivitas (Idle Time)", kerugianJamKosong],
            ["Biaya Siluman Terinput", biayaLain],
            ["TOTAL PHANTOM COST", totalPhantomCost],
            ["", ""],
            ["", ""],
            ["CATATAN PENTING", ""],
            ["Angka di atas adalah ESTIMASI KONSERVATIF.", ""],
            ["Dalam audit lapangan, kebocoran sebenarnya sering 2x lipat.", ""],
            ["", ""],
            ["LANGKAH SELANJUTNYA", ""],
            ["1. Jadwalkan 15-Minute MRI dengan Vitto", ""],
            ["2. Kunjungi: gustidevitto.com/investasi", ""],
            ["3. Atau WhatsApp: 0889-544-0515", ""]
        ].map(e => e.join(",")).join("\n");

        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "phantom_cost_analysis.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="container py-10 max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="mb-10 text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                    <TrendingDown className="w-4 h-4" />
                    <span>Phantom Cost Calculator</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Hitung "Uang Siluman" Anda</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Masukkan data operasional bulanan. Dalam hitungan detik, Anda akan melihat seberapa besar <strong className="text-foreground">uang yang diam-diam bocor</strong> setiap bulan.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <Card className="h-fit border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                            Input Data Operasional
                        </CardTitle>
                        <CardDescription>Gunakan rata-rata bulanan. Tidak perlu akurat 100%.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="font-medium">Omzet Bulanan (Rata-rata)</Label>
                            <CurrencyInput value={omzet} onValueChange={setOmzet} placeholder="Contoh: 100.000.000" />
                            <p className="text-[0.75rem] text-muted-foreground">Total penjualan kotor per bulan</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-medium">Total HPP / Biaya Bahan Baku</Label>
                            <CurrencyInput value={biayaBaku} onValueChange={setBiayaBaku} placeholder="Contoh: 40.000.000" />
                            <p className="text-[0.75rem] text-muted-foreground">Cost of Goods Sold (COGS) per bulan</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-medium">Total Gaji Karyawan</Label>
                            <CurrencyInput value={gaji} onValueChange={setGaji} placeholder="Contoh: 25.000.000" />
                            <p className="text-[0.75rem] text-muted-foreground">Total payroll semua karyawan per bulan</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-medium">Jam "Nganggur" Rata-rata / Hari</Label>
                            <div className="relative">
                                <CurrencyInput value={jamKosong} onValueChange={setJamKosong} placeholder="Contoh: 2" />
                                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">Jam</span>
                            </div>
                            <p className="text-[0.75rem] text-muted-foreground">Est. main HP, ngobrol, nunggu order, dll.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-medium">Biaya Operasional "Siluman" / Bulan</Label>
                            <CurrencyInput value={biayaLain} onValueChange={setBiayaLain} placeholder="Contoh: 2.000.000" />
                            <p className="text-[0.75rem] text-muted-foreground">Pungli, retribusi tidak resmi, tips, parkir liar, koordinasi, dll.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={reset} className="w-full">
                            <RefreshCcw className="mr-2 h-4 w-4" /> Reset Semua
                        </Button>
                    </CardFooter>
                </Card>

                {/* Result Section */}
                <div className="space-y-6">
                    {/* Analysis Card */}
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm font-bold">2</span>
                                Hasil Analisis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                                <div>
                                    <span className="text-sm text-muted-foreground">Kerugian Bahan Baku</span>
                                    <p className="text-xs text-muted-foreground">(Waste, Theft, Shrinkage)</p>
                                </div>
                                <span className="font-mono font-bold text-lg text-destructive">{formatRupiah(kerugianBahanBaku)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground px-1">*Estimasi 12.5% dari HPP — standar industri tanpa kontrol ketat</p>

                            <Separator />

                            <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                                <div>
                                    <span className="text-sm text-muted-foreground">Kerugian Produktivitas</span>
                                    <p className="text-xs text-muted-foreground">(Idle Time Cost)</p>
                                </div>
                                <span className="font-mono font-bold text-lg text-destructive">{formatRupiah(kerugianJamKosong)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground px-1">*Gaji yang dibayar untuk waktu tidak produktif</p>
                        </CardContent>
                    </Card>

                    {/* Total Card - Dramatic */}
                    <Card className="bg-gradient-to-br from-destructive/90 to-destructive text-destructive-foreground border-none shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                        <CardHeader className="pb-2 relative">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg opacity-90">Total Phantom Cost / Bulan</CardTitle>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/20 ${severity.color}`}>
                                    {severity.label}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-4xl md:text-5xl font-bold tracking-tight">
                                {formatRupiah(totalPhantomCost)}
                            </div>
                            <p className="text-sm opacity-80 mt-2">
                                Uang ini <strong>hilang dari profit bersih</strong> Anda setiap bulan.
                            </p>
                            {totalPhantomCost > 0 && (
                                <p className="text-sm opacity-70 mt-1">
                                    = <strong>{formatRupiah(totalPhantomCost * 12)}</strong> per tahun
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="relative">
                            <Button onClick={handleExport} variant="secondary" className="w-full font-bold text-destructive">
                                <Download className="mr-2 h-4 w-4" /> Download Laporan (.csv)
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Quote & CTA */}
                    <div className="bg-card border border-border/50 p-6 rounded-xl space-y-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                    "Angka di atas baru <strong className="text-foreground">estimasi konservatif</strong>. Dalam audit lapangan, saya sering menemukan kebocoran hingga 2x lipat dari hitungan permukaan."
                                </p>
                                <p className="text-sm font-medium mt-2">— Vitto</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="text-center space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Ingin tahu <strong className="text-foreground">kebocoran sebenarnya</strong>?
                            </p>
                            <Button asChild size="lg" className="w-full group">
                                <Link to="/investasi">
                                    Jadwalkan 15-Minute MRI
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
