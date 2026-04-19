import { ShieldCheck } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

export function ForensicCaseFiles() {
    const { t } = useTranslation()

    const cases = [
        {
            id: "FIP-8821-X",
            titleKey: "case_files.case1_title",
            descKey: "case_files.case1_desc",
            impactKey: "case_files.case1_impact",
            sector: t('case_files.sector_fb_chain', "F&B Chain"),
            status: "RESOLVED",
            type: t('case_files.type_inventory_fraud', "Inventory Fraud"),
            accentColor: "text-[#0A84FF]",
            dotColor: "bg-[#0A84FF]",
        },
        {
            id: "FIP-9920-Z",
            titleKey: "case_files.case2_title",
            descKey: "case_files.case2_desc",
            impactKey: "case_files.case2_impact",
            sector: t('case_files.sector_retail', "Retail Fashion"),
            status: "RESOLVED",
            type: t('case_files.type_phantom_labor', "Phantom Labor"),
            accentColor: "text-[#5E5CE6]",
            dotColor: "bg-[#5E5CE6]",
        },
        {
            id: "FIP-7714-A",
            titleKey: "case_files.case3_title",
            descKey: "case_files.case3_desc",
            impactKey: "case_files.case3_impact",
            sector: t('case_files.sector_automotive', "Automotive Service"),
            status: "RESOLVED",
            type: t('case_files.type_pricing_leakage', "Pricing Leakage"),
            accentColor: "text-[#FF9F0A]",
            dotColor: "bg-[#FF9F0A]",
        }
    ]

    return (
        <section className="py-24 px-4 md:px-8 border-b border-white/[0.05] relative bg-[#161618]">
            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section header */}
                <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
                    <p className="text-xs font-semibold text-[#82C7A8] uppercase tracking-[0.2em] mb-3">
                        {t('case_files.badge', "Case Files")}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">
                        {t('case_files.title')}
                    </h2>
                    <p className="text-lg text-white/40 font-light mt-4 leading-relaxed">
                        {t('case_files.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                    {cases.map((file, idx) => (
                        <div key={idx} className="glass rounded-squircle-lg flex flex-col hover:glass-elevated transition-all duration-300 group">
                            {/* Card Header */}
                            <div className="p-6 border-b border-white/[0.05]">
                                <div className="flex justify-between items-center mb-5 text-[10px] font-medium tracking-widest uppercase">
                                    <span className="text-white/40">{file.id}</span>
                                    <span className={`${file.accentColor} flex items-center gap-1.5`}>
                                        <span className={`w-1.5 h-1.5 ${file.dotColor} rounded-full animate-pulse-slow`}></span>
                                        {file.status}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-semibold uppercase text-white/40 tracking-widest">
                                        {file.sector} · {file.type}
                                    </p>
                                    <h3 className="text-lg font-bold text-white/90 leading-snug">
                                        <Trans i18nKey={file.titleKey} />
                                    </h3>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between gap-8">
                                <p className="text-sm leading-relaxed text-white/60 font-light">
                                    <Trans i18nKey={file.descKey} />
                                </p>

                                <div className="pt-5 border-t border-white/[0.05]">
                                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-1">
                                        {t('case_files.label_impact', 'Impact Verified')}
                                    </p>
                                    <p className={`text-lg font-bold ${file.accentColor}`}>
                                        <Trans i18nKey={file.impactKey} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-2 text-[10px] text-white/40 font-medium uppercase tracking-widest glass-subtle px-4 py-2 rounded-squircle-sm">
                        <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                        {t('case_files.disclaimer')}
                    </div>
                </div>
            </div>
        </section>
    )
}
