import type { MarginAuditInputs } from '../types/fip-lite';

/**
 * FIP™ Operational Efficiency Engine
 */

/**
 * Lense A: Labor Decay (The Friction Factor)
 * Applies a non-linear coordination tax as the team size increases.
 */
export function calculateEffectiveProductivity(rawGPPerHour: number, teamSize: number): { effectiveGPPerHour: number, coordinationTaxPercent: number } {
    // CoordinationTax coefficient: 1.5% per employee
    const taxFactor = teamSize * 0.015;
    const coordinationTaxPercent = Math.min(0.8, taxFactor) * 100;
    const effectiveGPPerHour = rawGPPerHour * (1 - Math.min(0.8, taxFactor));
    
    return {
        effectiveGPPerHour,
        coordinationTaxPercent
    };
}

export function calculateMarginMetrics(inputs: MarginAuditInputs) {
    const gpLeakagePercent = inputs.revenue > 0 ? ((inputs.actualCogs - inputs.idealCogs) / inputs.revenue) * 100 : 0;
    const grossProfit = inputs.revenue - inputs.actualCogs - inputs.labor;
    const grossProfitPercent = inputs.revenue > 0 ? (grossProfit / inputs.revenue) * 100 : 0;
    
    // GP BEFORE Labor Costs
    const gpBeforeLabor = grossProfit + inputs.labor;
    const rawGPPerHour = inputs.workingHours > 0 ? gpBeforeLabor / inputs.workingHours : 0;
    
    const { effectiveGPPerHour, coordinationTaxPercent } = calculateEffectiveProductivity(rawGPPerHour, inputs.headcount);

    return {
        grossProfit,
        grossProfitPercent,
        gpLeakagePercent,
        rawGPPerHour,
        effectiveGPPerHour,
        coordinationTaxPercent
    };
}
