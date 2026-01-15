import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign, Clock, Target, BadgeCheck, Activity, Microscope, Search, Brain, Lock, Maximize2, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [heroTab, setHeroTab] = useState<'investor' | 'owner'>('investor') // Default to Investor for "Authority" path
    const [showMasterLab, setShowMasterLab] = useState(false)
    const slides = [
        {
            id: 'dashboard',
            type: 'component',
            title: t('hero.visual.mri'),
            content: (
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('hero.visual.phantom_detected')}</p>
                            <p className="text-2xl font-bold text-destructive">
                                {t('hero.visual.leak_value')}
                                <span className="text-sm font-normal">{t('hero.visual.per_month')}</span>
                            </p>
                        </div>
                        <TrendingDown className="w-10 h-10 text-destructive opacity-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">{t('hero.visual.runway')}</p>
                            <p className="text-lg font-bold text-yellow-500">{t('hero.visual.runway_value')}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">{t('hero.visual.leak')}</p>
                            <p className="text-lg font-bold text-orange-500">{t('hero.visual.leak_percent')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'dachicken',
            type: 'image',
            title: t('hero.visual.experience'),
            src: '/assets/images/dachicken.png',
            desc: t('hero.visual.desc_experience'),
            icon: <Activity className="w-6 h-6" />
        },
        {
            id: 'forensics',
            type: 'image',
            title: t('hero.visual.analytics'),
            src: '/assets/images/forensics.png',
            desc: t('hero.visual.desc_analytics'),
            icon: <Microscope className="w-6 h-6" />
        },
        {
            id: 'audit',
            type: 'image',
            title: t('hero.visual.diagnosis'),
            src: '/assets/images/audit.png',
            desc: t('hero.visual.desc_diagnosis'),
            icon: <Search className="w-6 h-6" />
        },
        {
            id: 'neural-matrix',
            type: 'image',
            title: t('hero.visual.matrix'),
            src: '/assets/images/ffd1.png',
            desc: t('hero.visual.desc_matrix'),
            icon: <Brain className="w-6 h-6" />
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <title>{t('global.seo_home_title')}</title>
            <meta name="description" content={t('global.seo_home_desc')} />
            <meta name="keywords" content={t('global.seo_home_keywords')} />
            <meta property="og:title" content={t('global.og_home_title')} />
            <meta property="og:description" content={t('global.og_home_desc')} />

            {/* Previous Schema Stays, maybe update it later if needed */}
            <script type="application/ld+json">
                {JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": t('about_page.faq_q1'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('about_page.faq_a1')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('about_page.faq_q2'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('about_page.faq_a2')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('about_page.faq_q3'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('about_page.faq_a3')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('about_page.faq_q4'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('about_page.faq_a4')
                                }
                            },
                            {
                                "@type": "Question",
                                "name": t('about_page.faq_q5'),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t('about_page.faq_a5')
                                }
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": t('nav.home'),
                                "item": "https://www.gustidevitto.com/"
                            }
                        ]
                    }
                ])}
            </script>
            {/* Hero Section - The Split-Gate */}
            <section id="owners" className="relative grid place-items-center lg:grid-cols-2 gap-8 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="flex flex-col gap-6 max-w-2xl animate-fade-in relative z-10">
                    {/* Hero Tabs */}
                    <div className="flex p-1 bg-muted/20 backdrop-blur-sm border border-white/5 rounded-full w-fit mb-2">
                        <button
                            onClick={() => setHeroTab('investor')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${heroTab === 'investor' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-white'}`}
                        >
                            Investor & HQ
                        </button>
                        <button
                            onClick={() => setHeroTab('owner')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${heroTab === 'owner' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-white'}`}
                        >
                            Business Owner
                        </button>
                    </div>

                    {/* Badge - Dynamic based on Tab */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-[0.2em] w-fit border backdrop-blur-sm uppercase transition-colors duration-500 ${heroTab === 'investor' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                        <ShieldCheck className="w-4 h-4" />
                        <span>{heroTab === 'investor' ? t('hero.roi_desc') : t('hero.badge')}</span>
                    </div>

                    {/* Headline - Dynamic */}
                    <div className="min-h-[180px]">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.9] uppercase transition-all duration-300">
                            {heroTab === 'investor' ? (
                                <>
                                    {t('hero.title1')} <br />
                                    <span className="text-destructive">{t('hero.title2')}</span>
                                </>
                            ) : (
                                <>
                                    Profit is a <br />
                                    <span className="text-yellow-500">Vanity Metric.</span> <br />
                                    Cash is Survival.
                                </>
                            )}
                        </h1>
                    </div>

                    {/* Qualifier Line - Clinical/Forensic */}
                    {heroTab === 'investor' && (
                        <p className="text-sm md:text-base text-red-500 font-medium mt-6 mb-2 tracking-wide border-l-2 border-destructive pl-4">
                            {t('hero.qualifier')}
                        </p>
                    )}

                    {/* Subheadline - Dynamic */}
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl min-h-[80px]">
                        {heroTab === 'investor'
                            ? t('hero.desc', { brand: 'FFD™ v4.00' })
                            : heroTab === 'owner' ? (
                                <>
                                    While you celebrate high sales, Phantom Costs are quietly killing your runway. FFD™ v4.00 finds the leaks that accountants miss. Don't be the business that dies with a full restaurant.
                                </>
                            ) : null}
                    </p>

                    {/* Micro-Copy Loss Aversion */}
                    <p className="text-xs font-mono text-red-400 tracking-wide uppercase animate-pulse">
                        <TrendingDown className="w-3 h-3 inline mr-2" />
                        {heroTab === 'investor' ? t('hero.visual.quote') : "43+ Owners found critical leaks this week. Are you next?"}
                    </p>

                    {/* CTA - Side-by-Side Dual Logic */}
                    {/* CTA - Dynamic */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        {heroTab === 'investor' ? (
                            <Button asChild size="lg" className="text-lg h-16 px-10 shadow-lg shadow-destructive/30 bg-destructive hover:bg-destructive/80 text-white font-black group relative overflow-hidden flex-1">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                    <span className="relative z-10 flex items-center justify-center">
                                        {t('hero.cta_enterprise')}
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </Button>
                        ) : (
                            <Button asChild size="lg" className="text-lg h-16 px-10 shadow-lg shadow-primary/30 bg-yellow-500 hover:bg-yellow-600 text-black font-black group relative overflow-hidden flex-1">
                                <Link to="/get-access">
                                    <span className="relative z-10 flex items-center justify-center">
                                        {t('hero.cta_free')}
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </Button>
                        )}

                        <Button asChild variant="outline" size="lg" className="text-lg h-16 px-10 border-white/10 hover:border-white hover:bg-white/5 text-muted-foreground hover:text-white font-bold flex-1">
                            <a href="#video-explainer">
                                Watch Demo Not Available
                            </a>
                        </Button>
                    </div>

                    {/* Guarantee Badge */}
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <BadgeCheck className="w-5 h-5 text-green-500" />
                        <span><strong className="text-foreground">Sovereign Standard</strong> — {t('hero.guarantee').split(' — ')[1]}</span>
                    </div>
                </div>

                {/* Hero Visual - The Carousel */}
                <div className="relative w-full max-w-xl mx-auto lg:mr-0 animate-slide-up h-[400px] flex items-center">
                    <div className="relative w-full h-[360px] overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-2xl">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'}`}
                            >
                                <div className="h-full flex flex-col">
                                    {/* Header Bar */}
                                    <div className="bg-primary/10 px-6 py-4 border-b border-border/50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                            </div>
                                            <span className="ml-4 text-xs font-semibold text-primary tracking-widest uppercase">{slide.title}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono">{index + 1} / {slides.length}</span>
                                    </div>

                                    {/* Slide Content */}
                                    <div className="flex-1 overflow-hidden relative">
                                        {slide.type === 'component' ? (
                                            slide.content
                                        ) : (
                                            <div className="h-full relative">
                                                <img
                                                    src={slide.src}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6">
                                                    <p className="text-sm font-medium text-foreground leading-relaxed">
                                                        {slide.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-6' : 'bg-primary/20 hover:bg-primary/40'}`}
                            />
                        ))}
                    </div>

                    {/* Floating ROI Box (Replaces Capacity Badge) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-black border border-amber-500/50 rounded-xl px-6 py-4 shadow-2xl animate-float z-20 hidden sm:block">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em] leading-none mb-1">{t('hero.roi_label')}</p>
                            <p className="text-xl font-black text-white">{t('hero.roi_value')}</p>
                            <p className="text-[9px] text-muted-foreground max-w-[120px] leading-tight mt-1">
                                {t('hero.roi_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Section: Institutional Intelligence Unit (The Investor Gate) */}
            <section id="investors" className="py-24 px-4 md:px-8 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30 mb-6">
                            {t('institutional.badge')}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">
                            {t('institutional.title')}
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto italic">
                            {t('institutional.quote')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-primary uppercase">{t('institutional.card1_title')}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t('institutional.card1_desc').split('. ')[0]}. <strong className="text-white">{t('institutional.card1_desc').split('. ')[1]}</strong>
                            </p>
                        </div>
                        <div id="franchise" className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-primary uppercase">{t('institutional.card2_title')}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t('institutional.card2_desc').split('. ')[0]}. {t('institutional.card2_desc').split('. ')[1]} <strong className="text-white">{t('institutional.card2_desc').split('. ')[2]}</strong>
                            </p>
                        </div>
                        <div className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all group">
                            <h3 className="text-xl font-black mb-4 text-primary uppercase">{t('institutional.card3_title')}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t('institutional.card3_desc').split('. ')[0]}. {t('institutional.card3_desc').split('. ')[1]} <strong className="text-white">{t('institutional.card3_desc').split('. ')[2]}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Master Lab Network Edition Showcase (The Weapon) - Interactive Preview */}
            <section className="py-24 px-4 md:px-8 bg-black relative overflow-hidden border-t border-white/5">
                {/* Background Grid/Effects */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

                <div className="container mx-auto max-w-7xl relative z-20">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                        <div className="text-left max-w-2xl">
                            {/* Master Lab Framing - Clinical Attach */}
                            <p className="text-red-500 font-mono text-xs md:text-sm mb-6 uppercase tracking-widest border-l-2 border-red-500 pl-3 leading-relaxed max-w-lg opacity-80">
                                {t('master_lab.framing')}
                            </p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/20 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-6">
                                <Activity className="w-3 h-3 animate-pulse" /> Live Telemetry
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none mb-4">
                                Master Lab <span className="text-red-600">Network Edition</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Aggregated intelligence from <strong className="text-white">50+ active franchise nodes</strong>.
                            </p>
                        </div>
                        <div className="flex gap-8 border-l border-white/10 pl-8">
                            <div className="text-left hidden md:block">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">Clearance Level</p>
                                <p className="text-xl font-black text-white">L-9 APPROVED</p>
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">Monitoring</p>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <p className="text-xl font-black text-red-500">54 NODES</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Weapon - Interactive Preview Card */}
                    <div
                        className="relative group rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden cursor-pointer h-[400px] transition-all hover:border-red-500/50 hover:shadow-[0_0_50px_rgba(220,38,38,0.2)]"
                        onClick={() => setShowMasterLab(true)}
                    >
                        {/* Image Layer - Cropped/Masked */}
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <img
                                src="/assets/images/ffdv4masterlab.png"
                                alt="FFD v4 Master Lab Aggregator Interface"
                                className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                        {/* Center CTA */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                <Maximize2 className="w-8 h-8 text-red-500" />
                            </div>
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
                                Initialize Master View
                            </p>
                        </div>

                        {/* Tech Overlay Lines (Decorative) */}
                        <div className="absolute top-4 left-4 flex gap-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-red-500/50 uppercase">
                            // Secure_Connection_Established
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                            System Architecture: Distributed Forensic Ledger
                        </p>
                        <div className="flex gap-4">
                            <BadgeCheck className="w-4 h-4 text-zinc-600" />
                            <Activity className="w-4 h-4 text-zinc-600" />
                            <Lock className="w-4 h-4 text-zinc-600" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {showMasterLab && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowMasterLab(false)}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative max-w-full max-h-full w-full h-full flex flex-col items-center justify-center" onClick={() => setShowMasterLab(false)}>
                        <div className="relative w-fit h-fit max-w-full max-h-[85vh] overflow-auto rounded-lg border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <img
                                src="/assets/images/ffdv4masterlab.png"
                                alt="Master Lab Full View"
                                className="max-w-full h-auto object-contain block"
                            />
                        </div>

                        <div className="mt-6 flex flex-col items-center gap-2 pointer-events-none">
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">Master Lab Aggregator</h3>
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 bg-red-900/50 border border-red-500/30 text-red-400 text-[10px] font-mono rounded uppercase">Live Feed</span>
                                <span className="text-zinc-500 text-xs font-mono">Res: 100% // Scanned: 50 Nodes</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Proof & Authority: Trusted By */}
            <section className="py-12 border-y border-border/50 bg-background">
                <div className="container mx-auto px-4">
                    <p className="text-center text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase mb-8">Piloted with / Trusted by</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {/* Grayscale Placeholders for Logos */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">FINANCIAL UNIT A</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">INVESTOR GROUP B</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">RETAIL CHAIN C</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
                            <span className="text-[8px] mt-1 font-mono">FRANCHISE HQ D</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diagnostic Triage Teaser */}
            <section className="py-12 px-4 md:px-8 relative z-30 -mt-10 md:-mt-16">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                step: "01",
                                title: t('triage.step01_title'),
                                desc: t('triage.step01_desc'),
                                icon: <Activity className="w-5 h-5" />
                            },
                            {
                                step: "02",
                                title: t('triage.step02_title'),
                                desc: t('triage.step02_desc'),
                                icon: <Microscope className="w-5 h-5" />
                            },
                            {
                                step: "03",
                                title: t('triage.step03_title'),
                                desc: t('triage.step03_desc'),
                                icon: <Target className="w-5 h-5" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl hover:border-primary/50 transition-all backdrop-blur-xl">
                                <div className="absolute top-4 right-6 text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">{item.step}</div>
                                <div className="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Bar - Real Metrics */}
            <section className="bg-card/50 border-y border-border/50 py-8 animate-fade-in-up">
                <div className="container mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">Rp 4.2M+</div>
                        <div className="text-sm text-muted-foreground">{t('proof.leaks_revealed')}</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">2M+</div>
                        <div className="text-sm text-muted-foreground">{t('proof.accounting_jargon')}</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">15 min</div>
                        <div className="text-sm text-muted-foreground">{t('proof.mri_time')}</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">Zero</div>
                        <div className="text-sm text-muted-foreground">Accounting Jargon</div>
                    </div>
                </div>
            </section>

            {/* Origin Story Section */}
            < section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20" >
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-5 gap-8 items-center">
                        {/* Photo Placeholder */}
                        <div className="md:col-span-2 flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/assets/images/devitto-forensics.jpg"
                                        alt="Gusti Devitto"
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    Est. 2019
                                </div>
                            </div>
                        </div>

                        {/* Story */}
                        <div className="md:col-span-3 space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{t('story.title')}</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('story.p1').split('. ')[0]}. {t('story.p1').split('. ')[1]}. <strong className="text-foreground">{t('story.p1').split('. ')[2]}. {t('story.p1').split('. ')[3]}</strong>
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('story.p2')}
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-sm italic">
                                {t('story.p3')}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('story.p4')}
                            </p>
                            <p className="text-foreground leading-relaxed font-bold bg-primary/5 p-4 border-l-4 border-primary italic">
                                {t('story.quote')}
                            </p>
                            <div className="pt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">— <strong>Gusti Devitto (Vitto)</strong></p>
                                <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-black uppercase tracking-widest text-[10px]">
                                    <Link to="/about-gusti-devitto" className="flex items-center gap-1">
                                        {t('story.cta')} <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* The Ugly Truth Section - Emotional Hooks */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ugly_truth.title').split('"')[0]}<span className="text-destructive">"{t('ugly_truth.title').split('"')[1]}"</span>{t('ugly_truth.title').split('"')[2]}</h2>
                        <p className="text-muted-foreground text-lg">
                            {t('ugly_truth.subtitle').split('. ')[0]}. {t('ugly_truth.subtitle').split('. ')[1]}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingDown className="w-10 h-10 text-destructive" />,
                                title: t('ugly_truth.card1_title'),
                                symptom: t('ugly_truth.card1_badge'),
                                desc: t('ugly_truth.card1_desc')
                            },
                            {
                                icon: <Users className="w-10 h-10 text-destructive" />,
                                title: t('ugly_truth.card2_title'),
                                symptom: t('ugly_truth.card2_badge'),
                                desc: t('ugly_truth.card2_desc')
                            },
                            {
                                icon: <DollarSign className="w-10 h-10 text-destructive" />,
                                title: t('ugly_truth.card3_title'),
                                symptom: t('ugly_truth.card3_badge'),
                                desc: t('ugly_truth.card3_desc')
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-card p-8 rounded-xl border border-border/50 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/5 hover:-translate-y-1"
                            >
                                <div className="mb-6 bg-destructive/10 w-fit p-4 rounded-xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                <p className="text-[10px] tracking-widest text-primary font-black mb-2 uppercase">{item.symptom}</p>
                                <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Transition to Solution */}
                    <div className="text-center mt-16 max-w-2xl mx-auto">
                        <p className="text-lg text-muted-foreground">
                            {t('ugly_truth.transition').split('. ')[0]}. {t('ugly_truth.transition').split('. ')[1]}. <br />
                            {t('ugly_truth.transition').split('. ')[2]}. {t('ugly_truth.transition').split('. ')[3]}
                        </p>
                    </div>
                </div>
            </section>

            {/* The Solution - FFD v3 Dashboard Visual */}
            <section className="py-24 px-4 md:px-8 bg-muted/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                            <Target className="w-4 h-4" />
                            <span>{t('solution.badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('solution.title')}</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            <Trans i18nKey="solution.desc">
                                Not just a spreadsheet. This is a <strong className="text-foreground">Financial Operating System</strong> — modular infrastructure to lock every cent in its place.
                            </Trans>
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Features List */}
                        <div className="lg:col-span-5 space-y-4">
                            {[
                                {
                                    title: t('solution.f1_title'),
                                    aka: t('solution.f1_aka'),
                                    desc: t('solution.f1_desc')
                                },
                                {
                                    title: t('solution.f2_title'),
                                    aka: t('solution.f2_aka'),
                                    desc: t('solution.f2_desc')
                                },
                                {
                                    title: t('solution.f3_title'),
                                    aka: t('solution.f3_aka'),
                                    desc: t('solution.f3_desc')
                                },
                                {
                                    title: t('solution.f4_title'),
                                    aka: t('solution.f4_aka'),
                                    desc: t('solution.f4_desc')
                                },
                                {
                                    title: t('solution.new_pillar_title'),
                                    aka: "16th Pillar",
                                    desc: t('solution.new_pillar_desc')
                                }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-base">{feature.title}</h3>
                                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{feature.aka}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dashboard Visual */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative rounded-2xl border border-primary/20 overflow-hidden shadow-2xl bg-background">
                                <img
                                    src="/assets/images/ffd.png"
                                    alt="FFD™ v3 Financial Forensics Dashboard"
                                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700"
                                />
                                {/* Scanning Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan pointer-events-none"></div>

                                {/* UI Tags */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-white/90">{t('solution.live_feed')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Transparency Section */}
            < section id="pricing" className="py-24 px-4 md:px-8 border-t border-border/50 bg-[#0a0a0a] relative overflow-hidden" >
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase">{t('pricing.title')}</h2>
                        <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-y-12 md:gap-y-32 md:gap-x-8 items-stretch relative">
                        {/* Segment Header for Row 1: Founders */}
                        <div className="md:col-span-6 flex items-center gap-4 mb-2 md:-mb-16 z-20 md:order-0">
                            <div className="px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                                {t('pricing.founders_badge')}
                            </div>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>

                        {/* SME Group Decoration Background - Desktop Row 1 */}
                        <div className="hidden md:block absolute top-[60px] -inset-x-4 h-[44%] border border-primary/10 bg-primary/5 rounded-[3rem] pointer-events-none" />

                        {/* 1. SME STARTER (Mobile 1st, Desktop Row 1 Col 1) */}
                        <div className="md:col-span-2 md:order-1 p-8 rounded-2xl border border-border/50 bg-[#121212] flex flex-col relative z-20 hover:border-primary/30 transition-all group">
                            <div className="mb-4">
                                <h3 className="text-xl font-black uppercase text-white">{t('pricing.starter_title')}</h3>
                                <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">{t('pricing.starter_badge')}</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black text-white">{t('pricing.starter_price')}<span className="text-xs font-normal text-muted-foreground ml-1">{t('pricing.per_month')}</span></p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_starter_1')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_starter_2')}</li>
                            </ul>
                            <div className="pt-6 border-t border-border/10">
                                <p className="text-[10px] text-muted-foreground/40 italic mb-4 font-mono uppercase tracking-tighter">{t('pricing.powered_by')}</p>
                                <Button asChild className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-black font-black transition-all">
                                    <Link to="/get-access">{t('pricing.cta_starter')}</Link>
                                </Button>
                            </div>
                        </div>

                        {/* 2. SME GROWTH (Mobile 2nd, Desktop Row 1 Col 2) */}
                        <div className="md:col-span-2 md:order-2 p-8 rounded-2xl border border-primary/30 bg-[#121212] flex flex-col relative z-10 shadow-xl shadow-primary/5 hover:border-primary/60 transition-all">
                            <div className="absolute -top-3 right-4 bg-[#FF0080] px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow-lg z-20">{t('pricing.popular')}</div>
                            <div className="mb-4">
                                <h3 className="text-xl font-black uppercase text-white">{t('pricing.growth_title')}</h3>
                                <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">{t('pricing.growth_badge')}</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black text-white">{t('pricing.growth_price')}<span className="text-xs font-normal text-muted-foreground ml-1">{t('pricing.per_month')}</span></p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2 text-gray-300 font-medium"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_everything_starter')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-300 font-medium"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_checkins')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-300 font-medium"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_strategy')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-300 font-medium"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_simulation')}</li>
                                <li className="text-sm flex items-center gap-2 text-destructive font-bold"><ShieldCheck className="w-4 h-4 text-destructive" /> 16th Pillar Check</li>
                            </ul>
                            <div className="pt-6 border-t border-border/10">
                                <p className="text-[10px] text-muted-foreground/40 italic mb-4 font-mono uppercase tracking-tighter">{t('pricing.powered_by')}</p>
                                <Button asChild className="w-full bg-primary text-black hover:bg-primary/90 font-black shadow-lg shadow-primary/20">
                                    <Link to="/get-access">{t('pricing.cta_growth')}</Link>
                                </Button>
                            </div>
                        </div>

                        {/* 4. SME SCALE (Mobile 4th, Desktop Row 1 Col 3) */}
                        <div className="md:col-span-2 md:order-3 p-8 rounded-2xl border border-border/50 bg-[#121212] flex flex-col relative z-10 hover:border-primary/30 transition-all group">
                            <div className="mb-4">
                                <h3 className="text-xl font-black uppercase text-white">{t('pricing.scale_title')}</h3>
                                <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">{t('pricing.scale_badge')}</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-3xl font-black text-white">{t('pricing.scale_price')}<span className="text-xs font-normal text-muted-foreground ml-1">{t('pricing.per_month')}</span></p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_everything_growth')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_pulse')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_neural')}</li>
                                <li className="text-sm flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-4 h-4 text-primary" /> {t('pricing.feature_priority')}</li>
                            </ul>
                            <div className="pt-6 border-t border-border/10">
                                <p className="text-[10px] text-muted-foreground/40 italic mb-4 font-mono uppercase tracking-tighter">{t('pricing.powered_by')}</p>
                                <Button asChild className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-black font-black transition-all">
                                    <Link to="/get-access">{t('pricing.cta_scale')}</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Segment Header for Row 2: Investors */}
                        <div className="md:col-span-6 flex items-center gap-4 mb-2 md:-mb-16 z-20 mt-12 md:mt-0 md:order-4">
                            <div className="px-4 py-1.5 bg-primary/20 border border-primary/40 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                                {t('pricing.investors_badge')}
                            </div>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>

                        {/* 3. ENTERPRISE TIER (Mobile 3rd, Desktop Row 2 Col 2-3) */}
                        <div className="md:col-start-2 md:col-span-2 md:order-5 p-10 rounded-[2.5rem] border-2 border-primary bg-[#121212] flex flex-col relative z-20 shadow-[0_0_60px_rgba(255,215,0,0.15)] ring-1 ring-primary/20 md:scale-[1.12] overflow-visible group">
                            <div className="bg-primary text-black text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl whitespace-nowrap z-30 border border-black/10 w-fit mx-auto -mt-14 mb-8">{t('pricing.recommended_investors')}</div>

                            {/* Visual Glow Layer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none rounded-[2.5rem]"></div>

                            <div className="mb-8 mt-4 relative z-10">
                                <h3 className="text-4xl font-black uppercase mb-1 text-primary tracking-tighter">{t('pricing.enterprise_title')}</h3>
                                <p className="text-xs text-primary/80 font-bold tracking-[0.3em] uppercase">{t('pricing.enterprise_badge')}</p>
                            </div>

                            <div className="mb-10 relative z-10">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-6xl font-black text-white">$10,000</p>
                                    <span className="text-[#FF0080] font-black text-xs animate-pulse">L-7 AUTH</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 uppercase font-bold tracking-widest bg-white/5 w-fit px-2 py-1 rounded">{t('pricing.per_audit')}</p>
                            </div>

                            <ul className="space-y-6 mb-12 flex-1 relative z-10">
                                <li className="flex items-start gap-4 text-gray-100 font-bold text-lg leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30 shadow-lg shadow-primary/20"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_ma')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold text-lg leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30 shadow-lg shadow-primary/20"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_revenue')}</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-100 font-bold text-lg leading-tight">
                                    <div className="bg-primary/20 p-1.5 rounded-full shrink-0 border border-primary/30 shadow-lg shadow-primary/20"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span>{t('pricing.feature_neural_scan')}</span>
                                </li>
                            </ul>

                            <Button asChild className="w-full bg-primary text-black font-black hover:bg-white hover:scale-105 transition-all h-20 text-xl shadow-[0_15px_30px_rgba(255,215,0,0.3)] relative z-10">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">{t('pricing.cta_enterprise')}</a>
                            </Button>
                        </div>

                        {/* 5. FRANCHISE TIER (Mobile 5th, Desktop Row 2 Col 4-5) */}
                        <div className="md:col-start-4 md:col-span-2 md:order-6 p-8 rounded-2xl border border-border/50 bg-[#121212] flex flex-col relative z-10 hover:border-primary/30 transition-all opacity-80 hover:opacity-100 group">
                            <div className="mb-6 pointer-events-none">
                                <h3 className="text-2xl font-black uppercase mb-1 text-white">{t('pricing.franchise_title')}</h3>
                                <p className="text-xs text-primary font-bold tracking-[0.2em] uppercase font-mono">{t('pricing.franchise_badge')}</p>
                            </div>
                            <div className="mb-10">
                                <p className="text-4xl font-black text-white">Custom</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{t('pricing.annual_license')}</p>
                            </div>
                            <ul className="space-y-6 mb-12 flex-1">
                                <li className="text-sm flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-5 h-5 text-primary/70" /> {t('pricing.feature_multi_outlet')}</li>
                                <li className="text-sm flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-5 h-5 text-primary/70" /> {t('pricing.feature_fraud')}</li>
                                <li className="text-sm flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors"><ShieldCheck className="w-5 h-5 text-primary/70" /> {t('pricing.feature_royalty')}</li>
                            </ul>
                            <div className="pt-8 border-t border-border/20">
                                <Button asChild variant="outline" className="w-full border-primary/50 text-white font-black hover:bg-primary hover:text-black transition-all h-14 uppercase tracking-widest">
                                    <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">{t('pricing.cta_franchise')}</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* NEW: Pilot Program Scarcity Block */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-destructive/5 to-background border-y border-destructive/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/10 blur-[100px] rounded-full"></div>
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive text-white text-xs font-black uppercase tracking-widest rounded mb-6 animate-pulse">
                        ⚠ {t('pricing.pilot_header')}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
                        {t('pricing.pilot_offer')}
                    </h2>
                    <div className="p-6 md:p-8 bg-black/50 border border-destructive/50 rounded-2xl backdrop-blur-md shadow-2xl max-w-2xl mx-auto">
                        <div className="flex items-start gap-4 text-left">
                            <div className="bg-destructive/20 p-2 rounded-lg shrink-0">
                                <TrendingDown className="w-6 h-6 text-destructive" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-400 text-lg mb-2 uppercase tracking-wide">Limited Intake Window</h3>
                                <p className="text-muted-foreground mb-4">
                                    {t('pricing.pilot_catch')}
                                </p>
                                <div className="h-px w-full bg-white/10 my-4"></div>
                                <h3 className="font-bold text-white text-lg mb-2 uppercase tracking-wide">Risk Reversal</h3>
                                <p className="text-gray-300 italic">
                                    "{t('pricing.pilot_guarantee')}"
                                </p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button asChild size="lg" className="w-full bg-destructive hover:bg-destructive/90 text-white font-black text-xl h-14 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
                                <a href="https://calendly.com/gustidevitto/15min" target="_blank" rel="noopener noreferrer">
                                    CLAIM PILOT SPOT (1/3 LEFT)
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            < section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20" >
                <div className="container mx-auto max-w-4xl text-center">
                    <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('guarantee_section.title')}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        <Trans i18nKey="guarantee_section.p1">
                            I don't sell empty hopes. If FFD™ v3 dashboard says your business is <strong className="text-green-500">healthy (green)</strong>, the consultation is over. Free. No pitch whatsoever.
                        </Trans>
                    </p>
                    <p className="text-muted-foreground">
                        {t('guarantee_section.p2')}
                    </p>
                </div>
            </section >

            {/* Scientific Attribution Section */}
            <section className="py-16 px-4 md:px-8 border-y border-border/50 bg-muted/20">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black tracking-[0.2em] w-fit mx-auto border border-primary/20 backdrop-blur-sm uppercase">
                        {t('attribution.title')}
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed font-serif max-w-3xl mx-auto">
                        {t('attribution.text')}
                    </p>
                </div>
            </section>

            {/* FAQ / Objection Handling */}
            < section className="py-20 px-4 md:px-8 container mx-auto max-w-4xl" >
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">{t('faq.title')}</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1" className="border border-border/50 bg-card/30 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left">{t('faq.q1')}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {t('faq.a1')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border border-border/50 bg-card/30 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left">{t('faq.q2')}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {t('faq.a2')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border border-border/50 bg-card/30 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left">{t('faq.q3')}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {t('faq.a3')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border border-border/50 bg-card/30 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left">{t('faq.q4')}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {t('faq.a4')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="border border-border/50 bg-card/30 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline font-bold text-left">{t('faq.q5')}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {t('faq.a5')}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">{t('faq.still_confused')}</p>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/contact">{t('faq.chat_wa')}</Link>
                    </Button>
                </div>
            </section >

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/20 to-background">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <Trans i18nKey="final_cta.title">
                            Ready to <span className="text-primary">Stop the Bleeding</span>?
                        </Trans>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        <Trans i18nKey="final_cta.p1">
                            Your business data is speaking. <br />
                            <strong className="text-foreground">Are you ready to hear the truth?</strong>
                        </Trans>
                    </p>
                    <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto italic">
                        {t('final_cta.quote')}
                    </p>
                    <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground group">
                        <Link to="/get-access">
                            <span className="flex items-center font-black">
                                {t('final_cta.cta')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        <Clock className="w-4 h-4 inline mr-1" />
                        <Trans i18nKey="final_cta.footer">
                            Self-diagnosis takes 15 mins. <strong className="text-foreground">Available 24/7.</strong> Instant result.
                        </Trans>
                    </p>
                </div>
            </section>
        </div >
    )
}
