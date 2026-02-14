import { jsPDF } from 'jspdf';
import type { HealthScoreResult } from '@/types/fip-lite';

/**
 * FIP™ Lite - PDF Report Generator
 * Generates a clinical forensic report based on diagnostic results.
 */

export async function generateFIPLitePDF(results: HealthScoreResult, name: string, businessName: string) {
    const doc = new jsPDF();
    const primaryColor = '#7c3aed'; // Purple-600
    const dangerColor = '#ef4444'; // Red-500
    const successColor = '#10b981'; // Emerald-500

    const addFooter = (pageNum: number) => {
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`CONFIDENTIAL // GUSTI DEVITTO FORENSICS // PAGE ${pageNum}`, 105, 285, { align: 'center' });
        doc.text('NO FIND NO PITCH GUARANTEE APPLIES', 105, 290, { align: 'center' });
    };

    // --- PAGE 1: EXECUTIVE SUMMARY ---
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    // Branding
    doc.setTextColor(primaryColor);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('FIP™ PROTOCOL', 20, 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text('CLINICAL BUSINESS HEALTH FORENSICS // VERIFIED ACCESS', 20, 38);
    doc.text(`ID: ${Math.random().toString(36).substring(2, 9).toUpperCase()}`, 160, 38);

    doc.setDrawColor(primaryColor);
    doc.line(20, 42, 190, 42);

    // Business Intelligence
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(businessName.toUpperCase(), 20, 55);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`OWNER/OPERATOR: ${name.toUpperCase()}`, 20, 62);
    doc.text(`DIAGNOSTIC DATE: ${new Date().toLocaleDateString()}`, 20, 67);

    // Overall Score Gauge
    doc.setLineWidth(2);
    doc.setDrawColor(primaryColor);
    doc.circle(105, 115, 30, 'S');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.text(`${results.overallScore}`, 105, 120, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.text('TOTAL HEALTH SCORE', 105, 132, { align: 'center' });

    // Verdict
    doc.setFontSize(20);
    const vColor = results.verdict === 'fortress' ? successColor : results.verdict === 'warning' ? '#f59e0b' : dangerColor;
    doc.setTextColor(vColor);
    doc.text(results.verdictLabel.toUpperCase(), 105, 155, { align: 'center' });

    // Category Grid
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('DIAGNOSTIC VECTORS', 20, 185);

    let y = 200;
    const catLabels: Record<string, string> = {
        revenueProfitability: 'REVENUE & PROFITABILITY',
        cashFlow: 'CASH FLOW & LIQUIDITY',
        operationalEfficiency: 'OPERATIONAL EFFICIENCY',
        growthRisk: 'GROWTH & RISK EXPOSURE'
    };

    Object.entries(results.categoryScores).forEach(([cat, score]) => {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text(catLabels[cat] || cat.toUpperCase(), 20, y);
        doc.setTextColor(255, 255, 255);
        doc.text(`${score}/100`, 175, y);

        doc.setFillColor(40, 40, 40);
        doc.rect(20, y + 2, 170, 2, 'F');
        doc.setFillColor(primaryColor);
        doc.rect(20, y + 2, (score / 100) * 170, 2, 'F');
        y += 18;
    });

    addFooter(1);

    // --- PAGE 2: THE 16 PILLARS BREAKDOWN ---
    doc.addPage();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('16-PILLAR GRANULAR AUDIT', 20, 25);

    y = 40;
    results.pillars.forEach((p, i) => {
        if (i === 8) { // Split to Page 3 if needed, but we'll try to fit or add page
            // For 16, we might need a 3rd page or smaller rows. 
            // Let's use two columns per page maybe? No, let's just make rows compact.
        }

        doc.setFontSize(9);
        doc.setTextColor(200, 200, 200);
        doc.text(`${i + 1}. ${p.name}`, 20, y);

        const pScore = p.score;
        const pColor = pScore > 80 ? successColor : pScore > 50 ? '#f59e0b' : dangerColor;

        doc.setTextColor(pColor);
        doc.text(`${pScore}%`, 180, y, { align: 'right' });

        doc.setFillColor(30, 30, 30);
        doc.rect(20, y + 2, 170, 1, 'F');
        doc.setFillColor(pColor);
        doc.rect(20, y + 2, (pScore / 100) * 170, 1, 'F');

        y += 12;

        if (y > 270) {
            addFooter(2);
            doc.addPage(); y = 25;
            doc.setFillColor(0, 0, 0); doc.rect(0, 0, 210, 297, 'F');
            doc.setTextColor(primaryColor); doc.setFontSize(18); doc.text('16-PILLAR AUDIT (CONT.)', 20, 25);
            y = 40;
        }
    });

    // --- PAGE 3: RECOMMENDATIONS ---
    doc.addPage();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(dangerColor);
    doc.setFontSize(18);
    doc.text('CRITICAL VULNERABILITIES', 20, 25);

    y = 40;
    results.topRisks.forEach((risk) => {
        doc.setDrawColor(dangerColor);
        doc.rect(20, y, 170, 35, 'S');

        doc.setTextColor(dangerColor);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(risk.name.toUpperCase(), 25, y + 8);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(`PRESCRIPTION: ${risk.recommendation}`, 160);
        doc.text(lines, 25, y + 16);

        y += 42;
    });

    y += 10;
    doc.setTextColor(successColor);
    doc.setFontSize(18);
    doc.text('PRIMARY FORTIFICATIONS', 20, y);
    y += 15;

    results.strengths.forEach((s) => {
        doc.setFontSize(10);
        doc.setTextColor(successColor);
        doc.text(`[+] ${s.name.toUpperCase()}`, 20, y);
        y += 8;
    });

    addFooter(3);

    // Save
    doc.save(`FIP_Forensic_Report_${businessName.replace(/\s+/g, '_')}.pdf`);
}
