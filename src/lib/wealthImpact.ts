/**
 * FIP™ Wealth Impact Analysis
 * Core Valuation Logic with "Double-Dip Guard"
 */

export interface ValuationInputs {
    ebitda: number;
    ownerDraw: number;
    capex: number;
    isOwnerDrawInOpex: boolean;
    isCapexInOpex: boolean;
    industryMultiplier: number;
    marketReplacementSalary: number; // The 'Wisdom Buffer' for Lens C
}

/**
 * Calculates the Adjusted EBITDA with Double-Dip Guard and Replacement Cost Audit.
 */
export function calculateAdjustedEBITDA(inputs: ValuationInputs) {
    let adjustedEBITDA = inputs.ebitda;

    // DOUBLE-DIP GUARD:
    if (inputs.isOwnerDrawInOpex) {
        adjustedEBITDA += inputs.ownerDraw;
    }

    if (inputs.isCapexInOpex) {
        adjustedEBITDA += inputs.capex;
    }

    // Lense C: Replacement Cost Audit
    // Subtract the cost of hiring a manager to replace the owner's functional labor.
    const ebitdaBeforeReplacement = adjustedEBITDA;
    adjustedEBITDA -= inputs.marketReplacementSalary;

    const valuation = Math.max(0, adjustedEBITDA) * inputs.industryMultiplier;

    return {
        ebitdaBeforeReplacement,
        adjustedEBITDA,
        valuation,
        impactOfAddbacks: ebitdaBeforeReplacement - inputs.ebitda,
        replacementCostTax: inputs.marketReplacementSalary
    };
}
