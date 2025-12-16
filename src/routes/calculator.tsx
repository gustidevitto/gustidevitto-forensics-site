import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CurrencyInput } from '@/components/ui/currency-input'
import { usePhantomCalculator } from '@/hooks/use-phantom-calculator'
import { formatRupiah } from '@/lib/format'
import { AlertTriangle, Download, RefreshCcw } from 'lucide-react'

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
        kerugianBahanBaku,
        kerugianJamKosong,
        totalPhantomCost,
        reset
    } = usePhantomCalculator()

    const handleExport = () => {
        const csvContent = [
            ["Parameter", "Nilai (IDR)"],
            ["Omzet Bulanan", omzet],
            ["Total Biaya Bahan Baku", biayaBaku],
            ["Total Gaji Karyawan", gaji],
            ["Rata-rata Jam Kosong/Hari", jamKosong],
            ["", ""],
            ["HASIL ANALISIS", ""],
            ["Kerugian Bahan Baku (Est. 12.5%)", kerugianBahanBaku],
            ["Kerugian Produktivitas (Idle Time)", kerugianJamKosong],
            ["TOTAL PHANTOM COST", totalPhantomCost]
        ].map(e => e.join(",")).join("\n");

        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "laporan_phantom_cost.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="container py-10 max-w-4xl">
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Phantom Cost Calculator</h1>
                <p className="text-muted-foreground">
                    Hitung potensi kebocoran finansial bisnis Anda dengan metodologi forensik.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Input Data Operasional</CardTitle>
                        <CardDescription>Masukkan angka rata-rata bulanan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Omzet Bulanan (Rata-rata)</Label>
                            <CurrencyInput value={omzet} onValueChange={setOmzet} placeholder="Contoh: 100.000.000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Total Biaya Bahan Baku (HPP) / Bulan</Label>
                            <CurrencyInput value={biayaBaku} onValueChange={setBiayaBaku} placeholder="Contoh: 40.000.000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Total Gaji Karyawan / Bulan</Label>
                            <CurrencyInput value={gaji} onValueChange={setGaji} placeholder="Contoh: 25.000.000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Rata-rata Jam Nganggur (Idle) Karyawan / Hari</Label>
                            <div className="relative">
                                <CurrencyInput value={jamKosong} onValueChange={setJamKosong} placeholder="Contoh: 2" />
                                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">Jam</span>
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">Est. waktu main HP, merokok, menunggu order, dll.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={reset} className="w-full">
                            <RefreshCcw className="mr-2 h-4 w-4" /> Reset Data
                        </Button>
                    </CardFooter>
                </Card>

                {/* Result Section */}
                <div className="space-y-6">
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                Analisis Risiko
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Kerugian Bahan Baku (Waste/Theft)</span>
                                <span className="font-mono font-bold text-destructive">{formatRupiah(kerugianBahanBaku)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground -mt-3">*Estimasi standar industri (12.5% dari HPP) tanpa kontrol ketat.</p>

                            <Separator className="bg-primary/20" />

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Kerugian Produktivitas (Idle Time)</span>
                                <span className="font-mono font-bold text-destructive">{formatRupiah(kerugianJamKosong)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground -mt-3">*Biaya gaji yand dibayar untuk waktu tidak produktif.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground border-none shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg opacity-90">Total Phantom Cost / Bulan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold tracking-tight">
                                {formatRupiah(totalPhantomCost)}
                            </div>
                            <p className="text-sm opacity-80 mt-2">
                                Uang ini hilang dari profit bersih Anda setiap bulan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleExport} variant="secondary" className="w-full font-bold text-primary">
                                <Download className="mr-2 h-4 w-4" /> Download Laporan PDF/CSV
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground italic">
                        "Angka ini baru perkiraan konservatif. Dalam audit lapangan, kami sering menemukan kebocoran hingga 2x lipat dari hitungan di atas."
                        <div className="mt-2 font-bold not-italic">— Gusti Devitto</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
