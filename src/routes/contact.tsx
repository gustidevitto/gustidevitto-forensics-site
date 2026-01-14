import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from 'lucide-react'
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

        const whatsappMessage = `Halo Gusti Devitto Forensics,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
        const whatsappUrl = `https://wa.me/628895440515?text=${encodeURIComponent(whatsappMessage)}`

        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="container py-20 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{t('contact_page.title')}</h1>
                        <p className="text-muted-foreground text-lg">
                            {t('contact_page.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">{t('contact_page.office_title')}</h3>
                                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('contact_page.office_address') }} />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">{t('contact_page.email_title')}</h3>
                                <p className="text-muted-foreground">gustidevitto@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">{t('contact_page.wa_title')}</h3>
                                <p className="text-muted-foreground">+62 889 544 0515</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('contact_page.form_title')}</CardTitle>
                        <CardDescription>{t('contact_page.form_subtitle')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">{t('contact_page.label_first_name')}</Label>
                                    <Input id="first-name" name="first-name" placeholder={t('contact_page.placeholder_first_name')} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">{t('contact_page.label_last_name')}</Label>
                                    <Input id="last-name" name="last-name" placeholder={t('contact_page.placeholder_last_name')} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('contact_page.label_email')}</Label>
                                <Input id="email" name="email" type="email" placeholder={t('contact_page.placeholder_email')} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">{t('contact_page.label_message')}</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder={t('contact_page.placeholder_message')}
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold">
                                {t('contact_page.cta_whatsapp')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
