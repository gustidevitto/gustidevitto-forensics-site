import React from 'react';

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
    const getPricingDetails = () => {
        switch (commitmentType) {
            case 'one-time':
                return {
                    title: 'One-Time Audit',
                    commitment: '1 comprehensive audit',
                    total: tier.pricing.oneTime,
                    perAudit: tier.pricing.oneTime,
                    savings: 0,
                    features: tier.features.included,
                };
            case 'quarterly':
                return {
                    title: 'Quarterly Program',
                    commitment: `${tier.pricing.quarterly.audits} audits over 9 months`,
                    total: tier.pricing.quarterly.total,
                    perAudit: tier.pricing.quarterly.perAudit,
                    savings: tier.pricing.oneTime * 3 - tier.pricing.quarterly.total,
                    features: tier.features.included,
                };
            case 'annual':
                return {
                    title: 'Annual Partnership',
                    commitment: `${tier.pricing.annual.audits} audits over 12 months`,
                    total: tier.pricing.annual.total,
                    perAudit: tier.pricing.annual.perAudit,
                    savings: tier.pricing.oneTime * 4 - tier.pricing.annual.total,
                    features: [
                        ...tier.features.included,
                        'Continuous access: unlimited consultation',
                        'Priority scheduling & strategic calls'
                    ],
                };
            default:
                return {};
        }
    };

    const details = getPricingDetails();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 text-white border border-primary/20 shadow-lg shadow-primary/10 p-8 rounded-lg max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-white">&times;</button>
                
                <h2 className="text-3xl font-black text-primary">{tier.name}</h2>
                <p className="text-lg font-bold uppercase tracking-wider">{details.title}</p>
                
                <div className="my-6 border-y border-white/10 py-4">
                    <p><span className="font-bold">Commitment:</span> {details.commitment}</p>
                    <p><span className="font-bold">Total Investment:</span> ${details.total.toLocaleString()}</p>
                    {details.savings > 0 && (
                        <p className="text-green-400 font-bold">Total Savings: ${details.savings.toLocaleString()}</p>
                    )}
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">What's Included:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {details.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 text-center">
                    <Button size="lg" className="bg-primary text-black hover:bg-white w-full md:w-auto">SCHEDULE DISCOVERY CALL</Button>
                </div>
            </div>
        </div>
    );
};

export default PricingModal;