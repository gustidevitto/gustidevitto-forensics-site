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
        <div className="flex-1 flex flex-col bg-[#060a12] text-white relative min-h-[calc(100vh-4rem)]">
            <title>{t('contact_page.title')} | Gusti Devitto Forensics</title>

            {/* ═══ HERO — Split layout with human anchor ═══ */}
            <section className="flex-1 flex flex-col lg:flex-row">

                {/* Left — Photo + Info, bleeds full height */}
                <div className="relative lg:w-[45%] min-h-[40vh] lg:min-h-full overflow-hidden">
                    <img
                        src="/assets/images/devitto-forensics.jpg"
                        alt="Gusti Devitto"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[0.4] contrast-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/60 to-[#060a12]/20 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#060a12]" />

                    {/* Content overlay */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-end h-full">
                        <div className="space-y-8 max-w-md">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-amber-400/60" />
                                <p className="text-[10px] text-white/30 font-medium tracking-[0.3em] uppercase">
                                    Direct Line
                                </p>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.95] uppercase">
                                {t('contact_page.title')}
                            </h1>

                            <p className="text-white/40 text-base leading-relaxed font-light">
                                {t('contact_page.subtitle')}
                            </p>

                            {/* Contact details — monospace, not icon-decorated */}
                            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                                <div>
                                    <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em] mb-1">{t('contact_page.office_title')}</p>
                                    <p className="text-sm text-white/50" dangerouslySetInnerHTML={{ __html: t('contact_page.office_address') }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em] mb-1">{t('contact_page.email_title')}</p>
                                    <p className="text-sm text-white/50 font-mono">gustidevitto@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em] mb-1">{t('contact_page.wa_title')}</p>
                                    <p className="text-sm text-white/50 font-mono">+62 889 544 0515</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Form, minimal chrome */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-20">
                    <div className="w-full max-w-md space-y-10">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{t('contact_page.form_title')}</h2>
                            <p className="text-sm text-white/30">{t('contact_page.form_subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('contact_page.label_first_name')}</label>
                                    <Input
                                        id="first-name"
                                        name="first-name"
                                        placeholder={t('contact_page.placeholder_first_name')}
                                        required
                                        className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('contact_page.label_last_name')}</label>
                                    <Input
                                        id="last-name"
                                        name="last-name"
                                        placeholder={t('contact_page.placeholder_last_name')}
                                        required
                                        className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('contact_page.label_email')}</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={t('contact_page.placeholder_email')}
                                    required
                                    className="h-12 bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('contact_page.label_message')}</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder={t('contact_page.placeholder_message')}
                                    className="min-h-[120px] bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-0 rounded-none resize-none"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full h-14 bg-amber-500 text-black hover:bg-white font-bold uppercase tracking-widest text-xs rounded-none transition-colors group">
                                <span className="flex items-center gap-3">
                                    {t('contact_page.cta_whatsapp')}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </form>

                        {/* Footer metadata */}
                        <div className="pt-6 border-t border-white/[0.06]">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                                    End-to-End Encrypted // WhatsApp Direct
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
