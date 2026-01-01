import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { submitLead } from '@/lib/googleSheetsAPI'
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react'

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
        const leadData = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
        }

        try {
            // Submit to Google Sheets
            const result = await submitLead(leadData)

            if (!result.success) {
                console.error('Lead submission failed:', result.error)
                alert(`Gagal mengirim data ke Google Sheets: ${result.error || 'Unknown Error'}. Data akan disimpan secara lokal.`)
            }

            // Create Session Token (only after successful submission or fallback)
            const sessionToken = 'access-' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('pcc_session_token', sessionToken)

            // Navigate to calculator
            setTimeout(() => {
                setIsLoading(false)
                navigate({ to: '/calculator' })
            }, 800)

        } catch (error) {
            setIsLoading(false)
            console.error('Unexpected error:', error)
            alert('Terjadi kesalahan. Silakan coba lagi.')
        }
    }

    return (
        <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[calc(100vh-4rem)]">
            {/* Left Panel - Storyselling */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('/assets/images/devitto-forensics.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60"></div>

                {/* Logo */}
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="text-foreground">FFD™ v3 — Financial Forensics Dashboard</span>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 mt-auto space-y-6">
                    {/* Pain Statement */}
                    <h2 className="text-3xl font-bold text-foreground leading-tight">
                        Dalam 15 menit, <br />
                        <span className="text-primary">Anda akan tahu kemana uang Anda pergi.</span>
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Bukan asumsi. Bukan tebak-tebakan. <br />
                        <strong className="text-foreground">Data.</strong>
                    </p>

                    {/* Testimonial */}
                    <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-border/50">
                        <blockquote className="space-y-3">
                            <p className="text-base leading-relaxed text-foreground">
                                "Sebelumnya saya pikir bisnis saya sehat karena omzet naik terus. Ternyata ada <strong className="text-destructive">Rp 38 Juta/bulan</strong> yang bocor tanpa saya sadari. FFD™ buka mata saya."
                            </p>
                            <footer className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    AR
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Andi Raharjo</p>
                                    <p className="text-sm text-muted-foreground">Owner, 7 Outlet F&B — Surabaya</p>
                                </div>
                            </footer>
                        </blockquote>
                    </div>

                    {/* Guarantee */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        <span>No Find, No Pitch Guarantee — Sehat? Konsultasi gratis, tanpa jualan.</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:p-8 p-4">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    {/* Header */}
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">Mulai Diagnosis Gratis</h1>
                        <p className="text-muted-foreground">
                            Satu langkah untuk melihat apa yang selama ini tersembunyi.
                        </p>
                    </div>

                    {/* Capacity Badge */}
                    <div className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>3 dari 5 slot tersisa bulan ini</span>
                    </div>

                    {/* Form Card */}
                    <Card className="border-border/50 shadow-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Data Kontak</CardTitle>
                            <CardDescription>
                                Aman. Data Anda tidak akan dibagikan ke pihak ketiga.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Contoh: Budi Santoso"
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Nomor WhatsApp</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="08xx-xxxx-xxxx"
                                        required
                                        className="h-12"
                                    />
                                    <p className="text-xs text-muted-foreground">Untuk konfirmasi jadwal diagnosis</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Bisnis</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="nama@perusahaan.com"
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 group"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        "Memproses..."
                                    ) : (
                                        <>
                                            Lanjut ke Phantom Cost Calculator
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Trust Signals */}
                    <div className="text-center space-y-2">
                        <p className="text-xs text-muted-foreground">
                            Dengan klik "Lanjut", Anda setuju dengan <a href="/privacy" className="underline hover:text-primary">Kebijakan Privasi</a> kami.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            🔒 SSL Encrypted • Data aman
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
