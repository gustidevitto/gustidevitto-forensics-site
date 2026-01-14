import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation, Trans } from 'react-i18next'

// @ts-ignore
export const Route = createFileRoute('/privacy')({
    component: Privacy,
})

function Privacy() {
    const { t } = useTranslation()
    return (
        <div className="container py-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('privacy.title')}</h1>
            <Card>
                <CardContent className="p-8 prose dark:prose-invert max-w-none">
                    <h3>{t('privacy.section1_title')}</h3>
                    <p>
                        {t('privacy.section1_desc')}
                        <ul>
                            <li>{t('privacy.section1_item1')}</li>
                            <li>{t('privacy.section1_item2')}</li>
                            <li>{t('privacy.section1_item3')}</li>
                        </ul>
                    </p>

                    <h3>{t('privacy.section2_title')}</h3>
                    <p>
                        {t('privacy.section2_desc')}
                        <ul>
                            <li>{t('privacy.section2_item1')}</li>
                            <li>{t('privacy.section2_item2')}</li>
                            <li>{t('privacy.section2_item3')}</li>
                            <li>{t('privacy.section2_item4')}</li>
                        </ul>
                    </p>

                    <h3>{t('privacy.section3_title')}</h3>
                    <p>
                        <Trans i18nKey="privacy.section3_desc1">
                            We uphold professional ethical codes. <strong className="text-foreground">All financial data and client trade secrets are STRICTLY CONFIDENTIAL.</strong>
                        </Trans>
                        <br /><br />
                        {t('privacy.section3_desc2')}
                    </p>

                    <h3>{t('privacy.section4_title')}</h3>
                    <p>
                        {t('privacy.section4_desc')}
                    </p>

                    <h3>{t('privacy.section5_title')}</h3>
                    <p>
                        {t('privacy.section5_desc')}
                        <ul>
                            <li>{t('privacy.section5_item1')}</li>
                            <li>{t('privacy.section5_item2')}</li>
                            <li>{t('privacy.section5_item3')}</li>
                        </ul>
                    </p>

                    <h3>{t('privacy.section6_title')}</h3>
                    <p>
                        <Trans i18nKey="privacy.section6_desc">
                            If you have questions regarding this privacy policy or the management of your data, please contact us via the <a href="/contact" className="text-primary hover:underline">Contact</a> page.
                        </Trans>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
