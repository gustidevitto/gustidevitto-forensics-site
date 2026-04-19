import { createFileRoute } from '@tanstack/react-router'

import { useTranslation, Trans } from 'react-i18next'

// @ts-ignore
export const Route = createFileRoute('/terms')({
    component: Terms,
})

function Terms() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col bg-[#1c1c1e] text-white">
            <div className="container py-24 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-10">{t('terms.title')}</h1>
            <div className="glass-elevated rounded-squircle-xl p-8 md:p-12 space-y-8">
                    <h3>{t('terms.section1_title')}</h3>
                    <p>
                        {t('terms.section1_desc')}
                    </p>

                    <h3>{t('terms.section2_title')}</h3>
                    <p>
                        {t('terms.section2_desc')}
                        <ul className="list-disc list-inside">
                            <li>{t('terms.section2_item1')}</li>
                            <li>{t('terms.section2_item2')}</li>
                            <li>{t('terms.section2_item3')}</li>
                        </ul>
                    </p>

                    <h3>{t('terms.section3_title')}</h3>
                    <div className="space-y-4">
                        <p>
                            <Trans i18nKey="terms.section3_item1">
                                <strong className="text-foreground">Tier 1 (Instant Diagnosis)</strong>: Full payment (100%) must be made in advance before the session is scheduled.
                            </Trans>
                        </p>
                        <p>
                            <Trans i18nKey="terms.section3_item2">
                                <strong className="text-foreground">Tier 2 (Surgical Blueprint)</strong>: Full payment (100%) must be made in advance to secure a slot and begin the data review process.
                            </Trans>
                        </p>
                        <p>
                            <Trans i18nKey="terms.section3_item3">
                                <strong className="text-foreground">Tier 3 (Turnaround Protocol)</strong>: Skema pembayaran dapat didiskusikan (Termin), namun deposit 50% wajib dibayarkan sebelum kick-off project.
                            </Trans>
                        </p>
                    </div>

                    <h3>{t('terms.section4_title')}</h3>
                    <div className="space-y-4">
                        <div>
                            <strong className="text-foreground block mb-2">{t('terms.section4_refund_title')}</strong>
                            <ul className="list-disc list-inside">
                                <li>{t('terms.section4_refund_item1')}</li>
                                <li>{t('terms.section4_refund_item2')}</li>
                                <li>{t('terms.section4_refund_item3')}</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-foreground block mb-2">{t('terms.section4_reschedule_title')}</strong>
                            <ul className="list-disc list-inside">
                                <li>{t('terms.section4_reschedule_item1')}</li>
                            </ul>
                        </div>
                    </div>

                    <h3>{t('terms.section5_title')}</h3>
                    <p>
                        {t('terms.section5_desc')}
                    </p>

                    <h3>{t('terms.section6_title')}</h3>
                    <p>
                        {t('terms.section6_desc')}
                    </p>
            </div>
        </div>
        </div>
    )
}
