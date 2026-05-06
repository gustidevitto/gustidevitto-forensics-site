import { calculateFIPLiteResults } from '../lib/fip-engine';
import { FIPLiteInputs } from '../types/fip-lite';

/**
 * FIP™ ENGINE STRESS TEST & INTEGRITY AUDIT
 * Purpose: Detect logical anomalies and verify Wisdom Kernel reaction.
 */

function runSimulation() {
    console.log("--- STARTING FIP™ FORENSIC SIMULATION ---");

    // SCENARIO 1: THE FRAGILE GIANT (Fragility Veto)
    // Business looks good on surface but has no cash buffer.
    const fragileInputs: FIPLiteInputs = {
        industryType: 'restaurant-cafe',
        monthlyRevenue: 100000,
        monthlyCOGS: 30000,
        monthlyOpEx: 60000, // Margin is okay ($10k profit)
        actualMonthlyLaborCost: 25000,
        monthlyDebtService: 2000,
        currentCash: 12000, // Very low cash (only 0.2 months runway)
        teamSize: 10,
        growthRate: 5,
        businessAge: 3
    };

    console.log("\n[Scenario 1: Fragile Giant]");
    const res1 = calculateFIPLiteResults(fragileInputs);
    console.log("Status:", res1.wisdom?.status);
    console.log("Vetos:", res1.wisdom?.vetos);
    console.log("Narratives:", res1.wisdom?.narratives);
    
    if (res1.wisdom?.status !== 'VETOED') {
        console.error("ANOMALY DETECTED: Scenario 1 should have been VETOED (Fragility).");
    } else {
        console.log("SUCCESS: Fragility Veto triggered correctly.");
    }

    // SCENARIO 2: THE ENTROPY TRAP (Complexity Veto)
    // High headcount, high coordination tax.
    const bloatedInputs: FIPLiteInputs = {
        ...fragileInputs,
        currentCash: 200000, // Plenty of cash
        teamSize: 45, // 45 people for $100k revenue? Entropy!
    };

    console.log("\n[Scenario 2: Entropy Trap]");
    const res2 = calculateFIPLiteResults(bloatedInputs);
    console.log("Status:", res2.wisdom?.status);
    console.log("Narratives:", res2.wisdom?.narratives);
    
    if (res2.wisdom?.status !== 'VETOED') {
        console.error("ANOMALY DETECTED: Scenario 2 should have been VETOED (Complexity).");
    } else {
        console.log("SUCCESS: Complexity Veto triggered correctly.");
    }

    // SCENARIO 3: VALUATION HALLUCINATION
    // Owner draw is low, but owner replacement cost is high.
    const illusionInputs: FIPLiteInputs = {
        ...fragileInputs,
        monthlyOpEx: 40000, // Lower opex = higher EBITDA
        currentCash: 500000,
        teamSize: 5
    };

    console.log("\n[Scenario 3: Valuation Illusion]");
    const res3 = calculateFIPLiteResults(illusionInputs);
    console.log("Adjusted Valuation Narrative exists:", res3.wisdom?.narratives.some(n => n.includes("VALUATION AUDIT")));
    
    console.log("\n--- SIMULATION COMPLETE ---");
}

// In a real environment, we'd run this.
// runSimulation();
