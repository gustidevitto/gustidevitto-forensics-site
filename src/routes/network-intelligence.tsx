import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Maximize2, X, Activity, ArrowRight, ShieldCheck, Star } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"
import PricingModal from '@/components/PricingModal';
import { NeuralMesh3D } from '@/components/ui/neural-mesh-3d';

export const Route = createFileRoute('/network-intelligence')({
    component: NetworkIntelligencePage,
})

function NetworkIntelligencePage() {
    const { t } = useTranslation()
    const [showMasterLab, setShowMasterLab] = useState(false)

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
            id: 'network',
            name: t('network_intelligence.tiers.network.name', 'NETWORK'),
            tagline: t('network_intelligence.tiers.network.tagline', 'X-ray the entire fleet'),
            positioning: t('network_intelligence.tiers.network.positioning', 'How sick is my entire fleet?'),
            color: 'amber',
            pricing: {
                oneTime: 8000,
                quarterly: { total: 20400, perAudit: 6800, audits: 3 },
                annual: { total: 24000, perAudit: 6000, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.pillars_25_short', default: 'Everything in FORENSIC' },
                    { key: 'investasi_page.features.multi_outlet_short', default: 'Multi-Outlet Analysis (up to 50)' },
                    { key: 'investasi_page.features.network_health_short', default: 'Network Health Index' },
                    { key: 'investasi_page.features.territory_short', default: 'Territory Productivity Mapping' },
                    { key: 'investasi_page.features.franchise_short', default: 'Franchise Intelligence Suite' },
                    { key: 'investasi_page.features.velocity_short', default: 'Change Point Detection', highlight: true },
                    { key: 'investasi_page.features.risk_short', default: '12-Month Risk Projection™', highlight: true },
                    { key: 'investasi_page.features.scenario_short', default: 'Scenario Simulator', highlight: true },
                    { key: 'investasi_page.features.network_report_short', default: 'Network Report (30-50 pages)' }
                ],
                excluded: [
                    t('investasi_page.features.ai_neural_short', 'AI neural pattern learning'),
                    t('investasi_page.features.monte_carlo_short', 'Monte Carlo stress testing'),
                    t('investasi_page.features.wealth_impact_short', 'Wealth impact analysis')
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
            name: t('network_intelligence.tiers.sovereign.name', 'SOVEREIGN'),
            tagline: t('network_intelligence.tiers.sovereign.tagline', 'Own the intelligence'),
            positioning: t('network_intelligence.tiers.sovereign.positioning', 'I control the machine'),
            color: 'red',
            pricing: {
                oneTime: 25000,
                quarterly: { total: 63750, perAudit: 21250, audits: 3 },
                annual: { total: 75000, perAudit: 18750, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.multi_outlet_short_base', default: 'Everything in NETWORK' },
                    { key: 'investasi_page.features.neural_short', default: 'AI Neural Pattern Learning', highlight: true },
                    { key: 'investasi_page.features.predictive_short', default: 'Predictive Intelligence Engine', highlight: true },
                    { key: 'investasi_page.features.monte_carlo_short', default: 'Monte Carlo Stress Testing' },
                    { key: 'investasi_page.features.wealth_short', default: 'Founder Wealth Impact Analysis™', highlight: true },
                    { key: 'investasi_page.features.unlimited_short', default: 'Unlimited Outlet Profiles' },
                    { key: 'investasi_page.features.priority_short', default: 'Priority Strategic Access' },
                    { key: 'investasi_page.features.security_short', default: 'Enterprise-grade security' }
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
    ];



    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            {/* SEO & Authority Meta Tags */}
            <title>{t('network_intelligence.hero_title')} | Gusti Devitto Forensics</title>
            <meta name="description" content={t('network_intelligence.seo_desc')} />
            <meta name="keywords" content={t('network_intelligence.seo_keywords')} />
            <link rel="canonical" href="https://gustidevitto.com/network-intelligence" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={`${t('network_intelligence.hero_title')} | Gusti Devitto Forensics`} />
            <meta property="og:description" content={t('network_intelligence.seo_desc')} />
            <meta property="og:image" content="/assets/images/network_monitoring.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/network-intelligence" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('network_intelligence.hero_title')} | Gusti Devitto Forensics`} />
            <meta name="twitter:description" content={t('network_intelligence.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/network_monitoring.png" />
            <meta name="twitter:site" content="@gustidevitto" />
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.region" content="US-CA" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="New York, San Francisco, Jakarta" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Gusti Devitto Business Forensics",
                    "image": "https://gustidevitto.com/assets/images/aboutme.jpg",
                    "url": "https://gustidevitto.com/network-intelligence",
                    "telephone": "+62-811-XXXX-XXXX",
                    "address": { "@type": "PostalAddress", "streetAddress": "SCBD District", "addressLocality": "Jakarta", "addressRegion": "JK", "postalCode": "12190", "addressCountry": "ID" },
                    "founder": { "@type": "Person", "name": "Gusti Devitto", "jobTitle": "Lead Forensic Investigator" }
                })}
            </script>

            {/* Ambient background — static, non-interactive */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0A84FF]/[0.04] rounded-full blur-[160px] animate-subtle-glow" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#AF52DE]/[0.025] rounded-full blur-[120px] animate-float" />
            </div>

            {/* ── HERO ── */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-white/[0.05]">
                <div className="absolute inset-0 z-0">
                    <img src="/assets/images/aboutme.jpg" alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-28 grayscale-[0.5] contrast-[1.1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/80 to-[#1c1c1e]/20" />
                </div>

                {/* Neural Mesh — reduced opacity */}
                <NeuralMesh3D color="10, 132, 255" nodeCount={40} opacity={0.10} />

                <div className="max-w-6xl relative z-10">
                    <div className="text-left">
                        {/* Tension badge — glass pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-squircle-sm mb-6">
                            <Activity className="w-3.5 h-3.5 text-[#AF52DE]" strokeWidth={1.5} />
                            <span className="text-xs font-semibold text-[#AF52DE] uppercase tracking-widest">{t('network_intelligence.tension')}</span>
                        </div>

                        <h1 className="text-[clamp(3rem,7vw,7rem)] font-bold tracking-tight leading-[0.9] w-full lg:w-[95%] uppercase">
                            <span className="text-white/90">{t('network_intelligence.hero_title')}</span>
                            <br />
                            <span className="bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] bg-clip-text text-transparent pr-2 pb-1">{t('network_intelligence.hero_title_accent')}</span>
                        </h1>

                        <p className="mt-8 text-xl md:text-2xl text-white/40 leading-relaxed max-w-3xl font-light">
                            {t('network_intelligence.hero_desc')}
                        </p>

                        {/* Data strip — no monospace, semibold only */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#AF52DE] uppercase tracking-widest">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/40 font-medium mb-1">{t('network_intelligence.social_nodes')}</span>
                                <span>{t('network_intelligence.social_nodes_val')}</span>
                            </div>
                            <span className="text-white/40 hidden md:block">·</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/40 font-medium mb-1">{t('network_intelligence.social_leakage')}</span>
                                <span>{t('network_intelligence.social_leakage_val')}</span>
                            </div>
                            <span className="text-white/40 hidden md:block">·</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/40 font-medium mb-1">{t('network_intelligence.social_compliance')}</span>
                                <span>{t('network_intelligence.social_compliance_val')}</span>
                            </div>
                        </div>

                        <div className="mt-16 flex flex-wrap items-center gap-6">
                            <Link to="/investasi" className="w-full sm:w-auto">
                                <Button size="xl" className="w-full sm:w-auto h-auto py-5 px-10 bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] text-white border-none shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] transition-all flex flex-wrap items-center justify-center text-center sm:text-left whitespace-normal leading-tight">
                                    {t('network_intelligence.cta_demo')}
                                    <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0" strokeWidth={2} />
                                </Button>
                            </Link>
                            <a href="#benefits" className="text-xs font-semibold text-white/40 hover:text-white/60 transition-colors uppercase tracking-[0.18em]">
                                {t('network_intelligence.hero_meta')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY THIS HAPPENS ── */}
            <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#161618] border-b border-white/[0.05]">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{t('network_intelligence.why_reports_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-5 text-left">
                        {['01','02','03'].map((num, i) => (
                            <div key={num} className="p-6 glass rounded-squircle-lg">
                                <span className="text-[#0A84FF] font-semibold text-sm block mb-4">{num}</span>
                                <p className="text-white/60 font-light text-base leading-relaxed">{t(`network_intelligence.why_reports_p${i+1}`)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-white/[0.05] text-center">
                        <p className="text-xl md:text-2xl font-light text-white/40 italic">
                            "{t('network_intelligence.why_reports_close')}"
                        </p>
                    </div>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative bg-[#1c1c1e]">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
                    
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">01</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight uppercase tracking-tight">{t('network_intelligence.benefit1_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light">
                            <Trans i18nKey="network_intelligence.benefit1_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-[#0A84FF]/15 py-2">
                        <p className="text-xs font-semibold text-[#AF52DE]/60 mb-3 uppercase tracking-widest">{t('faq.q1')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a1" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-px bg-[#0A84FF]/20 hidden md:block" />
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">02</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:text-right leading-tight uppercase tracking-tight">{t('network_intelligence.benefit2_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light md:text-right">
                            <Trans i18nKey="network_intelligence.benefit2_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Master Lab Anchor — Bleeding off Right */}
                    <div className="relative w-full md:w-[90%] md:ml-auto aspect-[4/5] sm:aspect-[16/10] md:aspect-[3/1] bg-[#03060a] border border-white/[0.05] rounded-squircle-xl overflow-hidden md:-mx-0 md:translate-x-12 lg:translate-x-20 group cursor-crosshair" onClick={() => setShowMasterLab(true)}>
                        <img src="/assets/images/ffdv4masterlab.png" alt="Forensic Master Lab" className="w-full h-full object-cover opacity-20 grayscale contrast-125 object-top" />
                        <div className="absolute inset-y-0 left-0 w-full md:w-1/3 bg-gradient-to-r from-[#03060a] via-[#03060a]/80 to-transparent pointer-events-none" />
                        
                        {/* COMMAND CENTER Badge - Top Left */}
                        <div className="absolute top-6 left-6 md:top-8 md:left-16 z-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5E5CE6] text-white text-[10px] font-bold uppercase tracking-widest rounded-squircle-sm shadow-xl shadow-indigo-500/10 backdrop-blur-md">
                                {t('network_intelligence.master_lab_badge')}
                            </div>
                        </div>

                        {/* Mobile Expand Indicator - Top Right */}
                        <div className="absolute top-6 right-6 md:hidden z-20">
                            <div className="glass-subtle px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                                <Maximize2 className="w-3 h-3 text-[#0A84FF]" />
                                <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Tap to focus</span>
                            </div>
                        </div>

                        {/* Title & Description - Bottom Left */}
                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-16 z-10 pr-6">
                            <h4 className="text-xl md:text-2xl font-bold text-white/90 uppercase tracking-tight leading-tight mb-2">
                                {t('network_intelligence.master_lab_title')}
                            </h4>
                            <p className="text-white/40 text-[11px] md:text-sm max-w-lg font-light leading-relaxed">
                                {t('network_intelligence.master_lab_desc')}
                            </p>
                        </div>
                        {/* Hover Metadata Scan Effect */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-amber-500/40 -translate-y-full group-hover:animate-scan-slow" />
                        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Maximize2 className="w-8 h-8 text-amber-500" />
                        </div>
                    </div>

                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">03</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight uppercase tracking-tight">{t('network_intelligence.benefit3_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light">
                            <Trans i18nKey="network_intelligence.benefit3_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-[#0A84FF]/15 py-2">
                        <p className="text-xs font-semibold text-[#AF52DE]/60 mb-3 uppercase tracking-widest">{t('faq.q2')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a2" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-px bg-[#0A84FF]/20 hidden md:block" />
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">04</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:text-right leading-tight uppercase tracking-tight">{t('network_intelligence.benefit4_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light md:text-right">
                            <Trans i18nKey="network_intelligence.benefit4_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                </div>
            </section>

            {/* Demo & CPA Synergy */}
            <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full">
                            <Activity className="w-3 h-3 text-[#0A84FF]" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0A84FF]">{t('network_intelligence.demo_badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">{t('network_intelligence.demo_title')}</h2>
                        
                        <div className="relative aspect-video glass rounded-squircle-xl overflow-hidden shadow-xl">
                             <iframe
                                className="absolute inset-0 w-full h-full object-cover"
                                src={t('demo_video.url')}
                                title="Network Analysis Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                         {/* CPA Partnership Block */}
                         <div className="glass-elevated rounded-squircle-xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center h-full">

                            <div className="relative z-10 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A84FF]/10 text-[#0A84FF] rounded-full text-[10px] font-semibold uppercase tracking-widest">
                                    {t('network_intelligence.cpa_partner_badge')}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">{t('network_intelligence.cpa_partner_title')}</h3>
                                <p className="text-white/60 leading-relaxed text-lg font-light">
                                    <Trans
                                        i18nKey="network_intelligence.cpa_partner_desc"
                                        components={{ 1: <span className="text-white font-medium" /> }}
                                    />
                                </p>
                                <div className="pt-4">
                                     <Button asChild variant="outline">
                                        <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                            {t('network_intelligence.demo_cta')}
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ── PRICING ── */}
            <section className="py-24 px-4 md:px-8 bg-[#161618] border-y border-white/[0.05] relative overflow-hidden">
                <WavingDots color="rgba(10, 132, 255, 0.08)" className="opacity-40" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <div className="mb-14 text-center space-y-3">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="w-8 h-px bg-[#AF52DE]/30" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#AF52DE] font-semibold">{t('network_intelligence.pilot_title')}</span>
                            <div className="w-8 h-px bg-[#AF52DE]/30" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{t('network_intelligence.pilot_desc')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {tiers.map((tier: any) => {
                            const colorMap: Record<string, { accentText: string; accentBg: string; accentBorder: string; glassClass: string }> = {
                                amber: { accentText: 'text-[#AF52DE]', accentBg: 'bg-[#AF52DE]', accentBorder: 'border-[#AF52DE]/20', glassClass: 'glass-sage' },
                                red:   { accentText: 'text-red-400',   accentBg: 'bg-red-500',   accentBorder: 'border-red-500/20',   glassClass: 'glass' },
                            };
                            const theme = colorMap[tier.color] || colorMap.amber;

                            return (
                                <div key={tier.id} className="glass-elevated rounded-squircle-xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.005] relative overflow-hidden group text-left">
                                    <div className={`absolute top-0 left-8 right-8 h-px ${theme.accentBg} opacity-30 group-hover:opacity-60 transition-opacity`} />

                                    <div className="mb-6">
                                        <h3 className={`text-2xl font-bold ${theme.accentText} tracking-tight mb-1 uppercase`}>{tier.name}</h3>
                                        <p className="text-white/40 font-light text-sm">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-3 my-6 flex-grow">
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1">{t('investasi_page.labels.one_time')}</h4>
                                                <span className="text-xl font-bold text-white font-mono">${tier.pricing.oneTime.toLocaleString()}</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')}>{t('investasi_page.labels.select')}</Button>
                                        </div>
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1">{t('investasi_page.labels.quarterly')}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white font-mono">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">Total</span>
                                                </div>
                                                <span className="text-xs text-white/40">${tier.pricing.quarterly.perAudit.toLocaleString()} / audit · 3x</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')}>{t('investasi_page.labels.select')}</Button>
                                        </div>
                                        <div className={`p-4 rounded-squircle-sm flex items-center justify-between relative ${theme.glassClass} border ${theme.accentBorder}`}>
                                            <div className={`absolute -top-3 right-4 ${theme.accentBg} text-black text-[9px] font-bold px-3 py-1 rounded-squircle-sm uppercase tracking-wider`}>Recommended</div>
                                            <div className="mt-1">
                                                <h4 className={`font-semibold uppercase tracking-widest text-xs ${theme.accentText} mb-1`}>{t('investasi_page.labels.annual')}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white font-mono">${tier.pricing.annual.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">/ Year</span>
                                                </div>
                                                <span className="text-xs text-emerald-400 font-semibold mt-1 block">Strategic Retainer Access</span>
                                            </div>
                                            <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.accentBg} text-black hover:brightness-110 border-none font-bold`}>{t('investasi_page.labels.select')}</Button>
                                        </div>
                                    </div>
                                    <div className="pt-5 border-t border-white/[0.05]">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">{t('investasi_page.labels.key_features')}</p>
                                        <ul className="space-y-3">
                                            {tier.features.included.slice(0, 10).map((featureObj: any, i: number) => {
                                                const isHighlighted = featureObj.highlight;
                                                const text = typeof featureObj === 'string' ? featureObj : t(featureObj.key, featureObj.default);
                                                return (
                                                    <li key={i} className={`flex items-start gap-3 text-sm ${isHighlighted ? `${theme.glassClass} -mx-2 px-2 py-1 rounded-squircle-sm border-l-2 ${theme.accentBorder}` : 'text-white/60'}`}>
                                                        {isHighlighted
                                                            ? <Star className={`w-3.5 h-3.5 ${theme.accentText} shrink-0 mt-0.5 fill-current`} strokeWidth={1} />
                                                            : <ShieldCheck className={`w-3.5 h-3.5 ${theme.accentText} shrink-0 mt-0.5`} strokeWidth={1.5} />
                                                        }
                                                        <span className={isHighlighted ? `${theme.accentText} font-semibold` : 'text-white/60'}>{text as string}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className="mt-4 p-3 glass rounded-squircle-sm">
                                            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-2">{t('investasi_page.labels.best_for')}</p>
                                            <ul className="space-y-1">
                                                {tier.bestFor.map((item: string, i: number) => (
                                                    <li key={i} className="text-xs text-white/40 flex items-center gap-2">
                                                        <span className={`w-1 h-1 rounded-full ${theme.accentBg} opacity-60`} />
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



            {/* ── FINAL CTA ── */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.05] bg-[#1c1c1e]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 lg:gap-24">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase tracking-tight leading-[0.9]">
                            {t('network_intelligence.final_cta_title')} <br />
                            <span className="bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] bg-clip-text text-transparent pr-2 pb-1">{t('network_intelligence.final_cta_title_accent')}</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                             {t('network_intelligence.final_cta_desc')}
                        </p>
                        <div className="pt-4">
                            <Button asChild size="xl" className="w-full md:w-auto h-auto py-6 px-10 flex flex-col items-start group bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] text-white border-none shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] transition-all">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start h-full justify-center">
                                    <span className="flex items-center font-bold text-xl md:text-2xl whitespace-normal leading-tight">
                                        {t('network_intelligence.cta_demo')}
                                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                                    </span>
                                    <span className="text-[10px] opacity-70 font-medium tracking-widest uppercase mt-2">Professional Fleet Audit Registration</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:flex w-full md:w-1/2 items-center justify-center relative min-h-[400px]">
                        <div className="absolute inset-0 pointer-events-none">
                            <NeuralMesh3D color="94, 92, 230" nodeCount={60} opacity={0.5} trappedProfitCount={3} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-Link Strategy */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5 bg-black/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-sm text-muted-foreground">
                        {t('network_intelligence.cross_link_label')} <Link to="/single-entity" onClick={() => window.scrollTo(0, 0)} className="text-primary font-bold hover:underline px-1">{t('network_intelligence.cross_link_cta')}</Link>
                    </p>
                </div>
            </section>

            {/* Footer Badge */}
            <section className="py-8 px-4 md:px-8 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
                        {t('single_entity.footer_badge')}
                    </p>
                </div>
            </section>

            {/* Master Lab Modal */}
            {showMasterLab && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowMasterLab(false)}>
                    <button className="absolute top-8 right-8 text-white"><X className="w-10 h-10" /></button>
                    <img
                        src="/assets/images/ffdv4masterlab.png"
                        alt="Master Lab Full View"
                        className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div>
    )
}
