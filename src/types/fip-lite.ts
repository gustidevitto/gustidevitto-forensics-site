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

// ============================================================================
// STEP 1: REVENUE BASELINE
// ============================================================================

export interface RevenueProfitabilityInputs {
    totalRevenue: number
    transactionCount: number
}

// ============================================================================
// STEP 2: COST OF GOODS SOLD (COGS)
// ============================================================================

export interface CashFlowInputs {
    idealCogs: number
    actualMaterial: number
    directLabor: number
    wasteSpoilage: number
}

// ============================================================================
// STEP 3: OPEX & ASSETS
// ============================================================================

export interface OperationalEfficiencyInputs {
    rentUtilities: number
    payrollMgmt: number
    marketingSpend: number
    generalAdmin: number
    cashOnHand: number
    inventoryValue: number
}

// ============================================================================
// STEP 4: LIABILITIES & OPS
// ============================================================================

export interface GrowthRiskInputs {
    accountsPayable: number
    shortTermDebt: number
    headcount: number
    totalWorkingHours: number
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
