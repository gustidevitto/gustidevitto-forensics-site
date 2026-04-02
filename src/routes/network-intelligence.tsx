import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ShieldAlert, Maximize2, X, Activity, ArrowRight, ShieldCheck } from "lucide-react"
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
                    t('investasi_page.features.pillars_25_short', 'Everything in FORENSIC'),
                    t('investasi_page.features.multi_outlet_short', 'Multi-Outlet Analysis (up to 50)'),
                    t('investasi_page.features.network_health_short', 'Network Health Index'),
                    t('investasi_page.features.territory_short', 'Territory Productivity Mapping'),
                    t('investasi_page.features.franchise_short', 'Franchise Intelligence Suite'),
                    t('investasi_page.features.risk_short', '12-Month Risk Projection™'),
                    t('investasi_page.features.scenario_short', 'Scenario Simulator'),
                    t('investasi_page.features.network_report_short', 'Network Report (30-50 pages)')
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
                    t('investasi_page.features.multi_outlet_short_base', 'Everything in NETWORK'),
                    t('investasi_page.features.neural_short', 'AI Neural Pattern Learning'),
                    t('investasi_page.features.predictive_short', 'Predictive Intelligence Engine'),
                    t('investasi_page.features.monte_carlo_short', 'Monte Carlo Stress Testing'),
                    t('investasi_page.features.wealth_short', 'Founder Wealth Impact Analysis™'),
                    t('investasi_page.features.unlimited_short', 'Unlimited Outlet Profiles'),
                    t('investasi_page.features.priority_short', 'Priority Strategic Access'),
                    t('investasi_page.features.security_short', 'Enterprise-grade security')
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
        <div
            className="flex-1 flex flex-col bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] text-white relative"
        >
            {/* SEO & Authority Meta Tags */}
            <title>{t('network_intelligence.hero_title')} | Gusti Devitto Forensics</title>
            <meta name="description" content={t('network_intelligence.seo_desc')} />
            <meta name="keywords" content={t('network_intelligence.seo_keywords')} />
            <link rel="canonical" href="https://gustidevitto.com/network-intelligence" />
            
            {/* Open Graph / social */}
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={`${t('network_intelligence.hero_title')} | Gusti Devitto Forensics`} />
            <meta property="og:description" content={t('network_intelligence.seo_desc')} />
            <meta property="og:image" content="/assets/images/network_monitoring.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/network-intelligence" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('network_intelligence.hero_title')} | Gusti Devitto Forensics`} />
            <meta name="twitter:description" content={t('network_intelligence.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/network_monitoring.png" />
            <meta name="twitter:site" content="@gustidevitto" />

            {/* GEO Signals (Global + Local) */}
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.region" content="US-CA" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="New York, San Francisco, Jakarta" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />

            {/* JSON-LD Structured Data — Authority Signal */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Gusti Devitto Business Forensics",
                    "image": "https://gustidevitto.com/assets/images/aboutme.jpg",
                    "url": "https://gustidevitto.com/network-intelligence",
                    "telephone": "+62-811-XXXX-XXXX",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "SCBD District",
                        "addressLocality": "Jakarta",
                        "addressRegion": "JK",
                        "postalCode": "12190",
                        "addressCountry": "ID"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": -6.224,
                        "longitude": 106.809
                    },
                    "founder": {
                        "@type": "Person",
                        "name": "Gusti Devitto",
                        "jobTitle": "Lead Forensic Investigator",
                        "knowsAbout": ["Business Intelligence", "Forensic Accounting", "Supply Chain Optimization", "Profit Recovery"]
                    },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                })}
            </script>

            {/* Subtle Authority UI Indicator */}
            <div className="absolute top-6 left-6 md:left-12 lg:left-20 z-50 pointer-events-none flex items-center gap-3">
                 <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-amber-500/80 uppercase">
                    Diagnostic Level: Verified // Forensic Access Active
                 </span>
            </div>

            {/* Automatic Spotlight Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 animate-spotlight-roam opacity-20"
                    style={{
                        background: `radial-gradient(800px circle at center, rgba(245, 158, 11, 0.15), transparent 50%)`
                    }}
                />
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}></div>
            </div>

            {/* Hero Section — The Statement Wall (Enterprise Scale) */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-white/[0.05]">
                {/* Human Anchor Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-30 grayscale-[0.6] contrast-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/20" />
                </div>

                {/* 3D Neural Mesh Background — Modular Switch */}
                <NeuralMesh3D color="245, 158, 11" nodeCount={45} opacity={0.35} />

                <div className="max-w-6xl relative z-10">
                    <div className="text-left">
                        {/* 0. Economic Tension */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-amber-500/20 bg-amber-500/10 mb-6 rounded-sm">
                            <Activity className="w-4 h-4 text-amber-500" />
                            <span className="text-xs md:text-sm font-bold text-amber-500 uppercase tracking-widest leading-snug">{t('network_intelligence.tension')}</span>
                        </div>

                        {/* 1. Massive Enterprise Headline */}
                        <h1 className="text-[clamp(3rem,7vw,7rem)] font-black tracking-tighter leading-[0.9] w-full lg:w-[95%] uppercase">
                            <span className="text-white/90">{t('network_intelligence.hero_title')}</span>
                            <br />
                            <span className="text-amber-500">{t('network_intelligence.hero_title_accent')}</span>
                        </h1>
                        
                        {/* 2. Subtitle */}
                        <p className="mt-8 text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl font-light">
                            {t('network_intelligence.hero_desc')}
                        </p>

                        {/* 3. Enterprise Raw Data Strip (Monospace, Amber) */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base font-mono text-amber-500 uppercase tracking-widest bg-black/40 backdrop-blur-md p-4 md:p-6 border-l-2 border-amber-500 w-fit">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/30 mb-1">{t('network_intelligence.social_nodes')}</span>
                                <span className="font-bold">{t('network_intelligence.social_nodes_val')}</span>
                            </div>
                            <span className="text-white/10 text-2xl hidden md:block">/</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/30 mb-1">{t('network_intelligence.social_leakage')}</span>
                                <span className="font-bold">{t('network_intelligence.social_leakage_val')}</span>
                            </div>
                            <span className="text-white/10 text-2xl hidden md:block">/</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/30 mb-1">{t('network_intelligence.social_compliance')}</span>
                                <span className="font-bold">{t('network_intelligence.social_compliance_val')}</span>
                            </div>
                        </div>

                        {/* 4. CTA */}
                        <div className="mt-16 flex flex-wrap items-center gap-6">
                            <Link to="/investasi" className="w-full sm:w-auto">
                                <Button size="lg" className="h-auto py-5 px-10 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none w-full sm:w-auto leading-tight">
                                    {t('network_intelligence.cta_demo')}
                                    <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0" />
                                </Button>
                            </Link>
                            <a href="#benefits" className="text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]">
                                {t('network_intelligence.hero_meta')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Happens Block */}
            <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#03060a] border-b border-white/[0.05] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase">{t('network_intelligence.why_reports_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 border border-white/10 bg-white/[0.02]">
                            <span className="text-amber-500 font-mono text-xl block mb-4">01</span>
                            <p className="text-white/80 font-light text-lg">{t('network_intelligence.why_reports_p1')}</p>
                        </div>
                        <div className="p-6 border border-white/10 bg-white/[0.02]">
                            <span className="text-amber-500 font-mono text-xl block mb-4">02</span>
                            <p className="text-white/80 font-light text-lg">{t('network_intelligence.why_reports_p2')}</p>
                        </div>
                        <div className="p-6 border border-white/10 bg-white/[0.02]">
                            <span className="text-amber-500 font-mono text-xl block mb-4">03</span>
                            <p className="text-white/80 font-light text-lg">{t('network_intelligence.why_reports_p3')}</p>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/10 text-center">
                        <p className="text-xl md:text-2xl font-light text-white/50 italic">
                            "{t('network_intelligence.why_reports_close')}"
                        </p>
                    </div>
                </div>
            </section>

            {/* Evidentiary Benefits & Enterprise FAQ Integration */}
            <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative bg-[#060a12]">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
                    
                    {/* Benefit 1: Left Aligned — Enterprise Visibility */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">NODE_01</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight uppercase tracking-tight">{t('network_intelligence.benefit1_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light">
                            <Trans i18nKey="network_intelligence.benefit1_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ Callout 1 - Enterprise Specific */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q1')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a1" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 2: Right Aligned — Fleet Intelligence */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">NODE_02</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight uppercase tracking-tight">{t('network_intelligence.benefit2_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light md:text-right">
                            <Trans i18nKey="network_intelligence.benefit2_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Master Lab Anchor — Bleeding off Right */}
                    <div className="relative w-[112%] md:w-[90%] md:ml-auto aspect-[21/9] md:aspect-[3/1] bg-[#03060a] border-y md:border-l border-white/[0.05] overflow-hidden -mx-6 md:mx-0 -translate-x-6 md:translate-x-12 lg:translate-x-20 group cursor-crosshair" onClick={() => setShowMasterLab(true)}>
                        <img src="/assets/images/ffdv4masterlab.png" alt="Forensic Master Lab" className="w-full h-full object-cover opacity-20 grayscale contrast-125 object-top" />
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#060a12] via-[#060a12]/80 to-transparent pointer-events-none" />
                        <div className="absolute bottom-8 left-8 md:left-16 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest mb-4">
                                {t('network_intelligence.master_lab_badge')}
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-white/90 uppercase tracking-tight">{t('network_intelligence.master_lab_title')}</h4>
                            <p className="text-white/50 text-sm mt-2 max-w-lg font-light">{t('network_intelligence.master_lab_desc')}</p>
                        </div>
                        {/* Hover Metadata Scan Effect */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-amber-500/40 -translate-y-full group-hover:animate-scan-slow" />
                        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Maximize2 className="w-8 h-8 text-amber-500" />
                        </div>
                    </div>

                    {/* Benefit 3: Left Aligned — Risk Projection */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">NODE_03</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight uppercase tracking-tight">{t('network_intelligence.benefit3_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg font-light">
                            <Trans i18nKey="network_intelligence.benefit3_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ Callout 2 */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q2')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a2" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 4: Right Aligned — Data Integrity */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">NODE_04</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight uppercase tracking-tight">{t('network_intelligence.benefit4_title')}</h3>
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
                         <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/[0.02]">
                            <Activity className="w-3 h-3 text-amber-500" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-500">{t('network_intelligence.demo_badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{t('network_intelligence.demo_title')}</h2>
                        
                        <div className="relative aspect-video border border-white/10 bg-black">
                             <iframe
                                className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
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
                         <div className="p-8 md:p-12 border border-white/[0.05] bg-white/[0.01] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldAlert className="w-32 h-32 text-amber-500 -mr-12 -mt-12 rotate-12" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                    {t('network_intelligence.cpa_partner_badge')}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">{t('network_intelligence.cpa_partner_title')}</h3>
                                <p className="text-white/50 leading-relaxed text-lg font-light">
                                    <Trans
                                        i18nKey="network_intelligence.cpa_partner_desc"
                                        components={{ 1: <span className="text-white font-bold" /> }}
                                    />
                                </p>
                                <div className="pt-4">
                                     <Button asChild variant="outline" className="h-auto py-4 px-8 border-white/20 text-white/70 hover:text-white hover:border-white rounded-none transition-all uppercase tracking-widest font-bold text-xs">
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



            {/* Simplified Pricing — The Network Contracts */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 border-y border-amber-500/20 relative overflow-hidden">
                <WavingDots color="rgba(245, 158, 11, 0.15)" className="opacity-50" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <div className="mb-16 text-center space-y-4">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="w-8 h-px bg-amber-500/40" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">{t('network_intelligence.pilot_title')}</span>
                            <div className="w-8 h-px bg-amber-500/40" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{t('network_intelligence.pilot_desc')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {tiers.map((tier: any) => {
                            const colorMap: Record<string, { base: string; text: string; bg: string; border: string }> = {
                                green: { base: 'green', text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500' },
                                blue: { base: 'blue', text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500' },
                                amber: { base: 'amber', text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500' },
                                red: { base: 'red', text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' }
                            };
                            const theme = colorMap[tier.color] || colorMap.amber;

                            return (
                                <div key={tier.id} className={`border rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-${theme.base}-500/20 bg-black/40 hover:shadow-${theme.base}-500/10 relative overflow-hidden group text-left`}>
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${theme.base}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                                    
                                    <div className="mb-6 text-center">
                                        <h3 className={`text-3xl font-black ${theme.text} tracking-tight mb-2 uppercase`}>{tier.name}</h3>
                                        <p className="italic text-muted-foreground font-serif text-lg">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-4 my-6 flex-grow">
                                        {/* One-Time Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                           <div className="text-left">
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1 group-hover/option:text-white transition-colors">{t('investasi_page.labels.one_time')}</h4>
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">${tier.pricing.oneTime.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground">Single Custom Audit</span>
                                                </div>
                                           </div>
                                           <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                {t('investasi_page.labels.select')}
                                            </Button>
                                        </div>

                                        {/* Quarterly Option */}
                                        <div className="p-5 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/option">
                                           <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground group-hover/option:text-white transition-colors">{t('investasi_page.labels.quarterly')}</h4>
                                                    {tier.id === 'sovereign' && <span className="text-[8px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-black uppercase">Standard</span>}
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-white">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">Total</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.quarterly.perAudit.toLocaleString()} / audit
                                                    </div>
                                                    <div className="text-xs text-muted-foreground italic">
                                                        3x Audits Sequence
                                                    </div>
                                                </div>
                                           </div>
                                           <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')} className="border-white/20 hover:border-white hover:bg-white hover:text-black transition-all h-auto py-2">
                                                {t('investasi_page.labels.select')}
                                            </Button>
                                        </div>

                                        {/* Annual Option */}
                                        <div className={`p-5 border border-${theme.base}-500/30 rounded-lg bg-${theme.base}-500/10 hover:bg-${theme.base}-500/20 transition-colors flex items-center justify-between relative ring-1 ring-${theme.base}-500/20`}>
                                           <div className={`absolute -top-3 right-4 ${theme.bg} text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg`}>Recommended</div>
                                           <div className="text-left mt-1">
                                                <h4 className={`font-bold uppercase tracking-widest text-xs ${theme.text} mb-1`}>{t('investasi_page.labels.annual')}</h4>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-bold text-white">${tier.pricing.annual.total.toLocaleString()}</span>
                                                        <span className="text-xs text-muted-foreground">/ Year</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ${tier.pricing.annual.perAudit.toLocaleString()} / audit
                                                    </div>
                                                    <div className="text-xs text-green-400 font-bold mt-1">Strategic Retainer Access</div>
                                                </div>
                                           </div>
                                           <Button size="sm" onClick={() => openModal(tier, 'annual')} className={`${theme.bg} text-black hover:bg-white hover:text-black border-none font-bold transition-all shadow-lg shadow-${theme.base}-500/20 h-auto py-2`}>
                                                {t('investasi_page.labels.select')}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 space-y-6">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t('investasi_page.labels.key_features')}</p>
                                            <ul className="space-y-3">
                                                {tier.features.included.slice(0, 6).map((feature: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                        <ShieldCheck className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
                                                        <span className="leading-snug">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                                            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">{t('investasi_page.labels.best_for')}</p>
                                            <ul className="space-y-1">
                                                {tier.bestFor.map((item: string, i: number) => (
                                                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                                                        <span className={`w-1 h-1 rounded-full ${theme.bg} opacity-50`}></span>
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



            {/* Final CTA — Human Identity Anchor */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 lg:gap-24">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tighter leading-[0.9]">
                            {t('network_intelligence.final_cta_title')} <br />
                            <span className="text-amber-500">{t('network_intelligence.final_cta_title_accent')}</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                             {t('network_intelligence.final_cta_desc')}
                        </p>
                        <div className="pt-4">
                            <Button asChild className="h-auto w-full md:w-auto py-6 px-10 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none shadow-none text-left flex items-center justify-start group">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start justify-center">
                                    <span className="flex items-center font-black text-xl md:text-2xl whitespace-normal leading-tight">
                                        {t('network_intelligence.cta_demo')}
                                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">Professional Fleet Audit Registration</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* The Anchor Portrait */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="aspect-[3/4] border border-white/10 bg-[#03060a] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                             <img src="/assets/images/aboutme.jpg" alt="Gusti Devitto" className="w-full h-full object-cover object-top" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase tracking-widest">Gusti Devitto</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t('entrance_gate.hero_subtitle')}</p>
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
