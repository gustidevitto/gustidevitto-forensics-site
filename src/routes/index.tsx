import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowRight, Lock, Globe, Zap } from "lucide-react"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handlePathSelection = (path: 'multi' | 'network') => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredPath', path)
        }
    }

    if (!mounted) return null

    return (
        <div className="h-screen w-full bg-[#0a1628] text-white font-sans flex items-center justify-center overflow-hidden selection:bg-primary selection:text-black relative p-6 md:p-12 lg:p-20">
            {/* SEO Overlay */}
            <title>GUSTI DEVITTO™ — Forensic Business Practice</title>

            {/* Ambient Background Elements with Pulsating Gold Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                {/* LEFT SIDE: Brand & Identity */}
                <div className="space-y-10 animate-fade-in-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                        <Lock className="w-3 h-3 text-primary" />
                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-primary">L-9 SECURE ACCESS // ID_VERIFIED</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
                            GUSTI <br />
                            DEVITTO<span className="text-primary italic">™</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-primary"></div>
                            <p className="text-xs md:text-sm text-white/40 font-bold tracking-[0.3em] uppercase">
                                Forensic Business Practice
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Initialization Prompt:</p>
                        <p className="text-base md:text-lg text-white border-l-2 border-primary/50 pl-6 py-2 leading-relaxed max-w-md font-bold">
                            Choose your scale to initiate forensic reconnaissance.
                        </p>
                        <p className="text-xs text-white/40 italic leading-relaxed max-w-xs font-medium pl-6">
                            Proprietary diagnostic protocols for high-stakes business operations.
                        </p>
                    </div>

                    {/* Metadata Footer (Left Side) - Hidden on mobile to save space */}
                    <div className="hidden lg:flex flex-col gap-4 pt-12 border-t border-white/5 opacity-30">
                        <div className="flex gap-8 text-[9px] font-black tracking-widest uppercase">
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40">PROTOCOL</span>
                                <span className="text-primary">FIP™ V4.00</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40">REGION</span>
                                <span>SEA_IDN</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40">AUTHORITY</span>
                                <span>SOVEREIGN_INTEL</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Vertical Segment Selection */}
                <div className="flex flex-col gap-6 animate-fade-in-right">

                    {/* Option 1: Multi-Outlet (SME) */}
                    <Link
                        to="/multi-outlet"
                        onClick={() => handlePathSelection('multi')}
                        className="group relative h-[250px] md:h-[280px] flex flex-col justify-end p-8 border border-white/10 bg-zinc-900/40 hover:border-primary/50 transition-all duration-500 rounded-2xl overflow-hidden backdrop-blur-sm"
                    >
                        {/* Background Thumbnail */}
                        <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700">
                            <img src="/assets/images/forensic_dashboard.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">For businesses with 3-20 locations</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">Multi-Outlet</h3>
                                <p className="text-sm text-white/60 font-medium">Profit Protection & Leakage Diagnosis</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                Initialize Protocol <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    {/* Option 2: Enterprise (Network Intelligence) */}
                    <Link
                        to="/network-intelligence"
                        onClick={() => handlePathSelection('network')}
                        className="group relative h-[250px] md:h-[280px] flex flex-col justify-end p-8 border border-white/10 bg-zinc-900/40 hover:border-red-500/50 transition-all duration-500 rounded-2xl overflow-hidden backdrop-blur-sm"
                    >
                        {/* Background Thumbnail */}
                        <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700">
                            <img src="/assets/images/network_monitoring.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">For businesses with 21-500+ locations</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-red-500 transition-colors">Enterprise</h3>
                                <p className="text-sm text-white/60 font-medium">Systemic Fraud & Network Intelligence</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                Initiate Intelligence <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Absolute Footer Credential */}
            <div className="absolute bottom-8 left-12 md:left-20 right-12 md:right-20 flex justify-between items-center opacity-10 pointer-events-none">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">NON_DISCLOSURE_ENABLED</span>
                <div className="h-px flex-1 mx-8 bg-white/20 hidden md:block"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">© 2026 GUSTI DEVITTO</span>
            </div>
        </div>
    )
}
