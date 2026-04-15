import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/about-gusti-devitto')({
    component: AboutGustiDevitto,
})

function AboutGustiDevitto() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            {/* SEO */}
            <title>{t('about_page.seo_title')}</title>
            <meta name="description" content={t('about_page.seo_desc')} />
            <meta name="keywords" content="Gusti Devitto, Profit Recovery Architect, Business Forensics, Phantom Costs Tracker, Operational Diagnostic Specialist" />
            <link rel="canonical" href="https://gustidevitto.com/about-gusti-devitto" />
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={t('about_page.seo_title')} />
            <meta property="og:description" content={t('about_page.seo_desc')} />
            <meta property="og:image" content="/assets/images/aboutme.jpg" />
            <meta property="og:type" content="profile" />
            <meta property="og:url" content="https://gustidevitto.com/about-gusti-devitto" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('about_page.seo_title')} />
            <meta name="twitter:description" content={t('about_page.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/aboutme.jpg" />
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
                    "@graph": [
                        {
                            "@type": "Person",
                            "@id": "https://www.gustidevitto.com/#person",
                            "name": "Gusti Devitto",
                            "alternateName": "Vitto",
                            "jobTitle": "Financial Forensics Practitioner",
                            "description": t('about_page.seo_desc'),
                            "image": "https://www.gustidevitto.com/assets/images/aboutme.jpg",
                            "knowsAbout": ["Financial Forensics", "Operational Efficiency", "Pattern Recognition", "Unit Economics"],
                            "url": "https://www.gustidevitto.com/about-gusti-devitto"
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gustidevitto.com/" },
                                { "@type": "ListItem", "position": 2, "name": "About Gusti Devitto", "item": "https://www.gustidevitto.com/about-gusti-devitto" }
                            ]
                        }
                    ]
                })}
            </script>

            {/* ═══ HERO — Nameplate, bottom-left anchored (preserved) ═══ */}
            <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-45 grayscale-[0.2] contrast-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/72 to-[#1c1c1e]/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1e]/65 via-transparent to-[#1c1c1e]/25" />
                </div>

                <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-[30vh]">
                    <div className="max-w-5xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-[#0A84FF]/40" />
                            <p className="text-[10px] text-white/40 font-medium tracking-[0.3em] uppercase">
                                {t('about_page.hero_badge')}
                            </p>
                        </div>
                        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-[-0.04em] leading-[0.85] uppercase">
                            <Trans i18nKey="about_page.hero_title">
                                Meet The Surgeon: <br />
                                <span className="text-[#0A84FF]">Precision Behind Numbers</span>
                            </Trans>
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light">
                            <Trans i18nKey="about_page.hero_intro">Hello, I am <strong className="text-white">Gusti Devitto</strong>.</Trans>
                        </p>
                    </div>
                </div>
                <div className="relative z-10 mx-6 md:mx-12 lg:mx-20 h-px bg-gradient-to-r from-[#0A84FF]/20 via-[#0A84FF]/06 to-transparent" />
            </section>

            {/* ═══ DECLARATION ═══ */}
            <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24 items-start">
                        {/* Prose */}
                        <div className="space-y-10 text-white/60 text-lg leading-relaxed font-light">
                            <p>
                                <Trans i18nKey="about_page.hero_p1">Saya bukan akuntan pajak, dan saya bukan perencana keuangan konvensional. Saya adalah seorang <strong className="text-white font-bold">Financial Forensics Specialist</strong> yang berdedikasi membantu <em>founder</em> bisnis multi-outlet dan <em>brand owners</em> untuk membedah apa yang sebenarnya terjadi di balik laporan keuangan mereka.</Trans>
                            </p>
                            <p>
                                <Trans i18nKey="about_page.hero_p2">Dalam dunia bisnis yang bergerak cepat, seringkali "bocor halus" tidak terlihat di permukaan. Fokus saya adalah menemukan kebocoran tersebut—apa yang saya sebut sebagai <strong className="text-white underline decoration-[#BFA26A] decoration-2 underline-offset-4">Phantom Costs</strong>—dan memperbaikinya sebelum menjadi pendarahan fatal.</Trans>
                            </p>
                            <blockquote className="pl-6 border-l-2 border-[#0A84FF]/20 text-xl md:text-2xl text-white/60 font-light italic leading-snug py-4">
                                {t('about_page.evolution_quote')}
                            </blockquote>
                            <p>
                                <Trans i18nKey="about_page.evolution_p2">Namun, dalam prosesnya, saya menemukan fakta keras: Masalahnya bukan pada penjualan, melainkan pada <strong className="text-white uppercase tracking-wider font-bold">Inefisiensi Tersembunyi</strong>.</Trans>
                            </p>
                        </div>

                        {/* Sticky metadata sidebar */}
                        <div className="lg:sticky lg:top-28 space-y-6">
                            <div className="space-y-5">
                                {[
                                    { label: 'Discipline', value: 'Financial Forensics' },
                                    { label: 'Method', value: 'FIP™ Protocol v4.00' },
                                    { label: 'Focus', value: t('about_page.focus') },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] mb-1">{label}</p>
                                        <p className="text-sm text-white/60 font-medium">{value}</p>
                                    </div>
                                ))}
                                <div>
                                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                                        <p className="text-sm text-white/60 font-medium">{t('about_page.auth_level')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data strip — numbers in mono only */}
                            <div className="p-5 glass rounded-squircle-lg">
                                <p className="text-[10px] font-semibold text-[#BFA26A]/60 uppercase tracking-[0.2em] mb-4">Verified Metrics</p>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Outlets Diagnosed', value: '500+' },
                                        { label: 'Avg Recovery', value: '18.6%' },
                                        { label: 'Protocol', value: 'v4.00' },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between items-baseline">
                                            <span className="text-xs text-white/40">{label}</span>
                                            <span className="text-sm font-bold text-[#BFA26A] font-mono">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ ORIGIN ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative bg-[#161618]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-[#0A84FF] font-semibold text-sm tracking-widest">ORIGIN</span>
                        <div className="w-12 h-px bg-[#0A84FF]/20" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-16 max-w-3xl">
                        {t('about_page.evolution_title')}
                    </h2>
                    <div className="space-y-8 max-w-2xl text-white/60 text-lg leading-relaxed font-light">
                        <p>
                            <Trans i18nKey="about_page.evolution_p1">Perjalanan saya tidak dimulai di ruang rapat korporat, melainkan dari lapangan. Saya mendirikan <strong className="text-white font-bold">LAPA</strong>, sebuah inisiatif yang awalnya menargetkan UMKM dan solopreneur rumahan.</Trans>
                        </p>
                        <p>
                            <Trans i18nKey="about_page.evolution_p3">Dari pengalaman tersebut, saya melakukan <em className="text-[#BFA26A]/80 italic">pivot strategis</em>. Saya meninggalkan pendekatan generalis dan membangun sistem diagnosis mendalam yang kini menjadi fondasi layanan saya.</Trans>
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ SYSTEM ═══ */}
            <section className="relative border-b border-white/[0.05] overflow-hidden bg-[#1c1c1e]">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] items-stretch">
                    <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20 space-y-10">
                        <div className="flex items-center gap-4">
                            <span className="text-[#0A84FF] font-semibold text-sm tracking-widest">SYSTEM</span>
                            <div className="w-12 h-px bg-[#0A84FF]/20" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.95]">
                            {t('about_page.methodology_title')}
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed font-light max-w-lg">
                            {t('about_page.methodology_subtitle')}
                        </p>
                        <div className="space-y-6 pt-4">
                            {[
                                { num: '01', titleKey: 'about_page.card_anomaly_title', descKey: 'about_page.card_anomaly_desc', descComponents: { 1: <strong className="text-white/60" /> } },
                                { num: '02', titleKey: 'about_page.card_cash_title', descKey: 'about_page.card_cash_desc', descComponents: { 1: <strong className="text-white/60 uppercase tracking-tighter" /> } },
                                { num: '03', titleKey: 'about_page.card_eff_title', descKey: 'about_page.card_eff_desc', descComponents: { 1: <strong className="text-white/60" /> } },
                            ].map(({ num, titleKey, descKey, descComponents }) => (
                                <div key={num} className="flex items-start gap-4">
                                    <span className="text-[#0A84FF] font-semibold text-xs mt-1.5 shrink-0 w-8">{num}</span>
                                    <div>
                                        <h3 className="text-base font-bold text-white/90 mb-1">{t(titleKey)}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed">
                                            <Trans i18nKey={descKey} components={descComponents} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-white/[0.05]">
                            <p className="text-[10px] font-semibold text-[#BFA26A]/50 uppercase tracking-[0.2em] mb-2">{t('about_page.proprietary_badge')}</p>
                            <p className="text-sm text-white/40 leading-relaxed">
                                <Trans i18nKey="about_page.proprietary_text" components={{ 1: <strong className="text-white/60" /> }} />
                            </p>
                        </div>
                    </div>
                    <div className="relative min-h-[400px] lg:min-h-0 border-l border-white/[0.04]">
                        <img
                            src="/assets/images/ffd1.png"
                            alt="FIP™ Protocol Interface"
                            className="absolute inset-0 w-full h-full object-cover object-left opacity-35 grayscale-[0.4] contrast-[1.1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1e] via-[#1c1c1e]/30 to-transparent" />
                        <div className="absolute bottom-8 right-8 text-right">
                            <p className="text-[10px] font-semibold text-[#BFA26A]/60 uppercase tracking-[0.2em]">{t('about_page.visual_interface')}</p>
                            <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.3em] mt-1">{t('about_page.neural_status')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PHILOSOPHY ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] bg-[#161618]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12 md:justify-end">
                        <div className="w-12 h-px bg-[#0A84FF]/20 hidden md:block" />
                        <span className="text-[#0A84FF] font-semibold text-sm tracking-widest">PHILOSOPHY</span>
                        <div className="w-12 h-px bg-[#0A84FF]/20 md:hidden" />
                    </div>
                    <div className="max-w-xl md:ml-auto">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.95] mb-8 md:text-right">
                            {t('about_page.why_surgeon_title')}
                        </h2>
                        <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light md:text-right">
                            <p>
                                <Trans i18nKey="about_page.why_surgeon_p1" components={{ 1: <strong className="text-white" /> }} />
                            </p>
                            <p>
                                <Trans i18nKey="about_page.why_surgeon_p2" components={{ 1: <em className="text-red-400/70 font-medium" />, 2: <strong className="text-[#BFA26A] font-bold" /> }} />
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-[#1c1c1e]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start md:items-end">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter">
                            {t('about_page.final_cta_title')}
                        </h2>
                        <p className="text-white/40 text-xl leading-relaxed max-w-lg font-light">
                            {t('about_page.final_cta_p1')}
                        </p>
                        <p className="text-white/60 text-xl font-medium italic">
                            {t('about_page.final_cta_quote')}
                        </p>
                        <div className="pt-6">
                            <Button asChild size="xl" className="w-full md:w-auto max-w-xl flex flex-col items-start h-auto py-6 px-8 md:px-12 group">
                                <Link to="/fip-lite" className="flex flex-col items-start h-full justify-center">
                                    <span className="flex items-center text-xl md:text-2xl font-black whitespace-normal leading-tight">
                                        {t('about_page.final_cta_button')}
                                        <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                                    </span>
                                    <span className="text-[10px] opacity-70 font-medium tracking-widest uppercase mt-2">
                                        {t('about_page.certified')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Validation tag */}
                    <div className="hidden md:block shrink-0">
                        <div className="glass-elevated rounded-squircle-lg p-5 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#BFA26A] animate-pulse-slow" />
                                <div className="text-[10px] leading-tight">
                                    <span className="text-white/40 uppercase tracking-widest block">VERIFIED BY</span>
                                    <span className="text-white font-bold uppercase tracking-widest">GUSTI DEVITTO</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-medium text-white/40 uppercase tracking-[0.3em]">
                                FIP™ PROTOCOL V4.00
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer badge */}
            <div className="px-6 md:px-12 lg:px-20 pb-8 flex justify-between items-center text-white/[0.06]">
                <span className="text-[9px] font-medium uppercase tracking-[0.35em]">FIP™ V4.00</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.35em] hidden md:block">© 2026 GUSTI DEVITTO</span>
            </div>
        </div>
    )
}
