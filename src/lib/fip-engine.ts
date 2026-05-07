import type {
    FIPLiteInputs,
    FIPLiteResult,
    IndustryType,
    IndustryBenchmarks,
    Layer1Numbers,
    Layer2Comparison,
    Layer3LockedXray,
    LockedPillar,
    PillarCategory,
    CashAutopsyInputs,
    CashAutopsyResult,
    MarginAuditInputs,
    MarginAuditResult,
    GrowthScanInputs,
    GrowthScanResult
} from '@/types/fip-lite';

export type TierLevel = 'diagnostic' | 'forensic' | 'network' | 'sovereign';

export const getPillarCount = (tier: TierLevel): number => {
    switch (tier) {
        case 'diagnostic': return 8;
        case 'forensic': return 25;
        case 'network': return 25;
        case 'sovereign': return 25;
        default: return 8;
    }
}

export const hasFeature = (tier: TierLevel, feature: string): boolean => {
    const featureMap: Record<string, string[]> = {
        'logicTrace': ['forensic', 'network', 'sovereign'],
        'auditTrail': ['forensic', 'network', 'sovereign'],
        'decisionIntelligence': ['forensic', 'network', 'sovereign'],
        'multiOutlet': ['network', 'sovereign'],
        'franchiseIntelligence': ['network', 'sovereign'],
        'neuralAI': ['sovereign'],
        'monteCarlo': ['sovereign'],
        'wealthImpact': ['sovereign']
    }
    return featureMap[feature]?.includes(tier) ?? false
}

/**
 * FIP™ Lite v2 - "The MRI Scan" Calculation Engine
 * Generates 4-layer psychological output from 8 inputs
 */

// ============================================================================
// INDUSTRY BENCHMARK DATABASE
// ============================================================================

const INDUSTRY_BENCHMARKS: Record<IndustryType, IndustryBenchmarks> = {
    'restaurant-cafe': {
        grossProfitMin: 60,
        grossProfitMax: 70,
        opexRatioMax: 35,
        netMarginMin: 15,
        runwayMonthsMin: 3,
        revenuePerHeadMin: 15000
    },
    'retail-ecommerce': {
        grossProfitMin: 40,
        grossProfitMax: 55,
        opexRatioMax: 30,
        netMarginMin: 10,
        runwayMonthsMin: 4,
        revenuePerHeadMin: 25000
    },
    'saas-tech': {
        grossProfitMin: 75,
        grossProfitMax: 90,
        opexRatioMax: 50,
        netMarginMin: 20,
        runwayMonthsMin: 12,
        revenuePerHeadMin: 50000
    },
    'manufacturing': {
        grossProfitMin: 30,
        grossProfitMax: 45,
        opexRatioMax: 25,
        netMarginMin: 8,
        runwayMonthsMin: 4,
        revenuePerHeadMin: 30000
    },
    'professional-services': {
        grossProfitMin: 50,
        grossProfitMax: 65,
        opexRatioMax: 40,
        netMarginMin: 15,
        runwayMonthsMin: 6,
        revenuePerHeadMin: 40000
    },
    'healthcare': {
        grossProfitMin: 45,
        grossProfitMax: 60,
        opexRatioMax: 35,
        netMarginMin: 12,
        runwayMonthsMin: 6,
        revenuePerHeadMin: 35000
    },
    'construction': {
        grossProfitMin: 25,
        grossProfitMax: 40,
        opexRatioMax: 20,
        netMarginMin: 5,
        runwayMonthsMin: 3,
        revenuePerHeadMin: 40000
    },
    'other': {
        grossProfitMin: 40,
        grossProfitMax: 60,
        opexRatioMax: 35,
        netMarginMin: 10,
        runwayMonthsMin: 6,
        revenuePerHeadMin: 30000
    }
};

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

