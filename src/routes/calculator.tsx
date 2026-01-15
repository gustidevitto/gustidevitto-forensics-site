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
                to: '/get-access',
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
            [t('calculator.export_step1', "1. Schedule 15-Minute MRI with Vitto"), ""],
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
            <title>{t('calculator.seo_title')}</title>

            {/* Header Branding */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
                            {t('calculator.auth_level')}
                        </div>
                        <div className="px-2 py-0.5 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                            {t('calculator.core_engine')}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        <Trans i18nKey="calculator.title">
                            PHANTOM COST <span className="text-primary">DIAGNOSTIC BAY</span>
                        </Trans>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium">{t('calculator.version')}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t('calculator.system_status')}</p>
                        <p className="text-xs font-mono text-green-500 uppercase">{t('calculator.operational_secured')}</p>
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
                        <h2 className="text-2xl font-bold tracking-widest uppercase">{t('calculator.analyzing_vectors')}</h2>
                        <p className="text-muted-foreground font-mono text-sm">{t('calculator.synthesizing')}</p>
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
                            <Activity className="w-4 h-4" /> {t('calculator.active_alarms')}
                        </h3>
                        <div className="space-y-3">
                            {severity.level === 'critical' || severity.level === 'high' ? (
                                <div className="flex items-start gap-3 text-destructive animate-status-blink">
                                    <span className="font-mono text-sm underline">[ {t('calculator.severity_high_badge', 'CRITICAL')} ]</span>
                                    <p className="text-sm font-bold">{t('calculator.critical_msg')}</p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <span className="font-mono text-sm text-green-500">[ {t('calculator.severity_normal_badge', 'NORMAL')} ]</span>
                                    <p className="text-sm">{t('calculator.normal_msg')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dashboard Grid - Vital Signs */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Vital 1: Revenue Velocity */}
                        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('calculator.revenue_flow')}</p>
                                <DollarSign className="w-4 h-4 text-primary opacity-50" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight">{formatRupiah(omzet)}</h4>
                            <div className="pt-2 border-t border-border/50 font-mono text-[10px] text-muted-foreground uppercase">
                                {t('calculator.system_status')}: {t('calculator.operational_secured').split(' // ')[0]}
                            </div>
                        </div>

                        {/* Vital 2: Leakage Pressure */}
                        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 space-y-4 shadow-xl shadow-destructive/5 ring-1 ring-destructive/20">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-destructive uppercase tracking-widest">{t('calculator.monthly_leakage')}</p>
                                <TrendingDown className="w-4 h-4 text-destructive" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight text-destructive">{formatCurrency(totalPhantomCost, currency)}</h4>
                            <div className="pt-2 border-t border-destructive/10 font-mono text-[10px] text-destructive/70 uppercase">
                                Verdict: {severity.label}
                            </div>
                        </div>

                        {/* Vital 3: Annual Exposure */}
                        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('calculator.annual_loss')}</p>
                                <Zap className="w-4 h-4 text-yellow-500 opacity-50" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tight">{formatCurrency(totalPhantomCost * 12, currency)}</h4>
                            <div className="pt-2 border-t border-border/50 font-mono text-[10px] text-muted-foreground uppercase tracking-tighter">
                                {t('calculator.projection')}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown & Next Steps */}
                    <div className="grid lg:grid-cols-5 gap-8">
                        <Card className="lg:col-span-3 border-border/50 bg-card/30 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                                    <Microscope className="w-4 h-4 text-primary" /> {t('calculator.forensic_breakdown')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">{t('calculator.waste_shrinkage')}</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatCurrency(kerugianBahanBaku, currency)}</span>
                                    </div>
                                    <Separator className="bg-border/30" />
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">{t('calculator.idle_time')}</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatCurrency(kerugianJamKosong, currency)}</span>
                                    </div>
                                    <Separator className="bg-border/30" />
                                    <div className="flex justify-between group">
                                        <span className="text-sm text-muted-foreground">{t('calculator.hidden_costs')}</span>
                                        <span className="font-bold text-destructive group-hover:scale-110 transition-transform">{formatCurrency(biayaLain, currency)}</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                                        {t('calculator.lite_disclaimer')}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleExport} variant="outline" className="w-full border-primary/20 hover:bg-primary/5 group">
                                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> {t('calculator.export_verdict')}
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                                <CardHeader>
                                    <CardTitle>{t('calculator.dig_deeper_title')}</CardTitle>
                                    <CardDescription className="text-primary-foreground/80 font-medium">{t('calculator.dig_deeper_desc')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed mb-6">
                                        <Trans i18nKey="calculator.dig_deeper_text">
                                            Contact Vitto to perform a <strong>Surgical MRI</strong> using the <strong>FDD™v3 Full Version</strong> personally.
                                        </Trans>
                                    </p>
                                    <Button asChild variant="secondary" className="w-full font-bold h-12">
                                        <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                            {t('calculator.schedule_mri')}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Button variant="ghost" onClick={() => { setPhase(1); reset(); }} className="w-full text-muted-foreground hover:text-foreground">
                                <RefreshCcw className="mr-2 h-3 w-3" /> {t('calculator.re_scan')}
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
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('calculator.phase_status', { current: phase, total: 3 })}</span>
                    </div>

                    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-md">
                        <CardHeader className="space-y-4">
                            {phase === 1 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <TrendingDown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">{t('calculator.phase1_title')}</CardTitle>
                                        <CardDescription>{t('calculator.phase1_desc')}</CardDescription>
                                    </div>
                                </>
                            )}
                            {phase === 2 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">{t('calculator.phase2_title')}</CardTitle>
                                        <CardDescription>{t('calculator.phase2_desc')}</CardDescription>
                                    </div>
                                </>
                            )}
                            {phase === 3 && (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tight">{t('calculator.phase3_title')}</CardTitle>
                                        <CardDescription>{t('calculator.phase3_desc')}</CardDescription>
                                    </div>
                                </>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6 py-8">
                            {phase === 1 && (
                                <div className="space-y-6">
                                    {/* Currency Selector */}
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">Currency</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['IDR', 'USD', 'EUR'] as const).map((curr) => (
                                                <button
                                                    key={curr}
                                                    type="button"
                                                    onClick={() => setCurrency(curr)}
                                                    className={`px-4 py-3 rounded-lg border-2 font-bold text-sm transition-all ${currency === curr
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : 'border-border bg-muted/30 hover:border-primary/50'
                                                        }`}
                                                >
                                                    {curr}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">{t('calculator.label_revenue')}</Label>
                                        <CurrencyInput value={omzet} onValueChange={setOmzet} placeholder={`${currency} 0`} className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">{t('calculator.label_cogs')}</Label>
                                        <CurrencyInput value={biayaBaku} onValueChange={setBiayaBaku} placeholder={`${currency} 0`} className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                </div>
                            )}
                            {phase === 2 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">{t('calculator.label_payroll')}</Label>
                                        <CurrencyInput value={gaji} onValueChange={setGaji} placeholder={`${currency} 0`} className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">{t('calculator.label_idle')}</Label>
                                        <div className="relative">
                                            <CurrencyInput value={jamKosong} onValueChange={setJamKosong} placeholder="0" className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">{t('calculator.label_idlehours')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {phase === 3 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-70">{t('calculator.label_phantom_opex')}</Label>
                                        <CurrencyInput value={biayaLain} onValueChange={setBiayaLain} placeholder={`${currency} 0`} className="h-14 text-xl font-bold bg-muted/30 border-primary/20 focus-visible:ring-primary" />
                                        <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider">{t('calculator.phantom_opex_desc')}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button size="lg" className="w-full h-14 text-lg font-black tracking-widest group" onClick={handleNextPhase}>
                                {phase < 3 ? t('calculator.next_phase') : t('calculator.run_mri')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            {phase > 1 && (
                                <Button variant="ghost" onClick={() => setPhase(phase - 1)} className="text-muted-foreground text-xs uppercase font-bold">
                                    {t('calculator.go_back')}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}
