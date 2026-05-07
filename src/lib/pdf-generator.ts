import { jsPDF } from 'jspdf';
import type { FIPLiteResult, LockedPillar } from '@/types/fip-lite';

/**
 * FIP™ Lite - PDF Report Generator
 * Generates a clinical forensic report based on diagnostic results.
 */

export async function generateFIPLitePDF(results: FIPLiteResult, name: string, businessName: string) {
    const doc = new jsPDF();
    const primaryColor = '#7c3aed'; // Purple-600
    const dangerColor = '#ef4444'; // Red-500
    const warningColor = '#f59e0b'; // Amber-500
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

    // Efficiency Index Gauge
    doc.setLineWidth(2);
    doc.setDrawColor(primaryColor);
    doc.circle(105, 115, 30, 'S');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text(`${results.layer2.efficiencyIndex.toFixed(0)}%`, 105, 120, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.text('EFFICIENCY INDEX', 105, 132, { align: 'center' });

    // Verdict
    doc.setFontSize(20);
    const vColor = results.layer2.riskVerdict === 'fortress' ? successColor : results.layer2.riskVerdict === 'warning' ? warningColor : dangerColor;
    doc.setTextColor(vColor);
    doc.text(results.layer2.verdictLabel.toUpperCase(), 105, 155, { align: 'center' });

    // Key Metrics Grid
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('CORE FINANCIAL VECTORS', 20, 185);

    let y = 200;
    
    const metrics = [
        { label: 'CASH RUNWAY', value: `${results.layer1.cashRunwayDays} DAYS` },
        { label: 'GROSS PROFIT MARGIN', value: `${results.layer1.grossProfitPercent.toFixed(1)}%` },
        { label: 'MONTHLY BURN RATE', value: `$${results.layer1.netBurnRate.toLocaleString()}` },
        { label: 'BREAK-EVEN REVENUE', value: `$${results.layer1.breakEvenRevenue.toLocaleString()}` }
    ];

    metrics.forEach((m) => {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text(m.label, 20, y);
        doc.setTextColor(255, 255, 255);
        doc.text(m.value, 190, y, { align: 'right' });

        doc.setFillColor(40, 40, 40);
        doc.rect(20, y + 2, 170, 1, 'F');
        y += 15;
    });

    addFooter(1);

    // --- PAGE 2: DIAGNOSTIC X-RAY ---
    doc.addPage();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('FORENSIC X-RAY: 8 CORE PILLARS', 20, 25);

    y = 40;
    results.layer3.pillars.forEach((p: LockedPillar, i: number) => {
        doc.setFontSize(9);
        doc.setTextColor(200, 200, 200);
        doc.setFont('helvetica', 'bold');
        doc.text(`${i + 1}. ${p.name.toUpperCase()}`, 20, y);

        const pColor = p.status === 'healthy' ? successColor : p.status === 'warning' ? warningColor : dangerColor;

        doc.setTextColor(pColor);
        doc.setFont('helvetica', 'normal');
        doc.text(p.computedValue, 190, y, { align: 'right' });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(p.computedLabel, 20, y + 5);

        doc.setFillColor(30, 30, 30);
        doc.rect(20, y + 8, 170, 2, 'F');
        doc.setFillColor(pColor);
        doc.rect(20, y + 8, (p.barWidth / 100) * 170, 2, 'F');

        y += 18;
    });

    // Leakage Summary
    y += 10;
    doc.setDrawColor(dangerColor);
    doc.rect(20, y, 170, 35, 'S');

    doc.setTextColor(dangerColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ESTIMATED ANNUAL PROFIT LEAKAGE', 25, y + 10);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(`$${results.layer3.estimatedAnnualImpact.min.toLocaleString()} - $${results.layer3.estimatedAnnualImpact.max.toLocaleString()}`, 25, y + 22);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text('Based on industry benchmarking and structural inefficiency mapping.', 25, y + 30);

    addFooter(2);

    // Save
    doc.save(`FIP_Diagnostic_${businessName.replace(/\s+/g, '_')}.pdf`);
}
