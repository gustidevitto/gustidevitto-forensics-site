import { createFileRoute, redirect } from '@tanstack/react-router'
import { usePhantomCalculator } from '@/hooks/use-phantom-calculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CurrencyInput } from '@/components/ui/currency-input'
import { formatRupiah } from '@/lib/format'

export const Route = createFileRoute('/calculator')({
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
    component: CalculatorComponent,
})

function CalculatorComponent() {
    const { data, setData, results } = usePhantomCalculator()

    const handleExport = () => {
        const date = new Date().toLocaleDateString('id-ID')
        let csvContent = "data:text/csv;charset=utf-8,"
        csvContent += "PHANTOM COST CALCULATOR REPORT\n"
        csvContent += `Tanggal Report,${date}\n\n`

        csvContent += "INPUT DATA\n"
        csvContent += `Omzet Kotor (Est),${data.omzetKotor}\n`
        csvContent += `Biaya Bahan Baku,${data.biayaBaku}\n`
        csvContent += `Gaji Total Karyawan,${data.gajiTotal}\n`
        csvContent += `Rata-rata Jam Kosong (Jam/Hari),${String(data.avgJamKosong).replace('.', ',')}\n\n`

        csvContent += "HASIL ANALISIS\n"
        csvContent += `Kerugian Bahan Baku (Est 12.5%),${Math.round(results.kerugianBahanBaku)}\n`
        csvContent += `Kerugian Jam Kosong,${Math.round(results.kerugianJamKosong)}\n`
        csvContent += `TOTAL PHANTOM COST,${Math.round(results.totalPhantomCost)}\n`

        // Or encodeURIComponent wrapper if needed, but encodeURI handles commas usually. 
        // Better safely:
        const safeEncodedContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent.replace("data:text/csv;charset=utf-8,", ""))

        const link = document.createElement("a")
        link.setAttribute("href", safeEncodedContent)
        link.setAttribute("download", `PCC_Report_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="container py-10 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Input Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Input Data Bisnis</CardTitle>
                        <CardDescription>
                            Masukkan estimasi angka bulanan Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Omzet Kotor Bulanan</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">Rp</span>
                                <CurrencyInput
                                    className="pl-9"
                                    value={data.omzetKotor}
                                    onValueChange={(v) => setData(prev => ({ ...prev, omzetKotor: v }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Biaya Bahan Baku Total</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">Rp</span>
                                <CurrencyInput
                                    className="pl-9"
                                    value={data.biayaBaku}
                                    onValueChange={(v) => setData(prev => ({ ...prev, biayaBaku: v }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Gaji Total Karyawan</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">Rp</span>
                                <CurrencyInput
                                    className="pl-9"
                                    value={data.gajiTotal}
                                    onValueChange={(v) => setData(prev => ({ ...prev, gajiTotal: v }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Rata-rata Jam Kosong / Hari</Label>
                            <Input
                                type="number"
                                step="0.1"
                                value={data.avgJamKosong}
                                onChange={(e) => setData(prev => ({ ...prev, avgJamKosong: parseFloat(e.target.value) || 0 }))}
                            />
                            <p className="text-xs text-muted-foreground">Total jam tidak produktif di semua outlet.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Section */}
                <div className="space-y-6">
                    <Card className="bg-destructive/10 border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Potensi Kebocoran (Phantom Cost)</CardTitle>
                            <CardDescription>
                                Total uang yang mungkin hilang setiap bulan tanpa terlacak.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-destructive">
                                {formatRupiah(results.totalPhantomCost)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Per Bulan
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Kerugian Bahan Baku</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatRupiah(results.kerugianBahanBaku)}</div>
                                <p className="text-xs text-muted-foreground">Est. 12.5% Inefisiensi</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Kerugian Jam Kosong</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatRupiah(results.kerugianJamKosong)}</div>
                                <p className="text-xs text-muted-foreground">Labor Efficiency Loss</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Rekomendasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Angka ini menunjukkan inisiatif perbaikan yang harus dilakukan segera.
                                Forensik lebih dalam diperlukan untuk menutup celah ini.
                            </p>
                            <div className="flex flex-col gap-2">
                                <Button className="w-full" size="lg" onClick={() => window.open('https://wa.me/6281234567890', '_blank')}>
                                    Jadwalkan Bedah Bisnis (Audit)
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleExport}>
                                    Export Laporan (CSV)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
