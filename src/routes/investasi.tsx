import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, Star } from "lucide-react"
import { useTranslation } from 'react-i18next'
import { HowFIPWorks } from "@/components/HowFIPWorks"
import PricingModal from "@/components/PricingModal"

import { useState } from 'react'

export const Route = createFileRoute('/investasi')({
    component: InvestasiPage,
})

function InvestasiPage() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<any>(null);
    const [commitmentType, setCommitmentType] = useState<any>(null);

    const openModal = (tier: any, type: any) => {
        setSelectedTier(tier);
        setCommitmentType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTier(null);
        setCommitmentType(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === 'undefined') return
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMousePos({ x, y })
    }

    const tiers = [
        {
            id: 'diagnostic',
            name: t('investasi_page.tiers.diagnostic.name', 'DIAGNOSTIC'),
            tagline: t('investasi.tier_diagnostic_focus', 'Focus: visibility'),
            positioning: t('investasi.tier_diagnostic_outcome', 'Outcome: uncover majority of visible leaks'),
            color: 'green',
            pricing: {
                oneTime: 1500,
                quarterly: { total: 3825, perAudit: 1275, audits: 3 },
                annual: { total: 4500, perAudit: 1125, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.pillars_8', default: 'Advanced forensic analysis methods -> Locate trapped cash across your operation' },
                    { key: 'investasi_page.features.syndrome', default: 'Syndrome Detection -> Prevent recurring margin erosion' },
                    { key: 'investasi_page.features.anomaly', default: 'Anomaly Detection -> Flag suspicious financial behavior instantly', highlight: true },
                    { key: 'investasi_page.features.health', default: 'Basic Health Score -> Reveal how fast your cash is burning' },
                    { key: 'investasi_page.features.summary', default: 'Executive Summary PDF -> Actionable hit-list of profit leaks' },
                    { key: 'investasi_page.features.multi_currency', default: 'Multi-currency support' },
                    { key: 'investasi_page.features.bilingual', default: 'Bilingual reports (EN/ID)' }
                ],
                excluded: [
                    t('investasi_page.features.full_25', 'Full forensic depth'),
                    t('investasi_page.features.logic_trace', 'Logic trace analysis'),
                    t('investasi_page.features.multi_outlet_analysis', 'Multi-outlet analysis'),
                    t('investasi_page.features.ai_neural', 'AI neural intelligence')
                ]
            },
            bestFor: [
                t('investasi_page.best_for_items.outlets_1_3', '1-3 outlets'),
                t('investasi_page.best_for_items.rev_500k_2m', '$500K-$2M revenue'),
                t('investasi_page.best_for_items.first_time', 'First-time diagnostic'),
                t('investasi_page.best_for_items.budget_entry', 'Budget entry point')
            ]
        },
        {
            id: 'forensic',
            name: t('investasi_page.tiers.forensic.name', 'FORENSIC'),
            tagline: t('investasi.tier_forensic_focus', 'Focus: depth'),
            positioning: t('investasi.tier_forensic_outcome', 'Outcome: identify structural profit loss'),
            color: 'blue',
            pricing: {
                oneTime: 3500,
                quarterly: { total: 8925, perAudit: 2975, audits: 3 },
                annual: { total: 10500, perAudit: 2625, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.diagnostic_short', default: 'Everything in DIAGNOSTIC' },
                    { key: 'investasi_page.features.pillars_25', default: 'Full Forensic Protocol -> Map every single vulnerability point' },
                    { key: 'investasi_page.features.logic', default: 'Logic Trace Analysis -> Expose how money exits your business', highlight: true },
                    { key: 'investasi_page.features.decision', default: 'Decision Intelligence Engine -> Turn raw data into recovery decisions', highlight: true },
                    { key: 'investasi_page.features.integrity', default: 'Data Integrity Scoring -> Detect manipulated financial reporting' },
                    { key: 'investasi_page.features.analytics', default: 'Advanced Analytics™ -> Deep-dive into operational friction' },
                    { key: 'investasi_page.features.detailed_report', default: 'Detailed Report (15-20 pages) -> Your blueprint to recover stranded capital' }
                ],
                excluded: [
                    t('investasi_page.features.multi_outlet_analysis', 'Multi-outlet network analysis'),
                    t('investasi_page.features.franchise_intel', 'Franchise intelligence'),
                    t('investasi_page.features.ai_neural', 'AI neural learning'),
                    t('investasi_page.features.wealth_impact', 'Wealth impact analysis')
                ]
            },
            bestFor: [
                t('investasi_page.best_for_items.outlets_3_8', '3-8 outlets'),
                t('investasi_page.best_for_items.rev_2m_10m', '$2M-$10M revenue'),
                t('investasi_page.best_for_items.structural_fix', 'Comprehensive structural fix'),
                t('investasi_page.best_for_items.action_oriented', 'Action-oriented')
            ]
        },
        {
            id: 'network',
            name: t('investasi_page.tiers.network.name', 'NETWORK'),
            tagline: t('investasi.tier_network_focus', 'Focus: comparison'),
            positioning: t('investasi.tier_network_outcome', 'Outcome: find which locations are destroying profit'),
            color: 'amber',
            pricing: {
                oneTime: 8000,
                quarterly: { total: 20400, perAudit: 6800, audits: 3 },
                annual: { total: 24000, perAudit: 6000, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.forensic_short', default: 'Everything in FORENSIC' },
                    { key: 'investasi_page.features.multi_outlet', default: 'Multi-Outlet Analysis (up to 50) -> Compare locations, expose the bleeders' },
                    { key: 'investasi_page.features.network_health', default: 'Network Health Index -> See which branches are silently failing' },
                    { key: 'investasi_page.features.territory', default: 'Territory Productivity Mapping -> Know exactly where you lose market efficiency' },
                    { key: 'investasi_page.features.franchise', default: 'Franchise Intelligence Suite -> Lock down franchise-wide margin safety' },
                    { key: 'investasi_page.features.velocity', default: 'Change Point Detection -> Track exact velocity of profit leakage over time', highlight: true },
                    { key: 'investasi_page.features.pathology', default: 'Pathology Evolution Scanner -> Detect shifts in structural risk trajectories' },
                    { key: 'investasi_page.features.risk', default: '12-Month Risk Projection™ -> Foresee cash flow collapse before it hits', highlight: true },
                    { key: 'investasi_page.features.scenario', default: 'Scenario Simulator -> Test "what-if" survival and recovery models', highlight: true },
                    { key: 'investasi_page.features.network_report', default: 'Network Report (30-50 pages) -> Master plan to plug network-wide cash drains' }
                ],
                excluded: [
                    t('investasi_page.features.ai_neural', 'AI neural pattern learning'),
                    t('investasi_page.features.monte_carlo', 'Monte Carlo stress testing'),
                    t('investasi_page.features.wealth_impact', 'Wealth impact analysis')
                ]
            },
            bestFor: [
                t('investasi_page.best_for_items.outlets_10_50', '10-50 outlets'),
                t('investasi_page.best_for_items.rev_10m_100m', '$10M-$100M revenue'),
                t('investasi_page.best_for_items.franchise_chain', 'Franchise/chain operators'),
                t('investasi_page.best_for_items.network_opt', 'Network optimization')
            ]
        },
        {
            id: 'sovereign',
            name: t('investasi_page.tiers.sovereign.name', 'SOVEREIGN'),
            tagline: t('investasi.tier_sovereign_focus', 'Focus: control'),
            positioning: t('investasi.tier_sovereign_outcome', 'Outcome: turn business into self-correcting system'),
            color: 'red',
            pricing: {
                oneTime: 25000,
                quarterly: { total: 63750, perAudit: 21250, audits: 3 },
                annual: { total: 75000, perAudit: 18750, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.network_short', default: 'Everything in NETWORK' },
                    { key: 'investasi_page.features.neural', default: 'AI Neural Pattern Learning -> Self-updating defense against leakage', highlight: true },
                    { key: 'investasi_page.features.predictive', default: 'Predictive Intelligence Engine -> Neutralize threats before they manifest', highlight: true },
                    { key: 'investasi_page.features.monte_carlo', default: 'Monte Carlo Stress Testing -> Ensure survival under extreme market chaos' },
                    { key: 'investasi_page.features.cascade', default: 'Syndrome Cascade Maps -> Map the chronological spread of disease states' },
                    { key: 'investasi_page.features.wealth', default: 'Founder Wealth Impact Analysis™ -> Protect cash that belongs in your account', highlight: true },
                    { key: 'investasi_page.features.unlimited', default: 'Unlimited Outlet Profiles -> Full visibility across infinite locations' },
                    { key: 'investasi_page.features.priority', default: 'Priority Strategic Access -> Direct intervention when massive leaks occur' },
                    { key: 'investasi_page.features.security', default: 'Enterprise-grade security' }
                ],
                excluded: []
            },
            bestFor: [
                t('investasi_page.best_for_items.outlets_50_500', '50-500 outlets'),
                t('investasi_page.best_for_items.rev_100m', '$100M+ revenue'),
                t('investasi_page.best_for_items.enterprise_soph', 'Enterprise sophistication'),
                t('investasi_page.best_for_items.exit_planning', 'Wealth preservation & exit planning')
            ]
        }
    ]


    const featureTiers: Record<string, string> = {
        // Diagnostic Features
        [t('investasi_page.features.pillars_8', '8 Core Forensic Pillars -> Locate trapped cash across your operation')]: 'diagnostic',
        [t('investasi_page.features.syndrome', 'Syndrome Detection -> Prevent recurring margin erosion')]: 'diagnostic',
        [t('investasi_page.features.anomaly', 'Anomaly Detection -> Flag suspicious financial behavior instantly')]: 'diagnostic',
        [t('investasi_page.features.health', 'Basic Health Score -> Reveal how fast your cash is burning')]: 'diagnostic',
        [t('investasi_page.features.summary', 'Executive Summary PDF -> Actionable hit-list of profit leaks')]: 'diagnostic',
        [t('investasi_page.features.multi_currency', 'Multi-currency support')]: 'diagnostic',
        [t('investasi_page.features.bilingual', 'Bilingual reports (EN/ID)')]: 'diagnostic',

        // Forensic Features
        [t('investasi_page.features.pillars_25', 'Full 25 Forensic Pillars -> Map every single vulnerability point')]: 'forensic',
        [t('investasi_page.features.logic', 'Logic Trace Analysis -> Expose how money exits your business')]: 'forensic',
        [t('investasi_page.features.decision', 'Decision Intelligence Engine -> Turn raw data into recovery decisions')]: 'forensic',
        [t('investasi_page.features.integrity', 'Data Integrity Scoring -> Detect manipulated financial reporting')]: 'forensic',
        [t('investasi_page.features.analytics', 'Advanced Analytics™ -> Deep-dive into operational friction')]: 'forensic',
        [t('investasi_page.features.detailed_report', 'Detailed Report (15-20 pages) -> Your blueprint to recover stranded capital')]: 'forensic',

        // Network Features
        [t('investasi_page.features.multi_outlet', 'Multi-Outlet Analysis (up to 50) -> Compare locations, expose the bleeders')]: 'network',
        [t('investasi_page.features.network_health', 'Network Health Index -> See which branches are silently failing')]: 'network',
        [t('investasi_page.features.territory', 'Territory Productivity Mapping -> Know exactly where you lose market efficiency')]: 'network',
        [t('investasi_page.features.franchise', 'Franchise Intelligence Suite -> Lock down franchise-wide margin safety')]: 'network',
        [t('investasi_page.features.velocity', 'Change Point Detection -> Track exact velocity of profit leakage over time')]: 'network',
        [t('investasi_page.features.pathology', 'Pathology Evolution Scanner -> Detect shifts in structural risk trajectories')]: 'network',
        [t('investasi_page.features.risk', '12-Month Risk Projection™ -> Foresee cash flow collapse before it hits')]: 'network',
        [t('investasi_page.features.scenario', 'Scenario Simulator -> Test "what-if" survival and recovery models')]: 'network',
        [t('investasi_page.features.network_report', 'Network Report (30-50 pages) -> Master plan to plug network-wide cash drains')]: 'network',

        // Sovereign Features
        [t('investasi_page.features.neural', 'AI Neural Pattern Learning -> Self-updating defense against leakage')]: 'sovereign',
        [t('investasi_page.features.predictive', 'Predictive Intelligence Engine -> Neutralize threats before they manifest')]: 'sovereign',
        [t('investasi_page.features.monte_carlo', 'Monte Carlo Stress Testing -> Ensure survival under extreme market chaos')]: 'sovereign',
        [t('investasi_page.features.cascade', 'Syndrome Cascade Maps -> Map the chronological spread of disease states')]: 'sovereign',
        [t('investasi_page.features.wealth', 'Founder Wealth Impact Analysis™ -> Protect cash that belongs in your account')]: 'sovereign',
        [t('investasi_page.features.unlimited', 'Unlimited Outlet Profiles -> Full visibility across infinite locations')]: 'sovereign',
        [t('investasi_page.features.priority', 'Priority Strategic Access -> Direct intervention when massive leaks occur')]: 'sovereign',
        [t('investasi_page.features.security', 'Enterprise-grade security')]: 'sovereign',
    };

    const tierHierarchy = ['diagnostic', 'forensic', 'network', 'sovereign'];

    const isFeatureAvailable = (featureName: string, tierId: string) => {
        const requiredTier = featureTiers[featureName];
        if (!requiredTier) return false;

        const requiredTierIndex = tierHierarchy.indexOf(requiredTier);
        const currentTierIndex = tierHierarchy.indexOf(tierId);

        return currentTierIndex >= requiredTierIndex;
    };

    const allFeatures = Object.keys(featureTiers);

    return (

        <div
            onMouseMove={handleMouseMove}
            className="flex-1 flex flex-col bg-[#0a0a0a] text-white relative transition-colors duration-500"
        >
            {/* Dynamic Spotlight Effect - "The Forensic Torch" */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
                style={{
                    background: `radial-gradient(800px circle at ${50 + (mousePos.x * 100)}% ${50 + (mousePos.y * 100)}%, rgba(56, 189, 248, 0.08), transparent 50%)`
                }}
            />

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div
                    className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
                    style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
                ></div>
                <div
                    className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"
                    style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
                ></div>
            </div>

            {/* SEO & Authority Meta Tags */}
            <title>{t('investasi.seo_title')} | Gusti Devitto Forensics</title>
            <meta name="description" content={t('investasi.seo_desc')} />
            <meta name="keywords" content={t('investasi.seo_keywords')} />
            <link rel="canonical" href="https://gustidevitto.com/investasi" />
            
            {/* Open Graph / social */}
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={`${t('investasi.seo_title')} | Gusti Devitto Forensics`} />
            <meta property="og:description" content={t('investasi.seo_desc')} />
            <meta property="og:image" content="/assets/images/forensic_dashboard.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/investasi" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('investasi.seo_title')} | Gusti Devitto Forensics`} />
            <meta name="twitter:description" content={t('investasi.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/forensic_dashboard.png" />
            <meta name="twitter:site" content="@gustidevitto" />

            {/* GEO Signals (Global + Local) */}
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.region" content="US-CA" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="New York, San Francisco, Jakarta" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />

            {/* Hero Header */}
            <section className="pt-32 pb-24 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a] relative z-10">
                <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 animate-bounce-subtle">
                        <Lock className="w-3 h-3" /> {t('investasi_page.hero_badge', 'Forensic Intelligence Protocol™')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                        {t('investasi_page.hero_title', 'Choose How Deep We Go')}
                    </h1>
                    <p className="text-amber-500 font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-amber-500/30 pl-8 py-2">
                        {t('investasi.outcome_anchor')}
                    </p>
                </div>
            </section>
            
            {/* Bridge Section */}
            <section className="py-24 px-4 md:px-8 border-b border-white/5 bg-[#03060a] relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">{t('investasi.bridge_title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="border border-white/10 p-6 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors group">
                            <span className="text-amber-500/50 font-mono text-xs block mb-2">{t('investasi.bridge_s1_title')}</span>
                            <p className="text-white/80 font-light group-hover:text-amber-500 transition-colors">{t('investasi.bridge_s1_desc', 'We locate exactly where money gets stuck or leaks inside your operation.')}</p>
                        </div>
                        <div className="border border-white/10 p-6 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors group">
                            <span className="text-amber-500/50 font-mono text-xs block mb-2">{t('investasi.bridge_s2_title')}</span>
                            <p className="text-white/80 font-light group-hover:text-amber-500 transition-colors">{t('investasi.bridge_s2_desc', 'We calculate how much profit is being lost, delayed, or trapped.')}</p>
                        </div>
                        <div className="border border-white/10 p-6 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors group">
                            <span className="text-amber-500/50 font-mono text-xs block mb-2">{t('investasi.bridge_s3_title')}</span>
                            <p className="text-white/80 font-light group-hover:text-amber-500 transition-colors">{t('investasi.bridge_s3_desc', 'We give you a clear, prioritized action path to recover that money.')}</p>
                        </div>
                        <div className="border border-white/10 p-6 bg-white/[0.02] text-left hover:bg-white/[0.04] transition-colors group">
                            <span className="text-amber-500/50 font-mono text-xs block mb-2">{t('investasi.bridge_s4_title')}</span>
                            <p className="text-white/80 font-light group-hover:text-amber-500 transition-colors">{t('investasi.bridge_s4_desc', 'We prevent the same leakage from happening again.')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 md:px-8 border-b border-white/5 bg-zinc-900/10 relative z-10">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {tiers.map((tier) => {
                            const colorMap: Record<string, { base: string, text: string, bg: string, border: string }> = {
                                green: { base: 'green', text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500' },
                                blue: { base: 'blue', text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500' },
                                amber: { base: 'amber', text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500' },
                                red: { base: 'red', text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' }
                            };
                            const theme = colorMap[tier.color] || colorMap.green;

                            return (
                                <div key={tier.id} className={`border rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-${theme.base}-500/20 bg-${theme.base}-500/5 hover:shadow-${theme.base}-500/10 relative overflow-hidden group`}>
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${theme.base}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                                    <div className="mb-6 text-center">
                                        <h3 className={`text-3xl font-black ${theme.text} tracking-tight mb-2`}>{tier.name}</h3>
                                        <p className="italic text-muted-foreground font-serif text-lg">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-4 my-6 flex-grow">
                                        {/* One-Time Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                            <div className="text-left">
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">{t('investasi_page.labels.one_time', 'One-Time Audit')}</h4>
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">${tier.pricing.oneTime.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground">{t('investasi_page.labels.one_time_child', 'Single Comprehensive Audit')}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                {t('investasi_page.labels.select', 'Select')}
                                            </Button>
                                        </div>

                                        {/* Quarterly Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                            <div className="text-left">
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">{t('investasi_page.labels.quarterly', 'Quarterly Program')}</h4>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-white">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">{t('investasi_page.labels.total', 'Total')}</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.quarterly.perAudit.toLocaleString()} / {t('investasi_page.labels.per_audit', 'audit')}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground italic">
                                                        {t('investasi_page.labels.quarterly_sub', '3x Audits (Monthly)')}
                                                    </div>
                                                    <span className="text-xs text-green-400 font-bold mt-1">{t('investasi_page.labels.save', { amount: `$${(tier.pricing.oneTime * 3 - tier.pricing.quarterly.total).toLocaleString()}` })}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                {t('investasi_page.labels.select', 'Select')}
                                            </Button>
                                        </div>

                                        {/* Annual Option */}
                                        <div className={`p-5 border border-${theme.base}-500/30 rounded-lg bg-${theme.base}-500/10 hover:bg-${theme.base}-500/20 transition-colors flex items-center justify-between relative ring-1 ring-${theme.base}-500/20`}>
                                            <div className={`absolute -top-3 left-4 ${theme.bg} text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg`}>{t('investasi_page.labels.recommended', 'Recommended')}</div>
                                            <div className="text-left mt-1">
                                                <h4 className={`font-bold uppercase tracking-widest text-xs ${theme.text} mb-1`}>{t('investasi_page.labels.annual', 'Annual Partnership')}</h4>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-white">${tier.pricing.annual.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">/ {t('investasi_page.labels.year', 'Year')}</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.annual.perAudit.toLocaleString()} / {t('investasi_page.labels.per_audit', 'audit')}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground italic">
                                                        {t('investasi_page.labels.annual_sub', '4x Audits (Quarterly)')}
                                                    </div>
                                                    <span className="text-xs text-green-400 font-bold mt-1">{t('investasi_page.labels.save', { amount: `$${(tier.pricing.oneTime * 4 - tier.pricing.annual.total).toLocaleString()}` })} + Benefits</span>
                                                </div>
                                            </div>
                                            <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.bg} text-black hover:bg-white hover:text-black border-none font-bold transition-all shadow-lg shadow-${theme.base}-500/20 h-auto py-2`}>
                                                {t('investasi_page.labels.select', 'Select')}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <div className="mb-4">
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t('investasi_page.labels.key_features', 'Key Features')}</p>
                                            <ul className="space-y-4">
                                                {tier.features.included.slice(0, 10).map((featureObj, i) => {
                                                    const parts = t(featureObj.key, featureObj.default).split(' -> ');
                                                    const isHighlighted = featureObj.highlight;

                                                    return (
                                                    <li key={i} className={`flex items-start gap-3 text-sm transition-all duration-300 ${isHighlighted ? 'bg-amber-500/5 -mx-2 px-2 py-1 rounded-md border-l border-amber-500/30' : 'text-gray-300'}`}>
                                                        {isHighlighted ? (
                                                            <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500 animate-pulse-slow" />
                                                        ) : (
                                                            <ShieldCheck className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
                                                        )}
                                                        <div className="leading-snug">
                                                            <span className={`${isHighlighted ? 'text-amber-400 font-bold' : 'text-white font-medium'}`}>
                                                                {parts[0]}
                                                                {isHighlighted && <span className="ml-1 text-[10px] opacity-70">★</span>}
                                                            </span>
                                                            {parts[1] && <span className={`block text-[11px] italic mt-0.5 ${isHighlighted ? 'text-amber-200/60' : 'text-muted-foreground/80'}`}>{parts[1]}</span>}
                                                        </div>
                                                    </li>
                                                )})}
                                            </ul>
                                        </div>

                                        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/5">
                                            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">{t('investasi_page.labels.best_for', 'Best for:')}</p>
                                            <ul className="space-y-1">
                                                {tier.bestFor.slice(0, 2).map((item, i) => (
                                                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                                                        <span className={`w-1 h-1 rounded-full bg-${theme.base}-500/50`}></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section className="py-24 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-center">{t('investasi_page.labels.analysis_title', 'Deeper Analysis')}</h2>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-bold">{t('investasi_page.labels.feature_comparison', 'See Detailed Feature Comparison')}</h3>
                            <table className="w-full text-left mt-4">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-muted-foreground font-bold text-xs uppercase tracking-wider">{t('investasi_page.labels.feature', 'Feature')}</th>
                                        {tiers.map(tier => (
                                            <th key={tier.id} className="p-3 text-center text-muted-foreground font-bold text-xs uppercase tracking-wider whitespace-nowrap">{tier.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(() => {
                                        // 1. Define tier order
                                        const tierOrder = ['diagnostic', 'forensic', 'network', 'sovereign'];
                                        
                                        // 2. Identify all unique features and their minimum tier
                                        const featureMap = new Map();
                                        
                                        tiers.forEach(tier => {
                                            const rank = tierOrder.indexOf(tier.id);
                                            tier.features.included.forEach(f => {
                                                // Ignore summary/placeholder features in the detailed table
                                                if (f.key.endsWith('_short') || f.key.endsWith('_short_base')) return;
                                                
                                                if (!featureMap.has(f.key) || rank < featureMap.get(f.key).rank) {
                                                    featureMap.set(f.key, { ...f, rank });
                                                }
                                            });
                                        });

                                        // 3. Render unique features sorted by their original introduction tier
                                        return Array.from(featureMap.values())
                                            .sort((a, b) => a.rank - b.rank)
                                            .map(featureObj => {
                                                const translated = t(featureObj.key, featureObj.default);
                                                const parts = translated.split(' -> ');
                                                const isHighlighted = featureObj.highlight;

                                                return (
                                                <tr key={featureObj.key} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isHighlighted ? 'bg-amber-500/[0.03]' : ''}`}>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            {isHighlighted && <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
                                                            <span className={`font-medium block ${isHighlighted ? 'text-amber-400' : 'text-white'}`}>{parts[0]}</span>
                                                        </div>
                                                        {parts[1] && <span className={`text-[11px] italic block mt-0.5 leading-snug ${isHighlighted ? 'text-amber-200/40' : 'text-muted-foreground/60'}`}>{parts[1]}</span>}
                                                    </td>
                                                    {tiers.map(tier => {
                                                        const tierRank = tierOrder.indexOf(tier.id);
                                                        const featureMinRank = featureObj.rank;
                                                        const isAvailable = tierRank >= featureMinRank;

                                                        return (
                                                            <td key={tier.id} className="p-3 text-center">
                                                                {isAvailable ? (
                                                                    <span className={isHighlighted ? 'text-lg' : ''}>✅</span>
                                                                ) : (
                                                                    <span className="opacity-20 text-xs text-white">❌</span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        });
                                    })()}
                                </tbody>
                            </table>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-bold">{t('investasi_page.labels.which_tier_title', 'Which Tier Is Right For Me?')}</h3>
                            <div className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.diagnostic.name', 'DIAGNOSTIC') })}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.comparison.diagnostic_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.forensic.name', 'FORENSIC') })}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.comparison.forensic_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.network.name', 'NETWORK') })}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.comparison.network_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.sovereign.name', 'SOVEREIGN') })}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.comparison.sovereign_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-bold">{t('investasi_page.labels.time_commitment_title', 'Understanding Time Commitment Options')}</h3>
                            <div className="text-muted-foreground mt-4 space-y-6">
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.commitment_details.one_time.title', 'ONE-TIME AUDIT')}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.commitment_details.one_time.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.commitment_details.quarterly.title', 'QUARTERLY PROGRAM (3 audits)')}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.commitment_details.quarterly.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t('investasi_page.commitment_details.annual.title', 'ANNUAL PARTNERSHIP (4 audits + access)')}</h4>
                                    <ul className="list-disc list-inside">
                                        {(t('investasi_page.commitment_details.annual.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 bg-zinc-800 rounded-lg">
                                    <h5 className="font-bold text-white">{t('investasi_page.labels.savings_example', 'SAVINGS EXAMPLE (FORENSIC tier):')}</h5>
                                    <ul className="list-disc list-inside">
                                        <li>One-time: $3,500/audit</li>
                                        <li>Quarterly: $2,975/audit (save $525)</li>
                                        <li>Annual: $2,625/audit + access (save $875 + benefits)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Mini */}
            <HowFIPWorks />

            {/* Attribution / Footer Copy */}
            <section className="py-24 px-4 md:px-8 bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    {/* Micro Proof Block */}
                    <div className="mb-12 p-8 border border-amber-500/20 bg-amber-500/5 text-left max-w-3xl mx-auto rounded-md relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col items-center">
                             <div className="flex-1 w-full bg-amber-500"></div>
                        </div>
                        <p className="text-white/80 italic text-lg leading-relaxed pl-4">
                            "{t('investasi.micro_proof')}"
                        </p>
                    </div>

                    <h2 className="text-3xl font-black">{t('investasi_page.labels.not_sure_title', 'Not sure how deep you need us to go?')}</h2>
                    <p className="text-muted-foreground text-lg">{t('investasi.reassurance')}</p>
                    
                    <div className="pt-6">
                        <Button className="font-bold tracking-widest uppercase bg-amber-500 text-black hover:bg-white rounded-none px-8 py-6">{t('investasi.reassurance_btn', 'Start with a Diagnostic')}</Button>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.5em]">
                {t('investasi_page.labels.footer_rights', { year: currentYear })}
            </footer>
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div>
    )
}
