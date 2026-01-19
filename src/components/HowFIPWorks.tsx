import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Cpu, Users, Zap, ShieldCheck } from 'lucide-react';

export const HowFIPWorks: React.FC = () => {
    const { t } = useTranslation();

    const phases = [
        {
            id: 1,
            title: t('investasi.how_it_works.phase1_title'),
            actor: t('investasi.how_it_works.phase1_actor'),
            desc: t('investasi.how_it_works.phase1_desc'),
            icon: <Zap className="w-6 h-6 text-primary" />,
            status: 'active'
        },
        {
            id: 2,
            title: t('investasi.how_it_works.phase2_title'),
            actor: t('investasi.how_it_works.phase2_actor'),
            desc: t('investasi.how_it_works.phase2_desc'),
            icon: <Users className="w-6 h-6 text-primary/80" />,
            status: 'upcoming'
        },
        {
            id: 3,
            title: t('investasi.how_it_works.phase3_title'),
            actor: t('investasi.how_it_works.phase3_actor'),
            desc: t('investasi.how_it_works.phase3_desc'),
            icon: <Cpu className="w-6 h-6 text-primary/60" />,
            status: 'upcoming'
        },
        {
            id: 4,
            title: t('investasi.how_it_works.phase4_title'),
            actor: t('investasi.how_it_works.phase4_actor'),
            desc: t('investasi.how_it_works.phase4_desc'),
            icon: <ShieldCheck className="w-6 h-6 text-primary/40" />,
            status: 'upcoming'
        }
    ];

    return (
        <section className="py-24 px-4 md:px-8 border-t border-white/5 bg-[#080808]">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                        <Trans
                            i18nKey="investasi.how_it_works.section_title"
                            defaults="The Path to <span className='text-primary'>Sovereign Intelligence</span>"
                            components={{ 1: <span className='text-primary' /> }}
                        />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic leading-relaxed">
                        {t('investasi.how_it_works.section_subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-4 md:gap-8">
                    {phases.map((phase, idx) => (
                        <div key={phase.id} className="relative group">
                            {/* Connector Line */}
                            {idx < phases.length - 1 && (
                                <div className="hidden md:block absolute top-[20%] left-[80%] w-full h-[1px] border-t border-dashed border-primary/20 z-0" />
                            )}

                            <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-[#121212]/50 group-hover:border-primary/30 transition-all h-full flex flex-col">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                                    {phase.icon}
                                </div>
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase block mb-1">Step 0{phase.id}</span>
                                    <h3 className="text-xl font-black uppercase text-white leading-tight">{phase.title}</h3>
                                </div>
                                <div className="text-xs font-black text-primary/70 uppercase mb-4 tracking-widest bg-primary/5 px-2 py-1 rounded inline-block w-fit">
                                    {phase.actor}
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed italic">
                                    "{phase.desc}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-[2rem] bg-primary/5 border border-primary/20 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                        <Trans
                            i18nKey="investasi.how_it_works.tesla_principle"
                            defaults="Strategic Note: we apply the <span className='text-primary font-bold'>Tesla Principle</span>. Every diagnosis strengthens the FIP™ patterns, making your system smarter every day."
                            components={{ 1: <span className="text-primary font-bold" /> }}
                        />
                    </p>
                </div>
            </div>
        </section>
    );
};
