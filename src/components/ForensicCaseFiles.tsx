
import { Lock, ShieldAlert, TrendingDown, Users, AlertTriangle } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ForensicCaseFiles() {
    const { t } = useTranslation()

    const cases = [
        {
            id: "FIP-8821-X",
            titleKey: "case_files.case1_title",
            descKey: "case_files.case1_desc",
            impactKey: "case_files.case1_impact",
            sector: "F&B Chain",
            status: "RESOLVED",
            type: "Inventory Fraud",
            icon: TrendingDown,
            color: "text-red-500",
            borderColor: "border-red-500/20",
            bg: "bg-red-500/5"
        },
        {
            id: "FIP-9920-Z",
            titleKey: "case_files.case2_title",
            descKey: "case_files.case2_desc",
            impactKey: "case_files.case2_impact",
            sector: "Retail Fashion",
            status: "RESOLVED",
            type: "Phantom Labor",
            icon: Users,
            color: "text-orange-500",
            borderColor: "border-orange-500/20",
            bg: "bg-orange-500/5"
        },
        {
            id: "FIP-7714-A",
            titleKey: "case_files.case3_title",
            descKey: "case_files.case3_desc",
            impactKey: "case_files.case3_impact",
            sector: "Automotive Service",
            status: "RESOLVED",
            type: "Pricing Leakage",
            icon: AlertTriangle,
            color: "text-yellow-500",
            borderColor: "border-yellow-500/20",
            bg: "bg-yellow-500/5"
        }
    ]

    return (
        <section className="py-24 px-4 md:px-8 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02]" />
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Lock className="w-3 h-3 text-primary" />
                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-primary">
                            {t('case_files.badge')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                        {t('case_files.title')}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('case_files.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cases.map((file, idx) => (
                        <Card key={idx} className={`bg-[#0a0a0a] border ${file.borderColor} relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}>
                            {/* Abstract Cyber Pattern */}
                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                <file.icon className={`w-24 h-24 ${file.color} rotate-12 transform translate-x-8 -translate-y-8`} />
                            </div>

                            <CardHeader className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className={`font-mono text-[10px] ${file.color} ${file.borderColor} bg-transparent`}>
                                        {file.id}
                                    </Badge>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-green-500 uppercase tracking-wider">{file.status}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{file.sector} // {file.type}</p>
                                    <CardTitle className="text-xl font-bold font-sans">
                                        <Trans i18nKey={file.titleKey} />
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <CardDescription className="text-sm leading-relaxed text-muted-foreground/80 font-medium">
                                    <Trans i18nKey={file.descKey} />
                                </CardDescription>

                                <div className={`p-4 rounded-xl ${file.bg} border ${file.borderColor}`}>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Impact Verified</p>
                                    <p className={`text-lg font-black ${file.color}`}>
                                        <Trans i18nKey={file.impactKey} />
                                    </p>
                                </div>
                            </CardContent>

                            {/* Hover Scan Effect */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-scan-fast" />
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                        <ShieldAlert className="w-3 h-3" />
                        {t('case_files.disclaimer')}
                    </div>
                </div>
            </div>
        </section>
    )
}
