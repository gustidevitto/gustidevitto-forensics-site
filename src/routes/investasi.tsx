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

    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            {/* Ambient background orbs — static, non-interactive */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0A84FF]/[0.04] rounded-full blur-[160px] animate-subtle-glow" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#BFA26A]/[0.03] rounded-full blur-[120px] animate-float" />
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

            {/* ── HERO ── */}
            <section className="pt-32 pb-24 px-4 md:px-8 border-b border-white/[0.05] bg-[#1c1c1e] relative z-10">
                <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-squircle-sm text-[10px] font-semibold uppercase tracking-widest text-[#BFA26A]">
                        <Lock className="w-3 h-3" strokeWidth={1.5} /> {t('investasi_page.hero_badge', 'Forensic Intelligence Protocol™')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        {t('investasi_page.hero_title', 'Choose How Deep We Go')}
                    </h1>
                    <p className="text-[#BFA26A] font-semibold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-[#BFA26A]/25 pl-8 py-2">
                        {t('investasi.outcome_anchor')}
                    </p>
                </div>
            </section>
            
            {/* ── BRIDGE SECTION ── */}
            <section className="py-24 px-4 md:px-8 border-b border-white/[0.05] bg-[#161618] relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-14 space-y-3">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">{t('investasi.bridge_title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1,2,3,4].map(n => (
                            <div key={n} className="glass rounded-squircle-lg p-6 text-left hover:glass-elevated transition-all duration-300 group">
                                <span className="text-[#0A84FF]/60 font-semibold text-xs uppercase tracking-[0.2em] block mb-3">{t(`investasi.bridge_s${n}_title`)}</span>
                                <p className="text-white/60 font-light leading-relaxed text-sm group-hover:text-white/60 transition-colors">{t(`investasi.bridge_s${n}_desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 md:px-8 border-b border-white/[0.05] bg-[#1c1c1e] relative z-10">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {tiers.map((tier) => {
                            const colorMap: Record<string, { accentText: string; accentBg: string; accentBorder: string; glassClass: string }> = {
                                green:  { accentText: 'text-[#0A84FF]',   accentBg: 'bg-[#0A84FF]',   accentBorder: 'border-[#0A84FF]/20',   glassClass: 'glass-blue' },
                                blue:   { accentText: 'text-[#0A84FF]',   accentBg: 'bg-[#0A84FF]',   accentBorder: 'border-[#0A84FF]/20',   glassClass: 'glass-blue' },
                                amber:  { accentText: 'text-[#BFA26A]',   accentBg: 'bg-[#BFA26A]',   accentBorder: 'border-[#BFA26A]/20',   glassClass: 'glass-gold' },
                                red:    { accentText: 'text-red-400',      accentBg: 'bg-red-500',      accentBorder: 'border-red-500/20',      glassClass: 'glass' },
                            };
                            const theme = colorMap[tier.color] || colorMap.blue;

                            return (
                                <div key={tier.id} className="glass-elevated rounded-squircle-xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.005] relative overflow-hidden group">
                                    {/* Top accent bar */}
                                    <div className={`absolute top-0 left-8 right-8 h-px ${theme.accentBg} opacity-30 group-hover:opacity-60 transition-opacity`} />

                                    <div className="mb-6">
                                        <h3 className={`text-2xl font-black ${theme.accentText} tracking-tight mb-1`}>{tier.name}</h3>
                                        <p className="text-white/40 font-light text-sm">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-3 my-6 flex-grow">
                                        {/* One-Time */}
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between hover:glass-elevated transition-all group/opt">
                                            <div className="text-left">
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1 group-hover/opt:text-white/60 transition-colors">{t('investasi_page.labels.one_time', 'One-Time Audit')}</h4>
                                                <span className="text-xl font-bold text-white font-mono">${tier.pricing.oneTime.toLocaleString()}</span>
                                                <span className="text-xs text-white/40 block mt-0.5">{t('investasi_page.labels.one_time_child', 'Single Comprehensive Audit')}</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')}>{t('investasi_page.labels.select', 'Select')}</Button>
                                        </div>

                                        {/* Quarterly */}
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between hover:glass-elevated transition-all group/opt">
                                            <div className="text-left">
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1 group-hover/opt:text-white/60 transition-colors">{t('investasi_page.labels.quarterly', 'Quarterly Program')}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white font-mono">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">{t('investasi_page.labels.total', 'Total')}</span>
                                                </div>
                                                <span className="text-xs text-white/40">${tier.pricing.quarterly.perAudit.toLocaleString()} / {t('investasi_page.labels.per_audit', 'audit')} · {t('investasi_page.labels.quarterly_sub', '3x Monthly')}</span>
                                                <span className="text-xs text-emerald-400 font-semibold mt-1 block">{t('investasi_page.labels.save', { amount: `$${(tier.pricing.oneTime * 3 - tier.pricing.quarterly.total).toLocaleString()}` })}</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')}>{t('investasi_page.labels.select', 'Select')}</Button>
                                        </div>

                                        {/* Annual — highlighted */}
                                        <div className={`p-4 rounded-squircle-sm flex items-center justify-between relative ${theme.glassClass} border ${theme.accentBorder}`}>
                                            <div className={`absolute -top-3 left-4 ${theme.accentBg} text-black text-[9px] font-black px-3 py-1 rounded-squircle-sm uppercase tracking-wider`}>{t('investasi_page.labels.recommended', 'Recommended')}</div>
                                            <div className="text-left mt-1">
                                                <h4 className={`font-semibold uppercase tracking-widest text-xs ${theme.accentText} mb-1`}>{t('investasi_page.labels.annual', 'Annual Partnership')}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white font-mono">${tier.pricing.annual.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">/ {t('investasi_page.labels.year', 'Year')}</span>
                                                </div>
                                                <span className="text-xs text-white/40">${tier.pricing.annual.perAudit.toLocaleString()} / audit · {t('investasi_page.labels.annual_sub', '4x Quarterly')}</span>
                                                <span className="text-xs text-emerald-400 font-semibold mt-1 block">{t('investasi_page.labels.save', { amount: `$${(tier.pricing.oneTime * 4 - tier.pricing.annual.total).toLocaleString()}` })} + Benefits</span>
                                            </div>
                                            <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.accentBg} text-black hover:brightness-110 border-none font-bold`}>{t('investasi_page.labels.select', 'Select')}</Button>
                                        </div>
                                    </div>

                                    <div className="pt-5 border-t border-white/[0.05]">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">{t('investasi_page.labels.key_features', 'Key Features')}</p>
                                        <ul className="space-y-3">
                                            {tier.features.included.slice(0, 10).map((featureObj, i) => {
                                                const parts = (t(featureObj.key, featureObj.default) as string).split(' -> ');
                                                const isHighlighted = featureObj.highlight;
                                                return (
                                                    <li key={i} className={`flex items-start gap-3 text-sm ${isHighlighted ? 'glass-gold -mx-2 px-2 py-1 rounded-squircle-sm border-l-2 border-[#BFA26A]/25' : 'text-white/60'}`}>
                                                        {isHighlighted
                                                            ? <Star className="w-3.5 h-3.5 text-[#BFA26A] shrink-0 mt-0.5 fill-[#BFA26A]" strokeWidth={1} />
                                                            : <ShieldCheck className={`w-3.5 h-3.5 ${theme.accentText} shrink-0 mt-0.5`} strokeWidth={1.5} />
                                                        }
                                                        <div className="leading-snug">
                                                            <span className={isHighlighted ? 'text-[#BFA26A] font-semibold' : 'text-white/60'}>{parts[0]}</span>
                                                            {parts[1] && <span className="block text-[11px] mt-0.5 text-white/40 italic">{parts[1]}</span>}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className="mt-5 p-3 glass rounded-squircle-sm">
                                            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-2">{t('investasi_page.labels.best_for', 'Best for:')}</p>
                                            <ul className="space-y-1">
                                                {tier.bestFor.slice(0, 2).map((item, i) => (
                                                    <li key={i} className="text-xs text-white/40 flex items-center gap-2">
                                                        <span className={`w-1 h-1 rounded-full ${theme.accentBg} opacity-60`}></span>
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
                        <div className="border border-white/10 glass rounded-squircle-lg p-6 md:p-8">
                            <h3 className="font-bold text-white uppercase tracking-widest text-sm mb-6">{t('investasi_page.labels.feature_comparison', 'See Detailed Feature Comparison')}</h3>
                            <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0 pb-4">
                                <table className="w-full text-left min-w-[760px] border-collapse">
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
                                                const translated = t(featureObj.key, featureObj.default) as string;
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
                        </div>
                        <div className="border border-white/10 glass rounded-squircle-lg p-6 md:p-8">
                            <h3 className="font-bold text-white uppercase tracking-widest text-sm">{t('investasi_page.labels.which_tier_title', 'Which Tier Is Right For Me?')}</h3>
                            <div className="text-white/60 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.diagnostic.name', 'DIAGNOSTIC') })}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.comparison.diagnostic_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.forensic.name', 'FORENSIC') })}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.comparison.forensic_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.network.name', 'NETWORK') })}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.comparison.network_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.labels.choose_if', { tier: t('investasi_page.tiers.sovereign.name', 'SOVEREIGN') })}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.comparison.sovereign_if', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="border border-white/10 glass rounded-squircle-lg p-6 md:p-8">
                            <h3 className="font-bold text-white uppercase tracking-widest text-sm">{t('investasi_page.labels.time_commitment_title', 'Understanding Time Commitment Options')}</h3>
                            <div className="text-white/60 mt-6 space-y-8">
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.commitment_details.one_time.title', 'ONE-TIME AUDIT')}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.commitment_details.one_time.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.commitment_details.quarterly.title', 'QUARTERLY PROGRAM (3 audits)')}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.commitment_details.quarterly.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-3">{t('investasi_page.commitment_details.annual.title', 'ANNUAL PARTNERSHIP (4 audits + access)')}</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {(t('investasi_page.commitment_details.annual.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 bg-[#BFA26A]/5 border border-[#BFA26A]/20 rounded-squircle-md">
                                    <h5 className="font-black text-[#BFA26A] uppercase tracking-widest text-xs mb-3">{t('investasi_page.labels.savings_example', 'SAVINGS EXAMPLE (FORENSIC tier):')}</h5>
                                    <ul className="list-disc list-inside space-y-2 text-[#BFA26A]/80 font-medium">
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

            {/* ── ATTRIBUTION / FOOTER CTA ── */}
            <section className="py-24 px-4 md:px-8 bg-[#161618] border-t border-white/[0.05]">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    {/* Micro Proof Block */}
                    <div className="mb-10 p-8 glass-gold rounded-squircle-lg text-left max-w-3xl mx-auto relative overflow-hidden">
                        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#BFA26A]/30 rounded-full" />
                        <p className="text-white/60 italic text-lg leading-relaxed pl-6">
                            "{t('investasi.micro_proof')}"
                        </p>
                    </div>

                    <h2 className="text-3xl font-black">{t('investasi_page.labels.not_sure_title', 'Not sure how deep you need us to go?')}</h2>
                    <p className="text-white/40 text-lg font-light">{t('investasi.reassurance')}</p>

                    <div className="pt-6">
                        <Button size="xl" className="px-10">{t('investasi.reassurance_btn', 'Start with a Diagnostic')}</Button>
                    </div>
                </div>
            </section>

            <footer className="py-8 border-t border-white/[0.04] text-center">
                <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.4em]">
                    {t('investasi_page.labels.footer_rights', { year: currentYear })}
                </p>
            </footer>
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div>
    )
}
