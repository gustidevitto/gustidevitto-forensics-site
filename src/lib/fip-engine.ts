import type {
    FIPLiteInputs,
    FIPLiteResult,
    IndustryType,
    IndustryBenchmarks,
    Layer1Numbers,
    Layer2Comparison,
    Layer3LockedXray,
    LockedPillar,
    PillarCategory
} from '@/types/fip-lite';

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
    const netProfit = grossProfit - netBurnRate;

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

    // Estimated leakage calculation (range-based for curiosity)
    const potentialGPGap = Math.max(0, industryMin - yourGP);
    const leakageMin = (potentialGPGap / 100) * inputs.monthlyRevenue * 0.6; // Conservative
    const leakageMax = (potentialGPGap / 100) * inputs.monthlyRevenue * 1.4; // Aggressive

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

    // Generate 18 locked pillars with realistic status distribution
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
        { id: 'profit-quality', name: 'Profit Quality Assessment', category: 'revenue-profitability' as PillarCategory }
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
            isLocked: true
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
export function calculateFIPLiteResultsLegacy(formData: any): any {
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
