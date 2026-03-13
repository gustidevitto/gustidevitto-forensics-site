import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { submitLead } from '@/lib/googleSheetsAPI'
import { ArrowRight } from 'lucide-react'
import { useTranslation, Trans } from 'react-i18next'

export const Route = createFileRoute('/get-access')({
    component: GetAccess,
})

function GetAccess() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const leadData = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
        }

        try {
            const result = await submitLead(leadData)

            if (!result.success) {
                console.error('Lead submission failed:', result.error)
                alert(t('contact_page.alert_failed', { error: result.error || 'Unknown Error' }))
            }

            const sessionToken = 'access-' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('pcc_session_token', sessionToken)

            setTimeout(() => {
                setIsLoading(false)
                navigate({ to: '/fip-lite' })
            }, 800)

        } catch (error) {
            setIsLoading(false)
            console.error('Unexpected error:', error)
            alert(t('contact_page.alert_error'))
        }
    }

    return (
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative min-h-[calc(100vh-4rem)]">
            <title>{t('get_access.seo_title')}</title>
            <meta name="description" content={t('get_access.seo_desc')} />

            {/* JSON-LD Service Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": t('get_access.schema_service_type'),
                    "provider": {
                        "@id": "https://www.gustidevitto.com/#organization"
                    },
                    "name": t('get_access.schema_pcc_name'),
                    "description": t('pilar_detail.schema_service_desc'),
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "IDR",
                        "availability": "https://schema.org/InStock",
                        "validFor": "2026"
                    },
                    "areaServed": "ID"
                })}
            </script>

            {/* ═══ FULL-HEIGHT SPLIT ═══ */}
            <section className="flex-1 flex flex-col lg:flex-row">

                {/* Left Panel — Photo + Testimonial, bleeds full height */}
                <div className="relative hidden lg:flex lg:w-[50%] overflow-hidden">
                    <img
                        src="/assets/images/devitto-forensics.jpg"
                        alt="Gusti Devitto Forensics"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[0.3] contrast-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#060a12]/60 via-transparent to-[#060a12]" />

                    {/* Content — bottom-anchored */}
                    <div className="relative z-10 mt-auto p-12 lg:p-16 space-y-8 max-w-lg">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
                            <Trans i18nKey="get_access.pain_title">In 15 minutes, <br /> <span className="text-amber-500">you will know where your money goes.</span></Trans>
                        </h2>

                        <p className="text-white/40 text-base leading-relaxed font-light">
                            <Trans i18nKey="get_access.hero_text">Not assumptions. Not guessing. <br /> <strong className="text-white">Data.</strong></Trans>
                        </p>

                        {/* Testimonial — inline quote, not a card */}
                        <blockquote className="border-l-2 border-amber-500/30 pl-6 py-2 space-y-3">
                            <p className="text-white/70 text-sm leading-relaxed italic">
                                <Trans i18nKey="get_access.testimonial_text">Previously, I thought my business was healthy because turnover kept rising. Turns out there was <strong className="text-red-400 font-mono">$2,500/month</strong> leaking without me realizing it. FIP™ Protocol opened my eyes.</Trans>
                            </p>
                            <footer className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                    {t('get_access.testimonial_name')} — {t('get_access.testimonial_role')}
                                </div>
                            </footer>
                        </blockquote>

                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {t('get_access.guarantee')}
                        </div>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-20">
                    <div className="w-full max-w-md space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-2xl font-black tracking-tight">{t('get_access.form_title')}</h1>
                            <p className="text-sm text-white/30">{t('get_access.form_subtitle')}</p>
                        </div>

                        {/* Capacity — monospace inline, not pill badge */}
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-amber-500/80 uppercase tracking-widest">
                                {t('get_access.slots_left', { count: 3 })}
                            </span>
                        </div>

                        {/* Form — minimal, no Card wrapper */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('get_access.label_name')}</label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={t('get_access.placeholder_name')}
                                    required
                                    className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('get_access.label_phone')}</label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={t('get_access.placeholder_phone')}
                                    required
                                    className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                />
                                <p className="text-[10px] text-white/20 font-mono">{t('get_access.phone_desc')}</p>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('get_access.label_email')}</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={t('get_access.placeholder_email')}
                                    required
                                    className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-14 bg-amber-500 text-black hover:bg-white font-bold uppercase tracking-widest text-xs rounded-none transition-colors group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="font-mono animate-pulse">{t('get_access.cta_processing')}</span>
                                ) : (
                                    <span className="flex items-center gap-3">
                                        {t('get_access.cta_run')}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        {/* Trust */}
                        <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                            <p className="text-[10px] text-white/20 font-mono">
                                <Trans i18nKey="get_access.privacy_policy">By clicking "Continue", you agree to our <a href="/privacy" className="underline hover:text-amber-500 transition-colors">Privacy Policy</a>.</Trans>
                            </p>
                            <p className="text-[10px] text-white/15 font-mono">{t('get_access.ssl_text')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
