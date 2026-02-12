import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
    Activity,
    Lock,
    RefreshCcw,
    Zap,
    TrendingUp,
    Share2,
    ChevronDown,
    HelpCircle,
    Eye,
    EyeOff,
    Calendar,
    DollarSign,
    Users,
    Building2
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
import { CurrencyInput } from "@/components/ui/currency-input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FIPLiteInputs, FIPLiteResult, FIPLiteState, IndustryType } from '@/types/fip-lite'
import { calculateFIPLiteResults } from '@/lib/fip-engine'
import { generateFIPLitePDF } from '@/lib/pdf-generator'
import { submitLead } from '@/lib/googleSheetsAPI'

export const Route = createFileRoute('/fip-lite')({
    component: FIPLitePage,
})

const INDUSTRY_OPTIONS: { value: IndustryType; label: string }[] = [
    { value: 'restaurant-cafe', label: 'Restaurant / Café' },
    { value: 'retail-ecommerce', label: 'Retail / E-commerce' },
    { value: 'saas-tech', label: 'SaaS / Tech' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'construction', label: 'Construction' },
    { value: 'other', label: 'Other' },
]

function FIPLitePage() {
    const [isBooting, setIsBooting] = useState(true)
    const [bootLines, setBootLines] = useState<string[]>([])
    const [currency, setCurrency] = useState<{ code: string; locale: string; prefix: string }>({
        code: 'USD',
        locale: 'en-US',
        prefix: '$'
    })

    const [state, setState] = useState<FIPLiteState>({
        formData: {
            industryType: 'restaurant-cafe',
            businessAge: 2,
            teamSize: 5,
            monthlyDebtService: 0
        },
        results: null,
        isCalculating: false,
        isGeneratingPDF: false,
        leadCaptured: false,
        leadData: null
    })

    // Boot Sequence Effect
    useEffect(() => {
        const lines = [
            'INITIALIZING FIP™ LITE v2.0',
            'LOADING INDUSTRY BENCHMARKS...',
            'CALIBRATING DIAGNOSTIC SENSORS...',
            'NEURAL NETWORK ONLINE',
            'READY FOR SCAN'
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

    // Calculation Effect
    useEffect(() => {
        if (state.isCalculating) {
            const timer = setTimeout(() => {
                const results = calculateFIPLiteResults(state.formData as FIPLiteInputs)
                setState(prev => ({ ...prev, isCalculating: false, results }))
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 2000)
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
        <div className="container py-12 md:px-8 space-y-12 animate-fade-in max-w-6xl mx-auto">
            <title>FIP™ Lite - Business Health MRI Scan</title>
            <meta name="description" content="Free 30-second business health diagnostic. Get your cash runway, leakage estimate, and risk assessment." />

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Lock className="w-3 h-3" /> FREE ACCESS
                        </div>
                        <div className="px-3 py-1 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                            v2.0 MRI
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        Business <span className="text-primary">Health MRI</span>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium leading-relaxed max-w-2xl">
                        30-SECOND DIAGNOSTIC SCAN • INDUSTRY BENCHMARKED • FORENSIC-GRADE
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-white/5 border-white/10 uppercase text-[10px] font-black tracking-widest h-10">
                                <DollarSign className="w-3 h-3 text-primary" /> {currency.code} <ChevronDown className="w-3 h-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'IDR', locale: 'id-ID', prefix: 'Rp' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">IDR (Rupiah)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'USD', locale: 'en-US', prefix: '$' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">USD (Dollar)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrency({ code: 'EUR', locale: 'de-DE', prefix: '€' })} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer">EUR (Euro)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon" onClick={() => window.location.reload()} className="rounded-full hover:rotate-180 transition-transform duration-500">
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <main className="grid gap-12">
                {!state.results && (
                    <InputForm
                        formData={state.formData}
                        currency={currency}
                        isCalculating={state.isCalculating}
                        onChange={(data) => setState(prev => ({ ...prev, formData: data }))}
                        onSubmit={() => setState(prev => ({ ...prev, isCalculating: true }))}
                    />
                )}

                {state.results && !state.isCalculating && (
                    <ResultsDashboard
                        results={state.results}
                        currency={currency}
                        onReset={() => window.location.reload()}
                        onDownload={() => {
                            if (state.leadCaptured && state.leadData && state.results) {
                                generateFIPLitePDF(state.results as any, state.leadData.name, state.leadData.businessName)
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
                                generateFIPLitePDF(state.results as any, data.name, data.businessName)
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

// ============================================================================
// INPUT FORM COMPONENT
// ============================================================================

function InputForm({
    formData,
    currency,
    isCalculating,
    onChange,
    onSubmit
}: {
    formData: Partial<FIPLiteInputs>,
    currency: { locale: string; prefix: string; code: string },
    isCalculating: boolean,
    onChange: (data: Partial<FIPLiteInputs>) => void,
    onSubmit: () => void
}) {
    const updateField = (field: keyof FIPLiteInputs, value: any) => {
        onChange({ ...formData, [field]: value })
    }

    const isValid = formData.monthlyRevenue && formData.monthlyCOGS !== undefined && formData.monthlyOpEx && formData.currentCash !== undefined

    return (
        <Card className="border-border/50 shadow-2xl bg-card/40 backdrop-blur-xl ring-1 ring-white/5 overflow-hidden relative max-w-4xl mx-auto">
            {isCalculating && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
                    <div className="relative">
                        <div className="w-24 h-24 border-2 border-primary/20 rounded-full animate-ping" />
                        <Activity className="w-12 h-12 text-primary absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-widest text-primary animate-pulse">RUNNING MRI SCAN</h3>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">ANALYZING FINANCIAL VITALS...</p>
                    </div>
                </div>
            )}

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <CardHeader className="pt-8 pb-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black">FINANCIAL VITALS</CardTitle>
                        <CardDescription>8 metrics • 30 seconds • Industry benchmarked</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="py-8 space-y-8">
                {/* Core Metrics */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Core Metrics</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="Monthly Revenue" tooltip="Total revenue generated in a typical month" icon={<DollarSign className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.monthlyRevenue || 0}
                                onValueChange={(val) => updateField('monthlyRevenue', val)}
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>

                        <InputField label="Monthly COGS" tooltip="Cost of Goods Sold - direct costs to produce your product/service" icon={<DollarSign className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.monthlyCOGS || 0}
                                onValueChange={(val) => updateField('monthlyCOGS', val)}
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>

                        <InputField label="Monthly Fixed Costs (OpEx)" tooltip="Operating expenses: rent, salaries, utilities, marketing, admin" icon={<Building2 className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.monthlyOpEx || 0}
                                onValueChange={(val) => updateField('monthlyOpEx', val)}
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>

                        <InputField label="Current Cash Balance" tooltip="Total cash available in your bank accounts right now" icon={<DollarSign className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.currentCash || 0}
                                onValueChange={(val) => updateField('currentCash', val)}
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>
                    </div>
                </div>

                {/* Context Metrics */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Context (For Benchmarking)</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="Industry Type" tooltip="Your primary business category for accurate benchmarking" icon={<Building2 className="w-4 h-4" />}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between bg-black/20 border-white/10 h-12 font-mono text-left">
                                        {INDUSTRY_OPTIONS.find(opt => opt.value === formData.industryType)?.label || 'Select Industry'}
                                        <ChevronDown className="w-4 h-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full bg-black/90 border-white/10 backdrop-blur-xl">
                                    {INDUSTRY_OPTIONS.map(opt => (
                                        <DropdownMenuItem
                                            key={opt.value}
                                            onClick={() => updateField('industryType', opt.value)}
                                            className="text-sm font-medium text-white/60 hover:text-white cursor-pointer"
                                        >
                                            {opt.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </InputField>

                        <InputField label="Team Size" tooltip="Total number of employees (full-time + part-time)" icon={<Users className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.teamSize || 0}
                                onValueChange={(val) => updateField('teamSize', val)}
                                locale={currency.locale}
                                prefix=""
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>

                        <InputField label="Business Age (Years)" tooltip="How many years has your business been operating?" icon={<Calendar className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.businessAge || 0}
                                onValueChange={(val) => updateField('businessAge', val)}
                                locale={currency.locale}
                                prefix=""
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>

                        <InputField label="Monthly Debt Service (Optional)" tooltip="Monthly loan payments, if any. Leave at 0 if none." icon={<DollarSign className="w-4 h-4" />}>
                            <CurrencyInput
                                value={formData.monthlyDebtService || 0}
                                onValueChange={(val) => updateField('monthlyDebtService', val)}
                                locale={currency.locale}
                                prefix={currency.prefix}
                                className="bg-black/20 border-white/10 font-mono text-lg h-12"
                            />
                        </InputField>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="bg-black/20 p-6 flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                    🔒 Your data is never stored
                </p>
                <Button
                    onClick={onSubmit}
                    disabled={!isValid}
                    className="font-black uppercase tracking-widest px-8 h-12 shadow-xl shadow-primary/20"
                >
                    RUN MRI SCAN
                    <Activity className="ml-2 w-4 h-4 animate-status-blink" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function InputField({
    label,
    tooltip,
    icon,
    children
}: {
    label: string,
    tooltip: string,
    icon?: React.ReactNode,
    children: React.ReactNode
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                {icon && <div className="text-primary opacity-60">{icon}</div>}
                <Label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    {label}
                </Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-primary cursor-help opacity-40 hover:opacity-100 transition-opacity" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[250px] bg-zinc-900 border-white/10 text-white p-3 shadow-2xl backdrop-blur-xl">
                            <p className="font-medium leading-relaxed text-sm">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {children}
        </div>
    )
}

// ============================================================================
// RESULTS DASHBOARD (4-LAYER ARCHITECTURE)
// ============================================================================

function ResultsDashboard({
    results,
    currency,
    onReset,
    onDownload
}: {
    results: FIPLiteResult,
    currency: { locale: string; prefix: string; code: string },
    onReset: () => void,
    onDownload: () => void
}) {
    const [showLockedPillars, setShowLockedPillars] = useState(false)

    const cashZeroDate = new Date(results.layer1.cashZeroDate)
    const formattedDate = cashZeroDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    const handleShare = () => {
        const text = `My business has ${results.layer1.cashRunwayDays} days of cash runway. Get your free MRI scan at ${window.location.origin}/fip-lite`
        if (navigator.share) {
            navigator.share({
                title: 'FIP™ Lite - Business Health MRI',
                text: text,
                url: `${window.location.origin}/fip-lite`
            }).catch(() => { })
        } else {
            navigator.clipboard.writeText(text)
            alert('Link copied to clipboard!')
        }
    }

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 max-w-6xl mx-auto w-full">
            {/* LAYER 1: THE NUMBERS */}
            <Layer1Numbers results={results} formattedDate={formattedDate} currency={currency} />

            {/* LAYER 2: THE COMPARISON */}
            <Layer2Comparison results={results} currency={currency} />

            {/* LAYER 3: LOCKED X-RAY */}
            <Layer3LockedXray results={results} showLocked={showLockedPillars} onToggle={() => setShowLockedPillars(!showLockedPillars)} />

            {/* LAYER 4: CTA */}
            <Layer4CTA results={results} onDownload={onDownload} onShare={handleShare} onReset={onReset} />
        </div>
    )
}

// Layer 1: The Numbers Component
function Layer1Numbers({ results, formattedDate, currency }: any) {
    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

            <Card className="relative border-white/5 bg-[#080808] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none"></div>

                <CardHeader className="p-10 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-widest">LAYER 1: THE NUMBERS</CardTitle>
                            <CardDescription className="text-[10px]">Specific. Undeniable. Scary.</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cash Runway */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">🔴 CRITICAL METRIC</span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Cash Runway</p>
                                <p className="text-6xl font-black tabular-nums text-red-500">{results.layer1.cashRunwayDays}</p>
                                <p className="text-sm font-bold opacity-40 uppercase mt-1">Days</p>
                            </div>
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Cash-Zero Date</p>
                                <p className="text-sm font-bold text-red-300">{formattedDate}</p>
                            </div>
                        </div>

                        {/* Gross Profit */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">MARGIN HEALTH</span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Gross Profit %</p>
                                <p className="text-6xl font-black tabular-nums">{results.layer1.grossProfitPercent}%</p>
                            </div>
                        </div>

                        {/* Burn Rate */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">MONTHLY BLEED</span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Net Burn Rate</p>
                                <p className="text-4xl font-black tabular-nums">{currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer1.netBurnRate)}</p>
                                <p className="text-sm font-bold opacity-40 uppercase mt-1">Per Month</p>
                            </div>
                        </div>
                    </div>

                    {/* Break-Even Analysis */}
                    <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Break-Even Revenue Needed</p>
                                <p className="text-3xl font-black">{currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer1.breakEvenRevenue)}<span className="text-sm opacity-40">/mo</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Current Revenue</p>
                                <p className="text-3xl font-black">{currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer1.currentRevenue)}<span className="text-sm opacity-40">/mo</span></p>
                            </div>
                        </div>
                        {results.layer1.currentRevenue < results.layer1.breakEvenRevenue && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-xs font-bold text-red-400">⚠ You are burning cash on every sale. Need {currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer1.breakEvenRevenue - results.layer1.currentRevenue)} more monthly revenue to survive.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Layer 2: The Comparison Component  
function Layer2Comparison({ results, currency }: any) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 justify-center">
                <div className="h-px w-12 bg-white/10" />
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/40">LAYER 2: INDUSTRY COMPARISON</h3>
                <div className="h-px w-12 bg-white/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* GP vs Industry */}
                <Card className="border-white/10 bg-white/[0.02] overflow-hidden">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Gross Profit vs Industry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Your GP</p>
                                <p className="text-4xl font-black tabular-nums">{results.layer2.gpVsIndustry.yourGP}%</p>
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Industry Range</p>
                                <p className="text-2xl font-black tabular-nums opacity-60">{results.layer2.gpVsIndustry.industryMin}% - {results.layer2.gpVsIndustry.industryMax}%</p>
                            </div>
                        </div>
                        {results.layer2.gpVsIndustry.gap < 0 && (
                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                <p className="text-xs font-bold text-yellow-400">⚠ You are {Math.abs(results.layer2.gpVsIndustry.gap).toFixed(1)}% below industry median</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Estimated Leakage */}
                <Card className="border-red-500/20 bg-red-500/[0.05] overflow-hidden">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-red-400">Estimated Monthly Leakage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-5xl font-black tabular-nums text-red-500">
                                {currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer2.estimatedLeakage.min)}
                                <span className="text-2xl opacity-40"> — </span>
                                {currency.prefix}{new Intl.NumberFormat(currency.locale).format(results.layer2.estimatedLeakage.max)}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-2">Per Month</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-xs font-bold text-red-300 text-center">WHERE is it going? The full audit reveals EXACT sources.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Efficiency Index */}
                <Card className="border-white/10 bg-white/[0.02] overflow-hidden">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Operational Efficiency Index</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-6xl font-black tabular-nums">{results.layer2.efficiencyIndex}%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-2">vs Industry Median</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${results.layer2.efficiencyIndex >= 80 ? 'bg-emerald-500' : results.layer2.efficiencyIndex < 50 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                style={{ width: `${results.layer2.efficiencyIndex}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Risk Verdict */}
                <Card className={`border overflow-hidden ${results.layer2.riskVerdict === 'critical' ? 'border-red-500/20 bg-red-500/[0.05]' : results.layer2.riskVerdict === 'warning' ? 'border-yellow-500/20 bg-yellow-500/[0.05]' : 'border-emerald-500/20 bg-emerald-500/[0.05]'}`}>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">RISK VERDICT</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${results.layer2.riskVerdict === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' : results.layer2.riskVerdict === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                                <div className={`w-3 h-3 rounded-full animate-pulse ${results.layer2.riskVerdict === 'critical' ? 'bg-red-500' : results.layer2.riskVerdict === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                                {results.layer2.verdictLabel}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// Layer 3: Locked X-Ray Component
function Layer3LockedXray({ results, showLocked, onToggle }: any) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 justify-center">
                <div className="h-px w-12 bg-white/10" />
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/40">LAYER 3: FORENSIC HEAT MAP</h3>
                <div className="h-px w-12 bg-white/10" />
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">18-PILLAR DIAGNOSTIC SCAN</CardTitle>
                            <CardDescription className="text-sm mt-2">
                                🔴 {results.layer3.criticalCount} Critical • 🟡 {results.layer3.warningCount} Warning • 🟢 {18 - results.layer3.criticalCount - results.layer3.warningCount} Healthy
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onToggle}
                            className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-black"
                        >
                            {showLocked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            {showLocked ? 'Hide' : 'Preview'} Pillars
                        </Button>
                    </div>
                </CardHeader>

                {showLocked && (
                    <CardContent className="relative z-10 space-y-3">
                        {results.layer3.pillars.map((pillar: any) => (
                            <div key={pillar.id} className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl relative overflow-hidden group">
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${pillar.status === 'critical' ? 'bg-red-500' : pillar.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                                        <span className="text-sm font-bold uppercase tracking-wider">{pillar.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full blur-sm ${pillar.status === 'critical' ? 'bg-red-500' : pillar.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${pillar.barWidth}%` }}
                                            />
                                        </div>
                                        <Lock className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        ))}
                    </CardContent>
                )}

                <CardFooter className="bg-black/40 backdrop-blur-sm p-6 relative z-10 border-t border-white/10">
                    <div className="w-full space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-60">Estimated Annual Impact</span>
                            <span className="text-2xl font-black text-red-500">
                                ${new Intl.NumberFormat().format(results.layer3.estimatedAnnualImpact.min)} — ${new Intl.NumberFormat().format(results.layer3.estimatedAnnualImpact.max)}
                            </span>
                        </div>
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
                            <p className="text-sm font-bold text-primary">🔒 Full scores, root causes, and recovery roadmap locked. Unlock with Forensic Audit.</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

// Layer 4: CTA Component
function Layer4CTA({ results, onDownload, onShare, onReset }: any) {
    return (
        <div className="space-y-8">
            {/* Download/Share Actions */}
            <div className="bg-primary p-12 rounded-[2.5rem] text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/30 transition-all duration-1000" />

                <div className="relative flex flex-col items-center text-center gap-10 py-4 z-10">
                    <div className="space-y-6 max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white">
                            Download Your MRI Report
                        </h2>
                        <p className="text-lg md:text-xl opacity-90 font-bold leading-relaxed max-w-2xl mx-auto text-white/80">
                            Get a PDF summary of your diagnostic scan results
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                        <Button
                            onClick={onDownload}
                            size="lg"
                            variant="secondary"
                            className="h-24 px-16 font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all bg-white text-primary border-none w-full sm:w-auto rounded-3xl"
                        >
                            DOWNLOAD REPORT
                        </Button>
                        <Button
                            onClick={onShare}
                            size="lg"
                            variant="outline"
                            className="h-24 px-12 font-black text-lg border-2 border-white/30 bg-white/5 hover:bg-white hover:text-primary text-white transition-all flex items-center gap-3 w-full sm:w-auto rounded-3xl"
                        >
                            <Share2 className="w-6 h-6" /> SHARE RESULTS
                        </Button>
                        <Button
                            onClick={onReset}
                            size="lg"
                            variant="ghost"
                            className="h-24 px-10 font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all w-full sm:w-auto rounded-3xl"
                        >
                            NEW SCAN
                        </Button>
                    </div>
                </div>
            </div>

            {/* Upgrade to Full Audit */}
            <div className="border-t border-white/10 pt-20 pb-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <div className="space-y-4">
                            <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase block">UNLOCK FULL DIAGNOSIS</span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-balance leading-[0.85]">
                                From MRI Scan to<br />Surgical Precision
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium italic">
                                "You've seen the tumor. Now let's remove it."
                            </p>
                        </div>

                        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground/80 max-w-2xl mx-auto">
                            Your business has <span className="font-black text-red-500">{results.layer1.cashRunwayDays} days of runway</span> and an estimated <span className="font-black text-red-500">${new Intl.NumberFormat().format(results.layer2.estimatedLeakage.min)} — ${new Intl.NumberFormat().format(results.layer2.estimatedLeakage.max)}/month</span> in hidden leakage. A full FIP™ Forensic Audit will identify the EXACT sources and provide a prioritized recovery roadmap.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden relative group shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-1000" />

                        <div className="relative space-y-10">
                            <div className="grid md:grid-cols-2 gap-8 items-center border-b border-white/5 pb-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                            <Zap className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase opacity-40 tracking-widest">INVESTMENT</p>
                                            <p className="text-lg font-black text-primary leading-tight">$1,200 USD</p>
                                        </div>
                                    </div>
                                </div>

                                <blockquote className="p-4 border-l-2 border-primary/30 bg-primary/5 rounded-r-xl">
                                    <p className="text-xs font-bold opacity-60 leading-relaxed italic">
                                        "If we don't find at least 10x ROI in the first 90 days, we refund 100%."
                                    </p>
                                </blockquote>
                            </div>

                            <Button
                                onClick={() => {
                                    const message = `I just ran the FIP Lite MRI scan. My business has ${results.layer1.cashRunwayDays} days of runway and ${results.layer2.verdictLabel}. I'd like to book a full Forensic Audit.`
                                    window.open(`https://wa.me/628895440515?text=${encodeURIComponent(message)}`, '_blank')
                                }}
                                className="w-full h-32 rounded-[2rem] bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 flex flex-col items-center justify-center gap-1 group shadow-3xl shadow-white/10"
                            >
                                <span className="text-3xl font-black tracking-tighter uppercase group-hover:scale-105 transition-transform text-center px-4 leading-none">
                                    BOOK FULL FORENSIC AUDIT
                                </span>
                                <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Launch Diagnostic Protocol →</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============================================================================
// LEAD CAPTURE MODAL
// ============================================================================

function LeadCaptureModal({ onSuccess, onClose, results }: {
    onSuccess: (data: { name: string, email: string, businessName: string }) => void,
    onClose: () => void,
    results: FIPLiteResult
}) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await submitLead({
            name,
            email,
            phone: '-',
            businessName,
            source: 'FIP Lite v2 MRI (PDF Unlock)',
            overallScore: results.layer2.efficiencyIndex,
            verdict: results.layer2.verdictLabel
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
                        <CardTitle className="text-2xl font-black uppercase tracking-tight">UNLOCK PDF REPORT</CardTitle>
                        <CardDescription>
                            Enter your details to download your MRI scan results
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Your Name</Label>
                            <input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</Label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="john@company.com"
                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Business Name</Label>
                            <input
                                required
                                value={businessName}
                                onChange={e => setBusinessName(e.target.value)}
                                placeholder="Acme Corp"
                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/30"
                            />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <Button type="submit" disabled={isSubmitting} className="h-14 font-black uppercase tracking-widest w-full shadow-lg shadow-primary/20">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-4 h-4 animate-spin" /> GENERATING...
                                    </span>
                                ) : 'DOWNLOAD REPORT'}
                            </Button>
                            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100">
                                CANCEL
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="bg-primary/5 p-4">
                    <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                        🔒 Your data is never sold. We respect your privacy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
