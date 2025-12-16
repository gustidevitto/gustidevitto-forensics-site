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
    return (
        <div className="container py-20 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Hubungi Kami</h1>
                        <p className="text-muted-foreground text-lg">
                            Jangan biarkan masalah bisnis berlarut-larut. Diskusikan situasi Anda dengan tim kami secara rahasia.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">Kantor Pusat</h3>
                                <p className="text-muted-foreground">Jl. Jendral Sudirman No. Kav 52-53<br />Jakarta Selatan, 12190</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-foreground">konsultasi@gustidevitto.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">WhatsApp (Admin)</h3>
                                <p className="text-muted-foreground">+62 812 3456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Formulir Kontak</CardTitle>
                        <CardDescription>Kami akan merespons dalam 1x24 jam kerja.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">Nama Depan</Label>
                                    <Input id="first-name" placeholder="Budi" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Nama Belakang</Label>
                                    <Input id="last-name" placeholder="Santoso" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="budi@contoh.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Pesan / Masalah yang Dihadapi</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Ceritakan sedikit tentang bisnis Anda dan tantangan 'phantom cost' yang mungkin Anda alami..."
                                    className="min-h-[120px]"
                                />
                            </div>
                            <Button className="w-full">Kirim Pesan</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
