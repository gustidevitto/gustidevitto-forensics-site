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

    // Destructure Inputs
    const { totalRevenue } = formData.step1 || { totalRevenue: 0, transactionCount: 1 };
    const { idealCogs, actualMaterial, wasteSpoilage } = formData.step2 || { idealCogs: 0, actualMaterial: 0, wasteSpoilage: 0 };
    const { rentUtilities, payrollMgmt, marketingSpend, generalAdmin, cashOnHand, inventoryValue } = formData.step3 || { rentUtilities: 0, payrollMgmt: 0, marketingSpend: 0, generalAdmin: 0, cashOnHand: 0, inventoryValue: 0 };
    const { shortTermDebt, totalWorkingHours } = formData.step4 || { accountsPayable: 0, shortTermDebt: 0, headcount: 1, totalWorkingHours: 1 };

    // Derived Values
    // actualMaterial is used as Actual Gross Profit % in the UI
    const grossProfit = totalRevenue * (actualMaterial / 100);
    const totalOpEx = rentUtilities + payrollMgmt + marketingSpend + generalAdmin;
    const netProfit = grossProfit - totalOpEx;
    const monthlyBurnRate = totalOpEx + (shortTermDebt * 0.1); // Approx interest/principal

    // --- PILLAR 1: GROSS PROFIT LEAKAGE ---
    // In this context, idealCogs is Target GP% and actualMaterial is Actual GP% from the Lite UI
    const targetGP = idealCogs;
    const actualGP = actualMaterial;

    const leakagePercent = Math.max(0, targetGP - actualGP);

    pillars.push(createPillar({
        id: 'gp-leakage',
        name: 'Gross Profit Leakage',
        category: 'revenue-profitability',
        value: leakagePercent,
        benchmark: 2, // < 2% is good
        scoring: (val) => val <= 2 ? 100 : val <= 5 ? 60 : 20,
        recommendation: leakagePercent > 5 ? `Critical Leakage (${leakagePercent.toFixed(1)}%). Audit kitchen waste and vendor prices immediately.` : 'Supply chain integrity is intact.'
    }));

    // --- PILLAR 2: LABOR EFFICIENCY (GP / Man Hour) ---
    const gpPerManHour = totalWorkingHours > 0 ? grossProfit / totalWorkingHours : 0;
    pillars.push(createPillar({
        id: 'labor-efficiency',
        name: 'Labor Efficiency (GP/Hour)',
        category: 'operational-efficiency',
        value: gpPerManHour,
        benchmark: 100000,
        scoring: (val) => val > 150000 ? 100 : val > 75000 ? 70 : 30,
        recommendation: gpPerManHour < 75000 ? 'Labor is dragging margins down. Optimize scheduling or increase throughput.' : 'Workforce productivity is healthy.'
    }));

    // --- PILLAR 3: OPEX RATIO ---
    const opexRatio = totalRevenue > 0 ? (totalOpEx / totalRevenue) * 100 : 0;
    pillars.push(createPillar({
        id: 'opex-ratio',
        name: 'OpEx Structure Ratio',
        category: 'operational-efficiency',
        value: opexRatio,
        benchmark: 30,
        scoring: (val) => val <= 30 ? 100 : val <= 45 ? 60 : 20,
        recommendation: opexRatio > 45 ? 'Overhead is too heavy. Cut General Admin or Rent costs.' : 'Lean operational structure.'
    }));

    // --- PILLAR 4: NET PROFIT MARGIN ---
    const netMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    pillars.push(createPillar({
        id: 'net-margin',
        name: 'Net Profit Margin',
        category: 'revenue-profitability',
        value: netMargin,
        benchmark: 20,
        scoring: (val) => val >= 20 ? 100 : val >= 10 ? 60 : 10,
        recommendation: netMargin < 10 ? 'Profitability is dangerously low. Review pricing structure.' : 'Strong bottom-line performance.'
    }));

    // --- PILLAR 5: CASH RUNWAY ---
    const runwayMonths = monthlyBurnRate > 0 ? cashOnHand / monthlyBurnRate : 0;
    pillars.push(createPillar({
        id: 'cash-runway',
        name: 'Cash Runway (Liquidity)',
        category: 'cash-flow',
        value: runwayMonths,
        benchmark: 6,
        scoring: (val) => val >= 6 ? 100 : val >= 2 ? 40 : 0,
        recommendation: runwayMonths < 2 ? 'CRITICAL: Insolvency imminent. Secure capital or freeze spending.' : 'Liquidity reserves are sufficient.'
    }));

    // --- PILLAR 6: BREAK-EVEN POINT SAFETY ---
    const gpMargin = totalRevenue > 0 ? grossProfit / totalRevenue : 0;
    const bepRevenue = gpMargin > 0 ? totalOpEx / gpMargin : 0;
    const safetyMargin = bepRevenue > 0 ? ((totalRevenue - bepRevenue) / totalRevenue) * 100 : 0;

    pillars.push(createPillar({
        id: 'bep-safety',
        name: 'Break-Even Safety Margin',
        category: 'growth-risk',
        value: safetyMargin,
        benchmark: 20,
        scoring: (val) => val >= 20 ? 100 : val >= 0 ? 50 : 0,
        recommendation: safetyMargin < 0 ? `You are burning cash on every sale. Need ${Math.abs(safetyMargin).toFixed(1)}% more revenue to survive.` : 'Revenue is comfortably above survival line.'
    }));

    // --- PILLAR 7: INVENTORY DECAY RISK ---
    const inventoryRisk = inventoryValue > 0 ? (wasteSpoilage / inventoryValue) * 100 : 0;
    pillars.push(createPillar({
        id: 'inventory-decay',
        name: 'Inventory Decay Rate',
        category: 'operational-efficiency',
        value: inventoryRisk,
        benchmark: 5,
        scoring: (val) => val <= 5 ? 100 : val <= 10 ? 60 : 30,
        recommendation: inventoryRisk > 10 ? 'High spoilage detected. Check storage protocols.' : 'Inventory retention is good.'
    }));

    // --- PILLAR 8: MARKETING ROI ESTIMATE ---
    const marketingRoi = marketingSpend > 0 ? totalRevenue / marketingSpend : 10;
    pillars.push(createPillar({
        id: 'marketing-roi',
        name: 'Marketing Yield (ROAS Proxy)',
        category: 'growth-risk',
        value: marketingRoi,
        benchmark: 8,
        scoring: (val) => val >= 8 ? 100 : val >= 4 ? 60 : 30,
        recommendation: marketingRoi < 4 ? 'Marketing spend is inefficient. Pause ads and review CAC.' : 'Marketing is driving efficiency.'
    }));

    // --- AGGREGATION ---
    const overallScore = pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length;

    let verdict: 'fortress' | 'warning' | 'critical' = 'warning';
    let verdictLabel = 'WARNING: VULNERABILITIES DETECTED';
    let verdictColor = 'text-yellow-500';

    if (overallScore >= 80) {
        verdict = 'fortress';
        verdictLabel = 'FORTRESS: STRUCTURALLY SOUND';
        verdictColor = 'text-emerald-500';
    } else if (overallScore < 50) {
        verdict = 'critical';
        verdictLabel = 'CRITICAL: FAILURE IMMINENT';
        verdictColor = 'text-red-500';
    }

    const sortedPillars = [...pillars].sort((a, b) => a.score - b.score);
    const topRisks = sortedPillars.slice(0, 3);
    const strengths = [...pillars].sort((a, b) => b.score - a.score).slice(0, 3);

    const getCategoryScore = (cat: PillarCategory) => {
        const catPillars = pillars.filter(p => p.category === cat);
        return catPillars.length ? catPillars.reduce((acc, p) => acc + p.score, 0) / catPillars.length : 0;
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
