import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CurrencyInput } from '@/components/ui/currency-input'
import { usePhantomCalculator } from '@/hooks/use-phantom-calculator'
import { formatRupiah } from '@/lib/format'
import { AlertTriangle, Download, RefreshCcw, ArrowRight, TrendingDown, Activity, Microscope, Target, Zap, DollarSign, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/calculator')({
    component: Calculator,
    beforeLoad: ({ location }) => {
        const token = localStorage.getItem('pcc_session_token')
        if (!token) {
            throw redirect({
                to: '/fip-lite',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

function formatCurrency(value: number, currency: 'IDR' | 'USD' | 'EUR'): string {
    const symbols = { IDR: 'Rp', USD: '$', EUR: '€' }
    const prefix = symbols[currency]
    const formatted = new Intl.NumberFormat('en-US').format(value)
    return `${prefix} ${formatted}`
}

function Calculator() {
    const { t } = useTranslation()
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
    const [currency, setCurrency] = useState<'IDR' | 'USD' | 'EUR'>('IDR')

    // Boot Sequence Effect
    useEffect(() => {
        const lines = [
            t('calculator.boot.initializing'),
            t('calculator.boot.allocating'),
            t('calculator.boot.connecting'),
            t('calculator.boot.authenticated'),
            t('calculator.boot.mapping'),
            t('calculator.boot.ready')
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
        if (ratio < 0.05) return { level: 'low', label: t('calculator.severity_stable', 'STABLE'), color: 'text-green-500' }
        if (ratio < 0.15) return { level: 'medium', label: t('calculator.severity_warning', 'WARNING'), color: 'text-yellow-500' }
        if (ratio < 0.25) return { level: 'high', label: t('calculator.severity_serious', 'SERIOUS'), color: 'text-orange-500' }
        return { level: 'critical', label: t('calculator.severity_critical', 'CRITICAL LEAK'), color: 'text-destructive' }
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
            [t('calculator.export_col1', "Parameter"), t('calculator.export_col2', "Nilai (IDR)")],
            [t('calculator.label_revenue'), omzet],
            [t('calculator.label_cogs'), biayaBaku],
            [t('calculator.label_payroll'), gaji],
            [t('calculator.label_idle'), jamKosong],
            [t('calculator.label_phantom_opex'), biayaLain],
            ["", ""],
            [t('calculator.export_results', "HASIL ANALISIS PCC LITE"), ""],
            [t('calculator.waste_shrinkage'), kerugianBahanBaku],
            [t('calculator.idle_time'), kerugianJamKosong],
            [t('calculator.hidden_costs'), biayaLain],
            [t('calculator.monthly_leakage'), totalPhantomCost],
            [t('calculator.export_severity', "SEVERITY"), severity.label],
            ["", ""],
            [t('calculator.lite_disclaimer'), ""],
            ["", ""],
            [t('calculator.export_steps', "NEXT STEPS"), ""],
            [t('calculator.export_step1', "1. Schedule 15-Minute MRI with Gusti Devitto"), ""],
            [t('calculator.export_step2', "2. Visit: gustidevitto.com/investasi"), ""]
        ].map(e => e.join(",")).join("\n");

        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${t('calculator.export_filename')}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (isBooting) {
        return (
            <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-6 font-mono overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />
                <div className="max-w-md w-full space-y-3 relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <Activity className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.5em] text-primary/60 uppercase">System Initializing</span>
                    </div>
                    {bootLines.map((line, i) => (
                        <div key={i} className="text-primary text-[11px] tracking-widest flex items-center gap-2">
                            <span className="opacity-40">[{i.toString().padStart(2, '0')}]</span>
                            <span className="animate-in fade-in slide-in-from-left-2 duration-300">{line}</span>
                        </div>
                    ))}
                    <div className="pt-8">
                        <div className="flex justify-between text-[10px] text-primary/40 mb-2 uppercase tracking-widest font-bold">
                            <span>Core Engine Load</span>
                            <span>{Math.min(bootLines.length * 16.6, 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-primary/10 h-0.5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(56,189,248,1)]"
                                style={{ width: `${(bootLines.length / 6) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-black">
            {/* Background Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 py-12 md:px-8 space-y-12 animate-fade-in">
                <title>{t('calculator.seo_title')}</title>

                {/* Header Branding - The Diagnostic Console */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-white/5 pb-12 relative">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="px-3 py-1 rounded bg-primary text-black text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <Lock className="w-3 h-3" /> {t('calculator.auth_level')}
                            </div>
                            <div className="px-3 py-1 rounded border border-primary/30 text-primary text-[9px] font-black uppercase tracking-[0.3em]">
                                {t('calculator.core_engine')}
                            </div>
                            <div className="px-3 py-1 rounded border border-white/10 text-white/40 text-[9px] font-mono tracking-widest">
                                LATENCY: 12ms // BUFFER: OK
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
                                <Trans i18nKey="calculator.title">
                                    PHANTOM COST <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">DIAGNOSTIC BAY</span>
                                </Trans>
                            </h1>
                            <p className="text-muted-foreground text-xs uppercase tracking-[0.4em] font-black opacity-50 flex items-center gap-3">
                                {t('calculator.version')} <span className="h-px w-12 bg-white/20" /> SECURE HANDSHAKE: COMPLETED
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 self-start md:self-center">
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">{t('calculator.system_status')}</p>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,1)]"></span>
                                <p className="text-xs font-mono text-green-500 font-bold tracking-widest uppercase">{t('calculator.operational_secured').split(' // ')[1]}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => { reset(); setPhase(1); }}
                            className="rounded-xl border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-500 h-14 w-14"
                        >
                            <RefreshCcw className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {isCalculating ? (
                    <div className="py-32 flex flex-col items-center justify-center space-y-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                        <div className="relative">
                            <div className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse" />
                            <Zap className="w-24 h-24 text-primary animate-[bounce_1s_infinite] relative z-10" />
                        </div>
                        <div className="text-center space-y-4 relative z-10">
                            <h2 className="text-3xl font-black tracking-[0.3em] uppercase text-white animate-pulse">{t('calculator.analyzing_vectors')}</h2>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-0.5 w-12 bg-primary/50" />
                                <p className="text-primary font-mono text-xs uppercase tracking-[0.4em]">{t('calculator.synthesizing')}</p>
                                <div className="h-0.5 w-12 bg-primary/50" />
                            </div>
                            <div className="pt-4 grid grid-cols-4 gap-2 max-w-xs mx-auto">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="h-1 bg-primary/20 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-primary animate-[scanline_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : totalPhantomCost > 0 && phase === 3 ? (
                    // RESULT DASHBOARD (THE SURGICAL VERDICT)
                    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-[0.98] duration-1000">
                        <div className="grid lg:grid-cols-12 gap-12">

                            {/* LEFT COLUMN: THE PHYSICAL REPORT SHEET */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-[#111] border-2 border-primary/20 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
                                    <div className="absolute top-0 right-0 p-4 font-mono text-[8px] opacity-10 leading-none select-none pointer-events-none">
                                        FIP_DATA_STREAM_827X<br />
                                        STATUS_VERIFIED<br />
                                        AUTH_G_DEVITTO<br />
                                        ENCODE_SHA256
                                    </div>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

                                    <div className="space-y-8 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                                <Microscope className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t('calculator.forensic_breakdown')}</p>
                                                <h3 className="text-xl font-black uppercase tracking-tight italic">Diagnostic Verdict</h3>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('calculator.waste_shrinkage')}</span>
                                                    <span className="font-mono text-xs text-primary/60">LVL: DETECTED</span>
                                                </div>
                                                <div className="text-3xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                                                    {formatCurrency(kerugianBahanBaku, currency)}
                                                </div>
                                            </div>

                                            <div className="h-px bg-white/5" />

                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('calculator.idle_time')}</span>
                                                    <span className="font-mono text-xs text-primary/60">LVL: HIGH_LEAK</span>
                                                </div>
                                                <div className="text-3xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                                                    {formatCurrency(kerugianJamKosong, currency)}
                                                </div>
                                            </div>

                                            <div className="h-px bg-white/5" />

                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('calculator.hidden_costs')}</span>
                                                    <span className="font-mono text-xs text-primary/60">LVL: UNTRACEABLE</span>
                                                </div>
                                                <div className="text-3xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                                                    {formatCurrency(biayaLain, currency)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 space-y-4">
                                            <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle className="w-4 h-4 text-primary" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Alert</span>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                                    {t('calculator.lite_disclaimer')}
                                                </p>
                                            </div>
                                            <Button onClick={handleExport} className="w-full h-16 bg-white text-black hover:bg-primary transition-all duration-500 font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-white/5 group">
                                                <Download className="mr-3 w-4 h-4 group-hover:animate-bounce" /> {t('calculator.export_verdict')}
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Scanning Bar Effect */}
                                    <div className="absolute left-0 right-0 h-4 bg-primary/10 blur-xl animate-[scanline_4s_linear_infinite] pointer-events-none top-0" />
                                </div>
                            </div>

                            {/* RIGHT COLUMN: DATA VISUALS & ACTION */}
                            <div className="lg:col-span-8 space-y-10 animate-in slide-in-from-right-8 duration-1000">

                                {/* VITAL SUMMARY */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 space-y-6 group hover:border-primary/30 transition-all duration-500">
                                        <div className="flex justify-between items-center">
                                            <div className="h-12 w-12 bg-destructive/10 rounded-2xl flex items-center justify-center border border-destructive/20 rotate-3 group-hover:rotate-0 transition-transform">
                                                <TrendingDown className="w-6 h-6 text-destructive" />
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase ${severity.color} bg-white/5 border border-white/10`}>
                                                VERDICT: {severity.label}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-2">{t('calculator.monthly_leakage')} // ESTIMATED</p>
                                            <h4 className="text-5xl md:text-7xl font-black tracking-tighter text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                                {formatCurrency(totalPhantomCost, currency)}
                                            </h4>
                                        </div>
                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{t('calculator.annual_loss')}</p>
                                                <p className="text-2xl font-black tracking-tight text-white/60">{formatCurrency(totalPhantomCost * 12, currency)}</p>
                                            </div>
                                            <Zap className="w-8 h-8 text-yellow-500/20 group-hover:text-yellow-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="bg-primary p-10 rounded-3xl space-y-8 relative overflow-hidden group shadow-2x-strong shadow-primary/20">
                                        <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                                            <Target className="w-40 h-40 text-black" />
                                        </div>
                                        <div className="relative z-10 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-black text-black uppercase leading-tight">{t('calculator.dig_deeper_title')}</h3>
                                                <p className="text-black/70 text-sm font-bold leading-relaxed max-w-xs">{t('calculator.dig_deeper_desc')}</p>
                                            </div>
                                            <div className="bg-black/10 p-4 rounded-2xl border border-black/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Brain className="w-4 h-4 text-black" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-black">Expert Intervention</span>
                                                </div>
                                                <p className="text-[12px] text-black/80 font-medium leading-relaxed italic">
                                                    <Trans i18nKey="calculator.dig_deeper_text">
                                                        Contact Gusti Devitto to perform a <strong>Surgical MRI</strong> using the <strong>FDD™v3 Full Version</strong> personally.
                                                    </Trans>
                                                </p>
                                            </div>
                                            <Button asChild variant="default" className="w-full h-18 bg-black text-white hover:bg-zinc-900 transition-all duration-500 font-black uppercase text-sm tracking-widest rounded-2xl shadow-2xl group">
                                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                                    {t('calculator.schedule_mri')}
                                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* SYSTEM MESSAGE / ALARMS */}
                                <div className="bg-zinc-950 border border-white/5 rounded-3xl p-8 flex items-center gap-8 relative group">
                                    <div className={`h-16 w-16 shrink-0 rounded-2xl flex items-center justify-center border ${severity.level === 'critical' ? 'bg-red-500/10 border-red-500/20' : 'bg-primary/10 border-primary/20'} animate-pulse`}>
                                        <Activity className={`w-8 h-8 ${severity.level === 'critical' ? 'text-red-500' : 'text-primary'}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{t('calculator.active_alarms')}</p>
                                        <p className={`text-lg font-bold italic ${severity.level === 'critical' || severity.level === 'high' ? 'text-red-400' : 'text-green-400'}`}>
                                            {severity.level === 'critical' || severity.level === 'high' ? t('calculator.critical_msg') : t('calculator.normal_msg')}
                                        </p>
                                    </div>
                                    <Button variant="ghost" onClick={() => { setPhase(1); reset(); }} className="ml-auto text-white/20 hover:text-white uppercase text-[9px] font-black tracking-widest transition-colors h-12">
                                        <RefreshCcw className="mr-2 h-3 w-3" /> {t('calculator.re_scan')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // WIZARD MODE (INPUT PHASES - THE SCANNER)
                    <div className="max-w-4xl mx-auto w-full animate-in slide-in-from-bottom-8 duration-700">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                            <div className="flex gap-4">
                                {[1, 2, 3].map(step => (
                                    <div key={step} className="flex flex-col gap-2 group">
                                        <div className={`h-1.5 w-20 md:w-32 rounded-full transition-all duration-700 ${step <= phase ? 'bg-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/5'}`} />
                                        <span className={`text-[8px] font-black uppercase tracking-widest text-center transition-colors ${step === phase ? 'text-primary' : 'text-white/20'}`}>
                                            PHASE 0{step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 border border-white/5 px-6 py-2 rounded-full bg-zinc-950">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('calculator.phase_status', { current: phase, total: 3 })}</span>
                            </div>
                        </div>

                        <div className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-12 shadow-2x-strong shadow-black overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                                <Target className="w-64 h-64 text-white" />
                            </div>

                            <div className="relative z-10 space-y-12">
                                <div className="flex items-center gap-6">
                                    <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {phase === 1 && <TrendingDown className="w-10 h-10 text-primary" />}
                                        {phase === 2 && <Users className="w-10 h-10 text-primary" />}
                                        {phase === 3 && <Target className="w-10 h-10 text-primary" />}
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-black tracking-tight uppercase italic">{phase === 1 ? t('calculator.phase1_title') : phase === 2 ? t('calculator.phase2_title') : t('calculator.phase3_title')}</h2>
                                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm opacity-60">{phase === 1 ? t('calculator.phase1_desc') : phase === 2 ? t('calculator.phase2_desc') : t('calculator.phase3_desc')}</p>
                                    </div>
                                </div>

                                <div className="space-y-8 py-4">
                                    {phase === 1 && (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Currency Selector */}
                                            <div className="md:col-span-2 p-6 bg-white/5 rounded-[1.5rem] border border-white/5 space-y-4">
                                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-2">{t('calculator.currency', 'OPERATIONAL CURRENCY')}</Label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {(['IDR', 'USD', 'EUR'] as const).map((curr) => (
                                                        <button
                                                            key={curr}
                                                            type="button"
                                                            onClick={() => setCurrency(curr)}
                                                            className={`h-16 rounded-2xl border-2 font-black text-sm tracking-widest transition-all duration-500 ${currency === curr
                                                                ? 'border-primary bg-primary text-black shadow-[0_10px_30px_rgba(56,189,248,0.3)]'
                                                                : 'border-white/5 bg-zinc-900/50 text-white/40 hover:border-white/20 hover:text-white'
                                                                }`}
                                                        >
                                                            {curr}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-2">{t('calculator.label_revenue')}</Label>
                                                <CurrencyInput value={omzet} onValueChange={setOmzet} placeholder={`${currency} 0`} className="h-20 text-3xl font-black bg-zinc-950 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-2xl px-8 transition-all" />
                                            </div>
                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-2">{t('calculator.label_cogs')}</Label>
                                                <CurrencyInput value={biayaBaku} onValueChange={setBiayaBaku} placeholder={`${currency} 0`} className="h-20 text-3xl font-black bg-zinc-950 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-2xl px-8 transition-all" />
                                            </div>
                                        </div>
                                    )}
                                    {phase === 2 && (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-2">{t('calculator.label_payroll')}</Label>
                                                <CurrencyInput value={gaji} onValueChange={setGaji} placeholder={`${currency} 0`} className="h-20 text-3xl font-black bg-zinc-950 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-2xl px-8 transition-all" />
                                            </div>
                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-2">{t('calculator.label_idle')}</Label>
                                                <div className="relative">
                                                    <CurrencyInput value={jamKosong} onValueChange={setJamKosong} placeholder="0" className="h-20 text-3xl font-black bg-zinc-950 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-2xl px-8 transition-all" />
                                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-primary font-black text-xs uppercase tracking-widest">{t('calculator.label_idlehours')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {phase === 3 && (
                                        <div className="space-y-4 max-w-2xl">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-2">{t('calculator.label_phantom_opex')}</Label>
                                            <CurrencyInput value={biayaLain} onValueChange={setBiayaLain} placeholder={`${currency} 0`} className="h-20 text-3xl font-black bg-zinc-950 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-2xl px-8 transition-all" />
                                            <p className="text-[11px] text-muted-foreground uppercase leading-relaxed tracking-wider italic font-medium opacity-60 flex items-center gap-3">
                                                <span className="h-px flex-1 bg-white/5" /> {t('calculator.phantom_opex_desc')}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                                    <Button size="lg" className="flex-1 h-20 text-xl font-black tracking-[0.2em] group bg-white text-black hover:bg-primary transition-all duration-500 rounded-2xl shadow-xl shadow-white/5 uppercase" onClick={handleNextPhase}>
                                        {phase < 3 ? t('calculator.next_phase') : t('calculator.run_mri')}
                                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                    </Button>
                                    {phase > 1 && (
                                        <Button variant="ghost" onClick={() => setPhase(phase - 1)} className="px-10 h-20 text-xs uppercase font-black tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-2xl">
                                            {t('calculator.go_back')}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.5em]">Forensic Intelligence protocol // Secure Session</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
