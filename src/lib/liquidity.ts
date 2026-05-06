import type { CashAutopsyInputs, FIPLiteInputs } from '../types/fip-lite';

/**
 * FIP™ Liquidity & Solvency Engine
 */

export function calculateRunway(cash: number, revenue: number, outflow: number): number {
    const netBurnRateValue = outflow - revenue;
    return netBurnRateValue <= 0 
        ? 9999 // Infinite/Stable
        : Math.floor((cash / netBurnRateValue) * 30);
}

/**
 * Lense B: Volatility Buffer Stress Test
 * Calculates runway under a 15% OpEx spike scenario.
 */
export function runLiquidityStressTest(inputs: CashAutopsyInputs | FIPLiteInputs) {
    const revenue = 'monthlyRevenue' in inputs ? inputs.monthlyRevenue : inputs.revenue;
    const cash = 'currentCash' in inputs ? inputs.currentCash : inputs.cash;
    const opex = 'monthlyOpEx' in inputs ? inputs.monthlyOpEx : inputs.opex;
    const cogs = 'monthlyCOGS' in inputs ? inputs.monthlyCOGS : ('cogs' in inputs ? inputs.cogs : 0);
    const debt = 'monthlyDebtService' in inputs ? inputs.monthlyDebtService : ('shortDebt' in inputs ? inputs.shortDebt : 0);

    const stressedOpex = opex * 1.15;
    const totalStressedOutflow = cogs + stressedOpex + debt;
    const stressedNetBurn = Math.max(0, totalStressedOutflow - revenue);
    
    const stressedRunwayDays = stressedNetBurn <= 0 ? 9999 : Math.floor((cash / stressedNetBurn) * 30);
    
    return {
        isVulnerable: stressedRunwayDays < 90,
        stressedRunwayDays,
        stressedNetBurn
    };
}