export function calculateFIPLiteResults(inputs: FIPLiteInputs): FIPLiteResult {
    const benchmark = INDUSTRY_BENCHMARKS[inputs.industryType];

    // Layer 1: The Numbers (Specific, Scary)
    const layer1 = calculateLayer1Numbers(inputs);

    // Layer 2: The Comparison (Vague, Creates Gap)
    const layer2 = calculateLayer2Comparison(inputs, layer1, benchmark);

    // Layer 3: Locked X-Ray (Conversion Engine)
    const layer3 = generateLayer3LockedXray(inputs, layer1, layer2, benchmark);

    return {
        layer1,
        layer2,
        layer3
    };
}

// ============================================================================
// LAYER 1: THE NUMBERS
// ============================================================================

function calculateLayer1Numbers(inputs: FIPLiteInputs): Layer1Numbers {
    const grossProfit = inputs.monthlyRevenue - inputs.monthlyCOGS;
    const grossProfitPercent = inputs.monthlyRevenue > 0
        ? (grossProfit / inputs.monthlyRevenue) * 100
        : 0;

    const netBurnRate = inputs.monthlyOpEx + inputs.monthlyDebtService;

    const cashRunwayDays = netBurnRate > 0
        ? Math.floor((inputs.currentCash / netBurnRate) * 30)
        : 999;

    const cashZeroDate = new Date();
    cashZeroDate.setDate(cashZeroDate.getDate() + cashRunwayDays);

    // Break-even calculation
    const gpMargin = inputs.monthlyRevenue > 0 ? grossProfit / inputs.monthlyRevenue : 0;
    const breakEvenRevenue = gpMargin > 0 ? netBurnRate / gpMargin : 0;

    return {
        cashRunwayDays,
        cashZeroDate: cashZeroDate.toISOString(),
        grossProfitPercent: Math.round(grossProfitPercent * 10) / 10,
        netBurnRate: Math.round(netBurnRate),
        breakEvenRevenue: Math.round(breakEvenRevenue),
        currentRevenue: inputs.monthlyRevenue
    };
}

// ============================================================================
// LAYER 2: THE COMPARISON
// ============================================================================

function calculateLayer2Comparison(
    inputs: FIPLiteInputs,
    layer1: Layer1Numbers,
    benchmark: IndustryBenchmarks
): Layer2Comparison {
    const yourGP = layer1.grossProfitPercent;
    const industryMin = benchmark.grossProfitMin;
    const industryMax = benchmark.grossProfitMax;
    const gap = yourGP - ((industryMin + industryMax) / 2);

    // Efficiency index (composite score)
    const opexRatio = inputs.monthlyRevenue > 0
        ? (inputs.monthlyOpEx / inputs.monthlyRevenue) * 100
        : 0;
    const opexScore = opexRatio <= benchmark.opexRatioMax ? 100 : (benchmark.opexRatioMax / opexRatio) * 100;

    const gpScore = yourGP >= industryMin ? 100 : (yourGP / industryMin) * 100;

    const revenuePerHead = inputs.teamSize > 0 ? inputs.monthlyRevenue / inputs.teamSize : 0;
    const revenueScore = revenuePerHead >= benchmark.revenuePerHeadMin
        ? 100
        : (revenuePerHead / benchmark.revenuePerHeadMin) * 100;

    const efficiencyIndex = Math.round((opexScore + gpScore + revenueScore) / 3);

    // Risk verdict
    let riskVerdict: 'fortress' | 'warning' | 'critical' = 'warning';
    let verdictLabel = 'WARNING: VULNERABILITIES DETECTED';
    let verdictColor = 'text-yellow-500';

    if (layer1.cashRunwayDays < 60 || efficiencyIndex < 50) {
        riskVerdict = 'critical';
        verdictLabel = 'CRITICAL: FAILURE IMMINENT';
        verdictColor = 'text-red-500';
    } else if (layer1.cashRunwayDays >= 180 && efficiencyIndex >= 80) {
        riskVerdict = 'fortress';
        verdictLabel = 'FORTRESS: STRUCTURALLY SOUND';
        verdictColor = 'text-emerald-500';
    }

    // Estimated leakage calculation (range-based for curiosity)
    const potentialGPGap = Math.max(0, industryMin - yourGP);
    const potentialOpexGap = Math.max(0, opexRatio - benchmark.opexRatioMax);
    const totalPotentialGap = potentialGPGap + potentialOpexGap;

    let leakageMin = 0;
    let leakageMax = 0;

    if (totalPotentialGap > 0) {
        leakageMin = (totalPotentialGap / 100) * inputs.monthlyRevenue * 0.6; // Conservative
        leakageMax = (totalPotentialGap / 100) * inputs.monthlyRevenue * 1.4; // Aggressive
    } else if (riskVerdict !== 'fortress' && inputs.monthlyRevenue > 0) {
        // If there's no major benchmark gap but runway/efficiency is failing
        leakageMin = inputs.monthlyRevenue * 0.03;
        leakageMax = inputs.monthlyRevenue * 0.08;
    }

    return {
        gpVsIndustry: {
            yourGP,
            industryMin,
            industryMax,
            gap
        },
        estimatedLeakage: {
            min: Math.round(leakageMin),
            max: Math.round(leakageMax)
        },
        efficiencyIndex,
        riskVerdict,
        verdictLabel,
        verdictColor
    };
}

