import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign, Clock, Target, BadgeCheck, Activity, Microscope, Search, Brain } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation()
    const [currentSlide, setCurrentSlide] = useState(0)
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
                    <div className="pt-4 border-t border-border/50">
                        <p className="text-sm italic text-muted-foreground">
                            {t('hero.visual.quote')}
                        </p>
                        <p className="text-sm font-medium mt-2">{t('hero.visual.author')}</p>
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
                {JSON.stringify({
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
                })}
            </script>
            {/* Hero Section - The Split-Gate */}
            <section id="owners" className="relative grid place-items-center lg:grid-cols-2 gap-8 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="flex flex-col gap-6 max-w-2xl animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black tracking-[0.2em] w-fit border border-primary/20 backdrop-blur-sm uppercase">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t('hero.badge')}</span>
                    </div>

                    {/* Headline - Institutional Grade */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.9] uppercase">
                        {t('hero.title1')} <br />
                        {t('hero.title2')} <br />
                        <span className="text-primary tracking-tighter">{t('hero.subtitle')}</span>
                    </h1>

                    {/* Subheadline - Dual Segment Logic */}
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                        {t('hero.desc', { brand: 'FFD™ v3' })}
                    </p>

                    {/* CTA - Side-by-Side Dual Logic */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" className="text-lg h-16 px-10 shadow-lg shadow-primary/30 bg-yellow-500 hover:bg-yellow-600 text-black font-black group relative overflow-hidden flex-1">
                            <Link to="/get-access">
                                <span className="relative z-10 flex items-center justify-center">
                                    {t('hero.cta_free')}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-16 px-10 border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 text-amber-500 font-bold flex-1">
                            <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">
                                {t('hero.cta_enterprise')}
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
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">87+</div>
                        <div className="text-sm text-muted-foreground">{t('proof.businesses_diagnosed')}</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">15 min</div>
                        <div className="text-sm text-muted-foreground">{t('proof.mri_time')}</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">Zero</div>
                        <div className="text-sm text-muted-foreground">{t('proof.accounting_jargon')}</div>
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
                                <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">{t('pricing.cta_enterprise')}</a>
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
                                    <a href="https://calendly.com/gustidevitto" target="_blank" rel="noopener noreferrer">{t('pricing.cta_franchise')}</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

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
