
import { ShieldAlert } from "lucide-react"
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
        },
        {
            id: "FIP-9920-Z",
            titleKey: "case_files.case2_title",
            descKey: "case_files.case2_desc",
            impactKey: "case_files.case2_impact",
            sector: t('case_files.sector_retail', "Retail Fashion"),
            status: "RESOLVED",
            type: t('case_files.type_phantom_labor', "Phantom Labor"),
        },
        {
            id: "FIP-7714-A",
            titleKey: "case_files.case3_title",
            descKey: "case_files.case3_desc",
            impactKey: "case_files.case3_impact",
            sector: t('case_files.sector_automotive', "Automotive Service"),
            status: "RESOLVED",
            type: t('case_files.type_pricing_leakage', "Pricing Leakage"),
        }
    ]

    return (
        <section className="py-24 px-4 md:px-8 border-b border-white/[0.05] relative bg-[#03060a]">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500 mb-4">
                        {t('case_files.badge', "Case Files")}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white/90">
                        {t('case_files.title')}
                    </h2>
                    <p className="text-lg text-white/50 font-light mt-4">
                        {t('case_files.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {cases.map((file, idx) => (
                        <div key={idx} className="bg-white/[0.01] border border-white/[0.05] flex flex-col hover:bg-white/[0.03] transition-colors">
                            {/* Card Header */}
                            <div className="p-6 border-b border-white/[0.05]">
                                <div className="flex justify-between items-center mb-6 text-[10px] font-mono tracking-widest uppercase">
                                    <span className="text-white/30">{file.id}</span>
                                    <span className="text-amber-500/80 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-500/80 rounded-full"></span>
                                        {file.status}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">
                                        {file.sector} &middot; {file.type}
                                    </p>
                                    <h3 className="text-xl font-bold text-white/90 leading-snug">
                                        <Trans i18nKey={file.titleKey} />
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-8">
                                <p className="text-sm leading-relaxed text-white/50 font-light">
                                    <Trans i18nKey={file.descKey} />
                                </p>

                                <div className="pt-6 border-t border-white/[0.05]">
                                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">{t('case_files.label_impact', 'Impact Verified')}</p>
                                    <p className="text-lg font-mono text-white/90">
                                        <Trans i18nKey={file.impactKey} />
                                    </p>
                                </div>
                            </div>
                        </div>
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
