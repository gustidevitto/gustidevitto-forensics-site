import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ShieldCheck, Globe, Lock, Cpu, BarChart3 } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { HowFIPWorks } from "@/components/HowFIPWorks"

import { useState } from 'react'

export const Route = createFileRoute('/investasi')({
    component: InvestasiPage,
})

function InvestasiPage() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);
    const [commitmentType, setCommitmentType] = useState(null);

    const openModal = (tier, type) => {
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
     name: 'DIAGNOSTIC', 
     tagline: 'Find the bleeding', 
     positioning: 'Am I sick?', 
     color: 'green', 
     pricing: { 
       oneTime: 1500, 
       quarterly: { total: 3825, perAudit: 1275, audits: 3 }, 
       annual: { total: 4500, perAudit: 1125, audits: 4, access: true } 
     },
     features: {
       included: [
         '8 Core Forensic Pillars',
         'Syndrome Detection',
         'Anomaly Detection',
         'Basic Health Score',
         'Executive Summary PDF',
         'Multi-currency support',
         'Bilingual reports (EN/ID)'
       ],
       excluded: [
         'Full 19 pillars',
         'Logic trace analysis',
         'Multi-outlet analysis',
         'AI neural intelligence'
       ]
     },
     bestFor: [
       '1-3 outlets',
       '$500K-$2M revenue',
       'First-time diagnostic',
       'Budget entry point'
     ] 
   }, 
   { 
     id: 'forensic', 
     name: 'FORENSIC', 
     tagline: 'Understand the disease', 
     positioning: 'Why am I sick, and what\'s the cure?', 
     color: 'blue', 
     pricing: { 
       oneTime: 3500, 
       quarterly: { total: 8925, perAudit: 2975, audits: 3 }, 
       annual: { total: 10500, perAudit: 2625, audits: 4, access: true } 
     }, 
 features: { 
   included: [ 
     'Everything in DIAGNOSTIC', 
     'Full 19 Forensic Pillars', 
     'Logic Trace Analysis', 
     'Decision Intelligence Engine', 
     'Data Integrity Scoring', 
     'Advanced Analytics™', 
     'Detailed Report (15-20 pages)' 
   ], 
   excluded: [ 
     'Multi-outlet network analysis', 
     'Franchise intelligence', 
     'AI neural learning', 
     'Wealth impact analysis' 
   ] 
 }, 
 bestFor: [ 
   '3-8 outlets', 
   '$2M-$10M revenue', 
   'Comprehensive structural fix', 
   'Action-oriented' 
 ] 
   }, 
   { 
     id: 'network', 
     name: 'NETWORK', 
     tagline: 'X-ray the entire fleet', 
     positioning: 'How sick is my entire fleet?', 
     color: 'amber', 
     pricing: { 
       oneTime: 8000, 
       quarterly: { total: 20400, perAudit: 6800, audits: 3 }, 
       annual: { total: 24000, perAudit: 6000, audits: 4, access: true } 
     }, 
 features: { 
   included: [ 
     'Everything in FORENSIC', 
     'Multi-Outlet Analysis (up to 50)', 
     'Network Health Index', 
     'Territory Productivity Mapping', 
     'Franchise Intelligence Suite', 
     '12-Month Risk Projection™', 
     'Scenario Simulator', 
     'Network Report (30-50 pages)' 
   ], 
   excluded: [ 
     'AI neural pattern learning', 
     'Monte Carlo stress testing', 
     'Wealth impact analysis' 
   ] 
 }, 
 bestFor: [ 
   '10-50 outlets', 
   '$10M-$100M revenue', 
   'Franchise/chain operators', 
   'Network optimization' 
 ] 
   }, 
   { 
     id: 'sovereign', 
     name: 'SOVEREIGN', 
     tagline: 'Own the intelligence', 
     positioning: 'I control the machine', 
     color: 'red', 
     pricing: { 
       oneTime: 25000, 
       quarterly: { total: 63750, perAudit: 21250, audits: 3 }, 
       annual: { total: 75000, perAudit: 18750, audits: 4, access: true } 
     }, 
 features: { 
   included: [ 
     'Everything in NETWORK', 
     'AI Neural Pattern Learning', 
     'Predictive Intelligence Engine', 
     'Monte Carlo Stress Testing', 
     'Founder Wealth Impact Analysis™', 
     'Unlimited Outlet Profiles', 
     'Priority Strategic Access', 
     'Enterprise-grade security' 
   ], 
   excluded: [] 
 }, 
 bestFor: [ 
   '50-500 outlets', 
   '$100M+ revenue', 
   'Enterprise sophistication', 
   'Wealth preservation & exit planning' 
 ] 
   } 
 ]

    
    const featureTiers = {
      // Diagnostic Features
      '8 Core Forensic Pillars': 'diagnostic',
      'Syndrome Detection': 'diagnostic',
      'Anomaly Detection': 'diagnostic',
      'Basic Health Score': 'diagnostic',
      'Executive Summary PDF': 'diagnostic',
      'Multi-currency support': 'diagnostic',
      'Bilingual reports (EN/ID)': 'diagnostic',

      // Forensic Features
      'Full 19 Forensic Pillars': 'forensic',
      'Logic Trace Analysis': 'forensic',
      'Decision Intelligence Engine': 'forensic',
      'Data Integrity Scoring': 'forensic',
      'Advanced Analytics™': 'forensic',
      'Detailed Report (15-20 pages)': 'forensic',

      // Network Features
      'Multi-Outlet Analysis (up to 50)': 'network',
      'Network Health Index': 'network',
      'Territory Productivity Mapping': 'network',
      'Franchise Intelligence Suite': 'network',
      '12-Month Risk Projection™': 'network',
      'Scenario Simulator': 'network',
      'Network Report (30-50 pages)': 'network',

      // Sovereign Features
      'AI Neural Pattern Learning': 'sovereign',
      'Predictive Intelligence Engine': 'sovereign',
      'Monte Carlo Stress Testing': 'sovereign',
      'Founder Wealth Impact Analysis™': 'sovereign',
      'Unlimited Outlet Profiles': 'sovereign',
      'Priority Strategic Access': 'sovereign',
      'Enterprise-grade security': 'sovereign',
    };

    const tierHierarchy = ['diagnostic', 'forensic', 'network', 'sovereign'];

    const isFeatureAvailable = (featureName, tierId) => {
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

            {/* SEO Meta Tags */}
            <title>{t('investasi.seo_title')} - Forensic Economics</title>
            <meta name="description" content={t('investasi.seo_desc')} />

            {/* Hero Header */}
            <section className="pt-32 pb-24 px-4 md:px-8 border-b border-white/5 bg-gradient-to-b from-[#121212] to-[#0a0a0a] relative z-10">
                <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 animate-bounce-subtle">
                        <Lock className="w-3 h-3" /> Forensic Intelligence Protocol™
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                        Choose Your Intelligence Tier
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-primary/30 pl-8 py-2">
                        How deep do you need to go? Most multi-outlet operators lose 15-30% of profit to structural leakage they can't see on their P&L. FIP™ makes the invisible, visible.
                    </p>
                </div>
            </section>

<section className="py-24 px-4 md:px-8 border-b border-white/5 bg-zinc-900/10 relative z-10">
    <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tiers.map((tier) => {
                const colorMap = {
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
                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">One-Time Audit</h4>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-white">${tier.pricing.oneTime.toLocaleString()}</span>
                                    <span className="text-xs text-muted-foreground">Single Comprehensive Audit</span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                Select
                            </Button>
                        </div>

                        {/* Quarterly Option */}
                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                            <div className="text-left">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">Quarterly Program</h4>
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground">Total</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        ${tier.pricing.quarterly.perAudit.toLocaleString()} / audit
                                    </div>
                                    <div className="text-xs text-muted-foreground italic">
                                        3x Audits (Monthly)
                                    </div>
                                    <span className="text-xs text-green-400 font-bold mt-1">Save ${(tier.pricing.oneTime * 3 - tier.pricing.quarterly.total).toLocaleString()}</span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                Select
                            </Button>
                        </div>

                        {/* Annual Option */}
                        <div className={`p-5 border border-${theme.base}-500/30 rounded-lg bg-${theme.base}-500/10 hover:bg-${theme.base}-500/20 transition-colors flex items-center justify-between relative ring-1 ring-${theme.base}-500/20`}>
                            <div className={`absolute -top-3 left-4 ${theme.bg} text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg`}>Recommended</div>
                            <div className="text-left mt-1">
                                <h4 className={`font-bold uppercase tracking-widest text-xs ${theme.text} mb-1`}>Annual Partnership</h4>
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">${tier.pricing.annual.total.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground">/ Year</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        ${tier.pricing.annual.perAudit.toLocaleString()} / audit
                                    </div>
                                    <div className="text-xs text-muted-foreground italic">
                                        4x Audits (Quarterly)
                                    </div>
                                    <span className="text-xs text-green-400 font-bold mt-1">Save ${(tier.pricing.oneTime * 4 - tier.pricing.annual.total).toLocaleString()} + Benefits</span>
                                </div>
                            </div>
                            <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.bg} text-black hover:bg-white hover:text-black border-none font-bold transition-all shadow-lg shadow-${theme.base}-500/20 h-auto py-2`}>
                                Select
                            </Button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <div className="mb-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Key Features</p>
                            <ul className="space-y-3">
                                {tier.features.included.slice(0, 5).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <ShieldCheck className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
                                        <span className="leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/5">
                            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">Best for:</p>
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
            )})}
        </div>
    </div>
</section>
<section className="py-24 px-4 md:px-8">
    <div className="container mx-auto max-w-4xl">
        <div className="space-y-4">
            <h2 className="text-3xl font-black text-center">Deeper Analysis</h2>
            <div className="border rounded-lg p-4">
                <h3 className="font-bold">See Detailed Feature Comparison</h3>
                <table className="w-full text-left mt-4">
                    <thead>
                        <tr>
                            <th className="p-2">Feature</th>
                            <th className="p-2">DIAGNOSTIC</th>
                            <th className="p-2">FORENSIC</th>
                            <th className="p-2">NETWORK</th>
                            <th className="p-2">SOVEREIGN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFeatures.map(feature => (
                            <tr key={feature}>
                                <td className="p-2">{feature}</td>
                                {tiers.map(tier => (
                                    <td key={tier.id} className="p-2 text-center">
                                        {isFeatureAvailable(feature, tier.id) ? '✅' : '❌'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="border rounded-lg p-4">
                <h3 className="font-bold">Which Tier Is Right For Me?</h3>
                <div className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div>
                        <h4 className="font-bold text-white">Choose DIAGNOSTIC if:</h4>
                        <ul className="list-disc list-inside">
                            <li>You operate 1-3 outlets</li>
                            <li>This is your first forensic diagnostic</li>
                            <li>You need a quick health snapshot</li>
                            <li>Budget is a primary concern</li>
                            <li>Annual revenue under $2M</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Choose FORENSIC if:</h4>
                        <ul className="list-disc list-inside">
                            <li>You operate 3-8 outlets</li>
                            <li>You want full diagnostic depth</li>
                            <li>You need actionable priorities</li>
                            <li>You're serious about structural fixes</li>
                            <li>Annual revenue $2M-$10M</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Choose NETWORK if:</h4>
                        <ul className="list-disc list-inside">
                            <li>You operate 10-50 outlets</li>
                            <li>You're a franchise or chain operator</li>
                            <li>You need network-wide intelligence</li>
                            <li>You want territory comparisons</li>
                            <li>Annual revenue $10M-$100M</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Choose SOVEREIGN if:</h4>
                        <ul className="list-disc list-inside">
                            <li>You operate 50+ outlets</li>
                            <li>You want predictive AI capabilities</li>
                            <li>You're planning exit or wealth optimization</li>
                            <li>You need enterprise-grade sophistication</li>
                            <li>Annual revenue $100M+</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border rounded-lg p-4">
                <h3 className="font-bold">Understanding Time Commitment Options</h3>
                <div className="text-muted-foreground mt-4 space-y-6">
                    <div>
                        <h4 className="font-bold text-white">ONE-TIME AUDIT</h4>
                        <ul className="list-disc list-inside">
                            <li>Single comprehensive diagnostic</li>
                            <li>Full report delivered in 48 hours</li>
                            <li>No ongoing commitment</li>
                            <li>Best for: Initial assessment</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">QUARTERLY PROGRAM (3 audits)</h4>
                        <ul className="list-disc list-inside">
                            <li>Commit to 3 audits over 9 months</li>
                            <li>15% savings per audit</li>
                            <li>Track progress over time</li>
                            <li>Best for: Monitoring improvement</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">ANNUAL PARTNERSHIP (4 audits + access)</h4>
                        <ul className="list-disc list-inside">
                            <li>4 audits throughout the year</li>
                            <li>25% savings per audit</li>
                            <li>PLUS continuous access:
                                <ul className="list-disc list-inside ml-4">
                                    <li>Unlimited email/message consultation</li>
                                    <li>Quick-response variance alerts</li>
                                    <li>Priority scheduling</li>
                                    <li>Brief strategic calls (15-30 min)</li>
                                </ul>
                            </li>
                            <li>Best for: Ongoing strategic partnership</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-zinc-800 rounded-lg">
                        <h5 className="font-bold text-white">SAVINGS EXAMPLE (FORENSIC tier):</h5>
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
                    <h2 className="text-3xl font-black">Not sure which tier is right?</h2>
                    <p className="text-muted-foreground">Schedule a 15-minute discovery call with Gusti Devitto to discuss your specific needs.</p>
                    <div className="text-left max-w-md mx-auto space-y-2">
                        <p className="font-bold">All tiers include:</p>
                        <ul className="list-disc list-inside">
                            <li>✓ Bilingual reports (English/Indonesian)</li>
                            <li>✓ Multi-currency support (IDR/USD/EUR/SGD)</li>
                            <li>✓ GAAP/IFRS compliance mapping</li>
                            <li>✓ 48-hour delivery from data submission</li>
                            <li>✓ 100% confidentiality guarantee</li>
                        </ul>
                    </div>
                    <Button>SCHEDULE DISCOVERY CALL</Button>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.5em]">
                {t('investasi.footer_rights', { year: currentYear })}
            </footer>
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div>
    )
}
