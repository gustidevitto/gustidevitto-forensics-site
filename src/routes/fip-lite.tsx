import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
    Activity,
    ChevronLeft,
    ChevronRight,
    Lock,
    RefreshCcw,
    Shield,
    Zap,
    TrendingUp,
    BarChart3,
    HeartPulse,
    DollarSign,
    Target,
    Users,
    Percent,
    Clock,
    Flame,
    Warehouse,
    Scale,
    Eye,
    Package,
    UserPlus,
    ShieldCheck,
    AlertCircle,
    Share2,
    Coins
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CurrencyInput } from "@/components/ui/currency-input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FIPLiteState, RevenueProfitabilityInputs, CashFlowInputs, OperationalEfficiencyInputs, GrowthRiskInputs, HealthScoreResult } from '@/types/fip-lite'
import { calculateFIPLiteResults } from '@/lib/fip-engine'
import { generateFIPLitePDF } from '@/lib/pdf-generator'
import { submitLead } from '@/lib/googleSheetsAPI'

export const Route = createFileRoute('/fip-lite')({
    component: FIPLitePage,
})

function FIPLitePage() {
    const [isBooting, setIsBooting] = useState(true)
    const [bootLines, setBootLines] = useState<string[]>([])
    const [currency, setCurrency] = useState<{ code: string; locale: string; prefix: string }>({
        code: 'IDR',
        locale: 'id-ID',
        prefix: 'Rp'
    })

    const [state, setState] = useState<FIPLiteState>({
        currentStep: 1,
        formData: {},
        results: null,
        isCalculating: false,
        isGeneratingPDF: false,
        leadCaptured: false,
        leadData: null
    })

    // Boot Sequence Effect
    useEffect(() => {
        const lines = [
            "INITIALIZING FIP™ LITE PROTOCOL...",
            "LOADING 16-PILLAR DIAGNOSTIC ENGINE...",
            "ESTABLISHING SECURE L-9 CONNECTION...",
            "ENCRYPTING DATA STREAMS...",
            "READY FOR BUSINESS HEALTH MRI."
        ]

        let currentLine = 0
        const interval = setInterval(() => {
            if (currentLine < lines.length) {
                setBootLines(prev => [...prev, lines[currentLine]])
                currentLine++
            } else {
                clearInterval(interval)
                setTimeout(() => setIsBooting(false), 1000)
            }
        }, 500)

        return () => clearInterval(interval)
    }, [])

    // Calculation Effect
    useEffect(() => {
        if (state.isCalculating) {
            const timer = setTimeout(() => {
                const results = calculateFIPLiteResults(state.formData as any)
                setState(prev => ({ ...prev, isCalculating: false, results }))
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [state.isCalculating, state.formData])

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
                            <div className="h-full bg-primary animate-[scanline_2s_linear_infinite]" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12 md:px-8 space-y-12 animate-fade-in max-w-5xl mx-auto">
            <title>FIP™ Lite - Clinical Business Health Diagnostic | Gusti Devitto</title>
            <meta name="description" content="Run a clinical 16-pillar forensic diagnostic on your business health. Identify structural vulnerabilities and unlock architectural resilience with the FIP™ Lite Protocol." />
            <meta property="og:title" content="FIP™ Lite - Business Health MRI" />
            <meta property="og:description" content="Run a clinical 16-pillar forensic diagnostic on your business health." />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
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
                            "name": "FIP™ Lite Diagnostic",
                            "item": "https://www.gustidevitto.com/fip-lite"
                        }
                    ]
                })}
            </script>

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Lock className="w-3 h-3" /> SECURE L-9 ACCESS
                        </div>
                        <div className="px-3 py-1 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                            FIP™ LITE v1.0.42
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        BUSINESS <span className="text-primary">HEALTH MRI</span>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium leading-relaxed max-w-2xl">
                        Forensic Intelligence Protocol: 16-Pillar Deep Diagnostic Lite
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-white/5 border-white/10 uppercase text-[10px] font-black tracking-widest h-10">
                                <Coins className="w-3 h-3 text-primary" /> {currency.code}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'IDR', locale: 'id-ID', prefix: 'Rp' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">IDR (Rupiah)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'USD', locale: 'en-US', prefix: '$' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">USD (Dollar)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'EUR', locale: 'de-DE', prefix: '€' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">EUR (Euro)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">DIAGNOSTIC STATUS</p>
                        <p className="text-xs font-mono text-green-500 uppercase flex items-center justify-end gap-1">
                            <Activity className="w-3 h-3" /> OPERATIONAL // SECURED
                        </p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => window.location.reload()} className="rounded-full hover:rotate-180 transition-transform duration-500">
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <main className="grid gap-12">
                {/* Progress Visualizer */}
                {!state.results && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Step {state.currentStep} of 4</span>
                                <h2 className="text-xl font-bold uppercase tracking-tight">
                                    {state.currentStep === 1 && "Phase I: Revenue & Profitability"}
                                    {state.currentStep === 2 && "Phase II: Cash Flow & Liquidity"}
                                    {state.currentStep === 3 && "Phase III: Operational Efficiency"}
                                    {state.currentStep === 4 && "Phase IV: Growth & Risk"}
                                </h2>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">{Math.round((state.currentStep / 4) * 100)}% COMPLETE</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                style={{ width: `${(state.currentStep / 4) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Form Section */}
                {!state.results && (
                    <div className="max-w-3xl mx-auto w-full">
                        <Card className="border-border/50 shadow-2xl bg-card/40 backdrop-blur-xl ring-1 ring-white/5 overflow-hidden relative">
                            {state.isCalculating && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
                                    <div className="relative">
                                        <div className="w-24 h-24 border-2 border-primary/20 rounded-full animate-ping" />
                                        <Activity className="w-12 h-12 text-primary absolute inset-0 m-auto animate-pulse" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-primary animate-pulse">Running Diagnostic...</h3>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Correlation Engine L-9 Processing Engaged</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                            <CardHeader className="pt-8 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        {state.currentStep === 1 && <TrendingUp className="w-6 h-6 text-primary" />}
                                        {state.currentStep === 2 && <HeartPulse className="w-6 h-6 text-primary" />}
                                        {state.currentStep === 3 && <BarChart3 className="w-6 h-6 text-primary" />}
                                        {state.currentStep === 4 && <Shield className="w-6 h-6 text-primary" />}
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-black">
                                            {state.currentStep === 1 && "Revenue & Yield Metrics"}
                                            {state.currentStep === 2 && "Liquidity & Runway"}
                                            {state.currentStep === 3 && "Efficiency & Velocity"}
                                            {state.currentStep === 4 && "Risk & Expansion"}
                                        </CardTitle>
                                        <CardDescription>
                                            Please provide accurate data for the most precise forensic diagnostic.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="py-8 space-y-8">
                                {state.currentStep === 1 && (
                                    <Step1RevenueProfitability
                                        data={state.formData.step1 || {} as any}
                                        currency={currency}
                                        onChange={(data: RevenueProfitabilityInputs) => setState(prev => ({
                                            ...prev,
                                            formData: { ...prev.formData, step1: data }
                                        }))}
                                    />
                                )}

                                {state.currentStep === 2 && (
                                    <Step2CashFlow
                                        data={state.formData.step2 || {} as any}
                                        currency={currency}
                                        onChange={(data: CashFlowInputs) => setState(prev => ({
                                            ...prev,
                                            formData: { ...prev.formData, step2: data }
                                        }))}
                                    />
                                )}

                                {state.currentStep === 3 && (
                                    <Step3OperationalEfficiency
                                        data={state.formData.step3 || {} as any}
                                        currency={currency}
                                        onChange={(data: OperationalEfficiencyInputs) => setState(prev => ({
                                            ...prev,
                                            formData: { ...prev.formData, step3: data }
                                        }))}
                                    />
                                )}

                                {state.currentStep === 4 && (
                                    <Step4GrowthRisk
                                        data={state.formData.step4 || {} as any}
                                        currency={currency}
                                        onChange={(data: GrowthRiskInputs) => setState(prev => ({
                                            ...prev,
                                            formData: { ...prev.formData, step4: data }
                                        }))}
                                    />
                                )}
                            </CardContent>

                            <CardFooter className="bg-black/20 p-6 flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    disabled={state.currentStep === 1}
                                    onClick={() => setState(prev => ({ ...prev, currentStep: (prev.currentStep - 1) as any }))}
                                    className="font-bold uppercase tracking-widest text-xs h-12"
                                >
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Previous Phase
                                </Button>

                                <Button
                                    onClick={() => {
                                        if (state.currentStep < 4) {
                                            setState(prev => ({ ...prev, currentStep: (prev.currentStep + 1) as any }))
                                        } else {
                                            // Finalize
                                            setState(prev => ({ ...prev, isCalculating: true }))
                                        }
                                    }}
                                    className="font-black uppercase tracking-widest px-8 h-12 shadow-xl shadow-primary/20"
                                >
                                    {state.currentStep < 4 ? "Next Phase" : "Run Diagnostic"}
                                    {state.currentStep < 4 ? <ChevronRight className="ml-2 w-4 h-4" /> : <Activity className="ml-2 w-4 h-4 animate-status-blink" />}
                                </Button>
                            </CardFooter>
                        </Card>

                        <p className="mt-8 text-center text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                            All data is processed locally and never stored on our servers without your explicit consent.
                        </p>
                    </div>
                )}

                {state.results && !state.isCalculating && (
                    <FIPLiteResultsDashboard
                        results={state.results}
                        onReset={() => window.location.reload()}
                        onDownload={() => {
                            if (state.leadCaptured && state.leadData && state.results) {
                                generateFIPLitePDF(state.results, state.leadData.name, state.leadData.businessName)
                            } else {
                                setState(prev => ({ ...prev, isGeneratingPDF: true }))
                            }
                        }}
                    />
                )}
                {state.isGeneratingPDF && !state.leadCaptured && (
                    <LeadCaptureModal
                        results={state.results!}
                        onSuccess={(data) => {
                            setState(prev => ({
                                ...prev,
                                leadCaptured: true,
                                leadData: data
                            }))
                            if (state.results) {
                                generateFIPLitePDF(state.results, data.name, data.businessName)
                            }
                            setTimeout(() => setState(prev => ({ ...prev, isGeneratingPDF: false })), 1000)
                        }}
                        onClose={() => setState(prev => ({ ...prev, isGeneratingPDF: false }))}
                    />
                )}
            </main>
        </div>
    )
}

