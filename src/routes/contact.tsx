import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from 'lucide-react'

export const Route = createFileRoute('/contact')({
    component: Contact,
})

function Contact() {
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
                        <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
                        <p className="text-muted-foreground text-lg">
                            Diskusikan kebutuhan forensik bisnis Anda dengan tim ahli kami.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Kantor Pusat</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Plamongan Indah H7<br />
                                    Semarang, 59567
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Email</h3>
                                <p className="text-muted-foreground">gustidevitto@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-secondary dark:text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">WhatsApp</h3>
                                <p className="text-muted-foreground">+62 889 544 0515</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Formulir Kontak (Direct WA)</CardTitle>
                        <CardDescription>Pesan akan langsung terhubung ke WhatsApp Admin.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">Nama Depan</Label>
                                    <Input id="first-name" name="first-name" placeholder="Budi" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Nama Belakang</Label>
                                    <Input id="last-name" name="last-name" placeholder="Santoso" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="budi@contoh.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Pesan / Masalah yang Dihadapi</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Ceritakan sedikit tentang bisnis Anda dan tantangan 'phantom cost' yang mungkin Anda alami..."
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold">
                                Kirim ke WhatsApp
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
