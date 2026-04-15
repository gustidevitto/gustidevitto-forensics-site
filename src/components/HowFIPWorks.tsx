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
            desc: t('investasi.how_it_works.phase1_desc_upgrade'),
            icon: <Zap className="w-5 h-5 text-[#0A84FF]" strokeWidth={1.5} />,
            status: 'active'
        },
        {
            id: 2,
            title: t('investasi.how_it_works.phase2_title'),
            actor: t('investasi.how_it_works.phase2_actor'),
            desc: t('investasi.how_it_works.phase2_desc_upgrade'),
            icon: <Users className="w-5 h-5 text-[#0A84FF]/70" strokeWidth={1.5} />,
            status: 'upcoming'
        },
        {
            id: 3,
            title: t('investasi.how_it_works.phase3_title'),
            actor: t('investasi.how_it_works.phase3_actor'),
            desc: t('investasi.how_it_works.phase3_desc_upgrade'),
            icon: <Cpu className="w-5 h-5 text-[#0A84FF]/50" strokeWidth={1.5} />,
            status: 'upcoming'
        },
        {
            id: 4,
            title: t('investasi.how_it_works.phase4_title'),
            actor: t('investasi.how_it_works.phase4_actor'),
            desc: t('investasi.how_it_works.phase4_desc_upgrade'),
            icon: <ShieldCheck className="w-5 h-5 text-[#0A84FF]/40" strokeWidth={1.5} />,
            status: 'upcoming'
        }
    ];

    return (
        <section className="py-24 px-4 md:px-8 border-t border-white/[0.05] bg-[#1c1c1e]">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                        <Trans
                            i18nKey="investasi.how_it_works.section_title"
                            defaults="The Path to <span>Sovereign Intelligence</span>"
                            components={{ 1: <span className='text-[#0A84FF]' /> }}
                        />
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        {t('investasi.how_it_works.section_subtitle')}
                    </p>
                </div>

                {/* Phase cards */}
                <div className="grid md:grid-cols-4 gap-4">
                    {phases.map((phase, idx) => (
                        <div key={phase.id} className="relative group">
                            {/* Connector line */}
                            {idx < phases.length - 1 && (
                                <div className="hidden md:block absolute top-[22%] left-[80%] w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0 pointer-events-none" />
                            )}

                            <div className="relative z-10 p-7 rounded-squircle-lg glass hover:glass-elevated transition-all duration-300 h-full flex flex-col">
                                {/* Icon container — squircle, glass-blue */}
                                <div className="w-10 h-10 rounded-squircle-sm glass-blue flex items-center justify-center mb-5">
                                    {phase.icon}
                                </div>
                                <div className="mb-3">
                                    <span className="text-[10px] font-semibold text-[#0A84FF] tracking-[0.25em] uppercase block mb-1">
                                        Step 0{phase.id}
                                    </span>
                                    <h3 className="text-base font-bold uppercase text-white leading-tight">
                                        {phase.title}
                                    </h3>
                                </div>
                                <div className="text-[10px] font-semibold text-[#BFA26A]/70 uppercase mb-3 tracking-widest glass-gold px-2.5 py-1 rounded-squircle-sm inline-block w-fit">
                                    {phase.actor}
                                </div>
                                <p className="text-sm text-white/40 leading-relaxed font-light">
                                    "{phase.desc}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Strategic note */}
                <div className="mt-12 p-7 rounded-squircle-xl glass-gold border-[#BFA26A]/15 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-white/60 leading-relaxed">
                        <Trans
                            i18nKey="investasi.how_it_works.tesla_principle"
                            defaults="Strategic Note: we apply the <span>Tesla Principle</span>. Every diagnosis strengthens the FIP™ patterns, making your system smarter every day."
                            components={{ 1: <span className="text-[#BFA26A] font-semibold" /> }}
                        />
                    </p>
                </div>
            </div>
        </section>
    );
};