// ============================================================================
// LAYER 3: LOCKED X-RAY (The Conversion Engine)
// ============================================================================

function generateLayer3LockedXray(
    inputs: FIPLiteInputs,
    layer1: Layer1Numbers,
    layer2: Layer2Comparison,
    benchmark: IndustryBenchmarks
): Layer3LockedXray {
    const pillars: LockedPillar[] = [];

    // Generate 25 locked pillars with realistic status distribution
    const pillarConfigs = [
        { id: 'gp-leakage', name: 'Gross Profit Leakage Analysis', category: 'revenue-profitability' as PillarCategory },
        { id: 'pricing-power', name: 'Pricing Power Index', category: 'revenue-profitability' as PillarCategory },
        { id: 'revenue-quality', name: 'Revenue Quality Score', category: 'revenue-profitability' as PillarCategory },
        { id: 'cash-velocity', name: 'Cash Velocity Index', category: 'cash-flow' as PillarCategory },
        { id: 'cash-runway', name: 'Liquidity Runway Analysis', category: 'cash-flow' as PillarCategory },
        { id: 'working-capital', name: 'Working Capital Efficiency', category: 'cash-flow' as PillarCategory },
        { id: 'labor-efficiency', name: 'Labor Efficiency Ratio', category: 'operational-efficiency' as PillarCategory },
        { id: 'opex-structure', name: 'OpEx Structure Analysis', category: 'operational-efficiency' as PillarCategory },
        { id: 'overhead-ratio', name: 'Overhead Burden Index', category: 'operational-efficiency' as PillarCategory },
        { id: 'inventory-decay', name: 'Inventory Decay Rate', category: 'operational-efficiency' as PillarCategory },
        { id: 'bep-dynamics', name: 'Break-Even Point Dynamics', category: 'growth-risk' as PillarCategory },
        { id: 'debt-coverage', name: 'Debt Service Coverage Ratio', category: 'growth-risk' as PillarCategory },
        { id: 'growth-sustainability', name: 'Growth Sustainability Index', category: 'growth-risk' as PillarCategory },
        { id: 'market-resilience', name: 'Market Resilience Score', category: 'growth-risk' as PillarCategory },
        { id: 'customer-concentration', name: 'Customer Concentration Risk', category: 'growth-risk' as PillarCategory },
        { id: 'supplier-dependency', name: 'Supplier Dependency Analysis', category: 'operational-efficiency' as PillarCategory },
        { id: 'cash-conversion', name: 'Cash Conversion Cycle', category: 'cash-flow' as PillarCategory },
        { id: 'profit-quality', name: 'Profit Quality Assessment', category: 'revenue-profitability' as PillarCategory },
        { id: 'net-burn-rate', name: 'Net Burn Rate Analysis', category: 'cash-flow' as PillarCategory },
        { id: 'ltgp-velocity', name: 'LTGP Velocity Tracker', category: 'revenue-profitability' as PillarCategory },
        { id: 'operating-leverage', name: 'Operating Leverage Index', category: 'operational-efficiency' as PillarCategory },
        { id: 'anomaly-detection', name: 'Anomaly Detection Score', category: 'growth-risk' as PillarCategory },
        { id: 'benchmark-deviation', name: 'Benchmark Deviation Analysis', category: 'growth-risk' as PillarCategory },
        { id: 'network-compliance', name: 'Network Compliance Audit', category: 'operational-efficiency' as PillarCategory },
        { id: 'capacity-utilization', name: 'Capacity Utilization Index', category: 'operational-efficiency' as PillarCategory }
    ];

    // Determine status based on actual metrics
    let criticalCount = 0;
    let warningCount = 0;

    pillarConfigs.forEach((config, index) => {
        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        let barWidth = 75 + Math.random() * 20; // Default healthy range

        // Apply real logic to key pillars
        if (config.id === 'gp-leakage') {
            status = layer2.gpVsIndustry.gap < -10 ? 'critical' : layer2.gpVsIndustry.gap < 0 ? 'warning' : 'healthy';
            barWidth = layer2.gpVsIndustry.gap < -10 ? 30 : layer2.gpVsIndustry.gap < 0 ? 55 : 85;
        } else if (config.id === 'cash-runway') {
            status = layer1.cashRunwayDays < 60 ? 'critical' : layer1.cashRunwayDays < 120 ? 'warning' : 'healthy';
            barWidth = layer1.cashRunwayDays < 60 ? 25 : layer1.cashRunwayDays < 120 ? 50 : 90;
        } else if (config.id === 'bep-dynamics') {
            const bepGap = layer1.currentRevenue - layer1.breakEvenRevenue;
            status = bepGap < 0 ? 'critical' : bepGap < layer1.breakEvenRevenue * 0.2 ? 'warning' : 'healthy';
            barWidth = bepGap < 0 ? 20 : bepGap < layer1.breakEvenRevenue * 0.2 ? 45 : 80;
        } else if (config.id === 'opex-structure') {
            const opexRatio = inputs.monthlyRevenue > 0 ? (inputs.monthlyOpEx / inputs.monthlyRevenue) * 100 : 0;
            status = opexRatio > benchmark.opexRatioMax * 1.3 ? 'critical' : opexRatio > benchmark.opexRatioMax ? 'warning' : 'healthy';
            barWidth = opexRatio > benchmark.opexRatioMax * 1.3 ? 35 : opexRatio > benchmark.opexRatioMax ? 60 : 85;
        } else {
            // For other pillars, distribute based on overall risk
            if (layer2.riskVerdict === 'critical') {
                status = index % 3 === 0 ? 'critical' : index % 3 === 1 ? 'warning' : 'healthy';
                barWidth = index % 3 === 0 ? 30 + Math.random() * 15 : index % 3 === 1 ? 50 + Math.random() * 20 : 75 + Math.random() * 20;
            } else if (layer2.riskVerdict === 'warning') {
                status = index % 4 === 0 ? 'critical' : index % 2 === 0 ? 'warning' : 'healthy';
                barWidth = index % 4 === 0 ? 35 + Math.random() * 15 : index % 2 === 0 ? 55 + Math.random() * 20 : 75 + Math.random() * 20;
            } else {
                status = index % 5 === 0 ? 'warning' : 'healthy';
                barWidth = index % 5 === 0 ? 60 + Math.random() * 15 : 80 + Math.random() * 15;
            }
        }

        if (status === 'critical') criticalCount++;
        if (status === 'warning') warningCount++;

        pillars.push({
            id: config.id,
            name: config.name,
            category: config.category,
            status,
            barWidth: Math.round(barWidth),
            isLocked: true,
            computedValue: '—',
            computedLabel: 'Full analysis available in paid report'
        });
    });

    // Estimated annual impact (12x monthly leakage with variance)
    const estimatedAnnualImpact = {
        min: layer2.estimatedLeakage.min * 12,
        max: layer2.estimatedLeakage.max * 12
    };

    return {
        pillars,
        criticalCount,
        warningCount,
        estimatedAnnualImpact
    };
}