function LeadCaptureModal({ onSuccess, onClose, results }: {
    onSuccess: (data: { name: string, email: string, businessName: string }) => void,
    onClose: () => void,
    results: HealthScoreResult
}) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Submit lead data to Google Sheets
        await submitLead({
            name,
            email,
            phone: '-', // FIP Lite doesn't capture phone yet
            businessName,
            source: 'FIP Lite Diagnostic (PDF Unlock)',
            overallScore: results.overallScore,
            verdict: results.verdictLabel
        })

        setIsSubmitting(false)
        onSuccess({ name, email, businessName })
    }

    return (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
            <Card className="max-w-md w-full border-primary/20 bg-card/50 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black uppercase tracking-tight">Access Secure Report</CardTitle>
                        <CardDescription>
                            Your forensic diagnostic is ready. Enter your credentials to unlock the full 16-pillar PDF breakdown.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</Label>
                            <Input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Gusti Devitto"
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Professional Email</Label>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="gusti@devitto.com"
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Business / Brand Name</Label>
                            <Input
                                required
                                value={businessName}
                                onChange={e => setBusinessName(e.target.value)}
                                placeholder="Forensics Ltd."
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <Button type="submit" disabled={isSubmitting} className="h-14 font-black uppercase tracking-widest w-full shadow-lg shadow-primary/20">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-4 h-4 animate-spin" /> AUTHORIZING...
                                    </span>
                                ) : "UNLOCK PDF REPORT"}
                            </Button>
                            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100">
                                Abort Request
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="bg-primary/5 p-4">
                    <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                        By unlocking, you agree to receive a one-time diagnostic follow-up. We never sell your data. Secure L-9 Encryption.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

