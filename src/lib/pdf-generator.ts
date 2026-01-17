import { jsPDF } from 'jspdf';
import type { HealthScoreResult } from '@/types/fip-lite';

/**
 * FIP™ Lite - PDF Report Generator
 * Generates a clinical forensic report based on diagnostic results.
 */

export async function generateFIPLitePDF(results: HealthScoreResult, name: string, businessName: string) {
    const doc = new jsPDF();
    const primaryColor = '#7c3aed'; // Purple-600 (approx)

    // Page 1: Executive Summary
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    // Logo / Header
    doc.setTextColor(primaryColor);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('FIP™ FORENSIC REPORT', 20, 30);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`CONFIDENTIAL // L-9 AUTHORIZATION REQUIRED`, 20, 40);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 150, 40);

    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Business Info
    doc.setFontSize(12);
    doc.text(`BUSINESS: ${businessName.toUpperCase()}`, 20, 60);
    doc.text(`OPERATOR: ${name.toUpperCase()}`, 20, 70);

    // Overall Score
    doc.setDrawColor(primaryColor);
    doc.setFillColor(primaryColor);
    doc.setLineWidth(1);
    doc.circle(105, 120, 30, 'S');

    doc.setFontSize(48);
    doc.text(`${results.overallScore}`, 105, 125, { align: 'center' });
    doc.setFontSize(10);
    doc.text('OVERALL HEALTH SCORE', 105, 135, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(results.verdict === 'fortress' ? '#10b981' : results.verdict === 'warning' ? '#f59e0b' : '#ef4444');
    doc.text(results.verdictLabel, 105, 160, { align: 'center' });

    // Category Breakdown
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('ARCHITECTURAL VECTORS', 20, 190);

    let y = 205;
    Object.entries(results.categoryScores).forEach(([cat, score]) => {
        const label = cat.replace(/([A-Z])/g, ' $1').toUpperCase();
        doc.setFontSize(10);
        doc.text(label, 20, y);
        doc.text(`${score}/100`, 170, y);

        doc.setFillColor(30, 30, 30);
        doc.rect(20, y + 2, 170, 2, 'F');
        doc.setFillColor(primaryColor);
        doc.rect(20, y + 2, (score / 100) * 170, 2, 'F');

        y += 15;
    });

    // Page 2: Risks & Recommendations
    doc.addPage();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(primaryColor);
    doc.setFontSize(16);
    doc.text('CRITICAL RISK ANALYSIS', 20, 30);

    y = 50;
    results.topRisks.forEach((risk, i) => {
        doc.setDrawColor(239, 68, 68); // Red
        doc.rect(20, y, 170, 40, 'S');

        doc.setTextColor(239, 68, 68);
        doc.setFontSize(12);
        doc.text(`${i + 1}. ${risk.name.toUpperCase()}`, 25, y + 10);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`Severity Score: ${Math.round(100 - risk.score)}% Risk`, 25, y + 18);

        doc.setFont('helvetica', 'oblique');
        doc.text('Prescription:', 25, y + 28);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(risk.recommendation, 150);
        doc.text(lines, 50, y + 28);

        y += 50;
    });

    // Footer on P2
    doc.setTextColor(primaryColor);
    doc.setFontSize(8);
    doc.text('PROCESSED BY ANTIGRAVITY FORENSIC ENGINE // NO FIND NO PITCH GUARANTEE APPLIES', 105, 280, { align: 'center' });

    // Save
    doc.save(`FIP_Forensic_Report_${businessName.replace(/\s+/g, '_')}.pdf`);
}
