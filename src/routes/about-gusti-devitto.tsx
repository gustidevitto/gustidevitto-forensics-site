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
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative">
            {/* SEO & Authority Meta Tags */}
            <title>{t('about_page.seo_title')}</title>
            <meta name="description" content={t('about_page.seo_desc')} />
            <meta name="keywords" content="Gusti Devitto, Profit Recovery Architect, Business Forensics, Phantom Costs Tracker, Operational Diagnostic Specialist" />
            <link rel="canonical" href="https://gustidevitto.com/about-gusti-devitto" />
            
            {/* Open Graph / social */}
            <meta property="og:site_name" content="Gusti Devitto Forensics" />
            <meta property="og:title" content={t('about_page.seo_title')} />
            <meta property="og:description" content={t('about_page.seo_desc')} />
            <meta property="og:image" content="/assets/images/aboutme.jpg" />
            <meta property="og:type" content="profile" />
            <meta property="og:url" content="https://gustidevitto.com/about-gusti-devitto" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('about_page.seo_title')} />
            <meta name="twitter:description" content={t('about_page.seo_desc')} />
            <meta name="twitter:image" content="/assets/images/aboutme.jpg" />
            <meta name="twitter:site" content="@gustidevitto" />

            {/* GEO Signals (Global + Local) */}
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.region" content="US-CA" />
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="New York, San Francisco, Jakarta" />
            <meta name="geo.position" content="40.712776;-74.005974" />
            <meta name="ICBM" content="40.712776, -74.005974" />

            {/* JSON-LD Schemas */}
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
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.gustidevitto.com/"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "About Gusti Devitto",
                                    "item": "https://www.gustidevitto.com/about-gusti-devitto"
                                }
                            ]
                        }
                    ]
                })}
            </script>

            {/* ═══ HERO — THE NAMEPLATE (Human Anchor First) ═══ */}
            <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
                {/* Gusti's photo as background — the FIRST thing you see */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-50 grayscale-[0.3] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/70 to-[#060a12]/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#060a12]/70 via-transparent to-[#060a12]/30" />
                </div>

                {/* Content — bottom-left anchored like the entrance gate */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-[30vh]">
                    <div className="max-w-5xl">
                        {/* Role — understated, above the name */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-amber-400/60" />
                            <p className="text-[10px] text-white/30 font-medium tracking-[0.3em] uppercase">
                                {t('about_page.hero_badge')}
                            </p>
                        </div>

                        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-[-0.04em] leading-[0.85] uppercase">
                            <Trans i18nKey="about_page.hero_title">
                                Meet The Surgeon: <br />
                                <span className="text-amber-500">Precision Behind Numbers</span>
                            </Trans>
                        </h1>

                        <p className="mt-8 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light">
                            <Trans i18nKey="about_page.hero_intro">Hello, I am <strong className="text-white">Gusti Devitto</strong>.</Trans>
                        </p>
                    </div>
                </div>

                {/* Thin amber rule */}
                <div className="relative z-10 mx-6 md:mx-12 lg:mx-20 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />
            </section>

            {/* ═══ THE DECLARATION — Who I Am, Not What I Sell ═══ */}
            <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24 items-start">
                        {/* Left — Prose, staggered paragraphs */}
                        <div className="space-y-10 text-white/60 text-lg leading-relaxed font-light">
                            <p>
                                <Trans i18nKey="about_page.hero_p1">Saya bukan akuntan pajak, dan saya bukan perencana keuangan konvensional. Saya adalah seorang <strong className="text-white font-bold">Financial Forensics Specialist</strong> yang berdedikasi membantu <em>founder</em> bisnis multi-outlet dan <em>brand owners</em> untuk membedah apa yang sebenarnya terjadi di balik laporan keuangan mereka.</Trans>
                            </p>
                            <p>
                                <Trans i18nKey="about_page.hero_p2">Dalam dunia bisnis yang bergerak cepat, seringkali "bocor halus" tidak terlihat di permukaan. Fokus saya adalah menemukan kebocoran tersebut—apa yang saya sebut sebagai <strong className="text-white underline decoration-amber-500 decoration-2 underline-offset-4">Phantom Costs</strong>—dan memperbaikinya sebelum menjadi pendarahan fatal.</Trans>
                            </p>

                            {/* Pull quote — indented, different size, breaks the column rhythm */}
                            <blockquote className="pl-6 border-l-2 border-amber-500/30 text-xl md:text-2xl text-white/80 font-light italic leading-snug py-4">
                                {t('about_page.evolution_quote')}
                            </blockquote>

                            <p>
                                <Trans i18nKey="about_page.evolution_p2">Namun, dalam prosesnya, saya menemukan fakta keras: Masalahnya bukan pada penjualan, melainkan pada <strong className="text-white uppercase tracking-wider font-bold">Inefisiensi Tersembunyi</strong>.</Trans>
                            </p>
                        </div>

                        {/* Right — Sticky metadata column */}
                        <div className="lg:sticky lg:top-28 space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-2">Discipline</p>
                                    <p className="text-sm text-white/70 font-medium">Financial Forensics</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-2">Method</p>
                                    <p className="text-sm text-white/70 font-medium">FIP™ Protocol v4.00</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-2">Focus</p>
                                    <p className="text-sm text-white/70 font-medium">{t('about_page.focus')}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-sm text-white/70 font-medium">{t('about_page.auth_level')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Monospace data strip */}
                            <div className="p-4 border border-white/[0.06] bg-white/[0.01]">
                                <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em] mb-3">Verified Metrics</p>
                                <div className="space-y-2 font-mono text-sm text-amber-500">
                                    <div className="flex justify-between">
                                        <span className="text-white/30">Outlets Diagnosed</span>
                                        <span>500+</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/30">Avg Recovery</span>
                                        <span>18.6%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/30">Protocol Version</span>
                                        <span>v4.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ EVOLUTION — From LAPA to Forensics ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05] relative">
                <div className="max-w-6xl mx-auto">
                    {/* Section label — left, monospace */}
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-amber-500 font-mono text-sm tracking-widest">ORIGIN</span>
                        <div className="w-12 h-[1px] bg-amber-500/30" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-16 max-w-3xl">
                        {t('about_page.evolution_title')}
                    </h2>

                    <div className="space-y-8 max-w-2xl text-white/50 text-lg leading-relaxed font-light">
                        <p>
                            <Trans i18nKey="about_page.evolution_p1">Perjalanan saya tidak dimulai di ruang rapat korporat, melainkan dari lapangan. Saya mendirikan <strong className="text-white font-bold">LAPA</strong>, sebuah inisiatif yang awalnya menargetkan UMKM dan solopreneur rumahan.</Trans>
                        </p>
                        <p>
                            <Trans i18nKey="about_page.evolution_p3">Dari pengalaman tersebut, saya melakukan <em className="text-amber-500/80 italic">pivot strategis</em>. Saya meninggalkan pendekatan generalis dan membangun sistem diagnosis mendalam yang kini menjadi fondasi layanan saya.</Trans>
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ THE SYSTEM — Not cards, but an anchor image + prose ═══ */}
            <section className="relative border-b border-white/[0.05] overflow-hidden">
                {/* Dashboard image bleeds off the right edge */}
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] items-stretch">
                    {/* Left — The claim */}
                    <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20 space-y-10">
                        <div className="flex items-center gap-4">
                            <span className="text-amber-500 font-mono text-sm tracking-widest">SYSTEM</span>
                            <div className="w-12 h-[1px] bg-amber-500/30" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.95]">
                            {t('about_page.methodology_title')}
                        </h2>

                        <p className="text-white/50 text-lg leading-relaxed font-light max-w-lg">
                            {t('about_page.methodology_subtitle')}
                        </p>

                        {/* Not a grid. A list. Staggered, not equal. */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-start gap-4">
                                <span className="text-amber-500 font-mono text-xs mt-1.5 shrink-0 w-8">01</span>
                                <div>
                                    <h3 className="text-base font-bold text-white/90 mb-1">{t('about_page.card_anomaly_title')}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">
                                        <Trans i18nKey="about_page.card_anomaly_desc">Using <strong className="text-white/60">pattern recognition</strong> to spot anomalies in COGS and Wastage that often go undetected by standard audits.</Trans>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-amber-500 font-mono text-xs mt-1.5 shrink-0 w-8">02</span>
                                <div>
                                    <h3 className="text-base font-bold text-white/90 mb-1">{t('about_page.card_cash_title')}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">
                                        <Trans i18nKey="about_page.card_cash_desc">Memetakan secara presisi melalui analisis <strong className="text-white/60 uppercase tracking-tighter">Cash Conversion Cycle (CCC)</strong> and A-R Gaps untuk memastikan likuiditas Anda nyata.</Trans>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-amber-500 font-mono text-xs mt-1.5 shrink-0 w-8">03</span>
                                <div>
                                    <h3 className="text-base font-bold text-white/90 mb-1">{t('about_page.card_eff_title')}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">
                                        <Trans i18nKey="about_page.card_eff_desc">Menghitung <strong className="text-white/60">Unit Economics</strong> yang presisi, termasuk LTV:CAC and Break-Even Point dinamis yang menyesuaikan dengan fluktuasi market.</Trans>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Proprietary badge — inline, not a card */}
                        <div className="pt-6 border-t border-white/[0.06]">
                            <p className="text-[10px] font-mono text-amber-500/50 uppercase tracking-[0.2em] mb-2">{t('about_page.proprietary_badge')}</p>
                            <p className="text-sm text-white/40 leading-relaxed">
                                <Trans i18nKey="about_page.proprietary_text">Sistem ini bukan sekadar spreadsheet, melainkan kerangka kerja audit yang dilengkapi dengan <strong className="text-white/70">Sovereign Intelligence</strong> untuk diagnosis deterministik tingkat tinggi.</Trans>
                            </p>
                        </div>
                    </div>

                    {/* Right — Dashboard image, breaks container, bleeds right */}
                    <div className="relative min-h-[400px] lg:min-h-0 border-l border-white/[0.04]">
                        <img
                            src="/assets/images/ffd1.png"
                            alt="FIP™ Protocol Interface"
                            className="absolute inset-0 w-full h-full object-cover object-left opacity-40 grayscale-[0.4] contrast-[1.1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#060a12] via-[#060a12]/30 to-transparent" />
                        <div className="absolute bottom-8 right-8 text-right">
                            <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em]">{t('about_page.visual_interface')}</p>
                            <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mt-1">{t('about_page.neural_status')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ WHY THE SURGEON — Not a card, not centered ═══ */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12 md:justify-end">
                        <div className="w-12 h-[1px] bg-amber-500/30 hidden md:block" />
                        <span className="text-amber-500 font-mono text-sm tracking-widest">PHILOSOPHY</span>
                        <div className="w-12 h-[1px] bg-amber-500/30 md:hidden" />
                    </div>

                    <div className="max-w-xl md:ml-auto">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.95] mb-8 md:text-right">
                            {t('about_page.why_surgeon_title')}
                        </h2>
                        <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light md:text-right">
                            <p>
                                <Trans i18nKey="about_page.why_surgeon_p1">Klien saya sering menyebut pendekatan saya seperti <strong className="text-white">"bedah operasi"</strong>. Saya tidak memberikan "obat generik" berupa saran motivasi bisnis.</Trans>
                            </p>
                            <p>
                                <Trans i18nKey="about_page.why_surgeon_p2">Saya masuk ke dalam data Anda, melakukan diagnosis spesifik, memotong inefisiensi (<em className="text-red-400/80 font-medium">jaringan mati</em>), dan menjahit kembali sistem operasional Anda agar lebih sehat dan <strong className="text-amber-500 font-bold">profitable</strong>.</Trans>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA — The Closing Statement ═══ */}
            <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start md:items-end">
                    {/* Left: Huge Copy */}
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter">
                            {t('about_page.final_cta_title')}
                        </h2>
                        <p className="text-white/40 text-xl leading-relaxed max-w-lg font-light">
                            {t('about_page.final_cta_p1')}
                        </p>
                        <p className="text-white/70 text-xl font-medium italic">
                            {t('about_page.final_cta_quote')}
                        </p>
                        <div className="pt-6">
                            <Button asChild className="h-auto w-full md:w-auto py-6 px-8 md:px-12 text-lg font-bold bg-amber-500 text-black hover:bg-white transition-colors rounded-none shadow-none text-left flex items-center justify-start max-w-xl group">
                                <Link to="/fip-lite" className="flex flex-col items-start h-full justify-center">
                                    <span className="flex items-center text-xl md:text-2xl font-black whitespace-normal leading-tight">
                                        {t('about_page.final_cta_button')}
                                        <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <span className="text-[10px] opacity-70 font-mono tracking-widest uppercase mt-2">
                                        {t('about_page.certified')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Small validation tag, not a huge portrait again */}
                    <div className="hidden md:block shrink-0">
                        <div className="bg-[#060a12] border border-white/[0.06] p-5 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <div className="text-[10px] font-mono leading-tight">
                                    <span className="text-white/30 uppercase tracking-widest">VERIFIED BY</span><br />
                                    <span className="text-white font-bold uppercase tracking-widest">GUSTI DEVITTO</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-mono text-white/15 uppercase tracking-[0.3em]">
                                FIP™ PROTOCOL V4.00
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Badge */}
            <div className="px-6 md:px-12 lg:px-20 pb-8 flex justify-between items-center text-white/[0.08]">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em]">FIP™ V4.00</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] hidden md:block">© 2026 GUSTI DEVITTO</span>
            </div>
        </div>
    )
}
