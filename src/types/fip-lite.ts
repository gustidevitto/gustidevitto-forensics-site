/**
 * FIP™ Lite v2 - "The MRI Scan" Type Definitions
 * Lead magnet with 4-layer psychological architecture
 */

// ============================================================================
// INDUSTRY BENCHMARKS
// ============================================================================

export type IndustryType =
    | 'restaurant-cafe'
    | 'retail-ecommerce'
    | 'saas-tech'
    | 'manufacturing'
    | 'professional-services'
    | 'healthcare'
    | 'construction'
    | 'other'

export interface IndustryBenchmarks {
    grossProfitMin: number // %
    grossProfitMax: number // %
    opexRatioMax: number // % of revenue
    netMarginMin: number // %
    runwayMonthsMin: number
    revenuePerHeadMin: number // monthly
}

// ============================================================================
// INPUT (8 Fields - The Goldilocks Zone)
// ============================================================================

export interface FIPLiteInputs {
    monthlyRevenue: number
    monthlyCOGS: number
    monthlyOpEx: number // Fixed costs
    currentCash: number
    monthlyDebtService: number // Optional, defaults to 0
    industryType: IndustryType
    businessAge: number // years
    teamSize: number // headcount
}

// ============================================================================
// LAYER 1: THE NUMBERS (Free, Specific, Scary)
// ============================================================================

export interface Layer1Numbers {
    cashRunwayDays: number
    cashZeroDate: string // ISO date string
    grossProfitPercent: number
    netBurnRate: number // monthly
    breakEvenRevenue: number
    currentRevenue: number
}

// ============================================================================
// LAYER 2: THE COMPARISON (Free, Vague, Creates Gap)
// ============================================================================

export interface Layer2Comparison {
    gpVsIndustry: {
        yourGP: number
        industryMin: number
        industryMax: number
        gap: number // negative if below
    }
    estimatedLeakage: {
        min: number // monthly $
        max: number // monthly $
    }
    efficiencyIndex: number // % compared to industry (100 = at par, <100 = below)
    riskVerdict: 'fortress' | 'warning' | 'critical'
    verdictLabel: string
    verdictColor: string
}

// ============================================================================
// LAYER 3: LOCKED PILLARS (The Conversion Engine)
// ============================================================================

export interface LockedPillar {
    id: string
    name: string
    category: PillarCategory
    status: 'healthy' | 'warning' | 'critical' // Color only, no score
    barWidth: number // 0-100, for visual only (blurred)
    isLocked: true
}

export interface Layer3LockedXray {
    pillars: LockedPillar[]
    criticalCount: number
    warningCount: number
    estimatedAnnualImpact: {
        min: number
        max: number
    }
}

// ============================================================================
// PILLAR CATEGORIES
// ============================================================================

export type PillarCategory =
    | 'revenue-profitability'
    | 'cash-flow'
    | 'operational-efficiency'
    | 'growth-risk'

// ============================================================================
// COMPLETE RESULT (All 4 Layers)
// ============================================================================

export interface FIPLiteResult {
    layer1: Layer1Numbers
    layer2: Layer2Comparison
    layer3: Layer3LockedXray
    // Layer 4 is just the CTA in the UI, no data structure needed
}

// ============================================================================
// FORM STATE MANAGEMENT
// ============================================================================

export interface FIPLiteState {
    formData: Partial<FIPLiteInputs>
    results: FIPLiteResult | null
    isCalculating: boolean
    isGeneratingPDF: boolean
    leadCaptured: boolean
    leadData: { name: string, email: string, businessName: string } | null
}

// ============================================================================
// LEAD CAPTURE
// ============================================================================

export interface FIPLiteLeadData {
    name: string
    email: string
    phone?: string
    businessName?: string
    cashRunwayDays: number
    riskVerdict: string
    estimatedLeakageMin: number
    estimatedLeakageMax: number
    timestamp: string
    source: 'fip-lite-v2'
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}

// ============================================================================
// LEGACY TYPES (Keep for backward compatibility, mark as deprecated)
// ============================================================================

/** @deprecated Use FIPLiteInputs instead */
export interface RevenueProfitabilityInputs {
    totalRevenue: number
    transactionCount: number
}

/** @deprecated Use FIPLiteInputs instead */
export interface CashFlowInputs {
    idealCogs: number
    actualMaterial: number
    directLabor: number
    wasteSpoilage: number
}

/** @deprecated Use FIPLiteInputs instead */
export interface OperationalEfficiencyInputs {
    rentUtilities: number
    payrollMgmt: number
    marketingSpend: number
    generalAdmin: number
    cashOnHand: number
    inventoryValue: number
}

/** @deprecated Use FIPLiteInputs instead */
export interface GrowthRiskInputs {
    accountsPayable: number
    shortTermDebt: number
    headcount: number
    totalWorkingHours: number
}

/** @deprecated Use FIPLiteInputs instead */
export interface FIPLiteFormData {
    step1: RevenueProfitabilityInputs
    step2: CashFlowInputs
    step3: OperationalEfficiencyInputs
    step4: GrowthRiskInputs
}

/** @deprecated Use Layer3LockedXray instead */
export interface PillarResult {
    id: string
    name: string
    category: PillarCategory
    score: number
    status: 'healthy' | 'warning' | 'critical'
    value: number
    benchmark: number
    recommendation: string
}

/** @deprecated Use FIPLiteResult instead */
export interface HealthScoreResult {
    overallScore: number
    verdict: 'fortress' | 'warning' | 'critical'
    verdictLabel: string
    verdictColor: string
    pillars: PillarResult[]
    topRisks: PillarResult[]
    strengths: PillarResult[]
    categoryScores: {
        revenueProfitability: number
        cashFlow: number
        operationalEfficiency: number
        growthRisk: number
    }
}