// ============================================================================
// LEGACY COMPATIBILITY LAYER
// ============================================================================

/**
 * @deprecated Use calculateFIPLiteResults instead
 * Kept for backward compatibility with existing UI
 */
export function calculateFIPLiteResultsLegacy(_formData: any): any {
    // This will be removed once UI is fully migrated
    console.warn('Using deprecated calculateFIPLiteResultsLegacy. Please migrate to new API.');

    // Return mock data to prevent crashes during migration
    return {
        overallScore: 50,
        verdict: 'warning',
        verdictLabel: 'MIGRATION IN PROGRESS',
        verdictColor: 'text-yellow-500',
        pillars: [],
        topRisks: [],
        strengths: [],
        categoryScores: {
            revenueProfitability: 50,
            cashFlow: 50,
            operationalEfficiency: 50,
            growthRisk: 50
        }
    };
}

// ============================================================================
// STANDALONE APP CALCULATORS
// ============================================================================

export function calculateCashAutopsy(inputs: CashAutopsyInputs): CashAutopsyResult {
    const netBurnRate = inputs.opex + inputs.shortDebt;
    const currentLiabilities = inputs.ap + inputs.shortDebt;

    // Quick ratio matches FIP logic: Cash / Current Liabilities
    const quickRatio = currentLiabilities > 0 ? inputs.cash / currentLiabilities : 99;

    // Runway based on total cash outflows
    const totalOutflow = inputs.cogs + inputs.opex + inputs.shortDebt;
    const cashRunwayDays = totalOutflow > 0 ? Math.floor((inputs.cash / totalOutflow) * 30) : 999;

    const cashZeroDateObj = new Date();
    cashZeroDateObj.setDate(cashZeroDateObj.getDate() + cashRunwayDays);
    const cashZeroDate = cashZeroDateObj.toISOString();

    const runwayVerdict = cashRunwayDays < 60 ? 'critical' : cashRunwayDays < 180 ? 'warning' : 'fortress';
    const quickRatioVerdict = quickRatio < 1 ? 'critical' : quickRatio < 1.5 ? 'warning' : 'fortress';
    const liquidityTrapRisk = runwayVerdict === 'critical' && quickRatioVerdict === 'critical';

    // Working capital ratio: cash vs monthly outflow
    const workingCapitalRatio = totalOutflow > 0 ? inputs.cash / totalOutflow : 99;
    const wcStatus = workingCapitalRatio < 0.5 ? 'critical' : workingCapitalRatio < 1.5 ? 'warning' : 'healthy';

    // Operating leverage: burn rate as % of revenue
    const burnAsPercentOfRevenue = inputs.revenue > 0 ? (netBurnRate / inputs.revenue) * 100 : 100;
    const leverageStatus = burnAsPercentOfRevenue > 50 ? 'critical' : burnAsPercentOfRevenue > 30 ? 'warning' : 'healthy';

    const pillars: LockedPillar[] = [
        { id: 'cash-conversion', name: 'Cash Conversion Cycle', category: 'cash-flow', status: runwayVerdict === 'fortress' ? 'healthy' : runwayVerdict, barWidth: Math.min(100, cashRunwayDays / 3), isLocked: true, computedValue: `${cashRunwayDays} days`, computedLabel: 'Time until cash reaches zero at current burn rate' },
        { id: 'working-capital', name: 'Working Capital Efficiency', category: 'cash-flow', status: wcStatus, barWidth: Math.min(100, workingCapitalRatio * 40), isLocked: true, computedValue: `${workingCapitalRatio.toFixed(2)}x`, computedLabel: 'Cash reserves relative to monthly cash outflow' },
        { id: 'debt-coverage', name: 'Debt Service Coverage Ratio', category: 'growth-risk', status: quickRatioVerdict === 'fortress' ? 'healthy' : quickRatioVerdict, barWidth: Math.min(100, quickRatio * 40), isLocked: true, computedValue: `${quickRatio.toFixed(2)}x`, computedLabel: 'Cash available per dollar of short-term obligations' },
        { id: 'operating-leverage', name: 'Operating Leverage Index', category: 'operational-efficiency', status: leverageStatus, barWidth: Math.max(5, 100 - burnAsPercentOfRevenue), isLocked: true, computedValue: `${burnAsPercentOfRevenue.toFixed(1)}%`, computedLabel: 'Fixed costs consuming this share of your revenue' }
    ];

    return {
        layer1: { cashRunwayDays, cashZeroDate, netBurnRate, quickRatio },
        layer2: { runwayVerdict, quickRatioVerdict, liquidityTrapRisk },
        layer3: { pillars }
    };
}

