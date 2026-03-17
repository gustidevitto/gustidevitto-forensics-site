import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, ArrowRight, ShieldCheck } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"
import { ForensicCaseFiles } from "@/components/ForensicCaseFiles"
import PricingModal from '@/components/PricingModal';

export const Route = createFileRoute('/single-entity')({
    component: SingleEntityPage,
})

function SingleEntityPage() {
    const { t } = useTranslation()
    const [networkSize, setNetworkSize] = useState(0)
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
                    'Full 25 pillars',
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
                    'Full 25 Forensic Pillars',
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
        }
    ];





    return (
        <div
            className="flex-1 flex flex-col bg-[#0a1628] text-white relative"
        >
            {/* SEO & Authority Meta Tags */}
            <title>{t('single_entity.hero_title')} | Gusti Devitto Forensics</title>
            <meta name="description" content={t('single_entity.hero_desc')} />
            <meta name="keywords" content="business diagnostics, profit recovery, forensic audit, Gusti Devitto, fraud detection, revenue leakage, financial forensics" />
            <link rel="canonical" href="https://gustidevitto.com/single-entity" />
            
            {/* Open Graph / social */}
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={`${t('single_entity.hero_title')} | Forensic Intelligence`} />
            <meta property="og:description" content={t('single_entity.hero_desc')} />
            <meta property="og:image" content="/assets/images/forensic_dashboard.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/single-entity" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('single_entity.hero_title')} />
            <meta name="twitter:description" content={t('single_entity.hero_desc')} />
            <meta name="twitter:image" content="/assets/images/forensic_dashboard.png" />
            <meta name="twitter:site" content="@gustidevitto" />

            {/* GEO Signals */}
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />
            <meta name="ICBM" content="-6.200000, 106.816666" />

            {/* JSON-LD Structured Data — Authority Signal */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Gusti Devitto Business Forensics",
                    "image": "https://gustidevitto.com/assets/images/aboutme.jpg",
                    "url": "https://gustidevitto.com/single-entity",
                    "telephone": "+62-811-XXXX-XXXX",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "SCBD District",
                        "addressLocality": "Jakarta",
                        "addressRegion": "JK",
                        "postalCode": "12190",
                        "addressCountry": "ID"
                    },
                    "founder": {
                        "@type": "Person",
                        "name": "Gusti Devitto",
                        "jobTitle": "Lead Forensic Investigator"
                    }
                })}
            </script>

            {/* Subtle Authority UI Indicator */}
            <div className="absolute top-6 left-6 md:left-12 lg:left-20 z-50 pointer-events-none flex items-center gap-3">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(30,58,138,0.8)]" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase">
                    Diagnostic Level: Verified // Single Entity Protocol
                 </span>
            </div>
            {/* Automatic Spotlight Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 animate-spotlight-roam opacity-20"
                    style={{
                        background: `radial-gradient(800px circle at center, rgba(56, 189, 248, 0.15), transparent 50%)`
                    }}
                />
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}></div>
            </div>
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('single_entity.seo_desc')} />
            <meta name="keywords" content={t('single_entity.seo_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />
            <meta property="og:type" content="website" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.200000;106.816666" />

            {/* Hero Section — The Statement Wall */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-white/[0.05]">
                <div className="max-w-6xl relative z-10">
                    <div className="animate-fade-in text-left">
                        {/* 1. Massive Headline */}
                        <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-tighter leading-[0.9] w-full lg:w-[90%]">
                            <span className="text-white/90">{t('single_entity.hero_title')}</span>
                            <br />
                            <span className="text-amber-500">{t('single_entity.hero_title_accent')}</span>
                        </h1>
                        
                        {/* 2. Subtitle */}
                        <p className="mt-8 text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl font-light">
                            {t('single_entity.hero_desc')}
                        </p>

                        {/* 3. Raw Data Strip (Monospace, Amber) */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-mono text-amber-500 uppercase tracking-widest">
                            <span className="font-bold">{t('single_entity.social_leaks_val')} {t('single_entity.social_leaks')}</span>
                            <span className="text-white/20">/</span>
                            <span className="font-bold">{t('single_entity.social_verdict_val')} {t('single_entity.social_verdict')}</span>
                            <span className="text-white/20">/</span>
                            <span className="font-bold">{t('single_entity.social_diagnosed_val')} {t('single_entity.social_diagnosed')}</span>
                        </div>

                        {/* 4. CTA */}
                        <div className="mt-16 flex items-center gap-6">
                            <Link to="/fip-lite" className="w-full sm:w-auto">
                                <Button size="lg" className="h-auto py-5 px-6 md:px-10 text-base md:text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none whitespace-normal text-left sm:text-center w-full sm:w-auto leading-snug">
                                    {t('single_entity.cta_health_score')}
                                    <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0" />
                                </Button>
                            </Link>
                            <a href="#benefits" className="hidden sm:block text-sm font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.15em]">
                                {t('single_entity.cta_see_catch')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>



            {/* Case Studies / War Stories */}
            <ForensicCaseFiles />

            {/* Quick Calculator */}
            <section className="py-24 px-4 md:px-8 bg-[#060810] border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/[0.02] mb-4">
                                <Activity className="w-3 h-3 text-amber-500" />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-500">Quick Estimate</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {t('single_entity.calc_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('single_entity.calc_desc')}
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-8 bg-amber-500 hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-none">
                                    <Link to="/investasi">
                                        {t('single_entity.cta_demo')}
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <div className="mt-2 flex items-center gap-1.5 opacity-40">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span className="text-[9px] font-mono uppercase tracking-widest">End-to-End Encrypted Data Transmission</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Calculator Card */}
                        <div className="bg-[#03060a] border border-white/[0.05] p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block font-bold">
                                        Enter your monthly revenue
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono text-white/30">$</span>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 150,000"
                                            className="text-right text-3xl font-mono h-20 bg-white/[0.02] border-white/10 text-white focus:border-amber-500/50 focus:ring-0 pl-12 pr-6 rounded-none outline-none"
                                            onChange={(e) => setNetworkSize(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-5 border border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1">Est. Daily Leakage</p>
                                            <p className="text-xl font-mono text-white/90">${(networkSize * 0.0006).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/10" />
                                    </div>

                                    <div className="p-6 border border-white/[0.05] bg-white/[0.01]">
                                        <p className="text-[10px] uppercase font-mono tracking-widest text-amber-500/80 mb-2">Projected Annual Loss</p>
                                        <p className="text-4xl font-mono font-black text-white tracking-tight">
                                            $<span className="text-white/90">{(networkSize * 0.018 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </p>
                                        <p className="text-[10px] font-mono text-white/30 mt-3 uppercase tracking-widest">
                                            *Based on avg 1.8% trapped cost rate
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            {/* Evidentiary Benefits & Scattered FAQ */}
            <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
                    
                    {/* Benefit 1: Left Aligned */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">01</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('single_entity.benefit1_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="single_entity.benefit1_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ Callout 1 - Distinct Indentation */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q1')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a1" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 2: Right Aligned */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">02</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('single_entity.benefit2_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="single_entity.benefit2_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Photo Anchor Bleeding off right edge */}
                    <div className="relative w-[110%] md:w-[85%] md:ml-auto aspect-[21/9] md:aspect-[2.5/1] bg-[#03060a] border-y md:border-l border-white/5 overflow-hidden -mx-6 md:mx-0 -translate-x-6 md:translate-x-12 lg:translate-x-20">
                        <img src="/assets/images/devitto-forensics.jpg" alt="Forensic Analysis" className="w-full h-full object-cover opacity-30 grayscale contrast-125 mix-blend-screen object-[50%_0%]" />
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0a1628] to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 md:left-12">
                            <p className="text-[10px] font-mono text-amber-500 mb-2 uppercase tracking-widest">{t('single_entity.benefits_img_badge')}</p>
                            <p className="text-sm md:text-base text-white/90 font-bold">{t('single_entity.benefits_img_text')}</p>
                        </div>
                        <div className="absolute top-0 right-12 md:right-32 w-[1px] h-full bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0" />
                    </div>

                    {/* Benefit 3: Left Aligned */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">03</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('single_entity.benefit3_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="single_entity.benefit3_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ Callout 2 */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q2')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a2" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 4: Right Aligned */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">04</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('single_entity.benefit4_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="single_entity.benefit4_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20 relative overflow-hidden">
                <WavingDots color="rgba(56, 189, 248, 0.15)" className="opacity-50" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <div className="space-y-4 mb-16">
                        <h2 className="text-3xl font-black uppercase">{t('single_entity.pricing_title')}</h2>
                        <p className="text-muted-foreground">{t('single_entity.pricing_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tiers.map((tier) => {
                            const colorMap: Record<string, { base: string; text: string; bg: string; border: string }> = {
                                green: { base: 'green', text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500' },
                                blue: { base: 'blue', text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500' },
                                amber: { base: 'amber', text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500' },
                                red: { base: 'red', text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' }
                            };
                            const theme = colorMap[tier.color] || colorMap.green;

                            return (
                                <div key={tier.id} className={`border rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-${theme.base}-500/20 bg-black/40 hover:shadow-${theme.base}-500/10 relative overflow-hidden group text-left`}>
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
                            )
                        })}
                    </div>
                </div>
            </section>



            {/* Final CTA — The Human Anchor */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 text-left bg-[#03060a] border-t border-white/[0.05] relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start md:items-stretch">
                    {/* Left: Huge Copy */}
                    <div className="flex-1 space-y-10 order-2 md:order-1">
                        <h2 className="text-[clamp(2.75rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter w-full lg:w-[120%] z-10 relative">
                            <Trans i18nKey="single_entity.final_cta_title" components={{ 1: <span className="text-amber-500" /> }} />
                        </h2>
                        <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-xl font-light">
                            <Trans i18nKey="single_entity.final_cta_desc" components={{ 1: <strong className="text-white" />, br: <br /> }} />
                        </p>
                        <div className="pt-8">
                            <Button asChild className="h-auto w-full md:w-auto py-6 px-8 md:px-12 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none shadow-none text-left flex items-center justify-start max-w-xl">
                                <Link to="/fip-lite" className="flex flex-col items-start h-full justify-center">
                                    <span className="text-xl md:text-2xl font-black whitespace-normal leading-tight">{t('single_entity.cta_health_score')}</span>
                                    <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">
                                        {t('single_entity.final_cta_meta')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Human Anchor */}
                    <div className="hidden md:flex flex-col justify-end items-end relative shrink-0 order-1 md:order-2 w-64 md:ml-auto">
                        <div className="w-full aspect-[4/5] border border-white/10 relative p-3 bg-white/[0.02]">
                            <img 
                                src="/assets/images/aboutme.jpg" 
                                alt="Gusti Devitto" 
                                className="w-full h-full object-cover object-[50%_20%] opacity-80 grayscale-[0.6] contrast-[1.1]" 
                            />
                            {/* Validation Tag */}
                            <div className="absolute -bottom-6 -left-12 bg-[#060a12] border border-white/10 p-4 shadow-xl z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    <div className="text-[10px] font-mono leading-tight">
                                        <span className="text-white/40 uppercase tracking-widest">VERIFIED BY</span><br />
                                        <span className="text-white font-bold uppercase tracking-widest">GUSTI DEVITTO</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-Link */}
            <section className="py-12 border-t border-white/5 bg-zinc-900/30 text-center">
                <p className="text-sm text-muted-foreground">
                    {t('single_entity.cross_link_label')} <Link to="/network-intelligence" className="text-primary font-bold hover:underline px-1">{t('single_entity.cross_link_cta')}</Link>
                </p>
            </section>

            {/* Footer Badge */}
            <section className="py-8 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {t('single_entity.footer_badge')}
                </p>
            </section>
            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div >
    )
}
