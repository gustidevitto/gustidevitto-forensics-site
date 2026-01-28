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
    Scale,
    ShieldCheck,
    AlertCircle,
    Share2,
    Coins,
    PieChart,
    Play,
    ChevronDown,
    HelpCircle
} from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../components/ui/tooltip"
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
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/fip-lite')({
    component: FIPLitePage,
})

function FIPLitePage() {
    const { t } = useTranslation()
    const [isBooting, setIsBooting] = useState(true)
    const [bootLines, setBootLines] = useState<string[]>([])
    const [currency, setCurrency] = useState<{ code: string; locale: string; prefix: string }>({
        code: 'USD',
        locale: 'en-US',
        prefix: '$'
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
        const lines = t('fip_lite.boot_sequence', { returnObjects: true }) as string[]

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
    }, [t])

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

    // Data Synchronization Protocol (Auto-fill downstream steps)
    useEffect(() => {
        if (!state.formData.step1) return

        setState(prev => {
            const s1 = prev.formData.step1
            if (!s1) return prev

            let hasChanges = false
            const newFormData = { ...prev.formData }

            // Sync to Step 2 (Cash Flow / COGS)
            if (!newFormData.step2) {
                newFormData.step2 = {
                    idealCogs: 0,
                    actualMaterial: 0,
                    directLabor: 0,
                    wasteSpoilage: 0
                }
                hasChanges = true
            }

            // Sync to Step 3 (Operational Efficiency)
            if (!newFormData.step3) {
                newFormData.step3 = {
                    rentUtilities: 0,
                    payrollMgmt: 0,
                    marketingSpend: 0,
                    generalAdmin: 0,
                    cashOnHand: 0,
                    inventoryValue: 0
                }
                hasChanges = true
            }

            // Sync to Step 4 (Growth & Risk)
            if (!newFormData.step4) {
                newFormData.step4 = {
                    accountsPayable: 0,
                    shortTermDebt: 0,
                    headcount: 0,
                    totalWorkingHours: 0
                }
                hasChanges = true
            }

            if (!hasChanges) return prev

            return {
                ...prev,
                formData: newFormData
            }
        })
    }, [state.formData.step1])

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
            <title>{t('fip_lite.seo_title')}</title>
            <meta name="description" content={t('fip_lite.seo_desc')} />
            <meta property="og:title" content="FIP™ Lite - Business Health MRI" />
            <meta property="og:description" content={t('fip_lite.seo_desc')} />

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
                            <Lock className="w-3 h-3" /> {t('fip_lite.header.access')}
                        </div>
                        <div className="px-3 py-1 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                            {t('fip_lite.header.version')}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        {t('fip_lite.header.title_business')} <span className="text-primary">{t('fip_lite.header.title_health')}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium leading-relaxed max-w-2xl">
                        {t('fip_lite.header.subtitle')}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-white/5 border-white/10 uppercase text-[10px] font-black tracking-widest h-10">
                                <Coins className="w-3 h-3 text-primary" /> {currency.code} <ChevronDown className="w-3 h-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'IDR', locale: 'id-ID', prefix: 'Rp' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">IDR (Rupiah)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'USD', locale: 'en-US', prefix: '$' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">USD (Dollar)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'EUR', locale: 'de-DE', prefix: '€' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">EUR (Euro)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t('fip_lite.header.status_label')}</p>
                        <p className="text-xs font-mono text-green-500 uppercase flex items-center justify-end gap-1">
                            <Activity className="w-3 h-3" /> {t('fip_lite.header.status_value')}
                        </p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => window.location.reload()} className="rounded-full hover:rotate-180 transition-transform duration-500">
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Demo Video Section for FIP Lite */}
            <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary fill-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">{t('single_entity.demo_title')}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t('single_entity.demo_video_text')}</p>
                    </div>
                </div>
                <div className="relative aspect-video rounded-2xl border border-white/5 bg-black overflow-hidden shadow-2xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={t('demo_video.url')}
                        title={t('demo_video.header')}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

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
                                        <h3 className="text-xl font-black uppercase tracking-widest text-primary animate-pulse">{t('fip_lite.card.running_title')}</h3>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">{t('fip_lite.card.running_desc')}</p>
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
                                            {state.currentStep === 1 && t('fip_lite.card.title_step1')}
                                            {state.currentStep === 2 && t('fip_lite.card.title_step2')}
                                            {state.currentStep === 3 && t('fip_lite.card.title_step3')}
                                            {state.currentStep === 4 && t('fip_lite.card.title_step4')}
                                        </CardTitle>
                                        <CardDescription>
                                            {t('fip_lite.card.description')}
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
                                    <Step3Operational
                                        data={state.formData.step3 || {} as any}
                                        currency={currency}

                                        onChange={(data: OperationalEfficiencyInputs) => setState(prev => ({
                                            ...prev,
                                            formData: { ...prev.formData, step3: data }
                                        }))}
                                    />
                                )}

                                {state.currentStep === 4 && (
                                    <Step4Growth
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
                                    <ChevronLeft className="mr-2 w-4 h-4" /> {t('fip_lite.card.btn_prev')}
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
                                    {state.currentStep < 4 ? t('fip_lite.card.btn_next') : t('fip_lite.card.btn_run')}
                                    {state.currentStep < 4 ? <ChevronRight className="ml-2 w-4 h-4" /> : <Activity className="ml-2 w-4 h-4 animate-status-blink" />}
                                </Button>
                            </CardFooter>
                        </Card>

                        <p className="mt-8 text-center text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                            {t('fip_lite.card.privacy_note')}
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
    const { t } = useTranslation()
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
                        <CardTitle className="text-2xl font-black uppercase tracking-tight">{t('fip_lite.lead_capture.title')}</CardTitle>
                        <CardDescription>
                            {t('fip_lite.lead_capture.desc')}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('fip_lite.lead_capture.name_label')}</Label>
                            <Input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder={t('fip_lite.lead_capture.name_placeholder')}
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('fip_lite.lead_capture.email_label')}</Label>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={t('fip_lite.lead_capture.email_placeholder')}
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('fip_lite.lead_capture.business_label')}</Label>
                            <Input
                                required
                                value={businessName}
                                onChange={e => setBusinessName(e.target.value)}
                                placeholder={t('fip_lite.lead_capture.business_placeholder')}
                                className="h-12 bg-black/20 border-white/10"
                            />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <Button type="submit" disabled={isSubmitting} className="h-14 font-black uppercase tracking-widest w-full shadow-lg shadow-primary/20">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-4 h-4 animate-spin" /> {t('fip_lite.lead_capture.submitting_btn')}
                                    </span>
                                ) : t('fip_lite.lead_capture.submit_btn')}
                            </Button>
                            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100">
                                {t('fip_lite.lead_capture.abort_btn')}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="bg-primary/5 p-4">
                    <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                        {t('fip_lite.lead_capture.disclaimer')}
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
    const { t } = useTranslation()
    const handleShare = () => {
        const text = t('fip_lite.results.share_text', { score: results.overallScore, url: `${window.location.origin}/fip-lite` })
        if (navigator.share) {
            navigator.share({
                title: t('fip_lite.results.share_title'),
                text: text,
                url: `${window.location.origin}/fip-lite`
            }).catch(() => { })
        } else {
            navigator.clipboard.writeText(text)
            alert(t('fip_lite.results.copy_alert'))
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
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">{t('fip_lite.results.overall_score')}</span>
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
                            <span className="text-6xl font-black tracking-tight">{new Intl.NumberFormat().format(results.overallScore)}</span>
                            <span className="text-xs font-bold opacity-50">/ 100</span>
                        </div>
                    </div>
                </Card>

                {/* Verdict & Categories */}
                <div className="md:col-span-2 space-y-6">
                    {/* Premium Verdict Block */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
                        <div className="absolute top-0 right-0 p-6 opacity-30">
                            <Activity className={`w-32 h-32 ${results.verdictColor}`} />
                        </div>

                        <div className="relative z-10 p-10 flex flex-col justify-between h-full space-y-8">
                            <div className="space-y-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${results.verdict === 'fortress' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${results.verdict === 'fortress' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                                        {t('fip_lite.results.surgeon_verdict')}
                                    </span>
                                </div>
                                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none ${results.verdictColor}`}>
                                    {results.verdictLabel.split(':')[1] || results.verdictLabel}
                                </h2>
                                <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                                    {t('fip_lite.results.diagnosis_complete')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{t('fip_lite.results.confirmed_pillars')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {results.pillars.slice(0, 4).map(p => (
                                            <span key={p.id} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase text-white/60">
                                                {p.name.split('(')[0]}
                                            </span>
                                        ))}
                                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase text-white/40">+12 More</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{t('fip_lite.results.hidden_blindspots')}</p>
                                    <p className="text-sm text-white/60 italic">
                                        {t('fip_lite.results.hidden_pillars_note')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Next Action Plan */}
                    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/10" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/40">{t('fip_lite.results.action_plan_title')}</h3>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-primary/50 transition-colors group">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">{t('fip_lite.results.step_label')} 01</span>
                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{t('fip_lite.results.stabilize_bleed')}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t('fip_lite.results.stabilize_desc', { risk: results.topRisks[0]?.name || 'Pillar 1' })}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-primary/50 transition-colors group">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">{t('fip_lite.results.step_label')} 02</span>
                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{t('fip_lite.results.forensic_scan')}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t('fip_lite.results.forensic_desc')}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-primary/50 transition-colors group">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">{t('fip_lite.results.step_label')} 03</span>
                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{t('fip_lite.results.execute_recovery')}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t('fip_lite.results.execute_desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(results.categoryScores).map(([cat, score]) => (
                            <div key={cat} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                    {cat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </p>
                                <div className="flex items-end justify-between">
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-black">{new Intl.NumberFormat().format(score)}</span>
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
                        <AlertCircle className="w-5 h-5 text-red-500" /> {t('fip_lite.results.critical_vectors_title')}
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
                        <ShieldCheck className="w-5 h-5 text-green-500" /> {t('fip_lite.results.strengths_title')}
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
                            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">{t('network_intelligence.hero_meta').split('·')[2]?.trim() || t('fip_lite.header.access')}</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />)}
                            </div>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">{t('fip_lite.results.cta_generate_title')}</h2>
                        <p className="max-w-md text-lg opacity-80 font-medium leading-relaxed">
                            {t('fip_lite.results.cta_generate_desc')}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <Button onClick={onDownload} size="lg" variant="secondary" className="h-20 px-12 font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            {t('fip_lite.results.btn_download')}
                        </Button>
                        <Button onClick={handleShare} size="lg" variant="outline" className="h-20 px-12 font-bold bg-white/5 border-white/20 hover:bg-white/10 text-white transition-all flex items-center gap-2">
                            <Share2 className="w-5 h-5" /> {t('fip_lite.results.btn_share')}
                        </Button>
                        <Button onClick={onReset} size="lg" variant="ghost" className="h-20 px-8 font-bold text-white/40 hover:text-white transition-all">
                            {t('fip_lite.results.btn_reset')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Upgrade CTA Section */}
            <div className="mt-20 border-t border-white/10 pt-20 pb-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">{t('fip_lite.upgrade_cta.badge')}</span>
                        <h2 className="text-5xl font-black tracking-tighter text-balance leading-[0.9]">{t('fip_lite.upgrade_cta.title')}</h2>
                        <p className="text-xl text-muted-foreground font-medium italic">"{t('fip_lite.upgrade_cta.subtitle')}"</p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-8 items-center">
                        <div className="md:col-span-3 space-y-6">
                            <p className="text-lg leading-relaxed text-balance opacity-80">
                                {t('fip_lite.upgrade_cta.desc')}
                            </p>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase opacity-60 tracking-widest">{t('fip_lite.upgrade_cta.price_label')}</p>
                                        <p className="text-sm font-bold text-primary">{t('fip_lite.upgrade_cta.price_anchor')}</p>
                                    </div>
                                </div>
                                <p className="text-[11px] opacity-60 leading-relaxed italic border-l-2 border-primary/40 pl-4">
                                    {t('fip_lite.upgrade_cta.guarantee')}
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <Button
                                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                                className="w-full h-40 rounded-3xl bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 flex flex-col items-center justify-center gap-2 group shadow-2xl shadow-white/20"
                            >
                                <span className="text-2xl font-black tracking-tighter uppercase group-hover:scale-105 transition-transform text-center px-4 leading-tight">
                                    {t('fip_lite.upgrade_cta.cta_btn')}
                                </span>
                                <span className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Initialization Protocol →</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StepProps<T> {
    data: T
    onChange: (data: T) => void
    currency: { locale: string; prefix: string; code: string }
}

function InputField({
    label,
    tooltip,
    children
}: {
    label: string,
    tooltip: string,
    children: React.ReactNode
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    {label}
                </Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-primary cursor-help opacity-40 hover:opacity-100 transition-opacity" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[200px] bg-zinc-900 border-white/10 text-white p-3 shadow-2xl backdrop-blur-xl">
                            <p className="font-medium leading-relaxed">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {children}
        </div>
    )
}

function Step1RevenueProfitability({ data, onChange, currency }: StepProps<RevenueProfitabilityInputs>) {
    const { t } = useTranslation()
    const updateField = (field: keyof RevenueProfitabilityInputs, value: number) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg"><TrendingUp className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{t('fip_lite.steps.yield_dynamics')}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('fip_lite.card.title_step1')}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t('fip_lite.steps.total_revenue_label')} tooltip={t('fip_lite.tooltips.total_revenue')}>
                        <CurrencyInput
                            value={data.totalRevenue || 0}
                            onValueChange={(val) => updateField('totalRevenue', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono text-lg h-12"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.total_transactions_label')} tooltip={t('fip_lite.tooltips.transaction_count')}>
                        <CurrencyInput
                            value={data.transactionCount || 0}
                            onValueChange={(val) => updateField('transactionCount', val)}
                            locale={currency.locale}
                            prefix=""
                            className="bg-black/20 border-white/10 font-mono text-lg h-12"
                        />
                    </InputField>
                </div>
            </div>
        </div>
    )
}

function Step2CashFlow({ data, onChange, currency }: StepProps<CashFlowInputs>) {
    const { t } = useTranslation()
    const updateField = (field: keyof CashFlowInputs, value: any) => {
        onChange({ ...data, [field]: value })
    }
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg"><Scale className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{t('fip_lite.card.title_step2')}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('fip_lite.steps.margin_leakage')}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t('fip_lite.steps.theoretical_gp_label')} tooltip={t('fip_lite.tooltips.ideal_cogs')}>
                        <CurrencyInput
                            value={data.idealCogs || 0}
                            onValueChange={(val) => updateField('idealCogs', val)}
                            locale={currency.locale}
                            prefix=""
                            suffix="%"
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.actual_gp_label')} tooltip={t('fip_lite.tooltips.actual_material')}>
                        <CurrencyInput
                            value={data.actualMaterial || 0}
                            onValueChange={(val) => updateField('actualMaterial', val)}
                            locale={currency.locale}
                            prefix=""
                            suffix="%"
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.total_gp_label')} tooltip={t('fip_lite.tooltips.direct_labor')}>
                        <CurrencyInput
                            value={data.directLabor || 0}
                            onValueChange={(val) => updateField('directLabor', val)}
                            locale={currency.locale}
                            prefix=""
                            suffix="%"
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.inv_spoilage_label')} tooltip={t('fip_lite.tooltips.waste_spoilage')}>
                        <CurrencyInput
                            value={data.wasteSpoilage || 0}
                            onValueChange={(val) => updateField('wasteSpoilage', val)}
                            locale={currency.locale}
                            prefix=""
                            suffix="%"
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                </div>
            </div>
        </div>
    )
}

function Step3Operational({ data, onChange, currency }: StepProps<OperationalEfficiencyInputs>) {
    const { t } = useTranslation()
    const updateField = (field: keyof OperationalEfficiencyInputs, value: any) => {
        onChange({ ...data, [field]: value })
    }
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg"><PieChart className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{t('fip_lite.progress.phase3')}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('fip_lite.card.title_step3')}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t('fip_lite.steps.rent_utilities_label')} tooltip={t('fip_lite.tooltips.rent_utilities')}>
                        <CurrencyInput
                            value={data.rentUtilities || 0}
                            onValueChange={(val) => updateField('rentUtilities', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.management_payroll_label')} tooltip={t('fip_lite.tooltips.payroll_mgmt')}>
                        <CurrencyInput
                            value={data.payrollMgmt || 0}
                            onValueChange={(val) => updateField('payrollMgmt', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.marketing_label')} tooltip={t('fip_lite.tooltips.marketing_spend')}>
                        <CurrencyInput
                            value={data.marketingSpend || 0}
                            onValueChange={(val) => updateField('marketingSpend', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.admin_costs_label')} tooltip={t('fip_lite.tooltips.general_admin')}>
                        <CurrencyInput
                            value={data.generalAdmin || 0}
                            onValueChange={(val) => updateField('generalAdmin', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.current_cash_label')} tooltip={t('fip_lite.tooltips.cash_on_hand')}>
                        <CurrencyInput
                            value={data.cashOnHand || 0}
                            onValueChange={(val) => updateField('cashOnHand', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.inventory_value_label')} tooltip={t('fip_lite.tooltips.inventory_value')}>
                        <CurrencyInput
                            value={data.inventoryValue || 0}
                            onValueChange={(val) => updateField('inventoryValue', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                </div>
            </div>
        </div>
    )
}

function Step4Growth({ data, onChange, currency }: StepProps<GrowthRiskInputs>) {
    const { t } = useTranslation()
    const updateField = (field: keyof GrowthRiskInputs, value: any) => {
        onChange({ ...data, [field]: value })
    }
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg"><Shield className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{t('fip_lite.progress.phase4')}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('fip_lite.card.title_step4')}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t('fip_lite.steps.ap_label')} tooltip={t('fip_lite.tooltips.accounts_payable')}>
                        <CurrencyInput
                            value={data.accountsPayable || 0}
                            onValueChange={(val) => updateField('accountsPayable', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.liabilities_label')} tooltip={t('fip_lite.tooltips.short_term_debt')}>
                        <CurrencyInput
                            value={data.shortTermDebt || 0}
                            onValueChange={(val) => updateField('shortTermDebt', val)}
                            locale={currency.locale}
                            prefix={currency.prefix}
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.headcount')} tooltip={t('fip_lite.tooltips.headcount')}>
                        <CurrencyInput
                            value={data.headcount || 0}
                            onValueChange={(val) => updateField('headcount', val)}
                            locale={currency.locale}
                            prefix=""
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                    <InputField label={t('fip_lite.steps.labor_hours_label')} tooltip={t('fip_lite.tooltips.total_working_hours')}>
                        <CurrencyInput
                            value={data.totalWorkingHours || 0}
                            onValueChange={(val) => updateField('totalWorkingHours', val)}
                            locale={currency.locale}
                            prefix=""
                            className="bg-black/20 border-white/10 font-mono"
                        />
                    </InputField>
                </div>
            </div>
        </div>
    )
}
