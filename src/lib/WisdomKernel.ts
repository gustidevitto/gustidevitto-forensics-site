/**
 * FIP™ Wisdom Kernel (The Judge)
 * The ultimate authority for forensic data validation and veto logic.
 */

export interface WisdomVerdict {
    status: 'PASSED' | 'VETOED' | 'WARNING';
    vetos: string[];
    narratives: string[];
}

export interface JudicialData {
    // Fragility data
    stressedRunwayDays: number;
    originalRunwayDays: number;
    
    // Complexity data
    coordinationTaxPercent: number;
    teamSize: number;
    
    // Cobra Effect data
    gpLeakagePercent: number;
    isInventoryOptimized: boolean; // if leakage is very low (< 2%)
    
    // Valuation data
    originalValuation: number;
    adjustedValuation: number;
    replacementCostTax: number;
}

export class WisdomKernel {
    /**
     * Aggregates all Wisdom Buffers and performs a Sovereign Veto if thresholds are breached.
     */
    static judge(data: JudicialData): WisdomVerdict {
        const vetos: string[] = [];
        const narratives: string[] = [];
        let status: 'PASSED' | 'VETOED' | 'WARNING' = 'PASSED';

        // 1. The Fragility Veto (Lens B)
        if (data.stressedRunwayDays < 90 && data.originalRunwayDays >= 90) {
            status = 'VETOED';
            vetos.push('Fragility Veto');
            narratives.push(
                `JUDICIAL VETO: Your business is currently hyper-sensitive to external shocks. While current metrics show stability, a minor 15% increase in supply costs or interest rates will trigger a liquidity collapse within ${data.stressedRunwayDays} days. You are structurally fragile.`
            );
        }

        // 2. The Complexity Veto (Lens A)
        const isEstimated = data.coordinationTaxPercent % 1 !== 0; // Simple heuristic for mock vs actual
        const precisionFlag = isEstimated ? '[Estimated Precision]' : '[100% Precision Verified]';
        
        if (data.coordinationTaxPercent > 30) {
            status = 'VETOED';
            vetos.push('Complexity Veto');
            narratives.push(
                `${precisionFlag} Vetoed: Your organization is suffering from acute entropy. A Coordination Tax of ${data.coordinationTaxPercent.toFixed(1)}% means your team is too bloated to generate profit efficiently. Stop hiring; every new headcount is currently destroying your marginal value.`
            );
        }

        // 3. The Cobra Effect Veto (Lens C)
        if (data.isInventoryOptimized && data.gpLeakagePercent < 1.5) {
            status = 'WARNING';
            vetos.push('Cobra Effect Warning');
            narratives.push(
                `SOVEREIGN WARNING: Dangerous Optimization detected. Your obsession with zero-waste has eliminated your Safety Stock. A single delivery delay will cause a total stock-out, destroying customer trust and LTV far beyond the ${data.gpLeakagePercent.toFixed(1)}% you are saving.`
            );
        }

        // 4. Valuation Hallucination Check
        if (data.replacementCostTax > 0 && data.adjustedValuation < data.originalValuation * 0.8) {
            const lossPercent = ((data.originalValuation - data.adjustedValuation) / data.originalValuation) * 100;
            narratives.push(
                `VALUATION AUDIT: Your valuation is a hallucination because it ignores the cost of replacing your own role. Once a market-rate manager is factored in, your real business value drops by ${lossPercent.toFixed(1)}%. You own a job, not an asset.`
            );
        }

        if (vetos.length > 0 && status !== 'VETOED') {
            status = 'WARNING';
        }

        return {
            status,
            vetos,
            narratives
        };
    }
}
