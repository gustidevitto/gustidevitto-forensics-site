import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export const Route = createFileRoute('/get-access')({
    component: GetAccess,
})

function GetAccess() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        // Simulating API Call / Lead Capture
        // In real app, send this data to Supabase/Email service
        console.log('Lead Captured:', data)
        localStorage.setItem('LEAD_STORAGE_MOCK_API', JSON.stringify(data))

        // Create Session Token
        const sessionToken = 'access-' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('pcc_session_token', sessionToken)

        // Artificial Delay for UX
        setTimeout(() => {
            setIsLoading(false)
            navigate({ to: '/calculator' })
        }, 800)
    }

    return (
        <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[calc(100vh-4rem)]">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary/90" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    Gusti Devitto Forensics
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Biaya paling mahal dalam bisnis adalah ketidaktahuan. Phantom Cost Calculator membuka mata saya tentang kebocoran 15% profit setiap bulan."
                        </p>
                        <footer className="text-sm">Budi Santoso - CEO Retailindo</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Kalkulator Forensik</h1>
                        <p className="text-sm text-muted-foreground">
                            Masukkan detail Anda untuk akses kalkulator premium (Gratis).
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Akses Kalkulator</CardTitle>
                            <CardDescription>Data Anda aman. Kami tidak melakukan spam.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input id="name" name="name" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Nomor WhatsApp</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="081234567890" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Bisnis</Label>
                                    <Input id="email" name="email" type="email" placeholder="nama@perusahaan.com" required />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Memproses..." : "Buka Kalkulator"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
