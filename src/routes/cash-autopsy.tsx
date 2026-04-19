import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Lock, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, FileBarChart2 } from 'lucide-react'
import { NeuralMeshBackground } from '@/components/ui/neural-mesh'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { calculateCashAutopsy } from '@/lib/fip-engine'
import type { CashAutopsyInputs, CashAutopsyResult } from '@/types/fip-lite'
import { submitLead } from '@/lib/googleSheetsAPI'

export const Route = createFileRoute('/cash-autopsy')({
    component: CashAutopsyDiagnostic,
})

function CashAutopsyDiagnostic() {
    const { t } = useTranslation()
    
    // State
    const [step, setStep] = useState<number>(1)
    const [isCalculating, setIsCalculating] = useState(false)
    const [result, setResult] = useState<CashAutopsyResult | null>(null)
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [inputs, setInputs] = useState<CashAutopsyInputs>({
        revenue: 0,
        cogs: 0,
        opex: 0,
        cash: 0,
        shortDebt: 0,
        ap: 0
    })

    const [leadData, setLeadData] = useState({ name: '', email: '', businessName: '' })

    // Formatting
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value.replace(/\D/g, '')) }))
    }

    const handleNext = () => setStep(s => Math.min(3, s + 1))
    const handlePrev = () => setStep(s => Math.max(1, s - 1))

    const handleRunDiagnostic = () => {
        setIsCalculating(true)
        setTimeout(() => {
            const data = calculateCashAutopsy(inputs)
            setResult(data)
            setIsCalculating(false)
            setStep(4)
        }, 2000)
    }

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        await submitLead({
            ...leadData,
            phone: '',
            source: 'Autopsy - Cash',
            runwayVerdict: result?.layer2.runwayVerdict
        })
        
        setIsSubmitting(false)
        setIsUnlocked(true)
    }

    const renderInputField = (name: keyof CashAutopsyInputs, labelKey: string, hintKey: string) => (
        <div className="space-y-2">
            <label className="text-sm font-bold tracking-widest uppercase text-white/60 block">
                {t(`cash_autopsy.form.${labelKey}`, labelKey)}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <input 
                    type="text"
                    name={name}
                    value={inputs[name] === 0 ? '' : inputs[name].toLocaleString()}
                    onChange={handleChange}
                    className="w-full glass border border-white/10 p-4 pl-8 font-semibold text-xl focus:border-[#0A84FF] focus:outline-none transition-colors rounded-squircle-md"
                    placeholder="0"
                />
            </div>
            <p className="text-xs text-white/40 font-light">{t(`cash_autopsy.form.${hintKey}`, hintKey)}</p>
        </div>
    )

    // Render Wizard
    if (step < 4) {
        return (
            <div className="min-h-screen bg-[#1c1c1e] text-white pt-24 pb-12 px-6 flex flex-col relative overflow-hidden">
                <title>{t('cash_autopsy.seo_title', 'Cash Autopsy | Free Survival Scan')}</title>

                
                <NeuralMeshBackground colorClass="text-red-500" />
                <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative z-10">
                    <div className="mb-12">
                        <Link to="/fip-lite" className="text-white/40 hover:text-white uppercase tracking-widest text-xs font-bold inline-flex items-center transition-colors mb-6">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            {t('global.back', 'Return')}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 flex items-center">
                            <ShieldAlert className="w-10 h-10 mr-4 text-red-500" />
                            {t('cash_autopsy.title', 'Cash Autopsy')}
                        </h1>
                        <p className="text-white/60 text-xl font-light">
                            {t('cash_autopsy.intro', 'Find out exactly how long your business can survive on current reserves.')}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/10 mb-8 relative">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-red-500"
                            initial={{ width: `${((step - 1) / 3) * 100}%` }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold text-right mb-12">
                        {t('wizard_shared.step_of', { current: step, total: 3 })}
                    </p>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-grow space-y-8"
                        >
                            {step === 1 && (
                                <>
                                    <div className="p-4 bg-white/5 border-l-2 border-red-500 text-sm font-light text-white/60 italic">
                                        "{t('cash_autopsy.encouragement.0', "Let's get the absolute basics.")}"
                                    </div>
                                    {renderInputField("revenue", "revenue.label", "revenue.hint")}
                                    {renderInputField("cogs", "cogs.label", "cogs.hint")}
                                </>
                            )}
                            
                            {step === 2 && (
                                <>
                                    <div className="p-4 bg-white/5 border-l-2 border-red-500 text-sm font-light text-white/60 italic">
                                        "{t('cash_autopsy.encouragement.1', "Halfway there. Just a few more numbers.")}"
                                    </div>
                                    {renderInputField("opex", "opex.label", "opex.hint")}
                                    {renderInputField("cash", "cash.label", "cash.hint")}
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="p-4 bg-white/5 border-l-2 border-red-500 text-sm font-light text-white/60 italic">
                                        "{t('cash_autopsy.encouragement.2', "Last step before the verdict.")}"
                                    </div>
                                    {renderInputField("shortDebt", "short_debt.label", "short_debt.hint")}
                                    {renderInputField("ap", "ap.label", "ap.hint")}
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                        {step > 1 ? (
                            <button onClick={handlePrev} className="text-white/60 hover:text-white uppercase tracking-widest font-bold text-sm px-6 py-4">
                                {t('wizard_shared.btn_prev', 'Go Back')}
                            </button>
                        ) : <div/>}

                        {step < 3 ? (
                            <Button onClick={handleNext} className="bg-white text-black hover:bg-white/90 uppercase tracking-widest font-bold px-8">
                                {t('wizard_shared.btn_next', 'Next Step')} <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button 
                                onClick={handleRunDiagnostic} 
                                disabled={isCalculating}
                                className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest font-bold px-8"
                            >
                                {isCalculating ? t('wizard_shared.processing', 'Processing Variables...') : t('wizard_shared.btn_submit', 'Reveal My Results')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Render Results
    if (!result) return null

    const VerdictIcon = result.layer2.runwayVerdict === 'fortress' ? CheckCircle2 : result.layer2.runwayVerdict === 'warning' ? AlertTriangle : XCircle
    const verdictColor = result.layer2.runwayVerdict === 'fortress' ? 'text-emerald-500' : result.layer2.runwayVerdict === 'warning' ? 'text-amber-500' : 'text-red-500'

    return (
        <div className="min-h-screen bg-[#1c1c1e] text-white pt-24 pb-24 px-6 relative overflow-hidden">
            <title>Diagnostic Complete | Cash Autopsy</title>

            
                <NeuralMeshBackground colorClass="text-red-500" />
            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                        Diagnostic Engine Halted
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                        {t('cash_autopsy.results.layer12_title', 'Immediate Verdict')}
                    </h1>
                </div>

                {/* Layer 1: Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 border border-white/10 glass rounded-squircle-lg relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-3xl`} />
                        <h3 className="text-sm uppercase tracking-widest font-bold text-white/60 mb-2">{t('cash_autopsy.results.runway_label', 'Cash Runway')}</h3>
                        <div className="text-5xl font-semibold mb-2 flex items-end gap-2">
                            {result.layer1.cashRunwayDays} <span className="text-xl text-white/40 mb-1">DAYS</span>
                        </div>
                    </div>

                    <div className="p-8 border border-white/10 glass rounded-squircle-lg relative overflow-hidden">
                        <h3 className="text-sm uppercase tracking-widest font-bold text-white/60 mb-2">{t('cash_autopsy.results.burn_label', 'Net Burn Rate')}</h3>
                        <div className="text-5xl font-semibold mb-2">
                            {formatCurrency(result.layer1.netBurnRate)}<span className="text-xl text-white/40">/mo</span>
                        </div>
                    </div>
                </div>

                {/* Layer 2: Psychological Context & Cliffhanger */}
                <div className={`p-8 border rounded-squircle-lg ${result.layer2.runwayVerdict === 'critical' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 glass'} flex items-start`}>
                    <VerdictIcon className={`w-8 h-8 mr-6 flex-shrink-0 ${verdictColor}`} />
                    <div>
                        <h3 className={`text-xl font-bold tracking-tight mb-4 ${verdictColor}`}>
                            System Classification: {result.layer2.runwayVerdict.toUpperCase()}
                        </h3>
                        <p className="text-lg text-white/90 font-medium leading-relaxed mb-6">
                            {t('cash_autopsy.results.cliffhanger', 'We also detected a potential Liquidity Trap syndrome forming. Specific details on this anomaly are locked in your full report below...')}
                        </p>
                    </div>
                </div>

                {/* Layer 3: The Gatekeeper */}
                {!isUnlocked ? (
                    <div className="border border-white/10 rounded-squircle-xl p-1 bg-[url('/noise.png')] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 pointer-events-none" />
                        <div className="p-8 pb-12 text-center relative z-10 flex flex-col items-center">
                            <Lock className="w-12 h-12 text-white/40 mb-6" />
                            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">
                                {t('cash_autopsy.gatekeeper.title', 'Unlock Deep Cash Analysis')}
                            </h3>
                            <p className="text-white/60 mb-8 max-w-lg mx-auto font-light">
                                {t('cash_autopsy.gatekeeper.desc', 'Enter your email to reveal the exact severity of your structural cash risk and the locked vectors.')}
                            </p>
                            
                            <div className="inline-flex items-center justify-center gap-2 mb-8 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                                <CheckCircle2 className="w-4 h-4" /> 100% Free. No Strings Attached.
                            </div>
                            <form onSubmit={handleUnlock} className="w-full max-w-md space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    required 
                                    value={leadData.name}
                                    onChange={e => setLeadData({...leadData, name: e.target.value})}
                                    className="w-full glass border border-white/20 rounded-squircle-md p-4 font-semibold text-white placeholder-white/40 focus:outline-none focus:border-[#0A84FF] transition-colors"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Professional Email" 
                                    required 
                                    value={leadData.email}
                                    onChange={e => setLeadData({...leadData, email: e.target.value})}
                                    className="w-full glass border border-white/20 rounded-squircle-md p-4 font-semibold text-white placeholder-white/40 focus:outline-none focus:border-[#0A84FF] transition-colors"
                                />
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black hover:bg-white/90 uppercase tracking-widest font-bold p-6 h-auto"
                                >
                                    {isSubmitting ? 'Authenticating...' : t('cash_autopsy.gatekeeper.btn', 'Unlock Report')}
                                </Button>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest pt-6 space-y-2">
                                    <div className="text-emerald-400 font-bold tracking-widest">THIS IS NOT A TRAP. ZERO OBLIGATIONS.</div>
                                    <div className="font-light leading-relaxed">
                                        Your specific vector data will be instantly unlocked on this exact page.<br/>
                                        <span className="text-white/40">We protect your privacy & will never spam you.</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center mb-6 border-b border-white/10 pb-4">
                            <FileBarChart2 className="w-6 h-6 mr-3 text-white/60" />
                            Unsealed Vectors
                        </h3>
                        <div className="mb-10 p-6 bg-white/5 border border-white/10 text-white/90 font-light leading-relaxed space-y-4 text-sm">
                            <p>Based on your profile, our engine has isolated the four exact vectors driving your current <strong className="text-white font-medium">Cash Runway</strong> and <strong className="text-white font-medium">Net Burn Rate</strong>. The red bars indicate active capital hemorrhaging points that require immediate executive action.</p>
                            <p>Understanding these surface metrics is the first step to survival. However, structurally fixing a critical bleed—whether it's trapped working capital or lethal debt coverage—requires tracking these symptoms back to their source. <span className="text-emerald-400 font-medium">True financial turnaround begins with deep root-cause isolation.</span></p>
                        </div>
                        <div className="space-y-4">
                            {result.layer3.pillars.map(pillar => (
                                <div key={pillar.id} className="p-6 border border-white/10 glass rounded-squircle-md space-y-3">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{pillar.category.replace(/-/g, ' ')}</div>
                                            <div className="text-lg font-bold">{pillar.name}</div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <div className="text-2xl font-bold tracking-tight">{pillar.computedValue}</div>
                                            <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border rounded-full ${pillar.status === 'critical' ? 'text-red-500 border-red-500/30 bg-red-500/10' : pillar.status === 'warning' ? 'text-amber-500 border-amber-500/30 bg-amber-500/10' : 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'}`}>
                                                {pillar.status}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/60 font-light leading-relaxed">{pillar.computedLabel}</p>
                                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pillar.barWidth}%` }}
                                            transition={{ duration: 1.2, ease: 'easeOut' }}
                                            className={`h-full ${pillar.status === 'critical' ? 'bg-red-500' : pillar.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cross Links non-hierarchical */}
                        <div className="mt-16 pt-16 border-t border-white/10 border-dashed text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8">
                                {t('wizard_shared.cross_links_title', 'Explore Other Blindspots')}
                            </h3>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/margin-audit" className="px-6 py-4 border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-widest text-xs font-bold inline-flex items-center justify-center">
                                    {t('wizard_shared.cta_margin', 'Check Margin Leakage')} <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                                </Link>
                                <Link to="/growth-scan" className="px-6 py-4 border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-widest text-xs font-bold inline-flex items-center justify-center">
                                    {t('wizard_shared.cta_growth', 'Check Scalability')} <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                                </Link>
                            </div>
                            
                            
                        {/* The "Now What?" Gap - Explicit Medical Analogy */}
                        <div className="mt-16 p-8 glass-elevated rounded-squircle-xl border-l-4 border-amber-500 relative">
                            <h4 className="text-amber-500 text-sm font-bold uppercase tracking-widest flex items-center mb-6">
                                <AlertTriangle className="w-5 h-5 mr-3" /> The Prescription Gap
                            </h4>
                            <div className="space-y-4 text-sm font-semibold leading-relaxed">
                                <p className="text-white/90">
                                    You now know <strong className="text-white font-bold italic">where</strong> you are bleeding. But you still don't know <strong className="text-white font-bold italic">why it's happening—or how to stop it.</strong>
                                </p>
                                <p className="text-white/60">
                                    A doctor doesn't just tell you "your heart is failing." They identify exactly which valve is damaged, prescribe the right medication and dosage, tell you how long recovery takes, and schedule follow-up checkups to track whether you're actually healing—or getting worse.
                                </p>
                                <p className="text-white/60">
                                    That's what our full forensic audit does for your business. You get the <strong className="text-emerald-400 font-bold">exact root cause</strong>, a prioritized action plan with specific steps your team can execute this week, and a monitoring framework to measure whether each fix is working. <span className="text-white/40">Not vague advice. Not a generic report. A surgical operating manual built from your numbers.</span>
                                </p>
                            </div>
                        </div>

 {/* Premium CTA Block */}
                            <div className="mt-8 p-8 relative glass-elevated border border-white/20 rounded-squircle-xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-left flex-1">
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-2">Exclusive Deep Dive</div>
                                        <h4 className="text-2xl font-bold uppercase tracking-tight mb-2 text-white">Full Forensic Audit</h4>
                                        <p className="text-sm text-white/60 font-semibold leading-relaxed">
                                            Move beyond surface symptoms. Book a surgical, 19-pillar operational audit to permanently map, isolate, and structurally resolve the exact blindspots slowly eroding your bottom line.
                                        </p>
                                    </div>
                                    <Link to="/investasi" className="flex-shrink-0 bg-white text-black hover:bg-emerald-500 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-xs px-8 py-4 flex items-center rounded-squircle-md">
                                        Commission Audit <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
