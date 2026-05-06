import { GrowthScanInputs, GrowthScanResult } from '../types/fip-lite';

/**
 * FIP™ Unit Economics Engine
 */

export function calculateGrowthMetrics(inputs: GrowthScanInputs): GrowthScanResult {
    const variableCosts = inputs.materials + inputs.fees + inputs.returns;
    const cm = inputs.revenue - variableCosts;
    const contributionMarginPercent = inputs.revenue > 0 ? (cm / inputs.revenue) * 100 : 0;
    
    const cmRatio = contributionMarginPercent / 100;
    const breakEvenPoint = cmRatio > 0 ? inputs.opex / cmRatio : 0;
    
    const cac = inputs.newCustomers > 0 ? inputs.marketing / inputs.newCustomers : 0;
    
    // Correction: CAC Payback denominator = Net Contribution Margin Per New Customer
    const netMarginPerNewCustomer = inputs.newCustomers > 0 ? cm / inputs.newCustomers : 0;
    const cacPayback = netMarginPerNewCustomer > 0 ? cac / netMarginPerNewCustomer : 99;
    
    const ltvCacRatio = cac > 0 ? inputs.ltv / cac : 99;

    const viabilityVerdict = ltvCacRatio < 2 ? 'critical' : ltvCacRatio < 3 ? 'warning' : 'fortress';
    const deathSpiralRisk = viabilityVerdict === 'critical' && inputs.revenue < breakEvenPoint;

    // Revenue gap from break-even
    const revenueGapPercent = breakEvenPoint > 0 ? ((inputs.revenue - breakEvenPoint) / breakEvenPoint) * 100 : 0;

    return {
        layer1: { contributionMarginPercent, breakEvenPoint, cac, ltvCacRatio, cacPayback },
        layer2: { viabilityVerdict, deathSpiralRisk },
        layer3: { pillars: [] } // Handled by engine orchestration
    };
}
