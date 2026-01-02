import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CurrencyInput } from '@/components/ui/currency-input'
import { usePhantomCalculator } from '@/hooks/use-phantom-calculator'
import { formatRupiah } from '@/lib/format'
import { AlertTriangle, Download, RefreshCcw, ArrowRight, TrendingDown, Activity, Microscope, Target, Zap, DollarSign, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

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

    const [isBooting, setIsBooting] = useState(true)
    const [bootLines, setBootLines] = useState<string[]>([])
    const [phase, setPhase] = useState(1) // 1: Core, 2: Labor, 3: Hidden
    const [isCalculating, setIsCalculating] = useState(false)

    // Boot Sequence Effect
    useEffect(() => {
        const lines = [
            "INITIALIZING SURGICAL ENVIRONMENT...",
            "ALLOCATING VOLATILE MEMORY...",
            "CONNECTING TO FFD™v3 CORE CLUSTER...",
            "SESSION AUTHENTICATED // BYPASS IDENTIFIED",
            "MAPPING OPERATIONAL VECTORS...",
            "READY FOR DIAGNOSTIC MRI."
        ]

        let currentLine = 0
        const interval = setInterval(() => {
            if (currentLine < lines.length) {
                setBootLines(prev => [...prev, lines[currentLine]])
                currentLine++
            } else {
                clearInterval(interval)
                setTimeout(() => setIsBooting(false), 800)
            }
        }, 400)

        return () => clearInterval(interval)
    }, [])

    const getSeverity = () => {
        if (totalPhantomCost === 0) return { level: 'neutral', label: 'IDLE', color: 'text-muted-foreground' }
        const ratio = totalPhantomCost / (omzet || 1)
        if (ratio < 0.05) return { level: 'low', label: 'STABLE', color: 'text-green-500' }
        if (ratio < 0.15) return { level: 'medium', label: 'WARNING', color: 'text-yellow-500' }
        if (ratio < 0.25) return { level: 'high', label: 'SERIOUS', color: 'text-orange-500' }
        return { level: 'critical', label: 'CRITICAL LEAK', color: 'text-destructive' }
    }

    const severity = getSeverity()

    const handleNextPhase = () => {
        if (phase < 3) setPhase(phase + 1)
        else {
            setIsCalculating(true)
            setTimeout(() => setIsCalculating(false), 2000)
        }
    }

    const handleExport = () => {
        const csvContent = [
            ["Parameter", "Nilai (IDR)"],
            ["Omzet Bulanan", omzet],
            ["Total Biaya Bahan Baku", biayaBaku],
            ["Total Gaji Karyawan", gaji],
            ["Rata-rata Jam Kosong/Hari", jamKosong],
            ["Biaya Siluman (Pungli/Lainnya)", biayaLain],
            ["", ""],
            ["HASIL ANALISIS PCC LITE", ""],
            ["Kerugian Bahan Baku (Waste/Theft)", kerugianBahanBaku],
            ["Kerugian Jam Kosong (Labor Idle)", kerugianJamKosong],
            ["Biaya Siluman Terinput", biayaLain],
            ["TOTAL PHANTOM COST", totalPhantomCost],
            ["SEVERITY", severity.label],
            ["", ""],
            ["DISCLAIMER: Ini adalah versi LITE (PCC).", ""],
            ["FDD™v3 Full Analysis mencakup 15 Pilar Forensics.", ""],
            ["", ""],
            ["LANGKAH SELANJUTNYA", ""],
            ["1. Jadwalkan 15-Minute MRI dengan Vitto", ""],
            ["2. Kunjungi: gustidevitto.com/investasi", ""]
        ].map(e => e.join(",")).join("\n");

        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `PCC_Lite_Verdict_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (isBooting) {
        return (
            <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 font-mono overflow-hidden">
                <div className="max-w-md w-full space-y-2">
                    {bootLines.map((line, i) => (
                        <div key={i} className="text-primary text-sm tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">
                            {`> ${line}`}
                        </div>
                    ))}
                    <div className="pt-4 flex items-center gap-3">
                        <div className="w-full bg-primary/20 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-primary animate-[scanline_2s_linear_infinite]" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-8 md:px-8 space-y-12 animate-fade-in">
            <title>PCC Lite - Phantom Cost Calculator</title>

            {/* Header Branding */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
                            Auth Level: L-1 (PCC Tier)
                        </div>
                        <div className="px-2 py-0.5 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                            Core Engine: Active
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">PHANTOM COST <span className="text-primary">DIAGNOSTIC BAY</span></h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium">PCC Lite v1.2 // Rapid Profit Leakage Detection</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">System Status</p>
                        <p className="text-xs font-mono text-green-500 uppercase">Operational // Secured</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => { reset(); setPhase(1); }} className="rounded-full">
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {isCalculating ? (
                <div className="py-24 flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Zap className="w-16 h-16 text-primary animate-status-blink" />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-widest uppercase">Analyzing Operational Vectors...</h2>
                        <p className="text-muted-foreground font-mono text-sm">Synthesizing Ghost Profit Patterns</p>
                    </div>
                </div>
            ) : totalPhantomCost > 0 && phase === 3 ? (
                // RESULT DASHBOARD (DASHBOARD MODE)
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
                    {/* Surgical Alarms */}
                    <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-16 h-16 text-destructive" />
                        </div>
                        <h3 className="text-xs font-black text-destructive uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Active Surgical Alarms
                        </h3>
                        <div className="space-y-3">
                            {severity.level === 'critical' || severity.level === 'high' ? (
                                <div className="flex items-start gap-3 text-destructive animate-status-blink">
                                    <span className="font-mono text-sm underline">[ CRITICAL ]</span>
                                    <p className="text-sm font-bold">Phantom Cost terdeteksi melebihi ambang batas toleransi (Ratio &gt; 15%). Dibutuhkan intervensi FDD™v3 segera.</p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <span className="font-mono text-sm text-green-500">[ NORMAL ]</span>
                                    <p className="text-sm">Kebocoran operasional terdeteksi namun masih dalam range audit mandiri.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dashboard Grid - Vital Signs */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Vital 1: Revenue Velocity */}
                        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Revenue Flow</p>
                                <DollarSign className="w-4 h-4 text-primary opacity-50" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight">{formatRupiah(omzet)}</h4>
                            <div className="pt-2 border-t border-border/50 font-mono text-[10px] text-muted-foreground uppercase">
                                System Status: Operational
                            </div>
                        </div>

                        {/* Vital 2: Leakage Pressure */}
                        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 space-y-4 shadow-xl shadow-destructive/5 ring-1 ring-destructive/20">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-destructive uppercase tracking-widest">Monthly Leakage</p>
                                <TrendingDown className="w-4 h-4 text-destructive" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight text-destructive">{formatRupiah(totalPhantomCost)}</h4>
                            <div className="pt-2 border-t border-destructive/10 font-mono text-[10px] text-destructive/70 uppercase">
                                Verdict: {severity.label}
                            </div>
                        </div>

                        {/* Vital 3: Annual Exposure */}
                        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Annual Loss (Est)</p>
                                <Zap className="w-4 h-4 text-yellow-500 opacity-50" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight">{formatRupiah(totalPhantomCost * 12)}</h4>
                            <div className="pt-2 border-t border-border/50 font-mono text-[10px] text-muted-foreground uppercase tracking-tighter">
                                Projection: 12 Month Recovery Needed
                            </div>
                        </div>
                    </div>

                    {/* Breakdown & Next Steps */}
                    <div className="grid lg:grid-cols-5 gap-8">
                        <Card className="lg:col-span-3 border-border/50 bg-card/30 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                                    <Microscope className="w-4 h-4 text-primary" /> Forensic Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">Waste & Shrinkage (HPP)</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatRupiah(kerugianBahanBaku)}</span>
                                    </div>
                                    <Separator className="bg-border/30" />
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">Idle Time Cost (Labor)</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatRupiah(kerugianJamKosong)}</span>
                                    </div>
                                    <Separator className="bg-border/30" />
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">Hidden Operational Costs</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatRupiah(biayaLain)}</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                                        "Ini adalah audit level PCC Lite. FDD™v3 yang lebih dalam akan membedah hingga 15 Pilar Forensics (termasuk LTGP, Cash Lock, dan LTV:CAC)."
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleExport} variant="outline" className="w-full border-primary/20 hover:bg-primary/5 group">
                                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Export Final Verdict (.csv)
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                <CardHeader>
                                    <CardTitle>Bongkar Lebih Dalam</CardTitle>
                                    <CardDescription className="text-primary-foreground/80 font-medium">Jangan biarkan angka ini tetap membengkak.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed mb-6">
                                        Hubungi Vitto untuk melakukan <strong>Surgical MRI</strong> menggunakan sistem <strong>FDD™v3 Full Version</strong> secara personal.
                                    </p>
                                    <Button asChild variant="secondary" className="w-full font-bold h-12">
                                        <Link to="/investasi">
                                            Jadwalkan 15-Min MRI
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Button variant="ghost" onClick={() => { setPhase(1); reset(); }} className="w-full text-muted-foreground hover:text-foreground">
                                <RefreshCcw className="mr-2 h-3 w-3" /> Re-Scan Operational Data
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                // WIZARD MODE (INPUT PHASES)
                <div className="max-w-2xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-2">
                            {[1, 2, 3].map(step => (
                                <div
                                    key={step}
                                    className={`h-1.5 w-12 rounded-full transition-all ${step <= phase ? 'bg-primary' : 'bg-muted'}`}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Phase 0{phase} / 03</span>
                    </div>

                    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-md">
                        <CardHeader className="space-y-4">
                            {phase === 1 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <TrendingDown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">PHASE 1: SCALE CORE</CardTitle>
                                        <CardDescription>Menentukan volume bisnis dan intensitas biaya bahan baku.</CardDescription>
                                    </div>
                                </>
                            )}
                            {phase === 2 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">PHASE 2: LABOR VITALS</CardTitle>
                                        <CardDescription>Menganalisis efisiensi penggunaan sumber daya manusia.</CardDescription>
                                    </div>
                                </>
                            )}
                            {phase === 3 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">PHASE 3: HIDDEN VECTORS</CardTitle>
                                        <CardDescription>Identifikasi kebocoran operasional yang tidak direncanakan.</CardDescription>
                                    </div>
                                </>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6 py-8">
                            {phase === 1 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Average Monthly Revenue</Label>
                                        <CurrencyInput value={omzet} onValueChange={setOmzet} placeholder="IDR 0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Total COGS (Bahan Baku)</Label>
                                        <CurrencyInput value={biayaBaku} onValueChange={setBiayaBaku} placeholder="IDR 0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                </div>
                            )}
                            {phase === 2 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Total Monthly Payroll</Label>
                                        <CurrencyInput value={gaji} onValueChange={setGaji} placeholder="IDR 0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Daily Idle Time (Avg Hours)</Label>
                                        <div className="relative">
                                            <CurrencyInput value={jamKosong} onValueChange={setJamKosong} placeholder="0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">HOURS/DAY</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {phase === 3 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Estimated "Phantom" OpEx</Label>
                                        <CurrencyInput value={biayaLain} onValueChange={setBiayaLain} placeholder="IDR 0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                        <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider">Pungli, retribusi liar, parkir, tips koordinasi, dll.</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button size="lg" className="w-full h-14 text-lg font-black tracking-widest group" onClick={handleNextPhase}>
                                {phase < 3 ? 'NEXT PHASE' : 'RUN MRI ANALYSIS'}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            {phase > 1 && (
                                <Button variant="ghost" onClick={() => setPhase(phase - 1)} className="text-muted-foreground text-xs uppercase font-bold">
                                    Go Back
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}
