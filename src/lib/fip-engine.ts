import type {
    FIPLiteFormData,
    HealthScoreResult,
    PillarResult,
    PillarCategory
} from '@/types/fip-lite';

/**
 * FIP™ Lite - Calculation Engine
 * Processes 16-pillar diagnostic data to generate business health scores.
 */

export function calculateFIPLiteResults(formData: FIPLiteFormData): HealthScoreResult {
    const pillars: PillarResult[] = [];

    // --- STEP 1: REVENUE & PROFITABILITY ---
    const { step1 } = formData;

    // 1. Net Profit per Transaction
    const netProfitPerTx = step1.totalTransactions > 0
        ? (step1.totalRevenue - step1.totalCosts) / step1.totalTransactions
        : 0;
    pillars.push(createPillar({
        id: 'net-profit-per-tx',
        name: 'Net Profit per Transaction',
        category: 'revenue-profitability',
        value: netProfitPerTx,
        benchmark: 50000, // Example: Rp 50k benchmark
        scoring: (val) => val > 75000 ? 100 : val > 30000 ? 70 : 30,
        recommendation: netProfitPerTx < 30000 ? 'Increase average order value or optimize unit costs.' : 'Maintain yield discipline.'
    }));

    // 2. Gross Profit Leakage
    const gpLeakage = Math.max(0, step1.theoreticalGrossProfit - step1.actualGrossProfit);
    pillars.push(createPillar({
        id: 'gp-leakage',
        name: 'Gross Profit Leakage',
        category: 'revenue-profitability',
        value: gpLeakage,
        benchmark: 2, // 2% leakage is normal
        scoring: (val) => val <= 2 ? 100 : val <= 5 ? 60 : 20,
        recommendation: gpLeakage > 5 ? 'Audit point-of-sale and inventory shrinkage vectors.' : 'Leakage is within acceptable margin.'
    }));

    // 3. OPEX to GP Ratio
    const opexToGPRatio = step1.grossProfit > 0 ? (step1.operatingExpenses / step1.grossProfit) * 100 : 0;
    pillars.push(createPillar({
        id: 'opex-gp-ratio',
        name: 'OPEX to GP Ratio',
        category: 'revenue-profitability',
        value: opexToGPRatio,
        benchmark: 40, // 40% benchmark
        scoring: (val) => val <= 40 ? 100 : val <= 60 ? 60 : 20,
        recommendation: opexToGPRatio > 60 ? 'Operational overhead is eating your margins. Review fixed costs.' : 'High operational efficiency observed.'
    }));

    // 4. Contribution Margin per SKU
    const skuMargin = step1.topSKURevenue > 0 ? ((step1.topSKURevenue - step1.topSKUVariableCosts) / step1.topSKURevenue) * 100 : 0;
    pillars.push(createPillar({
        id: 'sku-contribution-margin',
        name: 'Top SKU Contribution Margin',
        category: 'revenue-profitability',
        value: skuMargin,
        benchmark: 60,
        scoring: (val) => val >= 60 ? 100 : val >= 40 ? 70 : 30,
        recommendation: skuMargin < 40 ? 'Your flagship product has low yield. Renounce low-margin items.' : 'Healthy top-line contribution.'
    }));

    // --- STEP 2: CASH FLOW & LIQUIDITY ---
    const { step2 } = formData;

    // 5. Cash Runway
    const runway = step2.monthlyBurnRate > 0 ? step2.currentCash / step2.monthlyBurnRate : 12;
    pillars.push(createPillar({
        id: 'cash-runway',
        name: 'Cash Runway (Months)',
        category: 'cash-flow',
        value: runway,
        benchmark: 6,
        scoring: (val) => val >= 6 ? 100 : val >= 2 ? 50 : 0,
        recommendation: runway < 2 ? 'CRITICAL: Immediate cash injection or massive cost reduction required.' : 'Runway is sufficient for short-term pivots.'
    }));

    // 6. Net Cash Lock
    const netCashLock = (step2.inventoryValue + step2.accountsReceivable - step2.accountsPayable);
    const lockRatio = step1.totalRevenue > 0 ? (netCashLock / step1.totalRevenue) * 100 : 0;
    pillars.push(createPillar({
        id: 'net-cash-lock',
        name: 'Net Cash Lockup Ratio',
        category: 'cash-flow',
        value: lockRatio,
        benchmark: 15,
        scoring: (val) => val <= 15 ? 100 : val <= 30 ? 60 : 20,
        recommendation: lockRatio > 30 ? 'Too much cash is trapped in operations. Optimize AR collections.' : 'Healthy working capital velocity.'
    }));

    // 7. Cash Realization Lag
    // 7. Cash Realization Lag
    const lagDays = step2.realizationLagDays || 0;
    pillars.push(createPillar({
        id: 'cash-lag',
        name: 'Cash Realization Lag',
        category: 'cash-flow',
        value: lagDays,
        benchmark: 7, // 7 days
        scoring: (val) => val <= 7 ? 100 : val <= 14 ? 70 : 30,
        recommendation: lagDays > 14 ? 'Your cash cycle is slow. Renegotiate payment terms with clients.' : 'Excellent cash velocity.'
    }));

    // 8. Net Burn Rate (Percentage of inflow)
    const netBurn = step2.cashInflows > 0 ? ((step2.cashOutflows - step2.cashInflows) / step2.cashInflows) * 100 : 0;
    pillars.push(createPillar({
        id: 'net-burn-rate',
        name: 'Net Burn Rate',
        category: 'cash-flow',
        value: netBurn,
        benchmark: 0, // Should be profitable
        scoring: (val) => val <= 0 ? 100 : val <= 10 ? 60 : 20,
        recommendation: netBurn > 0 ? 'Monthly outflow exceeds inflow. Switch to survival mode.' : 'Positive cash hygiene.'
    }));

    // --- STEP 3: OPERATIONAL EFFICIENCY ---
    const { step3 } = formData;

    // 9. GP per Labor Hour
    const gpPerLaborHour = step3.totalLaborHours > 0 ? step3.totalGrossProfit / step3.totalLaborHours : 0;
    pillars.push(createPillar({
        id: 'gp-labor-hour',
        name: 'GP per Labor Hour',
        category: 'operational-efficiency',
        value: gpPerLaborHour,
        benchmark: 150000,
        scoring: (val) => val >= 150000 ? 100 : val >= 50000 ? 60 : 20,
        recommendation: gpPerLaborHour < 50000 ? 'Low labor productivity. Automate repetitive tasks.' : 'High operational leverage.'
    }));

    // 10. Inventory Decay Rate
    const decayRate = step3.inventoryAtStart > 0 ? (step3.inventorySpoilage / step3.inventoryAtStart) * 100 : 0;
    pillars.push(createPillar({
        id: 'inventory-decay',
        name: 'Inventory Decay Rate',
        category: 'operational-efficiency',
        value: decayRate,
        benchmark: 1,
        scoring: (val) => val <= 1 ? 100 : val <= 3 ? 60 : 20,
        recommendation: decayRate > 3 ? 'High spoilage observed. Review storage and FIFO protocols.' : 'Effective inventory management.'
    }));

    // 11. BEP Dynamics (Efficiency of fixed costs cover)
    const unitContribution = step3.pricePerUnit - step3.variableCostPerUnit;
    const bepUnits = unitContribution > 0 ? step3.fixedCosts / unitContribution : 999999;
    const currentUnits = step1.totalTransactions; // Proxy for units
    const bepSafetyMargin = currentUnits > 0 ? ((currentUnits - bepUnits) / currentUnits) * 100 : -100;
    pillars.push(createPillar({
        id: 'bep-dynamics',
        name: 'BEP Safety Margin',
        category: 'operational-efficiency',
        value: bepSafetyMargin,
        benchmark: 25,
        scoring: (val) => val >= 25 ? 100 : val >= 0 ? 60 : 10,
        recommendation: bepSafetyMargin < 0 ? 'Business is operating below Break-Even Point. URGENT action needed.' : 'Healthy buffer against demand shocks.'
    }));

    // 12. Insight-to-Surprise Ratio
    const totalEvents = step3.plannedEvents + step3.unplannedEvents;
    const predictability = totalEvents > 0 ? (step3.plannedEvents / totalEvents) * 100 : 100;
    pillars.push(createPillar({
        id: 'predictability-ratio',
        name: 'Insight-to-Surprise Ratio',
        category: 'operational-efficiency',
        value: predictability,
        benchmark: 80,
        scoring: (val) => val >= 80 ? 100 : val >= 50 ? 60 : 20,
        recommendation: predictability < 50 ? 'Too many "surprises". Implement predictive maintenance and standard ops.' : 'Predictable operational environment.'
    }));

    // --- STEP 4: GROWTH & RISK ---
    const { step4 } = formData;

    // 13. LTGP Velocity
    const velocity = step4.ltgpMonth1 > 0 ? ((step4.ltgpMonth3 - step4.ltgpMonth1) / step4.ltgpMonth1) * 100 : 0;
    pillars.push(createPillar({
        id: 'ltgp-velocity',
        name: 'LTGP Velocity',
        category: 'growth-risk',
        value: velocity,
        benchmark: 15,
        scoring: (val) => val >= 15 ? 100 : val >= 5 ? 70 : 30,
        recommendation: velocity < 5 ? 'Growth has plateaued. Re-evaluate customer retention and LTV.' : 'Strong upward velocity.'
    }));

    // 14. LTV:CAC Ratio
    const ltvCac = step4.customerAcquisitionCost > 0 ? step4.customerLifetimeValue / step4.customerAcquisitionCost : 3;
    pillars.push(createPillar({
        id: 'ltv-cac-ratio',
        name: 'LTV:CAC Ratio',
        category: 'growth-risk',
        value: ltvCac,
        benchmark: 3,
        scoring: (val) => val >= 3 ? 100 : val >= 1.5 ? 60 : 20,
        recommendation: ltvCac < 1.5 ? 'Acquisition is too expensive. Optimize marketing efficiency.' : 'Highly scalable acquisition model.'
    }));

    // 15. Risk Exposure Index (Current Ratio)
    const riskExposure = step4.currentLiabilities > 0 ? step4.currentAssets / step4.currentLiabilities : 2;
    pillars.push(createPillar({
        id: 'risk-exposure',
        name: 'Risk Exposure Index',
        category: 'growth-risk',
        value: riskExposure,
        benchmark: 2,
        scoring: (val) => val >= 2 ? 100 : val >= 1 ? 60 : 20,
        recommendation: riskExposure < 1 ? 'Technical insolvancy risk. Current assets cannot cover debt.' : 'Liquid and stable foundation.'
    }));

    // 16. Single Point of Failure
    const spof = step4.totalRevenue > 0 ? (step4.largestRevenueSource / step4.totalRevenue) * 100 : 0;
    pillars.push(createPillar({
        id: 'spof-risk',
        name: 'Single Point of Failure',
        category: 'growth-risk',
        value: spof,
        benchmark: 20,
        scoring: (val) => val <= 20 ? 100 : val <= 40 ? 60 : 20,
        recommendation: spof > 40 ? 'High concentration risk. Diversify customer base immediately.' : 'Resilient and diversified revenue streams.'
    }));

    // --- AGGREGATION ---
    const overallScore = pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length;

    let verdict: 'fortress' | 'warning' | 'critical' = 'warning';
    let verdictLabel = 'WARNING: VULNERABILITIES DETECTED';
    let verdictColor = 'text-yellow-500';

    if (overallScore >= 80) {
        verdict = 'fortress';
        verdictLabel = 'FORTRESS: STRUCTURALLY SOUND';
        verdictColor = 'text-green-500';
    } else if (overallScore < 50) {
        verdict = 'critical';
        verdictLabel = 'CRITICAL: IMMEDIATE FAILURE RISK';
        verdictColor = 'text-red-500';
    }

    const sortedPillars = [...pillars].sort((a, b) => a.score - b.score);
    const topRisks = sortedPillars.slice(0, 3);
    const strengths = [...pillars].sort((a, b) => b.score - a.score).slice(0, 3);

    const getCategoryScore = (cat: PillarCategory) => {
        const catPillars = pillars.filter(p => p.category === cat);
        return catPillars.reduce((acc, p) => acc + p.score, 0) / catPillars.length;
    };

    return {
        overallScore: Math.round(overallScore),
        verdict,
        verdictLabel,
        verdictColor,
        pillars,
        topRisks,
        strengths,
        categoryScores: {
            revenueProfitability: Math.round(getCategoryScore('revenue-profitability')),
            cashFlow: Math.round(getCategoryScore('cash-flow')),
            operationalEfficiency: Math.round(getCategoryScore('operational-efficiency')),
            growthRisk: Math.round(getCategoryScore('growth-risk'))
        }
    };
}

function createPillar(config: {
    id: string;
    name: string;
    category: PillarCategory;
    value: number;
    benchmark: number;
    scoring: (val: number) => number;
    recommendation: string;
}): PillarResult {
    const score = config.scoring(config.value);
    let status: 'healthy' | 'warning' | 'critical' = 'warning';
    if (score >= 80) status = 'healthy';
    else if (score < 50) status = 'critical';

    return {
        id: config.id,
        name: config.name,
        category: config.category,
        score,
        status,
        value: config.value,
        benchmark: config.benchmark,
        recommendation: config.recommendation
    };
}
