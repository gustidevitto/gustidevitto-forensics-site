import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

interface Tier {
    id: string;
    name: string;
    tagline: string;
    positioning: string;
    color: string;
    pricing: {
        oneTime: number;
        quarterly: { total: number; perAudit: number; audits: number; };
        annual: { total: number; perAudit: number; audits: number; access: boolean; };
    };
    features: {
        included: string[];
        excluded: string[];
    };
    bestFor: string[];
}

interface PricingModalProps {
    tier: Tier;
    commitmentType: 'one-time' | 'quarterly' | 'annual';
    onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ tier, commitmentType, onClose }) => {
    const { t } = useTranslation();
    const getPricingDetails = (): { title: string; commitment: string; total: number; perAudit: number; savings: number; features: string[] } => {
        switch (commitmentType) {
            case 'one-time':
                return {
                    title: t('pricing_modal.one_time_title', 'One-Time Audit'),
                    commitment: t('pricing_modal.one_time_commitment', '1 comprehensive audit'),
                    total: tier.pricing.oneTime,
                    perAudit: tier.pricing.oneTime,
                    savings: 0,
                    features: tier.features.included,
                };
            case 'quarterly':
                return {
                    title: t('pricing_modal.quarterly_title', 'Quarterly Program'),
                    commitment: t('pricing_modal.quarterly_commitment', '{{count}} audits over 9 months', { count: tier.pricing.quarterly.audits }),
                    total: tier.pricing.quarterly.total,
                    perAudit: tier.pricing.quarterly.perAudit,
                    savings: tier.pricing.oneTime * 3 - tier.pricing.quarterly.total,
                    features: tier.features.included,
                };
            case 'annual':
                return {
                    title: t('pricing_modal.annual_title', 'Annual Partnership'),
                    commitment: t('pricing_modal.annual_commitment', '{{count}} audits over 12 months', { count: tier.pricing.annual.audits }),
                    total: tier.pricing.annual.total,
                    perAudit: tier.pricing.annual.perAudit,
                    savings: tier.pricing.oneTime * 4 - tier.pricing.annual.total,
                    features: [
                        ...tier.features.included,
                        t('pricing_modal.feature_access', 'Continuous access: unlimited consultation'),
                        t('pricing_modal.feature_priority', 'Priority scheduling & strategic calls')
                    ],
                };
        }
    };

    const details = getPricingDetails();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 text-white border border-primary/20 shadow-lg shadow-primary/10 p-8 rounded-lg max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-white">&times;</button>

                <h2 className="text-3xl font-bold text-primary">{tier.name}</h2>
                <p className="text-lg font-bold uppercase tracking-wider">{details.title}</p>

                <div className="my-6 border-y border-white/10 py-4">
                    <p><span className="font-bold">{t('pricing_modal.label_commitment', 'Commitment')}:</span> {details.commitment}</p>
                    <p><span className="font-bold">{t('pricing_modal.label_total', 'Total Investment')}:</span> ${details.total.toLocaleString()}</p>
                    {details.savings > 0 && (
                        <p className="text-green-400 font-bold">{t('pricing_modal.label_savings', 'Total Savings')}: ${details.savings.toLocaleString()}</p>
                    )}
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">{t('pricing_modal.label_included', "What's Included")}:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {details.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 text-center">
                    <Button size="lg" className="bg-primary text-black hover:bg-white w-full md:w-auto">{t('pricing_modal.cta_schedule', 'SCHEDULE DISCOVERY CALL')}</Button>
                </div>
            </div>
        </div>
    );
};

export default PricingModal;