function FIPLiteResultsDashboard({ results, onReset, onDownload }: {
    results: HealthScoreResult,
    onReset: () => void,
    onDownload: () => void
}) {
    const handleShare = () => {
        const text = `My business scored ${results.overallScore}/100 on the FIP™ Forensic Diagnostic. A higher score means structural resilience. Check yours at ${window.location.origin}/fip-lite`
        if (navigator.share) {
            navigator.share({
                title: 'FIP™ Forensic Diagnostic Result',
                text: text,
                url: `${window.location.origin}/fip-lite`
            }).catch(() => { })
        } else {
            navigator.clipboard.writeText(text)
            alert("Score breakdown copied to clipboard.")
        }
    }
    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 max-w-5xl mx-auto w-full">
            {/* Executive summary Header */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Score Gauge */}
                <Card className="md:col-span-1 border-primary/20 bg-primary/5 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="w-24 h-24" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Overall Health Score</span>
                    <div className="relative">
                        <svg className="w-48 h-48 -rotate-90">
                            <circle
                                cx="96" cy="96" r="80"
                                className="stroke-muted/20 fill-none"
                                strokeWidth="8"
                            />
                            <circle
                                cx="96" cy="96" r="80"
                                className="stroke-primary fill-none transition-all duration-[2000ms] ease-out"
                                strokeWidth="8"
                                strokeDasharray={502.4}
                                strokeDashoffset={502.4 - (502.4 * results.overallScore) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                            <span className="text-6xl font-black tracking-tight">{results.overallScore}</span>
                            <span className="text-xs font-bold opacity-50">/ 100</span>
                        </div>
                    </div>
                </Card>

                {/* Verdict & Categories */}
                <div className="md:col-span-2 space-y-6">
                    <div className={`p-8 rounded-2xl border-2 ${results.verdict === 'fortress' ? 'bg-green-500/10 border-green-500/20' : results.verdict === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <h2 className={`text-3xl font-black mb-3 ${results.verdictColor}`}>{results.verdictLabel}</h2>
                        <p className="text-sm text-balance text-muted-foreground leading-relaxed">
                            Clinical diagnosis complete. Our engine has identified key structural vulnerabilities and strengths in your business architecture. Proceed with yielding to suggested interventions.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(results.categoryScores).map(([cat, score]) => (
                            <div key={cat} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                    {cat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </p>
                                <div className="flex items-end justify-between">
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-black">{score}</span>
                                        <span className="text-[10px] mb-2 font-bold opacity-40">/ 100</span>
                                    </div>
                                    <div className={`text-[10px] font-black uppercase px-2 py-1 rounded ${score >= 80 ? 'bg-green-500/20 text-green-500' : score < 50 ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {score >= 80 ? 'Fortress' : score < 50 ? 'Critical' : 'Warning'}
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${score >= 80 ? 'bg-green-500' : score < 50 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Critical Risks */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" /> Critical Vectors
                    </h3>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {results.topRisks.map(risk => (
                        <Card key={risk.id} className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-500 border-t-2 border-t-red-500/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-red-400">{risk.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="opacity-60 uppercase font-bold">Severity:</span>
                                    <span className="text-red-500 font-bold">{Math.round(100 - risk.score)}% RISK</span>
                                </div>
                                <p className="text-xs font-medium leading-relaxed text-muted-foreground/80">{risk.recommendation}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Strengths */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-500" /> Primary Fortifications
                    </h3>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {results.strengths.map(strength => (
                        <Card key={strength.id} className="border-green-500/20 bg-green-500/5 transition-all duration-500 border-t-2 border-t-green-500/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-green-400">{strength.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="opacity-60 uppercase font-bold">Resilience:</span>
                                    <span className="text-green-500 font-bold">{strength.score}/100</span>
                                </div>
                                <p className="text-xs font-medium leading-relaxed text-muted-foreground/80">Structural integrity is high in this vector. Maintain current protocols to ensure continued fortress-level stability.</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Action Section */}
            <div className="bg-primary p-12 rounded-[2rem] text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Available Now</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />)}
                            </div>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">Generate Forensic PDF?</h2>
                        <p className="max-w-md text-lg opacity-80 font-medium leading-relaxed">
                            Receive the complete 16-pillar technical breakdown with benchmark comparisons and surigcal intervention plans.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <Button onClick={onDownload} size="lg" variant="secondary" className="h-20 px-12 font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            DOWNLOAD REPORT
                        </Button>
                        <Button onClick={handleShare} size="lg" variant="outline" className="h-20 px-12 font-bold bg-white/5 border-white/20 hover:bg-white/10 text-white transition-all flex items-center gap-2">
                            <Share2 className="w-5 h-5" /> SHARE SCORE
                        </Button>
                        <Button onClick={onReset} size="lg" variant="ghost" className="h-20 px-8 font-bold text-white/40 hover:text-white transition-all">
                            RESET
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step1RevenueProfitability({ data, onChange, currency }: {
    data: RevenueProfitabilityInputs,
    onChange: (data: RevenueProfitabilityInputs) => void,
    currency: { locale: string; prefix: string; code: string }
}) {
    const updateField = (field: keyof RevenueProfitabilityInputs, value: number) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Net Profit per Transaction Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> Yield Dynamics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Monthly Revenue</Label>
                            <CurrencyInput
                                value={data.totalRevenue || 0}
                                onValueChange={(v) => updateField('totalRevenue', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total sales before any costs/taxes.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Monthly Transactions</Label>
                            <Input
                                type="number"
                                value={data.totalTransactions || ''}
                                onChange={(e) => updateField('totalTransactions', Number(e.target.value))}
                                placeholder="0"
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total number of separate customer orders.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Monthly Costs (COGS + OPEX)</Label>
                            <CurrencyInput
                                value={data.totalCosts || 0}
                                onValueChange={(v) => updateField('totalCosts', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Combine product costs and operational overhead.</p>
                        </div>
                    </div>
                </div>

                {/* Gross Profit Leakage Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Margin Leakage
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Theoretical Gross Profit (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={data.theoreticalGrossProfit || ''}
                                    onChange={(e) => updateField('theoreticalGrossProfit', Number(e.target.value))}
                                    placeholder="0"
                                    className="bg-black/20 border-white/10 pr-10"
                                />
                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-[9px] text-muted-foreground italic">Standard margin if everything goes perfectly.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Actual Gross Profit (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={data.actualGrossProfit || ''}
                                    onChange={(e) => updateField('actualGrossProfit', Number(e.target.value))}
                                    placeholder="0"
                                    className="bg-black/20 border-white/10 pr-10"
                                />
                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-[9px] text-muted-foreground italic">What actually shows up in your bank/POS.</p>
                        </div>
                    </div>
                </div>

                {/* OPEX Efficiency Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> OPEX Efficiency
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Monthly Operating Expenses</Label>
                            <CurrencyInput
                                value={data.operatingExpenses || 0}
                                onValueChange={(v) => updateField('operatingExpenses', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Fixed + variable costs to keep the lights on.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Monthly Gross Profit (Absolute {currency.code})</Label>
                            <CurrencyInput
                                value={data.grossProfit || 0}
                                onValueChange={(v) => updateField('grossProfit', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Revenue minus direct costs (COGS).</p>
                        </div>
                    </div>
                </div>

                {/* SKU Performance Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Target className="w-3 h-3" /> SKU Velocity
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Top SKU Revenue</Label>
                            <CurrencyInput
                                value={data.topSKURevenue || 0}
                                onValueChange={(v) => updateField('topSKURevenue', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Revenue from your single best-selling product.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Top SKU Variable Costs</Label>
                            <CurrencyInput
                                value={data.topSKUVariableCosts || 0}
                                onValueChange={(v) => updateField('topSKUVariableCosts', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Costs directly tied to producing that SKU.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step2CashFlow({ data, onChange, currency }: {
    data: CashFlowInputs,
    onChange: (data: CashFlowInputs) => void,
    currency: { locale: string; prefix: string; code: string }
}) {
    const updateField = (field: keyof CashFlowInputs, value: any) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Cash Runway Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Runway Dynamics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Current Disposable Cash</Label>
                            <CurrencyInput
                                value={data.currentCash || 0}
                                onValueChange={(v) => updateField('currentCash', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Amount currently available in bank accounts.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Average Monthly Burn Rate</Label>
                            <CurrencyInput
                                value={data.monthlyBurnRate || 0}
                                onValueChange={(v) => updateField('monthlyBurnRate', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total monthly outflows (fixed + variable).</p>
                        </div>
                    </div>
                </div>

                {/* Net Cash Lock Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Warehouse className="w-3 h-3" /> Working Capital Lockup
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Inventory / Raw Materials Value</Label>
                            <CurrencyInput
                                value={data.inventoryValue || 0}
                                onValueChange={(v) => updateField('inventoryValue', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Value of stock currently held.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Accounts Receivable (Money Owed to You)</Label>
                            <CurrencyInput
                                value={data.accountsReceivable || 0}
                                onValueChange={(v) => updateField('accountsReceivable', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total outstanding invoices billed to clients.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Accounts Payable (Money You Owe)</Label>
                            <CurrencyInput
                                value={data.accountsPayable || 0}
                                onValueChange={(v) => updateField('accountsPayable', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total money owed to suppliers/vendors.</p>
                        </div>
                    </div>
                </div>

                {/* Cash Realization Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Realization Lag
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Typical Sale Date (of a high-value item)</Label>
                            <Input
                                type="date"
                                value={data.saleDate || ''}
                                onChange={(e) => updateField('saleDate', e.target.value)}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Typical Cash Received Date</Label>
                            <Input
                                type="date"
                                value={data.cashReceivedDate || ''}
                                onChange={(e) => updateField('cashReceivedDate', e.target.value)}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Gap between invoice/sale and actual cash in bank.</p>
                        </div>
                    </div>
                </div>

                {/* Net Burn Dynamics Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Flame className="w-3 h-3" /> Net Burn Dynamics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Average Monthly Cash Inflows</Label>
                            <CurrencyInput
                                value={data.cashInflows || 0}
                                onValueChange={(v) => updateField('cashInflows', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total money actually hitting the bank monthly.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Average Monthly Cash Outflows</Label>
                            <CurrencyInput
                                value={data.cashOutflows || 0}
                                onValueChange={(v) => updateField('cashOutflows', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total money leaving the bank monthly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step3OperationalEfficiency({ data, onChange, currency }: {
    data: OperationalEfficiencyInputs,
    onChange: (data: OperationalEfficiencyInputs) => void,
    currency: { locale: string; prefix: string; code: string }
}) {
    const updateField = (field: keyof OperationalEfficiencyInputs, value: number) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Labor Efficiency Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Labor Velocity
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Monthly Gross Profit</Label>
                            <CurrencyInput
                                value={data.totalGrossProfit || 0}
                                onValueChange={(v) => updateField('totalGrossProfit', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total GP generated by the entire workforce.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Staff Labor Hours / Month</Label>
                            <Input
                                type="number"
                                value={data.totalLaborHours || ''}
                                onChange={(e) => updateField('totalLaborHours', Number(e.target.value))}
                                placeholder="0"
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Sum of hours worked by all operation staff.</p>
                        </div>
                    </div>
                </div>

                {/* Inventory Decay Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Package className="w-3 h-3" /> Inventory Health
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Inventory at Start of Month</Label>
                            <CurrencyInput
                                value={data.inventoryAtStart || 0}
                                onValueChange={(v) => updateField('inventoryAtStart', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Inventory at End of Month</Label>
                            <CurrencyInput
                                value={data.inventoryAtEnd || 0}
                                onValueChange={(v) => updateField('inventoryAtEnd', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Monthly Spoilt/Damaged Inventory</Label>
                            <CurrencyInput
                                value={data.inventorySpoilage || 0}
                                onValueChange={(v) => updateField('inventorySpoilage', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Value of inventory lost to decay or damage.</p>
                        </div>
                    </div>
                </div>

                {/* BEP Dynamics Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Scale className="w-3 h-3" /> Break-Even Dynamics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Monthly Fixed Costs</Label>
                            <CurrencyInput
                                value={data.fixedCosts || 0}
                                onValueChange={(v) => updateField('fixedCosts', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Rent, salaries, and other non-variable costs.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Variable Cost Per Unit (Avg)</Label>
                            <CurrencyInput
                                value={data.variableCostPerUnit || 0}
                                onValueChange={(v) => updateField('variableCostPerUnit', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Direct costs for one unit of product/service.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Average Price Per Unit</Label>
                            <CurrencyInput
                                value={data.pricePerUnit || 0}
                                onValueChange={(v) => updateField('pricePerUnit', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Insight-to-Surprise Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Eye className="w-3 h-3" /> Operational Predictability
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Number of Planned Operations / Events</Label>
                            <Input
                                type="number"
                                value={data.plannedEvents || ''}
                                onChange={(e) => updateField('plannedEvents', Number(e.target.value))}
                                placeholder="0"
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Tasks executed according to schedule.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Number of Unplanned "Surprises"</Label>
                            <Input
                                type="number"
                                value={data.unplannedEvents || ''}
                                onChange={(e) => updateField('unplannedEvents', Number(e.target.value))}
                                placeholder="0"
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Breakdowns, repairs, sudden stockouts, etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step4GrowthRisk({ data, onChange, currency }: {
    data: GrowthRiskInputs,
    onChange: (data: GrowthRiskInputs) => void,
    currency: { locale: string; prefix: string; code: string }
}) {
    const updateField = (field: keyof GrowthRiskInputs, value: number) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* LTGP Velocity Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Growth Velocity
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">LTGP (Lifetime Gross Profit) - Month 1</Label>
                            <CurrencyInput
                                value={data.ltgpMonth1 || 0}
                                onValueChange={(v) => updateField('ltgpMonth1', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Gross profit from your oldest active cohort.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">LTGP - Month 2</Label>
                            <CurrencyInput
                                value={data.ltgpMonth2 || 0}
                                onValueChange={(v) => updateField('ltgpMonth2', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">LTGP - Month 3</Label>
                            <CurrencyInput
                                value={data.ltgpMonth3 || 0}
                                onValueChange={(v) => updateField('ltgpMonth3', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Helps measure retention and LTV growth.</p>
                        </div>
                    </div>
                </div>

                {/* LTV:CAC Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <UserPlus className="w-3 h-3" /> Acquisition Economics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Customer Lifetime Value (LTV)</Label>
                            <CurrencyInput
                                value={data.customerLifetimeValue || 0}
                                onValueChange={(v) => updateField('customerLifetimeValue', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total profit expected from one customer.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Customer Acquisition Cost (CAC)</Label>
                            <CurrencyInput
                                value={data.customerAcquisitionCost || 0}
                                onValueChange={(v) => updateField('customerAcquisitionCost', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Total sales/marketing cost to get one customer.</p>
                        </div>
                    </div>
                </div>

                {/* Risk Exposure Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Structural Stability
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Current Liabilities (Short-term Debt)</Label>
                            <CurrencyInput
                                value={data.currentLiabilities || 0}
                                onValueChange={(v) => updateField('currentLiabilities', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Debt and obligations due within 1 year.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Current Liquid Assets</Label>
                            <CurrencyInput
                                value={data.currentAssets || 0}
                                onValueChange={(v) => updateField('currentAssets', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Cash and assets easily converted to cash.</p>
                        </div>
                    </div>
                </div>

                {/* SPOF Group */}
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Exposure Dynamics
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Revenue from Largest Customer / SKU</Label>
                            <CurrencyInput
                                value={data.largestRevenueSource || 0}
                                onValueChange={(v) => updateField('largestRevenueSource', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                            <p className="text-[9px] text-muted-foreground italic">Revenue from your biggest single point of dependence.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Business Revenue</Label>
                            <CurrencyInput
                                value={data.totalRevenue || 0}
                                onValueChange={(v) => updateField('totalRevenue', v)}
                                placeholder="0"
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
