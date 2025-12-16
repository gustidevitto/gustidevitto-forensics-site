import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/get-access')({
    component: GatingComponent,
})

function GatingComponent() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Simulate API Call & Storage
        const leadData = {
            ...formData,
            timestamp: new Date().toISOString(),
            id: crypto.randomUUID()
        }

        // Store in LocalStorage (Mock API)
        const existingLeads = JSON.parse(localStorage.getItem('LEAD_STORAGE_MOCK_API') || '[]')
        existingLeads.push(leadData)
        localStorage.setItem('LEAD_STORAGE_MOCK_API', JSON.stringify(existingLeads))

        // Set Session Token
        const sessionToken = btoa(JSON.stringify({ user: leadData.email, exp: Date.now() + 3600000 }))
        localStorage.setItem('pcc_session_token', sessionToken)

        // Redirect
        navigate({ to: '/calculator' })
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
            <Card className="w-full max-w-md shadow-2xl border-primary/20">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Unlock the Calculator</CardTitle>
                    <CardDescription>
                        Tidak ada yang perlu diunduh. Dapatkan hasil perhitungan akurat Anda secara instan di website ini.
                        Mohon isi data untuk melanjutkan akses kalkulator.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Gusti Devitto"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="08123456789"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Bisnis</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="nama@perusahaan.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="w-full text-lg font-bold py-6 mt-4">
                            Lanjutkan ke Kalkulator &rarr;
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