export function calculateMarginAudit(inputs: MarginAuditInputs): MarginAuditResult {
    const gpLeakagePercent = inputs.revenue > 0 ? ((inputs.actualCogs - inputs.idealCogs) / inputs.revenue) * 100 : 0;
    const grossProfit = inputs.revenue - inputs.actualCogs - inputs.labor;
    const grossProfitPercent = inputs.revenue > 0 ? (grossProfit / inputs.revenue) * 100 : 0;

    const opexToGpRatio = grossProfit > 0 ? (inputs.opex / grossProfit) * 100 : 999;
    const gpPerLaborHour = inputs.workingHours > 0 ? grossProfit / inputs.workingHours : 0;

    const efficiencyVerdict = gpLeakagePercent > 10 ? 'critical' : gpLeakagePercent > 5 ? 'warning' : 'fortress';
    const phantomDrainRisk = gpLeakagePercent > 5 && opexToGpRatio > 40;
    const leakageMin = inputs.revenue * (Math.max(0, gpLeakagePercent) / 100) * 0.8;
    const leakageMax = inputs.revenue * (Math.max(0, gpLeakagePercent) / 100) * 1.2;

    const pillars: LockedPillar[] = [
        { id: 'revenue-quality', name: 'Revenue Quality Score', category: 'revenue-profitability', status: grossProfitPercent < 20 ? 'critical' : grossProfitPercent < 40 ? 'warning' : 'healthy', barWidth: Math.min(100, grossProfitPercent * 1.5), isLocked: true, computedValue: `${grossProfitPercent.toFixed(1)}%`, computedLabel: 'Gross profit retained from every dollar of revenue' },
        { id: 'labor-efficiency', name: 'Labor Efficiency Ratio', category: 'operational-efficiency', status: gpPerLaborHour < 15 ? 'critical' : gpPerLaborHour < 30 ? 'warning' : 'healthy', barWidth: Math.min(100, gpPerLaborHour * 2), isLocked: true, computedValue: `$${gpPerLaborHour.toFixed(0)}/hr`, computedLabel: 'Gross profit generated per hour of labor invested' },
        { id: 'inventory-decay', name: 'Inventory Decay Rate', category: 'operational-efficiency', status: phantomDrainRisk ? 'critical' : gpLeakagePercent > 3 ? 'warning' : 'healthy', barWidth: Math.max(5, 100 - gpLeakagePercent * 8), isLocked: true, computedValue: `${gpLeakagePercent.toFixed(1)}%`, computedLabel: 'Revenue lost to the gap between ideal and actual material costs' },
        { id: 'anomaly-detection', name: 'Anomaly Detection Score', category: 'growth-risk', status: efficiencyVerdict === 'fortress' ? 'healthy' : efficiencyVerdict, barWidth: Math.max(5, 100 - opexToGpRatio), isLocked: true, computedValue: `${opexToGpRatio.toFixed(1)}%`, computedLabel: 'How much of your gross profit is consumed by operating expenses' }
    ];

    return {
        layer1: { grossProfitPercent, gpLeakagePercent, opexToGpRatio, gpPerLaborHour },
        layer2: { efficiencyVerdict, phantomDrainRisk, leakageValue: { min: leakageMin, max: leakageMax } },
        layer3: { pillars }
    };
}

