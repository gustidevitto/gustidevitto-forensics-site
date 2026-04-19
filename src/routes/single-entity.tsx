import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, ArrowRight, ShieldCheck, Star } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { WavingDots } from "@/components/ui/waving-dots"
import { ForensicCaseFiles } from "@/components/ForensicCaseFiles"
import PricingModal from '@/components/PricingModal';
import { NeuralMesh3D } from '@/components/ui/neural-mesh-3d';

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
            color: 'blue',
            pricing: {
                oneTime: 1500,
                quarterly: { total: 3825, perAudit: 1275, audits: 3 },
                annual: { total: 4500, perAudit: 1125, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.pillars_8', default: '8 Core Forensic Pillars' },
                    { key: 'investasi_page.features.syndrome', default: 'Syndrome Detection' },
                    { key: 'investasi_page.features.anomaly', default: 'Anomaly Detection', highlight: true },
                    { key: 'investasi_page.features.health', default: 'Basic Health Score' },
                    { key: 'investasi_page.features.summary', default: 'Executive Summary PDF' },
                    { key: 'investasi_page.features.multi_currency', default: 'Multi-currency support' },
                    { key: 'investasi_page.features.bilingual', default: 'Bilingual reports (EN/ID)' }
                ],
                excluded: ['Full 25 pillars', 'Logic trace analysis', 'Multi-outlet analysis', 'AI neural intelligence']
            },
            bestFor: ['1 Outlet (Single Unit)', '$500K-$2M revenue', 'First-time diagnostic', 'Budget entry point']
        },
        {
            id: 'forensic',
            name: 'FORENSIC',
            tagline: 'Understand the disease',
            positioning: 'Why am I sick, and what\'s the cure?',
            color: 'gold',
            pricing: {
                oneTime: 3500,
                quarterly: { total: 8925, perAudit: 2975, audits: 3 },
                annual: { total: 10500, perAudit: 2625, audits: 4, access: true }
            },
            features: {
                included: [
                    { key: 'investasi_page.features.pillars_25', default: 'Everything in DIAGNOSTIC' },
                    { key: 'investasi_page.features.pillars_25', default: 'Full 25 Forensic Pillars' },
                    { key: 'investasi_page.features.logic', default: 'Logic Trace Analysis', highlight: true },
                    { key: 'investasi_page.features.decision', default: 'Decision Intelligence Engine', highlight: true },
                    { key: 'investasi_page.features.integrity', default: 'Data Integrity Scoring' },
                    { key: 'investasi_page.features.analytics', default: 'Advanced Analytics™' },
                    { key: 'investasi_page.features.detailed_report', default: 'Detailed Report (15-20 pages)' }
                ],
                excluded: ['Multi-outlet network analysis', 'Franchise intelligence', 'AI neural learning', 'Wealth impact analysis']
            },
            bestFor: ['1 Outlet (Deep Audit)', '$2M-$10M revenue', 'Comprehensive structural fix', 'Action-oriented']
        }
    ];

    const colorMap: Record<string, { accent: string; accentBg: string; accentBorder: string; accentText: string }> = {
        blue:  { accent: '#0A84FF', accentBg: 'bg-[#0A84FF]', accentBorder: 'border-[#0A84FF]/20', accentText: 'text-[#0A84FF]' },
        gold:  { accent: '#BFA26A', accentBg: 'bg-[#BFA26A]', accentBorder: 'border-[#BFA26A]/20', accentText: 'text-[#BFA26A]' },
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            {/* SEO Meta Tags */}
            <title>{t('single_entity.hero_title')} | Gusti Devitto Forensics</title>
            <meta name="description" content={t('single_entity.seo_desc')} />
            <meta name="keywords" content={t('single_entity.seo_keywords')} />
            <link rel="canonical" href="https://gustidevitto.com/single-entity" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={`${t('single_entity.hero_title')} | Gusti Devitto Forensics`} />
            <meta property="og:description" content={t('single_entity.seo_desc')} />
            <meta property="og:image" content="/assets/images/forensic_dashboard.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gustidevitto.com/single-entity" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('single_entity.hero_title')} | Gusti Devitto Forensics`} />
            <meta name="twitter:description" content={t('single_entity.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/forensic_dashboard.png" />
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
                    "founder": { "@type": "Person", "name": "Gusti Devitto", "jobTitle": "Lead Forensic Investigator" }
                })}
            </script>

            {/* ── Ambient background — very subtle, non-HUD ── */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Warm blue orb — replaces scanline/spotlight */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0A84FF]/[0.05] rounded-full blur-[160px] animate-subtle-glow" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#BFA26A]/[0.03] rounded-full blur-[120px] animate-float" />
            </div>

            {/* ── HERO SECTION ── */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-white/[0.05]">
                {/* Neural Mesh — reduced opacity for macOS subtlety */}
                <NeuralMesh3D color="56, 189, 248" nodeCount={35} opacity={0.12} />

                <div className="max-w-6xl relative z-10">
                    <div className="animate-fade-in text-left">
                        {/* Tension badge — glass pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-squircle-sm mb-6">
                            <Activity className="w-3.5 h-3.5 text-[#BFA26A]" strokeWidth={1.5} />
                            <span className="text-xs font-semibold text-[#BFA26A] uppercase tracking-widest leading-snug">
                                {t('single_entity.tension')}
                            </span>
                        </div>

                        {/* Hero H1 — preserved exactly, accent → blue */}
                        <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-tighter leading-[0.9] w-full lg:w-[90%]">
                            <span className="text-white/90">{t('single_entity.hero_title')}</span>
                            <br />
                            <span className="bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] bg-clip-text text-transparent pr-2 pb-1">{t('single_entity.hero_title_accent')}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-8 text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl font-light">
                            {t('single_entity.hero_desc')}
                        </p>

                        {/* Data strip — NO monospace, just semibold */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[#BFA26A] uppercase tracking-widest">
                            <span>{t('single_entity.social_leaks_val')} {t('single_entity.social_leaks')}</span>
                            <span className="text-white/40">/</span>
                            <span>{t('single_entity.social_verdict_val')} {t('single_entity.social_verdict')}</span>
                            <span className="text-white/40">/</span>
                            <span>{t('single_entity.social_diagnosed_val')} {t('single_entity.social_diagnosed')}</span>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 flex items-center gap-5">
                            <Link to="/fip-lite" className="w-full sm:w-auto">
                                <Button size="xl" className="w-full sm:w-auto h-auto py-5 px-8 md:px-10 text-base font-bold whitespace-normal text-left sm:text-center leading-snug bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] text-white border-none shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] transition-all">
                                    {t('single_entity.cta_health_score')}
                                    <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" strokeWidth={2} />
                                </Button>
                            </Link>
                            <a href="#benefits" className="hidden sm:block text-sm font-semibold text-white/40 hover:text-white/60 transition-colors uppercase tracking-[0.12em]">
                                {t('single_entity.cta_see_catch')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <ForensicCaseFiles />

            {/* ── QUICK CALCULATOR ── */}
            <section className="py-24 px-4 md:px-8 bg-[#161618] border-b border-white/[0.05] relative overflow-hidden">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-squircle-sm">
                                <Activity className="w-3 h-3 text-[#BFA26A]" strokeWidth={1.5} />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#BFA26A]">Quick Estimate</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {t('single_entity.calc_title')}
                            </h2>
                            <p className="text-lg text-white/40 leading-relaxed font-light">
                                {t('single_entity.calc_desc')}
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg">
                                    <Link to="/investasi">
                                        {t('single_entity.cta_demo')}
                                        <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
                                    </Link>
                                </Button>
                                <div className="mt-2 flex items-center gap-1.5 opacity-35">
                                    <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                                    <span className="text-[10px] font-medium uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                            </div>
                        </div>

                        {/* Calculator Card — glass elevated */}
                        <div className="glass-elevated rounded-squircle-xl p-8 md:p-10 relative overflow-hidden">
                            {/* Top shimmer line */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3 block">
                                        Enter your monthly revenue
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono text-white/40">$</span>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 150,000"
                                            className="text-right text-2xl font-mono h-16 pl-10 pr-5 bg-white/[0.04] border-white/[0.07] focus:border-[#0A84FF]/40 rounded-squircle-sm"
                                            onChange={(e) => setNetworkSize(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-5 glass rounded-squircle-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">Est. Daily Leakage</p>
                                            <p className="text-xl font-bold text-white/90 font-mono">${(networkSize * 0.0006).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/40" />
                                    </div>

                                    <div className="p-6 glass-blue rounded-squircle-sm">
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#BFA26A]/80 mb-2">Projected Annual Loss</p>
                                        <p className="text-4xl font-bold text-white tracking-tight font-mono">
                                            $<span className="text-white/90">{(networkSize * 0.018 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </p>
                                        <p className="text-[10px] font-medium text-white/40 mt-3 uppercase tracking-widest">
                                            *Based on avg 1.8% trapped cost rate
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY THIS HAPPENS ── */}
            <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#1c1c1e] border-b border-white/[0.05] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white">{t('single_entity.why_reports_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-5 text-left">
                        {['01', '02', '03'].map((num, i) => (
                            <div key={i} className="p-6 glass rounded-squircle-lg">
                                <span className="text-[#0A84FF] font-semibold text-sm block mb-4">{num}</span>
                                <p className="text-white/60 font-light text-base leading-relaxed">
                                    {t(`single_entity.why_reports_p${i + 1}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-white/[0.06] text-center">
                        <p className="text-xl md:text-2xl font-light text-white/40 italic">
                            "{t('single_entity.why_reports_close')}"
                        </p>
                    </div>
                </div>
            </section>

            {/* ── BENEFITS & FAQ ── */}
            <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative bg-[#161618]">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">

                    {/* Benefit 1 */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">01</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('single_entity.benefit1_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="single_entity.benefit1_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ 1 */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-[#0A84FF]/15 py-2">
                        <p className="text-xs font-semibold text-[#BFA26A]/60 mb-3 uppercase tracking-widest">{t('faq.q1')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a1" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-px bg-[#0A84FF]/20 hidden md:block" />
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">02</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('single_entity.benefit2_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="single_entity.benefit2_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Photo bleed */}
                    <div className="relative w-[110%] md:w-[85%] md:ml-auto aspect-[21/9] md:aspect-[2.5/1] bg-[#161618] border-y md:border-l border-white/[0.05] overflow-hidden -mx-6 md:mx-0 -translate-x-6 md:translate-x-12 lg:translate-x-20 rounded-squircle-md">
                        <img src="/assets/images/devitto-forensics.jpg" alt="Forensic Analysis" className="w-full h-full object-cover opacity-25 grayscale contrast-125 mix-blend-screen object-[50%_0%]" />
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#161618] to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 md:left-12">
                            <p className="text-[10px] font-semibold text-[#BFA26A] mb-2 uppercase tracking-widest">{t('single_entity.benefits_img_badge')}</p>
                            <p className="text-sm md:text-base text-white/90 font-bold">{t('single_entity.benefits_img_text')}</p>
                        </div>
                        <div className="absolute top-0 right-12 md:right-32 w-px h-full bg-gradient-to-b from-[#BFA26A]/0 via-[#BFA26A]/15 to-[#BFA26A]/0" />
                    </div>

                    {/* Benefit 3 */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">03</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('single_entity.benefit3_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="single_entity.benefit3_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ 2 */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-[#0A84FF]/15 py-2">
                        <p className="text-xs font-semibold text-[#BFA26A]/60 mb-3 uppercase tracking-widest">{t('faq.q2')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a2" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-px bg-[#0A84FF]/20 hidden md:block" />
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest leading-none">04</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('single_entity.benefit4_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="single_entity.benefit4_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section className="py-24 px-4 md:px-8 bg-[#1c1c1e] border-y border-white/[0.05] relative overflow-hidden">
                <WavingDots color="rgba(10, 132, 255, 0.1)" className="opacity-40" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <div className="space-y-3 mb-14">
                        <h2 className="text-3xl font-black uppercase tracking-tight">{t('single_entity.pricing_title')}</h2>
                        <p className="text-white/40 font-light">{t('single_entity.pricing_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {tiers.map((tier) => {
                            const theme = colorMap[tier.color] || colorMap.blue;
                            return (
                                <div key={tier.id} className="glass-elevated rounded-squircle-xl p-8 flex flex-col text-left relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                                    {/* Top accent bar */}
                                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${theme.accentText}`} />

                                    <div className="mb-6">
                                        <h3 className={`text-2xl font-black ${theme.accentText} tracking-tight mb-1`}>{tier.name}</h3>
                                        <p className="text-white/40 font-light text-sm italic">{tier.tagline}</p>
                                    </div>

                                    <div className="space-y-3 my-6 flex-grow">
                                        {/* One-Time */}
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between">
                                            <div className="text-left">
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1">One-Time Audit</h4>
                                                <span className="text-xl font-bold text-white">${tier.pricing.oneTime.toLocaleString()}</span>
                                                <span className="text-xs text-white/40 block">Single Comprehensive Audit</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'one-time')}>Select</Button>
                                        </div>

                                        {/* Quarterly */}
                                        <div className="p-4 glass rounded-squircle-sm flex items-center justify-between">
                                            <div className="text-left">
                                                <h4 className="font-semibold uppercase tracking-widest text-xs text-white/40 mb-1">Quarterly Program</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white">${tier.pricing.quarterly.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">Total</span>
                                                </div>
                                                <span className="text-xs text-white/40">${tier.pricing.quarterly.perAudit.toLocaleString()} / audit · 3x Monthly</span>
                                                <span className="text-xs text-emerald-400 font-semibold block mt-1">Save ${(tier.pricing.oneTime * 3 - tier.pricing.quarterly.total).toLocaleString()}</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => openModal(tier, 'quarterly')}>Select</Button>
                                        </div>

                                        {/* Annual — highlighted */}
                                        <div className={`p-4 rounded-squircle-sm flex items-center justify-between relative ${tier.color === 'gold' ? 'glass-gold' : 'glass-blue'} border ${theme.accentBorder}`}>
                                            <div className={`absolute -top-3 left-4 ${theme.accentBg} text-black text-[9px] font-black px-3 py-1 rounded-squircle-sm uppercase tracking-wider shadow-lg`}>Recommended</div>
                                            <div className="text-left mt-1">
                                                <h4 className={`font-semibold uppercase tracking-widest text-xs ${theme.accentText} mb-1`}>Annual Partnership</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xl font-bold text-white">${tier.pricing.annual.total.toLocaleString()}</span>
                                                    <span className="text-xs text-white/40">/ Year</span>
                                                </div>
                                                <span className="text-xs text-white/40">${tier.pricing.annual.perAudit.toLocaleString()} / audit · 4x Quarterly</span>
                                                <span className="text-xs text-emerald-400 font-semibold block mt-1">Save ${(tier.pricing.oneTime * 4 - tier.pricing.annual.total).toLocaleString()} + Benefits</span>
                                            </div>
                                            <Button size="sm" className={`${theme.accentBg} text-black hover:brightness-110 border-none font-bold`} onClick={() => openModal(tier, 'annual')}>Select</Button>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="pt-5 border-t border-white/[0.05]">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Key Features</p>
                                        <ul className="space-y-3">
                                            {tier.features.included.slice(0, 10).map((featureObj: any, i: number) => {
                                                const isHighlighted = featureObj.highlight;
                                                const text = typeof featureObj === 'string' ? featureObj : t(featureObj.key, featureObj.default);
                                                return (
                                                    <li key={i} className={`flex items-start gap-3 text-sm ${isHighlighted ? 'glass-gold -mx-2 px-2 py-1 rounded-squircle-sm border-l-2 border-[#BFA26A]/25' : 'text-white/60'}`}>
                                                        {isHighlighted
                                                            ? <Star className="w-3.5 h-3.5 text-[#BFA26A] shrink-0 mt-0.5 fill-[#BFA26A]" strokeWidth={1} />
                                                            : <ShieldCheck className={`w-3.5 h-3.5 ${theme.accentText} shrink-0 mt-0.5`} strokeWidth={1.5} />
                                                        }
                                                        <span className={isHighlighted ? 'text-[#BFA26A] font-semibold' : ''}>{text as string}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className="mt-5 p-3 glass rounded-squircle-sm border border-white/[0.04]">
                                            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-2">Best for:</p>
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 text-left bg-[#161618] border-t border-white/[0.05] relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start md:items-stretch">
                    {/* Left: Copy */}
                    <div className="flex-1 space-y-10 order-2 md:order-1">
                        <h2 className="text-[clamp(2.75rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter w-full lg:w-[120%] z-10 relative">
                            <Trans i18nKey="single_entity.final_cta_title" components={{ 1: <span className="bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] bg-clip-text text-transparent pr-2 pb-1" /> }} />
                        </h2>
                        <p className="text-white/40 text-xl md:text-2xl leading-relaxed max-w-xl font-light">
                            <Trans i18nKey="single_entity.final_cta_desc" components={{ 1: <strong className="text-white" />, br: <br /> }} />
                        </p>
                        <div className="pt-8">
                            <Button asChild size="xl" className="w-full md:w-auto max-w-xl flex flex-col items-start h-auto py-6 px-8 md:px-12 bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] text-white border-none shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] transition-all">
                                <Link to="/fip-lite" className="flex flex-col items-start h-full justify-center">
                                    <span className="text-xl md:text-2xl font-black whitespace-normal leading-tight">{t('single_entity.cta_health_score')}</span>
                                    <span className="text-[10px] opacity-70 font-medium tracking-widest uppercase mt-2">
                                        {t('single_entity.final_cta_meta')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Abstract Diagnostic Visual */}
                    <div className="hidden md:flex flex-col justify-center items-end relative shrink-0 order-1 md:order-2 w-80 md:ml-auto">
                        <div className="relative w-full aspect-square flex items-center justify-center">
                            {/* Outer Pulsating Rings */}
                            <div className="absolute inset-0 border border-white/[0.02] rounded-full animate-pulse-slow"></div>
                            <div className="absolute inset-6 border border-[#0A84FF]/[0.05] rounded-full animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                            <div className="absolute inset-12 border border-white/[0.04] rounded-full animate-pulse-slow delay-1000"></div>
                            
                            <div className="absolute inset-0 bg-[#0A84FF]/[0.02] rounded-full blur-3xl animate-pulse"></div>
                            
                            {/* Fixed Nucleus */}
                            <div className="w-24 h-24 border border-[#BFA26A]/20 rounded-full flex items-center justify-center bg-white/[0.01] backdrop-blur-md relative z-10 shadow-[0_0_30px_rgba(10,132,255,0.05)]">
                                <Activity className="w-8 h-8 text-[#0A84FF] opacity-40" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-link */}
            <section className="py-10 border-t border-white/[0.05] bg-[#1c1c1e] text-center">
                <p className="text-sm text-white/40">
                    {t('single_entity.cross_link_label')}{' '}
                    <Link to="/network-intelligence" className="text-[#0A84FF] font-semibold hover:underline px-1">
                        {t('single_entity.cross_link_cta')}
                    </Link>
                </p>
            </section>

            {/* Footer badge */}
            <section className="py-6 border-t border-white/[0.04] text-center">
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                    {t('single_entity.footer_badge')}
                </p>
            </section>

            {modalOpen && selectedTier && commitmentType && (
                <PricingModal tier={selectedTier} commitmentType={commitmentType} onClose={closeModal} />
            )}
        </div>
    )
}
