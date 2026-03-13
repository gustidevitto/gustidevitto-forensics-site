import { useNavigate, createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import {
    Activity,
    Lock,
    RefreshCcw,
    TrendingDown,
    Calendar,
    Zap,
    Eye,
    EyeOff,
    Terminal,
    ArrowRight,
    ShieldCheck
} from 'lucide-react'
import { Button } from "@/components/ui/button"
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
    const { t } = useTranslation()
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

    // Persist calculate timeout to allow cleanup
    const calculateTimerRef = useRef<number | null>(null)

    useEffect(() => {
        return () => {
            if (calculateTimerRef.current) window.clearTimeout(calculateTimerRef.current)
        }
    }, [])

    const handleCalculate = () => {
        // Validate required fields
        if (!inputs.monthlyRevenue || !inputs.monthlyCOGS || !inputs.monthlyOpEx || !inputs.currentCash || !inputs.industryType || !inputs.businessAge || !inputs.teamSize) {
            alert(t('get_access.validation_error'))
            return
        }

        setIsCalculating(true)
        // Simulation time for the "Terminal" effect
        calculateTimerRef.current = window.setTimeout(() => {
            const result = calculateFIPLiteResults(inputs as FIPLiteInputs)
            setResults(result)
            setIsCalculating(false)
            calculateTimerRef.current = null
            window.scrollTo(0, 0)
        }, 4500) // Increased to 4.5s to let the terminal animation play out
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
        window.scrollTo(0, 0)
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
        <div className="flex-1 flex flex-col bg-[#0a0f1a] text-white relative">
            {/* SEO & Authority Meta Tags */}
            <title>FIP™ Lite: Hidden Profit MRI Scan | Gusti Devitto Forensics</title>
            <meta name="description" content="Calculate hidden profit leakage and business risk in 30 seconds. Forensic-grade diagnostic for enterprise margins." />
            <meta name="keywords" content="profit calculator, leakage audit, business health scan, Gusti Devitto, forensic intelligence, margin recovery" />
            <link rel="canonical" href="https://gustidevitto.com/fip-lite" />
            
            {/* Open Graph */}
            <meta property="og:title" content="FIP™ Lite: Hidden Profit MRI Scan" />
            <meta property="og:description" content="Stop the bleeding. Expose hidden leaks in your business margins." />
            <meta property="og:image" content="/assets/images/forensic_dashboard.png" />
            
            {/* GEO Signals */}
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />

            {/* Subtle Authority UI Indicator */}
            <div className="absolute top-6 left-6 md:left-12 lg:left-20 z-50 pointer-events-none flex items-center gap-3">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-red-500/80 uppercase">
                    Diagnostic Level: Verified // Active Scanner
                 </span>
            </div>

            {/* Automatic Spotlight Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 animate-spotlight-roam opacity-20"
                    style={{
                        background: `radial-gradient(800px circle at center, rgba(245, 158, 11, 0.08), transparent 50%)`
                    }}
                />
            </div>
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black uppercase tracking-tight">FIP™ Lite</h1>
                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Business Health Scan</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
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
                        industryType={inputs.industryType || 'other'}
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
    const { t } = useTranslation()
    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Hero Section */}
            {/* 1. Header & Identity */}
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                        <Terminal className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">MRI_SCAN_PROTOCOL_v4.2</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
                        {t('fip_lite_v2.input_form.hero_title_raw', 'Where is your money')}
                        <br />
                        <span className="text-amber-500 italic font-light italic-font">{t('fip_lite_v2.input_form.hero_title_accent', 'Actually')}</span>
                        <br />
                        <span className="text-white/40">{t('fip_lite_v2.input_form.hero_title_end', 'Going?')}</span>
                    </h1>
                </div>
                
                <div className="hidden lg:block text-right">
                    <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">Authenticated Investigator</div>
                    <div className="flex items-center gap-3 justify-end">
                        <span className="text-sm font-bold tracking-tight">Gusti Devitto</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 grayscale">
                            <img src="/assets/images/aboutme.jpg" alt="Anchor" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. The Input Dossier (Destroying Card Patterns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
                
                {/* Left: Input Nodes */}
                <div className="lg:col-span-8 space-y-12">
                    {isCalculating && (
                        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 backdrop-blur-md">
                            <DiagnosticTerminal />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* FIELD_01: Revenue */}
                        <div className="space-y-3 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                   <span className="text-amber-500">01</span> {t('fip_lite_v2.input_form.label_revenue', 'Monthly Revenue')}
                                </Label>
                                <span className="text-[10px] font-mono text-white/10 uppercase tracking-tighter">REF_REV_ISO</span>
                            </div>
                            <CurrencyInput
                                placeholder="0.00"
                                value={inputs.monthlyRevenue || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyRevenue: value })}
                                className="h-14 bg-transparent border-0 border-b border-white/10 rounded-none text-2xl font-black focus:ring-0 focus:border-amber-500 transition-colors p-0 tabular-nums"
                            />
                            <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                                {t('fip_lite_v2.input_form.tooltip_revenue', 'Be honest. Inflating this only hides your problems.')}
                            </p>
                        </div>

                        {/* FIELD_02: COGS */}
                        <div className="space-y-3 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                   <span className="text-amber-500">02</span> {t('fip_lite_v2.input_form.label_cogs', 'Monthly COGS')}
                                </Label>
                                <span className="text-[10px] font-mono text-white/10 uppercase tracking-tighter">REF_COGS_ISO</span>
                            </div>
                            <CurrencyInput
                                placeholder="0.00"
                                value={inputs.monthlyCOGS || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyCOGS: value })}
                                className="h-14 bg-transparent border-0 border-b border-white/10 rounded-none text-2xl font-black focus:ring-0 focus:border-amber-500 transition-colors p-0 tabular-nums text-red-400"
                            />
                            <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                                {t('fip_lite_v2.input_form.tooltip_cogs', 'Includes materials, direct labor, and shipping.')}
                            </p>
                        </div>

                        {/* FIELD_03: OpEx */}
                        <div className="space-y-3 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                   <span className="text-amber-500">03</span> {t('fip_lite_v2.input_form.label_opex', 'Monthly OpEx')}
                                </Label>
                                <span className="text-[10px] font-mono text-white/10 uppercase tracking-tighter">REF_OPEX_ISO</span>
                            </div>
                            <CurrencyInput
                                placeholder="0.00"
                                value={inputs.monthlyOpEx || 0}
                                onValueChange={(value) => setInputs({ ...inputs, monthlyOpEx: value })}
                                className="h-14 bg-transparent border-0 border-b border-white/10 rounded-none text-2xl font-black focus:ring-0 focus:border-amber-500 transition-colors p-0 tabular-nums"
                            />
                            <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                                {t('fip_lite_v2.input_form.tooltip_opex', 'Rent, salaries, internet. Fixed overhead.')}
                            </p>
                        </div>

                        {/* FIELD_04: Cash */}
                        <div className="space-y-3 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                   <span className="text-amber-500">04</span> {t('fip_lite_v2.input_form.label_cash', 'Current Cash')}
                                </Label>
                                <span className="text-[10px] font-mono text-white/10 uppercase tracking-tighter">REF_CASH_LIQ</span>
                            </div>
                            <CurrencyInput
                                placeholder="0.00"
                                value={inputs.currentCash || 0}
                                onValueChange={(value) => setInputs({ ...inputs, currentCash: value })}
                                className="h-14 bg-transparent border-0 border-b border-white/10 rounded-none text-2xl font-black focus:ring-0 focus:border-amber-500 transition-colors p-0 tabular-nums text-emerald-400"
                            />
                            <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                                {t('fip_lite_v2.input_form.tooltip_cash', 'Real money in the bank TODAY.')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                         {/* Secondary Inputs */}
                         <div className="space-y-4">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-amber-500/60 block">Industry Selection</Label>
                            <Select
                                value={inputs.industryType}
                                onValueChange={(value) => setInputs({ ...inputs, industryType: value as IndustryType })}
                            >
                                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-none border-0 border-b focus:ring-0 focus:border-amber-500 text-sm font-bold uppercase tracking-wider">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0a0f1a] border-white/10 text-white rounded-none">
                                    {INDUSTRY_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value} className="text-[10px] font-black uppercase tracking-wider focus:bg-amber-500 focus:text-black">
                                            {option.icon} {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                         </div>

                         <div className="space-y-4">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-amber-500/60 block">Team Scale</Label>
                            <Input
                                type="number"
                                placeholder="Headcount"
                                value={inputs.teamSize || ''}
                                onChange={(e) => setInputs({ ...inputs, teamSize: Number(e.target.value) })}
                                className="h-12 bg-white/5 border-white/10 rounded-none border-0 border-b focus:ring-0 focus:border-amber-500 text-sm font-bold uppercase tracking-wider"
                            />
                         </div>
                    </div>

                    <div className="pt-8">
                        <Button
                            onClick={onCalculate}
                            disabled={isCalculating}
                            className="w-full lg:w-auto px-12 h-16 text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/10 bg-amber-500 hover:bg-white text-black transition-all rounded-none group"
                        >
                            {isCalculating ? (
                                <>
                                    <RefreshCcw className="w-5 h-5 mr-3 animate-spin" />
                                    {t('fip_lite_v2.input_form.cta_loading', 'SCANNING...')}
                                </>
                            ) : (
                                <>
                                    {t('fip_lite_v2.input_form.cta_submit', 'Run Forensic MRI Scan')}
                                    <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Right: Technical Context / Disclaimer */}
                <div className="lg:col-span-4 space-y-8 border-l border-white/5 pl-8 hidden lg:block">
                    <div className="space-y-2">
                        <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Protocol Integrity</div>
                        <p className="text-xs text-white/40 leading-relaxed font-light">
                            {t('fip_lite_v2.input_form.privacy_guarantee', '100% Private. Your data never leaves this browser until you say so.')}
                        </p>
                    </div>
                    
                    <div className="p-4 bg-white/5 border border-white/10 space-y-4">
                        <div className="flex items-center gap-2">
                             <ShieldCheck className="w-4 h-4 text-emerald-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Hash</span>
                        </div>
                        <div className="text-[9px] font-mono text-white/20 break-all">
                            SHA256: 4C7D9B8E...F2A1B0C3
                        </div>
                    </div>

                    <div className="pt-8 opacity-20">
                         <img src="/assets/images/forensic_dashboard.png" alt="Overlay" className="w-full opacity-50 contrast-125 saturate-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function DiagnosticTerminal() {
    const { t } = useTranslation()
    const [lines, setLines] = useState<string[]>([])
    const logs = [
        t('fip_lite_v2.terminal.log1', "Initializing forensic core..."),
        t('fip_lite_v2.terminal.log2', "Connecting to benchmark database..."),
        t('fip_lite_v2.terminal.log3', "Analyzing COGS vs Industry Standard..."),
        t('fip_lite_v2.terminal.log4', "Searching for payroll redundancies..."),
        t('fip_lite_v2.terminal.log5', "Detecting hidden OPEX leaks..."),
        t('fip_lite_v2.terminal.log6', "Checking vendor contract elasticity..."),
        t('fip_lite_v2.terminal.log7', "Calculating true cash runway..."),
        t('fip_lite_v2.terminal.log8', "Generating risk profile..."),
        t('fip_lite_v2.terminal.log9', "Compiling leakage report...")
    ]

    useEffect(() => {
        let delay = 0
        logs.forEach((log) => {
            delay += Math.random() * 400 + 100
            setTimeout(() => {
                setLines(prev => [...prev, log])
            }, delay)
        })
    }, [])

    return (
        <div className="w-full max-w-md bg-black border border-green-500/30 p-6 rounded-lg font-mono text-sm shadow-[0_0_30px_rgba(34,197,94,0.1)]">
            <div className="flex items-center gap-2 mb-4 border-b border-green-500/20 pb-2">
                <Terminal className="w-4 h-4 text-green-500" />
                <span className="text-xs uppercase tracking-widest text-green-500">Forensic_Terminal_V4</span>
            </div>
            <div className="space-y-2 h-[200px] overflow-hidden flex flex-col justify-end">
                {lines.map((line, i) => (
                    <div key={i} className="text-green-400/80 animate-fade-in-up">
                        <span className="text-green-600 mr-2">{'>'}</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse text-green-500 font-bold">_</div>
            </div>
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
    onAuditClick,
    industryType
}: {
    results: FIPLiteResult;
    onReset: () => void;
    isEmailUnlocked: boolean;
    email: string;
    setEmail: (email: string) => void;
    onEmailSubmit: (e: React.FormEvent) => void;
    isSubmittingEmail: boolean;
    onAuditClick: () => void;
    industryType: IndustryType;
}) {
    const { t } = useTranslation()
    const { layer1, layer2, layer3 } = results
    const cashZeroDate = new Date(layer1.cashZeroDate)

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            {/* 1. THE VERDICT (Aggressive Statement) */}
            <div className="border-b border-white/5 pb-12 space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${layer2.riskVerdict === 'fortress' ? 'bg-emerald-500' : layer2.riskVerdict === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                    <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">{t('fip_lite_v2.results.scan_complete', 'FORENSIC SCAN COMPLETE // VERDICT RENDERED')}</span>
                </div>
                <h2 className={`text-[clamp(2.5rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.85] ${layer2.verdictColor}`}>
                    {layer2.verdictLabel}
                </h2>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-white/20">ID:</span>
                        <span className="text-xs font-bold text-white/60">MRI_{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-white/20">ACCESS:</span>
                        <span className="text-xs font-bold text-white/60 uppercase">High Priority Audit</span>
                     </div>
                </div>
            </div>

            {/* 2. EVIDENTIARY FINDINGS (Staggered Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
                
                {/* Finding 01: The Death Clock (Runway) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="p-8 bg-red-500/5 border-l-4 border-red-500 space-y-6 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-[40px] font-black text-red-500/5 select-none font-mono">01</div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{t('fip_lite_v2.results.label_runway', 'Cash Runway')}</span>
                            <div className="text-7xl font-black tabular-nums tracking-tighter text-red-400">{layer1.cashRunwayDays}</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{t('fip_lite_v2.results.runway_unit', 'days left to live')}</div>
                        </div>
                        <div className="pt-4 border-t border-red-500/20 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-[10px] text-red-400/80">
                                <Calendar className="w-3 h-3" />
                                <span className="font-mono">{t('fip_lite_v2.results.dead_date', 'Dead Date')}: {cashZeroDate.toLocaleDateString(t('global.date_locale', 'en-US'), { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                             </div>
                             <Activity className="w-4 h-4 text-red-500/40 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Finding 02: Marginal Efficiency & Comparison */}
                <div className="lg:col-span-7 space-y-12">
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('fip_lite_v2.results.label_gp', 'Gross Margin %')}</span>
                                <span className="text-[9px] font-mono text-white/10">FINDING_02</span>
                            </div>
                            <div className="text-5xl font-black tabular-nums text-white">{layer1.grossProfitPercent}%</div>
                            <div className="text-xs text-white/40 leading-relaxed">
                                {t('fip_lite_v2.results.prefix_typical', 'Typical')} {t(`fip_lite_v2.industries.${industryType}`, industryType)}: {layer2.gpVsIndustry.industryMin}% - {layer2.gpVsIndustry.industryMax}%
                            </div>
                            {layer2.gpVsIndustry.gap < 0 && (
                                <div className="text-[10px] text-red-400 font-black uppercase tracking-widest flex items-center gap-2">
                                    <TrendingDown className="w-3 h-3" />
                                    {Math.abs(layer2.gpVsIndustry.gap).toFixed(1)}% {t('fip_lite_v2.results.below_standard', 'BELOW BENCHMARK')}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('fip_lite_v2.results.label_leakage', 'Identified Monthly Leakage')}</span>
                                <span className="text-[9px] font-mono text-white/10">FINDING_03</span>
                            </div>
                            <div className={`text-4xl font-black tabular-nums transition-all duration-1000 ${!isEmailUnlocked ? 'blur-md select-none' : 'text-red-500'}`}>
                                {formatCurrency(layer2.estimatedLeakage.max)}
                            </div>
                            <div className="text-xs text-white/40 leading-relaxed">
                                {isEmailUnlocked ? t('fip_lite_v2.results.identified_pillars', 'Identified across 18 pillars') : t('fip_lite_v2.results.where_going_locked', 'Location tracking locked. 🔒')}
                            </div>
                        </div>
                     </div>

                     {/* Health Score Progress Bar */}
                     <div className="space-y-4 p-6 bg-white/[0.02] border border-white/5">
                        <div className="flex items-center justify-between">
                             <div className="text-[9px] font-black uppercase tracking-widest text-white/40 font-mono">System Integrity Score</div>
                             <div className={`text-xl font-black ${layer2.efficiencyIndex >= 80 ? 'text-emerald-400' : layer2.efficiencyIndex < 50 ? 'text-red-400' : 'text-yellow-400'}`}>
                                {layer2.efficiencyIndex}/100
                             </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-1000 ${layer2.efficiencyIndex >= 80 ? 'bg-emerald-500' : layer2.efficiencyIndex < 50 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                style={{ width: `${layer2.efficiencyIndex}%` }}
                             />
                        </div>
                        <p className="text-[10px] text-white/40 italic">
                             {layer2.efficiencyIndex < 80 && `${100 - layer2.efficiencyIndex}% of your profit is trapped behind operational inefficiencies.`}
                        </p>
                     </div>
                </div>
            </div>

            {/* Layer 3: LOCKED FORENSIC HEAT MAP (THE CONVERSION ENGINE) */}
            <LockedForensicHeatMap
                layer3={layer3}
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
    isEmailUnlocked,
    email,
    setEmail,
    onEmailSubmit,
    isSubmittingEmail
}: {
    layer3: FIPLiteResult['layer3'];
    isEmailUnlocked: boolean;
    email: string;
    setEmail: (email: string) => void;
    onEmailSubmit: (e: React.FormEvent) => void;
    isSubmittingEmail: boolean;
}) {
    const { t } = useTranslation()
    // Teaser Logic: Always show the first "Critical" or "Warning" pillar as a teaser
    const teaserPillarIndex = layer3.pillars.findIndex(p => p.status === 'critical' || p.status === 'warning')
    const teaserIndex = teaserPillarIndex !== -1 ? teaserPillarIndex : 0;

    return (
        <div className="relative pt-12">
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-white/5 pb-8 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                         {isEmailUnlocked ? <Activity className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-amber-500" />}
                         <h3 className="text-2xl font-black uppercase tracking-tight">{t('fip_lite_v2.results.heat_map_title', 'The Silent Assassins')}</h3>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">
                         {isEmailUnlocked ? t('fip_lite_v2.results.heat_map_unlocked_desc', 'Full diagnostic scan results') : t('fip_lite_v2.results.heat_map_locked_desc', 'Identifying the leakage points.')}
                    </p>
                </div>
                <div className="text-right">
                     <span className="text-xs font-black text-red-500 uppercase tracking-widest block">{t('fip_lite_v2.results.critical_fails_label', 'Critical Fails')}</span>
                     <span className="text-5xl font-black text-red-500 tabular-nums">{layer3.criticalCount}</span>
                </div>
            </div>

            <div className="relative">

                {/* Locked Pillars Grid */}
                <div className={`space-y-3 transition-opacity duration-500`}>
                    {layer3.pillars.slice(0, 10).map((pillar, index) => {
                        // Is this the teaser pillar?
                        const isTeaser = !isEmailUnlocked && index === teaserIndex;
                        const isLocked = !isEmailUnlocked && !isTeaser;

                        return (
                            <div key={pillar.id} className={`relative group ${isLocked ? 'filter blur-[4px] opacity-50 select-none' : ''}`}>
                                <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isTeaser ? 'bg-red-500/10 border-red-500 animate-pulse' : 'bg-black/20 border-white/5'
                                    }`}>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-bold uppercase tracking-wider ${isTeaser ? 'text-red-500' : ''}`}>
                                                {isTeaser ? `${t('fip_lite_v2.results.teaser_prefix', '⚠ CRITICAL LEAK')}: ${pillar.name}` : pillar.name}
                                            </span>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pillar.status === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                                                pillar.status === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                                                    'bg-emerald-500/10 border border-emerald-500/20'
                                                }`}>
                                                {!isLocked ? (
                                                    <span className={`text-[10px] font-black ${pillar.status === 'critical' ? 'text-red-500' : pillar.status === 'warning' ? 'text-yellow-500' : 'text-emerald-500'}`}>
                                                        {pillar.status === 'critical' ? t('fip_lite_v2.results.status_fail', 'FAIL') : pillar.status === 'warning' ? t('fip_lite_v2.results.status_warn', 'WARN') : t('fip_lite_v2.results.status_pass', 'PASS')}
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
                                                    }`}
                                                style={{ width: `${pillar.barWidth}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isTeaser && (
                                    <div className="absolute -top-3 left-6 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-widest">
                                        {t('fip_lite_v2.results.evidence_found', 'Evidence Found')}
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* "... and 8 more" indicator */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            {isEmailUnlocked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            <span className="font-bold">+ {layer3.pillars.length - 10} {t('fip_lite_v2.results.more_pillars', 'more pillars analyzed')}</span>
                        </div>
                    </div>
                </div>

                {/* Email Gate Overlay */}
                {!isEmailUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pt-40">
                        <div className="w-full max-w-md bg-[#0a0f1a] border border-amber-500/30 p-8 shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-in zoom-in-95 duration-500 space-y-6">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
                                    <Lock className="w-6 h-6 text-amber-500 animate-pulse" />
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tight">{t('fip_lite_v2.results.gate_title', 'Dossier Access Required')}</h4>
                                <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
                                    <Trans i18nKey="fip_lite_v2.results.gate_desc" values={{ count: layer3.criticalCount }}>
                                        Verification needed to reveal <span className="text-red-400 font-black">{"{{count}}"} critical vulnerabilities</span> costing you active cash flow.
                                    </Trans>
                                </p>
                            </div>
                            <form onSubmit={onEmailSubmit} className="space-y-4">
                                <Input
                                    type="email"
                                    placeholder="Enter corporate email for verification"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 bg-white/5 border-white/10 rounded-none focus:border-amber-500 text-sm font-bold placeholder:text-white/20"
                                />
                                <Button
                                    type="submit"
                                    className="w-full h-14 font-black uppercase tracking-widest bg-amber-500 hover:bg-white text-black transition-all rounded-none"
                                    disabled={isSubmittingEmail}
                                >
                                    {isSubmittingEmail ? (
                                        <RefreshCcw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        t('fip_lite_v2.results.gate_cta', 'OPEN SECURE DOSSIER')
                                    )}
                                </Button>
                                <p className="text-[8px] text-center text-white/20 uppercase tracking-[0.2em]">
                                    {t('fip_lite_v2.results.gate_privacy', 'Data transmission secured via 256-bit encryption.')}
                                </p>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Impact Summary */}
            <div className="mt-12 p-8 bg-red-500/5 border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 block">{t('fip_lite_v2.results.label_annual_loss', 'Aggregated Annual Exposure')}</span>
                    <div className="text-4xl font-black text-red-500 tabular-nums">
                        {formatCurrency(layer3.estimatedAnnualImpact.min)} — {formatCurrency(layer3.estimatedAnnualImpact.max)}
                    </div>
                </div>
                <div className="max-w-sm text-xs text-white/40 italic text-right">
                    "{t('fip_lite_v2.results.annual_loss_desc', 'This is the cost of inaction. Every day this scan is ignored, you are subsidizing operational leakage.')}"
                </div>
            </div>
        </div>
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
    const { t } = useTranslation()
    const isCritical = layer1.cashRunwayDays < 90 || layer3.criticalCount > 0;
    const leakageAmount = formatCurrency(layer2.estimatedLeakage.max);

    return (
        <div className={`mt-24 pt-12 border-t border-white/5 space-y-12 ${!isEmailUnlocked ? 'opacity-20 pointer-events-none' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 space-y-8">
                    <h3 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-[0.9]">
                        {isCritical
                            ? (
                                <Trans i18nKey="fip_lite_v2.cta.title_critical" values={{ date: new Date(layer1.cashZeroDate).toLocaleDateString(t('global.date_locale', 'en-US'), { month: 'short', day: 'numeric' }) }}>
                                    Stop the Bleeding Before <span className="text-red-500 italic">{"{{date}}"}</span>
                                </Trans>
                            )
                            : (
                                <Trans i18nKey="fip_lite_v2.cta.title_growth">
                                    Fortify Your <span className="text-emerald-400">Market Position</span>
                                </Trans>
                            )
                        }
                    </h3>
                    <p className="text-xl text-white/50 leading-relaxed max-w-2xl">
                        {isCritical
                            ? (
                                <Trans i18nKey="fip_lite_v2.cta.desc_critical" values={{ amount: leakageAmount }}>
                                    Your business is losing up to <span className="text-red-400 font-bold">{"{{amount}}"}</span> every month. This is not a drill.
                                </Trans>
                            )
                            : (
                                <Trans i18nKey="fip_lite_v2.cta.desc_growth" values={{ amount: leakageAmount }}>
                                    You've built a solid foundation. Now, let's extract the remaining <span className="text-emerald-400 font-bold">{"{{amount}}"}</span> in hidden efficiency.
                                </Trans>
                            )
                        }
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <Button
                            size="lg"
                            onClick={onAuditClick}
                            className="h-20 px-12 text-lg font-black uppercase tracking-widest bg-amber-500 hover:bg-white text-black transition-all rounded-none group"
                        >
                            <Zap className="w-5 h-5 mr-3" />
                            {t('fip_lite_v2.cta.button_audit', 'Book Audit & Secure Profit')}
                        </Button>
                        <Button variant="ghost" onClick={onReset} className="h-20 px-8 text-white/30 uppercase tracking-widest font-black text-xs hover:text-white transition-colors">
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            {t('fip_lite_v2.cta.button_reset', 'Start New MRI Scan')}
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6 pt-12 lg:pt-0">
                     <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 border-b border-white/5 pb-2">Final Authorization</div>
                     <div className="space-y-4">
                         <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full border border-white/10 p-0.5">
                                  <img src="/assets/images/aboutme.jpg" alt="Signature" className="w-full h-full rounded-full object-cover grayscale" />
                              </div>
                              <div>
                                   <div className="text-sm font-black uppercase tracking-tight">Gusti Devitto</div>
                                   <div className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Principal Investigator</div>
                              </div>
                         </div>
                         <div className="font-mono text-[10px] text-white/20">
                              CERT: 8824-FIP-IND-INTEL<br />
                              LOC: Jakarta, Indonesia
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )
}