export function calculateGrowthScan(inputs: GrowthScanInputs): GrowthScanResult {
    const variableCosts = inputs.materials + inputs.fees + inputs.returns;
    const cm = inputs.revenue - variableCosts;
    const contributionMarginPercent = inputs.revenue > 0 ? (cm / inputs.revenue) * 100 : 0;

    const cmRatio = contributionMarginPercent / 100;
    const breakEvenPoint = cmRatio > 0 ? inputs.opex / cmRatio : 0;

    const cac = inputs.newCustomers > 0 ? inputs.marketing / inputs.newCustomers : 0;
    const ltvCacRatio = cac > 0 ? inputs.ltv / cac : 99;

    const netMarginPerNewCustomer = inputs.newCustomers > 0 ? cm / inputs.newCustomers : 0;
    const cacPayback = netMarginPerNewCustomer > 0 ? cac / netMarginPerNewCustomer : 99;

    const viabilityVerdict = ltvCacRatio < 2 ? 'critical' : ltvCacRatio < 3 ? 'warning' : 'fortress';
    const deathSpiralRisk = viabilityVerdict === 'critical' && inputs.revenue < breakEvenPoint;

    // Revenue gap from break-even
    const revenueGapPercent = breakEvenPoint > 0 ? ((inputs.revenue - breakEvenPoint) / breakEvenPoint) * 100 : 0;

    const pillars: LockedPillar[] = [
        { id: 'pricing-power', name: 'Pricing Power Index', category: 'revenue-profitability', status: contributionMarginPercent < 20 ? 'critical' : contributionMarginPercent < 40 ? 'warning' : 'healthy', barWidth: Math.min(100, contributionMarginPercent * 1.5), isLocked: true, computedValue: `${contributionMarginPercent.toFixed(1)}%`, computedLabel: 'Revenue remaining after all variable costs are subtracted' },
        { id: 'profit-quality', name: 'Profit Quality Assessment', category: 'revenue-profitability', status: deathSpiralRisk ? 'critical' : revenueGapPercent < 10 ? 'warning' : 'healthy', barWidth: Math.max(5, Math.min(100, 50 + revenueGapPercent)), isLocked: true, computedValue: `${revenueGapPercent > 0 ? '+' : ''}${revenueGapPercent.toFixed(1)}%`, computedLabel: 'How far your revenue sits above or below your break-even point' },
        { id: 'growth-sustainability', name: 'Growth Sustainability Index', category: 'growth-risk', status: viabilityVerdict === 'fortress' ? 'healthy' : viabilityVerdict, barWidth: Math.min(100, ltvCacRatio * 20), isLocked: true, computedValue: `${ltvCacRatio.toFixed(1)}x`, computedLabel: 'Customer lifetime value relative to the cost of acquiring them' },
        { id: 'market-resilience', name: 'Market Resilience Score', category: 'growth-risk', status: cac > inputs.ltv * 0.5 ? 'critical' : cac > inputs.ltv * 0.33 ? 'warning' : 'healthy', barWidth: Math.max(5, Math.min(100, (1 - cac / Math.max(1, inputs.ltv)) * 100)), isLocked: true, computedValue: `$${cac.toFixed(0)}`, computedLabel: 'Your current cost to acquire a single new customer' }
    ];

    return {
        layer1: { contributionMarginPercent, breakEvenPoint, cac, ltvCacRatio, cacPayback },
        layer2: { viabilityVerdict, deathSpiralRisk },
        layer3: { pillars }
    };
}
