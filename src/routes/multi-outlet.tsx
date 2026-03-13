import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/multi-outlet')({
    component: MultiOutletPage,
})

function MultiOutletPage() {
    const { t, i18n } = useTranslation()
    const [networkSize, setNetworkSize] = useState<number>(0)

    return (
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative">
            {/* SEO Meta Tags */}
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('multi_outlet.seo_desc')} />
            <meta name="keywords" content={t('multi_outlet.seo_keywords')} />

            {/* Subtle Authority UI Indicator */}
            <div className="absolute top-6 left-6 md:left-12 lg:left-20 z-50 pointer-events-none flex items-center gap-3">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(30,58,138,0.8)]" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase">
                    Diagnostic Level: Verified // Multi-Outlet Protocol
                 </span>
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}></div>
            </div>

            {/* ═══ HERO — The Statement Wall ═══ */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-white/[0.05]">
                <div className="max-w-6xl relative z-10">
                    <div className="text-left">
                        <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-tighter leading-[0.9] w-full lg:w-[90%]">
                            <span className="text-white/90">{t('multi_outlet.hero_title')}</span>
                            <br />
                            <span className="text-primary">{t('multi_outlet.hero_title_accent')}</span>
                        </h1>

                        <p className="mt-8 text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl font-light">
                            {t('multi_outlet.hero_desc')}
                        </p>

                        {/* Raw Data Strip — monospace, not centered stats */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-mono text-amber-500 uppercase tracking-widest">
                            <span className="font-bold">{t('multi_outlet.social_leaks_val')} {t('multi_outlet.social_leaks')}</span>
                            <span className="text-white/20">/</span>
                            <span className="font-bold">{t('multi_outlet.social_verdict_val')} {t('multi_outlet.social_verdict')}</span>
                            <span className="text-white/20">/</span>
                            <span className="font-bold">{t('multi_outlet.social_diagnosed_val')} {t('multi_outlet.social_diagnosed')}</span>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 flex items-center gap-6">
                            <Link to="/fip-lite" className="w-full sm:w-auto">
                                <Button size="lg" className="h-auto py-5 px-6 md:px-10 text-base md:text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none whitespace-normal text-left sm:text-center w-full sm:w-auto leading-snug">
                                    {t('multi_outlet.cta_health_score')}
                                    <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0" />
                                </Button>
                            </Link>
                            <a href="#benefits" className="hidden sm:block text-sm font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.15em]">
                                {t('multi_outlet.cta_see_catch')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Quick Calculator ═══ */}
            <section className="py-24 px-4 md:px-8 bg-[#03060a] border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-left">
                            <div className="flex items-center gap-4">
                                <span className="text-amber-500 font-mono text-sm tracking-widest">ESTIMATE</span>
                                <div className="w-12 h-[1px] bg-amber-500/30" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {t('multi_outlet.calc_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('multi_outlet.calc_desc')}
                            </p>
                        </div>

                        {/* Interactive Calculator */}
                        <div className="bg-[#03060a] border border-white/[0.05] p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block font-bold">
                                        {t('multi_outlet.calc_label')}
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder={t('multi_outlet.calc_placeholder')}
                                        className="text-center text-3xl font-mono h-20 bg-white/[0.02] border-white/10 text-white focus:border-amber-500/50 focus:ring-0 rounded-none outline-none"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNetworkSize(parseInt(e.target.value) || 0)}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="p-5 border border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1">{t('multi_outlet.calc_daily')}</p>
                                            <p className="text-xl font-mono text-white/90">{i18n.language === 'id' ? `Rp ${(networkSize * 450000).toLocaleString('id-ID')}` : `$${(networkSize * 32).toLocaleString()}`}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/10" />
                                    </div>

                                    <div className="p-6 border border-white/[0.05] bg-white/[0.01]">
                                        <p className="text-[10px] uppercase font-mono tracking-widest text-amber-500/80 mb-2">{t('multi_outlet.calc_monthly')}</p>
                                        <p className="text-4xl font-mono font-black text-white tracking-tight">
                                            {i18n.language === 'id' ? `Rp ${(networkSize * 450000 * 30).toLocaleString('id-ID')}` : `$${(networkSize * 32 * 30).toLocaleString()}`}
                                        </p>
                                        <p className="text-[10px] font-mono text-white/30 mt-3 uppercase tracking-widest">
                                            *Based on avg trapped cost per outlet/day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Benefits — Staggered, not identical cards ═══ */}
            <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">

                    {/* Benefit 1: Left */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">01</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('multi_outlet.benefit1_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="multi_outlet.benefit1_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Benefit 2: Right */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">02</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('multi_outlet.benefit2_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="multi_outlet.benefit2_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Photo Anchor Bleeding off right edge */}
                    <div className="relative w-[110%] md:w-[85%] md:ml-auto aspect-[21/9] md:aspect-[2.5/1] bg-[#03060a] border-y md:border-l border-white/5 overflow-hidden -mx-6 md:mx-0 -translate-x-6 md:translate-x-12 lg:translate-x-20">
                        <img src="/assets/images/forensics.png" alt="Forensic Analysis" className="w-full h-full object-cover opacity-30 grayscale contrast-125 mix-blend-screen" />
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#060a12] to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 md:left-12">
                            <p className="text-[10px] font-mono text-amber-500 mb-2 uppercase tracking-widest">{t('multi_outlet.benefits_img_badge')}</p>
                            <p className="text-sm md:text-base text-white/90 font-bold">{t('multi_outlet.benefits_img_text')}</p>
                        </div>
                    </div>

                    {/* Benefit 3: Left */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">03</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{t('multi_outlet.benefit3_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg">
                            <Trans i18nKey="multi_outlet.benefit3_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* Benefit 4: Right */}
                    <div className="max-w-xl md:ml-auto">
                        <div className="flex items-center gap-4 mb-6 md:justify-end">
                            <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                            <span className="text-amber-500 font-mono text-sm tracking-widest leading-none">04</span>
                            <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 md:text-right leading-tight">{t('multi_outlet.benefit4_title')}</h3>
                        <div className="text-white/60 leading-relaxed text-lg md:text-right">
                            <Trans i18nKey="multi_outlet.benefit4_desc" components={{ 1: <span className="text-white font-bold" /> }} />
                        </div>
                    </div>

                    {/* FAQ Callout — Integrated, not accordion */}
                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q1')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a1" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>

                    <div className="max-w-3xl ml-auto mr-auto pl-6 border-l-2 border-amber-500/20 py-2">
                        <p className="text-xs font-bold text-amber-500/60 mb-3 uppercase tracking-widest">{t('faq.q2')}</p>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            " <Trans i18nKey="faq.a2" components={{ 1: <strong className="text-white font-bold" />, br: <br /> }} /> "
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ Demo Video ═══ */}
            <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">{t('multi_outlet.demo_badge')}</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{t('multi_outlet.demo_title')}</h2>

                        <div className="relative aspect-video border border-white/10 bg-black">
                             <iframe
                                className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                src={t('demo_video.url')}
                                title="FIP Protocol Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8 lg:pt-24">
                        <p className="text-white/40 text-lg leading-relaxed font-light">
                            {t('multi_outlet.demo_disclaimer')}
                        </p>
                        <Button asChild variant="outline" className="h-auto py-4 px-8 border-white/20 text-white/70 hover:text-white hover:border-white rounded-none transition-all uppercase tracking-widest font-bold text-xs">
                            <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                {t('multi_outlet.demo_cta')}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ═══ Pricing — Redirects to investasi ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#03060a] border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95]">
                            {t('multi_outlet.pricing_title')}
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed max-w-lg font-light">
                            {t('multi_outlet.pricing_desc')}
                        </p>
                        <div className="flex items-center gap-1.5 text-white/20">
                            <ShieldCheck className="w-3 h-3" />
                            <span className="text-[9px] font-mono uppercase tracking-widest">{t('multi_outlet.pricing_guarantee')}</span>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <Button asChild className="h-auto py-6 px-10 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none group">
                            <Link to="/investasi" className="flex flex-col items-start">
                                <span className="flex items-center text-xl font-black">
                                    {t('multi_outlet.cta_health_score')}
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">
                                    View Full Rate Card
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ═══ Final CTA — Human Anchor ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 text-left relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start md:items-stretch">
                    <div className="flex-1 space-y-10 order-2 md:order-1">
                        <h2 className="text-[clamp(2.75rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter w-full lg:w-[120%] z-10 relative">
                            <Trans i18nKey="multi_outlet.final_cta_title" components={{ 1: <span className="text-amber-500" /> }} />
                        </h2>
                        <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-xl font-light">
                            <Trans i18nKey="multi_outlet.final_cta_desc" components={{ 1: <strong className="text-white" />, br: <br /> }} />
                        </p>
                        <div className="pt-8">
                            <Button asChild className="h-auto w-full md:w-auto py-6 px-8 md:px-12 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none shadow-none text-left flex items-center justify-start max-w-xl">
                                <Link to="/fip-lite" className="flex flex-col items-start h-full justify-center">
                                    <span className="text-xl md:text-2xl font-black whitespace-normal leading-tight">{t('multi_outlet.cta_health_score')}</span>
                                    <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">
                                        {t('multi_outlet.final_cta_meta')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col justify-end items-end relative shrink-0 order-1 md:order-2 w-64 md:ml-auto">
                        <div className="w-full aspect-[4/5] border border-white/10 relative p-3 bg-white/[0.02]">
                            <img
                                src="/assets/images/aboutme.jpg"
                                alt="Gusti Devitto"
                                className="w-full h-full object-cover object-[50%_20%] opacity-80 grayscale-[0.6] contrast-[1.1]"
                            />
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
                    {t('multi_outlet.cross_link_label')} <Link to="/network-intelligence" onClick={() => window.scrollTo(0, 0)} className="text-primary font-bold hover:underline px-1">{t('multi_outlet.cross_link_cta')}</Link>
                </p>
            </section>

            {/* Footer Badge */}
            <section className="py-8 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {t('multi_outlet.footer_badge')}
                </p>
            </section>
        </div>
    )
}
