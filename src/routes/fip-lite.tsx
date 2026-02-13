import { useNavigate, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
    Activity,
    Lock,
    RefreshCcw,
    TrendingDown,
    HelpCircle,
    Calendar,
    Zap,
    Eye,
    EyeOff,
    Users,
    DollarSign,
    CreditCard,
    Briefcase,
    Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CurrencyInput } from "@/components/ui/currency-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type { FIPLiteInputs, FIPLiteResult, IndustryType } from '@/types/fip-lite'
import { calculateFIPLiteResults } from '@/lib/fip-engine'
import { submitLead } from '@/lib/googleSheetsAPI'
import { formatCurrency } from '@/lib/format'

export const Route = createFileRoute('/fip-lite')({
    component: FIPLiteV2Page,
})

const INDUSTRY_OPTIONS: { value: IndustryType; label: string; icon: string }[] = [
    { value: 'restaurant-cafe', label: 'Restaurant / Café', icon: '🍽️' },
    { value: 'retail-ecommerce', label: 'Retail / E-commerce', icon: '🛍️' },
    { value: 'saas-tech', label: 'SaaS / Tech', icon: '💻' },
    { value: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
    { value: 'professional-services', label: 'Professional Services', icon: '💼' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'construction', label: 'Construction', icon: '🏗️' },
    { value: 'other', label: 'Other', icon: '🏢' },
]

function FIPLiteV2Page() {
    const navigate = useNavigate()
    const [isCalculating, setIsCalculating] = useState(false)
    const [results, setResults] = useState<FIPLiteResult | null>(null)
    const [isEmailUnlocked, setIsEmailUnlocked] = useState(false)
    const [email, setEmail] = useState('')
    const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
    const [inputs, setInputs] = useState<Partial<FIPLiteInputs>>({
        monthlyDebtService: 0,
        industryType: 'other',
        businessAge: 1,
        teamSize: 1
    })

    const handleCalculate = () => {
        // Validate required fields
        if (!inputs.monthlyRevenue || !inputs.monthlyCOGS || !inputs.monthlyOpEx || !inputs.currentCash || !inputs.industryType || !inputs.businessAge || !inputs.teamSize) {
            alert('Please fill in all required fields')
            return
        }

        setIsCalculating(true)
        setTimeout(() => {
            const result = calculateFIPLiteResults(inputs as FIPLiteInputs)
            setResults(result)
            setIsCalculating(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 2000)
    }

    const handleReset = () => {
        setResults(null)
        setIsEmailUnlocked(false)
        setEmail('')
        setInputs({
            monthlyDebtService: 0,
            industryType: 'other',
            businessAge: 1,
            teamSize: 1
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !email.includes('@')) return
        setIsSubmittingEmail(true)

        try {
            await submitLead({
                name: 'FIP Lite User',
                phone: 'Not Provided',
                email: email,
                source: 'FIP Lite MRI Scan',
                ...inputs,
                results: results ? {
                    runway: results.layer1.cashRunwayDays,
                    leakage: results.layer2.estimatedLeakage.max,
                    risk: results.layer2.riskVerdict
                } : undefined
            })
        } catch (error) {
            console.error('Lead submission error:', error)
        }

        setIsEmailUnlocked(true)
        setIsSubmittingEmail(false)
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <title>FIP™ Lite - Business Health MRI Scan</title>
            <meta name="description" content="Free 30-second business health diagnostic. Get your cash runway, leakage estimate, and risk assessment." />
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black uppercase tracking-tight">FIP™ Lite</h1>
                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Business Health MRI</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {!results ? (
                    <InputForm
                        inputs={inputs}
                        setInputs={setInputs}
                        onCalculate={handleCalculate}
                        isCalculating={isCalculating}
                    />
                ) : (
                    <ResultsDashboard 
                        results={results} 
                        onReset={handleReset} 
                        isEmailUnlocked={isEmailUnlocked}
                        email={email}
                        setEmail={setEmail}
                        onEmailSubmit={handleEmailSubmit}
                        isSubmittingEmail={isSubmittingEmail}
                        onAuditClick={() => navigate({ to: '/contact' })}
                    />
                )}
            </div>
        </div>
    )
}

function InputForm({
    inputs,
    setInputs,
    onCalculate,
    isCalculating
}: {
    inputs: Partial<FIPLiteInputs>
    setInputs: (inputs: Partial<FIPLiteInputs>) => void
    onCalculate: () => void
    isCalculating: boolean
}) {
    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Confidential Forensic Analysis</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    Where is your money <span className="text-primary italic">actually</span> going?
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Stop the guesswork. Get a 30-second <span className="text-white font-bold underline decoration-primary/50">Forensic MRI Scan</span> of your business health.
                    <br /><span className="text-sm uppercase tracking-widest font-bold text-primary/80">Detect leaks. Assess risks. Recover capital.</span>
                </p>
            </div>

            {/* Input Card */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                {isCalculating && (
                    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 rounded-lg">
                        <div className="relative">
                            <div className="w-24 h-24 border-2 border-primary/20 rounded-full animate-ping" />
                            <Activity className="w-12 h-12 text-primary absolute inset-0 m-auto animate-pulse" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-widest text-primary animate-pulse">RUNNING DIAGNOSTIC</h3>
                            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Analyzing 18 forensic pillars...</p>
                        </div>
                    </div>
                )}

                <CardHeader>
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Input Your Numbers</CardTitle>
                    <CardDescription>8 fields. 30 seconds. Brutal honesty.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Row 1: Revenue & COGS */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    Monthly Revenue *
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-[200px] text-[10px]">
                                            <p>Total sales generated in a typical month before any costs are deducted.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <CurrencyInput
                                placeholder="e.g., 150,000"
                                value={inputs.monthlyRevenue || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyRevenue: value })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    Monthly COGS *
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-[200px] text-[10px]">
                                            <p>Cost of Goods Sold. Direct costs like raw materials and direct labor.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <CurrencyInput
                                placeholder="e.g., 60,000"
                                value={inputs.monthlyCOGS || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyCOGS: value })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                    </div>

                    {/* Row 2: OpEx & Cash */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    Monthly Fixed Costs (OpEx) *
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-[200px] text-[10px]">
                                            <p>Regular monthly expenses like rent, salaries, and utilities.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <CurrencyInput
                                placeholder="e.g., 45,000"
                                value={inputs.monthlyOpEx || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyOpEx: value })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    Current Cash Balance *
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-[200px] text-[10px]">
                                            <p>Total liquid cash available in business accounts.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <CurrencyInput
                                placeholder="e.g., 80,000"
                                value={inputs.currentCash || 0}
                                onValueChange={(value) => setInputs({ ...inputs, currentCash: value })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                    </div>

                    {/* Row 3: Debt Service & Industry */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                Monthly Debt Service (Optional)
                            </Label>
                            <CurrencyInput
                                placeholder="e.g., 5,000"
                                value={inputs.monthlyDebtService || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyDebtService: value })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary" />
                                Industry Type * <span className="text-[9px] text-primary/60 normal-case">(for benchmarking)</span>
                            </Label>
                            <Select
                                value={inputs.industryType}
                                onValueChange={(value) => setInputs({ ...inputs, industryType: value as IndustryType })}
                            >
                                <SelectTrigger className="h-12 bg-black/20 border-white/10 text-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                                    {INDUSTRY_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value} className="text-white">
                                            {option.icon} {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 4: Business Age & Team Size */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                Business Age (Years) *
                            </Label>
                            <Select
                                value={inputs.businessAge?.toString()}
                                onValueChange={(value) => setInputs({ ...inputs, businessAge: Number(value) })}
                            >
                                <SelectTrigger className="h-12 bg-black/20 border-white/10 text-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="1" className="text-white">0-1 years (Startup)</SelectItem>
                                    <SelectItem value="2" className="text-white">1-3 years (Growth)</SelectItem>
                                    <SelectItem value="4" className="text-white">3-5 years (Established)</SelectItem>
                                    <SelectItem value="6" className="text-white">5-10 years (Mature)</SelectItem>
                                    <SelectItem value="11" className="text-white">10+ years (Legacy)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                Team Size (Headcount) *
                            </Label>
                            <Input
                                type="number"
                                placeholder="e.g., 12"
                                value={inputs.teamSize || ''}
                                onChange={(e) => setInputs({ ...inputs, teamSize: Number(e.target.value) })}
                                className="h-12 bg-black/20 border-white/10 text-lg"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <Button
                            onClick={onCalculate}
                            disabled={isCalculating}
                            className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30"
                        >
                            {isCalculating ? (
                                <>
                                    <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                                    Running Diagnostic...
                                </>
                            ) : (
                                <>
                                    <Activity className="w-5 h-5 mr-2" />
                                    Run Diagnostic Scan
                                </>
                            )}
                        </Button>
                        <p className="text-center text-[9px] text-muted-foreground uppercase tracking-widest mt-4">
                            🔒 Your data never leaves your browser. 100% private.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ResultsDashboard({ 
    results, 
    onReset,
    isEmailUnlocked,
    email,
    setEmail,
    onEmailSubmit,
    isSubmittingEmail,
    onAuditClick
}: { 
    results: FIPLiteResult; 
    onReset: () => void;
    isEmailUnlocked: boolean;
    email: string;
    setEmail: (email: string) => void;
    onEmailSubmit: (e: React.FormEvent) => void;
    isSubmittingEmail: boolean;
    onAuditClick: () => void;
}) {
    const { layer1, layer2, layer3 } = results
    const cashZeroDate = new Date(layer1.cashZeroDate)

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            {/* Layer 1: THE NUMBERS (Scary, Specific) */}
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${layer2.riskVerdict === 'fortress'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                            : layer2.riskVerdict === 'critical'
                                ? 'bg-red-500/10 border-red-500/20 text-red-500'
                                : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                        }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${layer2.riskVerdict === 'fortress' ? 'bg-emerald-500' : layer2.riskVerdict === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                        DIAGNOSTIC COMPLETE
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tight ${layer2.verdictColor}`}>
                        {layer2.verdictLabel}
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Cash Runway */}
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-[9px] font-black uppercase tracking-widest text-red-400/60">Cash Runway</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-5xl font-black tabular-nums text-red-400">{layer1.cashRunwayDays}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">days remaining</div>
                            <div className="flex items-center gap-2 text-[10px] text-red-400/80 pt-2 border-t border-red-500/10">
                                <Calendar className="w-3 h-3" />
                                <span className="font-mono">Zero: {cashZeroDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gross Profit % */}
                    <Card className="border-white/10 bg-white/5">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-[9px] font-black uppercase tracking-widest opacity-60">Gross Profit %</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-5xl font-black tabular-nums">{layer1.grossProfitPercent}%</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">current margin</div>
                        </CardContent>
                    </Card>

                    {/* Net Burn Rate */}
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-[9px] font-black uppercase tracking-widest text-red-400/60">Net Burn Rate</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-4xl font-black tabular-nums text-red-400">{formatCurrency(layer1.netBurnRate)}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">bleeding monthly</div>
                        </CardContent>
                    </Card>

                    {/* Break-Even Revenue */}
                    <Card className="border-yellow-500/20 bg-yellow-500/5">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-[9px] font-black uppercase tracking-widest text-yellow-400/60">Break-Even Point</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-3xl font-black tabular-nums text-yellow-400">{formatCurrency(layer1.breakEvenRevenue)}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">needed monthly</div>
                            <div className="text-[10px] text-yellow-400/80 pt-2 border-t border-yellow-500/10">
                                You make: {formatCurrency(layer1.currentRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Layer 2: THE COMPARISON (Creates Curiosity Gap) */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader>
                    <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-primary" />
                        Industry Benchmark Comparison
                    </CardTitle>
                    <CardDescription>How you stack up against your peers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* GP vs Industry */}
                        <div className="space-y-3">
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Gross Profit Gap</div>
                            <div className="text-2xl font-black">
                                Your GP: <span className={layer2.gpVsIndustry.gap < 0 ? 'text-red-400' : 'text-emerald-400'}>{layer2.gpVsIndustry.yourGP.toFixed(1)}%</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Industry: {layer2.gpVsIndustry.industryMin}% - {layer2.gpVsIndustry.industryMax}%
                            </div>
                            {layer2.gpVsIndustry.gap < 0 && (
                                <div className="text-xs text-red-400 font-bold">
                                    ⚠ {Math.abs(layer2.gpVsIndustry.gap).toFixed(1)}% below industry median
                                </div>
                            )}
                        </div>

                        {/* Estimated Leakage */}
                        <div className="space-y-3">
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Estimated Monthly Leakage</div>
                            <div className={`text-2xl font-black text-red-400 transition-all duration-1000 ${!isEmailUnlocked ? 'blur-sm select-none' : ''}`}>
                                {formatCurrency(layer2.estimatedLeakage.min)} — {formatCurrency(layer2.estimatedLeakage.max)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Hidden capital drain detected
                            </div>
                            <div className="text-xs text-red-400/80 font-bold">
                                {isEmailUnlocked ? "Identified across 18 pillars" : "WHERE is it going?! 🔒"}
                            </div>
                        </div>

                        {/* Efficiency Index */}
                        <div className="space-y-3">
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Operational Efficiency</div>
                            <div className="text-2xl font-black">
                                <span className={layer2.efficiencyIndex >= 80 ? 'text-emerald-400' : layer2.efficiencyIndex < 50 ? 'text-red-400' : 'text-yellow-400'}>
                                    {layer2.efficiencyIndex}%
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                vs industry peers
                            </div>
                            {layer2.efficiencyIndex < 80 && (
                                <div className="text-xs text-yellow-400 font-bold">
                                    {100 - layer2.efficiencyIndex}% below optimal
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Layer 3: LOCKED FORENSIC HEAT MAP (THE CONVERSION ENGINE) */}
            <LockedForensicHeatMap 
                layer3={layer3} 
                layer2={layer2} 
                isEmailUnlocked={isEmailUnlocked}
                email={email}
                setEmail={setEmail}
                onEmailSubmit={onEmailSubmit}
                isSubmittingEmail={isSubmittingEmail}
            />

            {/* Layer 4: THE CTA (Relief from Anxiety) */}
            <CTASection 
                layer1={layer1} 
                layer2={layer2} 
                layer3={layer3} 
                onReset={onReset} 
                isEmailUnlocked={isEmailUnlocked} 
                onAuditClick={onAuditClick}
            />
        </div>
    )
}

function LockedForensicHeatMap({ 
    layer3, 
    layer2,
    isEmailUnlocked,
    email,
    setEmail,
    onEmailSubmit,
    isSubmittingEmail
}: { 
    layer3: FIPLiteResult['layer3']; 
    layer2: FIPLiteResult['layer2'];
    isEmailUnlocked: boolean;
    email: string;
    setEmail: (email: string) => void;
    onEmailSubmit: (e: React.FormEvent) => void;
    isSubmittingEmail: boolean;
}) {
    return (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />

            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                            {isEmailUnlocked ? <Activity className="w-6 h-6 text-primary" /> : <Lock className="w-6 h-6 text-primary" />}
                            Forensic Heat Map — 18 Pillar Scan
                        </CardTitle>
                        <CardDescription>
                            {isEmailUnlocked ? "Full diagnostic scan results" : "Full diagnostic requires unlock"}
                        </CardDescription>
                    </div>
                    <div className="text-right">
                                <div className="text-3xl font-black text-primary">{layer3.criticalCount}</div>
                                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Failures</div>
                            </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 relative">
                {/* Locked Pillars Grid */}
                <div className={`space-y-3 transition-all duration-1000 ${!isEmailUnlocked ? 'filter blur-[4px] pointer-events-none select-none' : ''}`}>
                    {layer3.pillars.slice(0, 10).map((pillar) => (
                        <div key={pillar.id} className="relative group">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold uppercase tracking-wider">{pillar.name}</span>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pillar.status === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                                                pillar.status === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                                                    'bg-emerald-500/10 border border-emerald-500/20'
                                            }`}>
                                            {isEmailUnlocked ? (
                                                <span className={`text-[10px] font-black ${pillar.status === 'critical' ? 'text-red-500' : pillar.status === 'warning' ? 'text-yellow-500' : 'text-emerald-500'}`}>
                                                    {pillar.status === 'critical' ? 'FAIL' : pillar.status === 'warning' ? 'WARN' : 'PASS'}
                                                </span>
                                            ) : (
                                                <Lock className={`w-4 h-4 ${pillar.status === 'critical' ? 'text-red-500' :
                                                        pillar.status === 'warning' ? 'text-yellow-500' :
                                                            'text-emerald-500'
                                                    }`} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${pillar.status === 'critical' ? 'bg-red-500' :
                                                    pillar.status === 'warning' ? 'bg-yellow-500' :
                                                        'bg-emerald-500'
                                                } ${!isEmailUnlocked ? 'blur-sm' : ''}`}
                                            style={{ width: `${pillar.barWidth}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* "... and 8 more" indicator */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            {isEmailUnlocked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            <span className="font-bold">+ {layer3.pillars.length - 10} more pillars analyzed</span>
                        </div>
                    </div>
                </div>

                {/* Email Gate Overlay */}
                {!isEmailUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                        <Card className="w-full max-w-md bg-black/80 backdrop-blur-xl border-primary/30 shadow-2xl animate-in zoom-in-95 duration-500">
                        <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                                    <Lock className="w-6 h-6 text-red-500 animate-pulse" />
                                </div>
                                <CardTitle className="text-xl font-black uppercase tracking-tight">Vulnerability Detected</CardTitle>
                                <CardDescription className="text-xs">
                                    We've identified <span className="text-red-400 font-black">{layer3.criticalCount} red-zone failures</span> that are draining your capital. 
                                    <br/><span className="text-white font-bold">Unlock the 18-pillar breakdown to see where the bleeding is.</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={onEmailSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input 
                                            type="email" 
                                            placeholder="you@company.com" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <Button 
                                        type="submit" 
                                        className="w-full h-12 font-black uppercase tracking-widest"
                                        disabled={isSubmittingEmail}
                                    >
                                        {isSubmittingEmail ? (
                                            <>
                                                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                                                Unlocking...
                                            </>
                                        ) : (
                                            "Get My Results Now"
                                        )}
                                    </Button>
                                    <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest">
                                        No spam. Just your forensic report and strategic insights.
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Impact Summary */}
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-red-400">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-widest">Estimated Annual Impact</span>
                    </div>
                    <div className="text-3xl font-black text-red-400">
                        {formatCurrency(layer3.estimatedAnnualImpact.min)} — {formatCurrency(layer3.estimatedAnnualImpact.max)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Potential annual loss from {layer3.criticalCount} critical + {layer3.warningCount} warning vulnerabilities
                    </div>
                </div>

                {/* Ticker Urgensi/Social Proof */}
                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-primary" />
                            <span>3 peers in {layer2.gpVsIndustry.industryMin > 0 ? 'your industry' : 'this sector'} scanned today</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-primary" />
                            <span>Average recovery: $42k/year</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function CTASection({ layer1, layer2, layer3, onReset, isEmailUnlocked, onAuditClick }: {
    layer1: FIPLiteResult['layer1']
    layer2: FIPLiteResult['layer2']
    layer3: FIPLiteResult['layer3']
    onReset: () => void
    isEmailUnlocked: boolean
    onAuditClick: () => void
}) {
    const isCritical = layer1.cashRunwayDays < 90 || layer3.criticalCount > 0;
    const leakageAmount = formatCurrency(layer2.estimatedLeakage.max);

    return (
        <Card className={`border-primary/30 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden ${!isEmailUnlocked ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

            <CardContent className="p-12 space-y-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                        {isCritical 
                            ? <>Stop the Bleeding Before <span className="text-red-400">{new Date(layer1.cashZeroDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></>
                            : <>Fortify Your <span className="text-emerald-400">Market Position</span></>
                        }
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {isCritical 
                            ? <>Your business is losing up to <span className="text-red-400 font-bold">{leakageAmount}/mo</span>. A full audit identifies the EXACT sources across all 18 pillars.</>
                            : <>You've built a solid foundation. Now, let's extract the remaining <span className="text-emerald-400 font-bold">{leakageAmount}/mo</span> in hidden efficiency.</>
                        }
                    </p>
                </div>

                <div className="bg-black/40 rounded-2xl p-8 space-y-6 border border-white/10">
                    <h4 className="text-xl font-black uppercase tracking-tight">
                        {isCritical ? "The Forensic Recovery Roadmap:" : "The Expansion Science Framework:"}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary text-xs font-black">✓</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm">Surgical Intervention</div>
                                <div className="text-xs text-muted-foreground">Fixing the {layer3.criticalCount} critical leaks</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary text-xs font-black">✓</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm">Prioritized Recovery</div>
                                <div className="text-xs text-muted-foreground">Step-by-step 90-day execution plan</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary text-xs font-black">✓</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm">12-Month Trajectory</div>
                                <div className="text-xs text-muted-foreground">Projection of recovered capital</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                        size="lg" 
                        onClick={onAuditClick}
                        className="h-16 px-12 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group bg-primary hover:bg-primary/90"
                    >
                        <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                        Execute Full Audit & Recovery → {formatCurrency(1200)}
                    </Button>
                    <Button variant="outline" size="lg" onClick={onReset} className="h-16 px-8 border-white/10 hover:bg-white/5">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        New Diagnostic
                    </Button>
                </div>

                {!isEmailUnlocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-black border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Unlock Heat Map Above to Enable Booking
                        </div>
                    </div>
                )}

                <p className="text-center text-[9px] text-muted-foreground uppercase tracking-widest">
                    🔒 One-time investment. {isCritical ? "Immediate recovery." : "Strategic scaling."} No subscriptions.
                </p>
            </CardContent>
        </Card>
    )
}
