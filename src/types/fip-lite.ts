/**
 * FIP™ Lite - Type Definitions
 * Comprehensive business health diagnostic system
 */

// ============================================================================
// PILLAR CATEGORIES
// ============================================================================

export type PillarCategory =
    | 'revenue-profitability'
    | 'cash-flow'
    | 'operational-efficiency'
    | 'growth-risk'

// ============================================================================
// INDIVIDUAL PILLAR METRICS
// ============================================================================

export interface PillarMetric {
    id: string
    category: PillarCategory
    value: number | null
    score: number // 0-100
    status: 'healthy' | 'warning' | 'critical'
    benchmark?: number
}

// ============================================================================
// STEP 1: REVENUE & PROFITABILITY
// ============================================================================

export interface RevenueProfitabilityInputs {
    // Net Profit per Transaction
    totalRevenue: number
    totalTransactions: number
    totalCosts: number

    // Gross Profit Leakage
    theoreticalGrossProfit: number
    actualGrossProfit: number

    // OPEX to GP Ratio
    operatingExpenses: number
    grossProfit: number

    // Contribution Margin per SKU
    topSKURevenue: number
    topSKUVariableCosts: number
}

// ============================================================================
// STEP 2: CASH FLOW & LIQUIDITY
// ============================================================================

export interface CashFlowInputs {
    // Cash Runway
    currentCash: number
    monthlyBurnRate: number

    // Net Cash Lock
    inventoryValue: number
    accountsReceivable: number
    accountsPayable: number

    // Cash Realization Lag
    realizationLagDays: number

    // Net Burn Rate
    cashInflows: number
    cashOutflows: number
}

// ============================================================================
// STEP 3: OPERATIONAL EFFICIENCY
// ============================================================================

export interface OperationalEfficiencyInputs {
    // GP per Labor Hour
    totalGrossProfit: number
    totalLaborHours: number

    // Inventory Decay Rate
    inventoryAtStart: number
    inventoryAtEnd: number
    inventorySpoilage: number

    // BEP Dynamics
    fixedCosts: number
    variableCostPerUnit: number
    pricePerUnit: number

    // Insight-to-Surprise Ratio
    plannedEvents: number
    unplannedEvents: number
}

// ============================================================================
// STEP 4: GROWTH & RISK
// ============================================================================

export interface GrowthRiskInputs {
    // LTGP Velocity
    ltgpMonth1: number
    ltgpMonth2: number
    ltgpMonth3: number

    // LTV:CAC Ratio
    customerLifetimeValue: number
    customerAcquisitionCost: number

    // Risk Exposure Index
    currentLiabilities: number
    currentAssets: number

    // Single Point of Failure
    largestRevenueSource: number
    totalRevenue: number
}

// ============================================================================
// COMBINED FORM DATA
// ============================================================================

export interface FIPLiteFormData {
    step1: RevenueProfitabilityInputs
    step2: CashFlowInputs
    step3: OperationalEfficiencyInputs
    step4: GrowthRiskInputs
}

// ============================================================================
// CALCULATION RESULTS
// ============================================================================

export interface PillarResult {
    id: string
    name: string
    category: PillarCategory
    score: number // 0-100
    status: 'healthy' | 'warning' | 'critical'
    value: number
    benchmark: number
    recommendation: string
}

export interface HealthScoreResult {
    overallScore: number // 0-100
    verdict: 'fortress' | 'warning' | 'critical'
    verdictLabel: string
    verdictColor: string
    pillars: PillarResult[]
    topRisks: PillarResult[] // Top 3 critical pillars
    strengths: PillarResult[] // Top 3 healthy pillars
    categoryScores: {
        revenueProfitability: number
        cashFlow: number
        operationalEfficiency: number
        growthRisk: number
    }
}

// ============================================================================
// LEAD CAPTURE
// ============================================================================

export interface FIPLiteLeadData {
    name: string
    email: string
    phone?: string
    businessName?: string
    healthScore: number
    verdict: string
    topRisks: string[]
    timestamp: string
    source: 'fip-lite'
}

// ============================================================================
// PDF REPORT CONFIG
// ============================================================================

export interface PDFReportConfig {
    includeCharts: boolean
    includeRecommendations: boolean
    includeDisclaimer: boolean
    brandingColor: string
    logoUrl?: string
}

// ============================================================================
// FORM STATE MANAGEMENT
// ============================================================================

export interface FIPLiteState {
    currentStep: 1 | 2 | 3 | 4
    formData: Partial<FIPLiteFormData>
    results: HealthScoreResult | null
    isCalculating: boolean
    isGeneratingPDF: boolean
    leadCaptured: boolean
    leadData: { name: string, email: string, businessName: string } | null
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}
