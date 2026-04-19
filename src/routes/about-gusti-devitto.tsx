import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/about-gusti-devitto')({
    component: AboutGustiDevitto,
})

function AboutGustiDevitto() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white relative">
            {/* SEO */}
            <title>{t('about_ssot.seo_title')}</title>
            <meta name="description" content={t('about_ssot.seo_desc')} />
            <link rel="canonical" href="https://gustidevitto.com/about-gusti-devitto" />
            
            {/* HERO / THE REALITY */}
            <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden pb-24 md:pb-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/aboutme.jpg"
                        alt="Gusti Devitto"
                        className="w-full h-full object-cover object-[50%_20%] opacity-45 grayscale-[0.2] contrast-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/90 to-[#1c1c1e]/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1e]/80 via-transparent to-[#1c1c1e]/25" />
                </div>

                <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-[30vh]">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-8 h-px bg-[#0A84FF]/40" />
                            <p className="text-[10px] text-white/40 font-bold tracking-[0.3em] uppercase">
                                {t('about_ssot.hero_badge')}
                            </p>
                        </div>
                        
                        <div className="space-y-6 text-[1.35rem] md:text-3xl text-white/90 leading-relaxed font-light">
                            <p className="font-semibold text-white tracking-tight">{t('about_ssot.p1_hook')}</p>
                            <p className="font-semibold text-white tracking-tight">{t('about_ssot.p2_hook')}</p>
                            <div className="h-4"></div>
                            <p className="text-white/60" dangerouslySetInnerHTML={{ __html: t('about_ssot.p3_context') }}></p>
                            <p className="text-white/60">{t('about_ssot.p4_context')}</p>
                            <p className="text-white/60">{t('about_ssot.p5_context')}</p>
                            <div className="h-2"></div>
                            <p className="text-[#0A84FF] font-semibold">{t('about_ssot.p6_answer')}</p>
                            <p className="text-white/60" dangerouslySetInnerHTML={{ __html: t('about_ssot.p7_desc') }}></p>
                            
                            <div className="border-l-2 border-[#0A84FF]/40 pl-6 my-10 py-2">
                                <p className="text-white/60 text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: t('about_ssot.p8_quote1') }}></p>
                                <p className="text-white/60 text-lg md:text-xl mt-4" dangerouslySetInnerHTML={{ __html: t('about_ssot.p8_quote2') }}></p>
                            </div>

                            <p className="text-white/60">{t('about_ssot.p9_danger')}</p>
                            <p className="text-white/60">{t('about_ssot.p10_compounding')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE POSITIONING STATEMENT */}
            <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-white/[0.05] bg-[#161618]">
                <div className="max-w-4xl mx-auto relative glass rounded-squircle-lg p-8 md:p-16 border border-white/[0.05]">
                   <div className="space-y-8 text-xl leading-relaxed text-white/60 font-light">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            {t('about_ssot.pos_title')}
                        </h2>
                        <p className="text-2xl md:text-3xl font-medium text-white leading-snug tracking-tight">
                            {t('about_ssot.pos_sub')}
                        </p>
                        <div className="w-12 h-px bg-white/20 my-8"></div>
                        <p dangerouslySetInnerHTML={{ __html: t('about_ssot.pos_p1') }}></p>
                        <p>
                            {t('about_ssot.pos_p2')}
                        </p>
                        <p>
                            {t('about_ssot.pos_p3')}
                        </p>
                   </div>
                </div>
            </section>

            {/* HOW THIS WORKS (COMPARISON TABLE) */}
            <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-white/[0.05]">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="w-8 h-px bg-white/20" />
                        <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] text-center">{t('about_ssot.table_title')}</h2>
                        <div className="w-8 h-px bg-white/20" />
                    </div>
                    
                    <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
                        <table className="w-full text-left min-w-[760px] border-collapse relative bg-[#161618] rounded-lg overflow-hidden border border-white/5">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="p-6 text-white/40 font-bold text-xs uppercase tracking-wider w-1/3">{t('about_ssot.th_accounting')}</th>
                                    <th className="p-6 text-white/40 font-bold text-xs uppercase tracking-wider w-1/3 border-l border-white/5 bg-white/[0.01]">{t('about_ssot.th_ai')}</th>
                                    <th className="p-6 text-[#0A84FF] font-bold text-xs uppercase tracking-wider w-1/3 border-l border-white/5 bg-[#0A84FF]/[0.02]">{t('about_ssot.th_me')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[15px]">
                                <tr className="border-b border-white/5">
                                    <td className="p-6 text-white/60 align-top leading-relaxed">{t('about_ssot.tr1_td1')}</td>
                                    <td className="p-6 text-white/60 align-top leading-relaxed border-l border-white/5 bg-white/[0.01]">{t('about_ssot.tr1_td2')}</td>
                                    <td className="p-6 text-white font-medium align-top leading-relaxed border-l border-white/5 bg-[#0A84FF]/[0.02]">{t('about_ssot.tr1_td3')}</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-6 text-white/60 align-top leading-relaxed">{t('about_ssot.tr2_td1')}</td>
                                    <td className="p-6 text-white/60 align-top leading-relaxed border-l border-white/5 bg-white/[0.01]">{t('about_ssot.tr2_td2')}</td>
                                    <td className="p-6 text-white font-medium align-top leading-relaxed border-l border-white/5 bg-[#0A84FF]/[0.02]">{t('about_ssot.tr2_td3')}</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-white/60 align-top leading-relaxed">{t('about_ssot.tr3_td1')}</td>
                                    <td className="p-6 text-white/60 align-top leading-relaxed border-l border-white/5 bg-white/[0.01]">{t('about_ssot.tr3_td2')}</td>
                                    <td className="p-6 text-white font-medium align-top leading-relaxed border-l border-white/5 bg-[#0A84FF]/[0.02]">{t('about_ssot.tr3_td3')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* WHO I WORK WITH & CTA */}
            <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-white/[0.05] bg-[#161618]">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 justify-center mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" />
                            <h2 className="text-xs font-bold text-[#0A84FF] uppercase tracking-[0.2em] mt-0.5">{t('about_ssot.who_title')}</h2>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" />
                        </div>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                            {t('about_ssot.who_p1_1')}<br />
                            <strong className="text-white font-bold tracking-wider mt-2 block">{t('about_ssot.who_p1_2')}</strong>
                        </p>
                        <div className="h-6"></div>
                        <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed border border-white/10 p-8 rounded-squircle-md glass">
                            {t('about_ssot.who_p2_1')}<br/>
                            {t('about_ssot.who_p2_2')}<br/><br/>
                            <strong className="text-white text-2xl font-serif italic">{t('about_ssot.who_p2_3')}</strong>
                        </p>
                    </div>

                    <div className="pt-16 mt-8 border-t border-white/[0.05]">
                        <h3 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">{t('about_ssot.cta_title')}</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="xl" className="bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90 font-bold px-8 h-14 rounded-squircle-sm">
                                <Link to="/fip-lite">{t('about_ssot.cta_btn_scan')}</Link>
                            </Button>
                            <Button asChild size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-8 h-14 rounded-squircle-sm bg-transparent">
                                <Link to="/contact">{t('about_ssot.cta_btn_call')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
