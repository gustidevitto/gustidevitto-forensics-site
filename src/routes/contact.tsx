import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/contact')({
    component: Contact,
})

function Contact() {
    const { t } = useTranslation()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = `${formData.get('first-name')} ${formData.get('last-name')}`
        const email = formData.get('email')
        const message = formData.get('message')
        const whatsappMessage = t('global.whatsapp_template', { name, email, message })
        const whatsappUrl = `https://wa.me/628895440515?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative min-h-[calc(100vh-4rem)]">
            <title>{t('contact_page.title')} | Gusti Devitto Forensics</title>

            <section className="flex-1 flex flex-col lg:flex-row">
                {/* Left — Photo anchor */}
                <div className="relative lg:w-[45%] min-h-[40vh] lg:min-h-full overflow-hidden">
                    <img
                        src="/assets/images/devitto-forensics.jpg"
                        alt="Gusti Devitto"
                        className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale-[0.4] contrast-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/60 to-[#1c1c1e]/15 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#1c1c1e]" />

                    <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-end h-full">
                        <div className="space-y-8 max-w-md">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-[#0A84FF]/40" />
                                <p className="text-[10px] text-white/40 font-medium tracking-[0.3em] uppercase">Direct Line</p>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[0.95] uppercase">
                                {t('contact_page.title')}
                            </h1>
                            <p className="text-white/40 text-base leading-relaxed font-light">
                                {t('contact_page.subtitle')}
                            </p>

                            {/* Contact details */}
                            <div className="space-y-5 pt-4 border-t border-white/[0.05]">
                                {[
                                    { labelKey: 'contact_page.office_title', val: t('contact_page.office_address'), isHtml: true },
                                    { labelKey: 'contact_page.email_title', val: 'gustidevitto@gmail.com' },
                                    { labelKey: 'contact_page.wa_title', val: '+62 889 544 0515' },
                                ].map(({ labelKey, val, isHtml }) => (
                                    <div key={labelKey}>
                                        <p className="text-[10px] font-semibold text-[#0A84FF]/55 uppercase tracking-[0.2em] mb-1">{t(labelKey)}</p>
                                        {isHtml
                                            ? <p className="text-sm text-white/60" dangerouslySetInnerHTML={{ __html: val }} />
                                            : <p className="text-sm text-white/60">{val}</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Form */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-20">
                    <div className="w-full max-w-md space-y-10">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{t('contact_page.form_title')}</h2>
                            <p className="text-sm text-white/40 font-light">{t('contact_page.form_subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                                        {t('contact_page.label_first_name')}
                                    </label>
                                    <Input
                                        id="first-name"
                                        name="first-name"
                                        placeholder={t('contact_page.placeholder_first_name')}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                                        {t('contact_page.label_last_name')}
                                    </label>
                                    <Input
                                        id="last-name"
                                        name="last-name"
                                        placeholder={t('contact_page.placeholder_last_name')}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                                    {t('contact_page.label_email')}
                                </label>
                                <Input id="email" name="email" type="email" placeholder={t('contact_page.placeholder_email')} required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                                    {t('contact_page.label_message')}
                                </label>
                                <Textarea id="message" name="message" placeholder={t('contact_page.placeholder_message')} className="min-h-[120px]" required />
                            </div>
                            <Button type="submit" size="lg" className="w-full group">
                                <span className="flex items-center gap-3">
                                    {t('contact_page.cta_whatsapp')}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                                </span>
                            </Button>
                        </form>

                        {/* Encryption badge */}
                        <div className="pt-5 border-t border-white/[0.05]">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse-slow" />
                                <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.18em]">
                                    End-to-End Encrypted · WhatsApp Direct
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
