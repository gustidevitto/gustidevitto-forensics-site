# FIP-Lite v2: "The MRI Scan" — Implementation Plan

## 🎯 **OBJECTIVE**

Transform FIP-Lite from a **free doctor** (too much value) into an **MRI scan** (shows the tumor, creates urgency, but requires a surgeon for treatment).

---

## 📊 **PSYCHOLOGICAL ARCHITECTURE**

```
HOOK → VALIDATE → SCARE → TEASE → CONVERT
```

1. **HOOK:** "Free 30-second business health scan"
2. **VALIDATE:** Show real, accurate numbers (GP%, Runway, Burn Rate)
3. **SCARE:** Compare to industry benchmarks — show the GAP
4. **TEASE:** Show LOCKED forensic pillars, blurred heat map
5. **CONVERT:** "Unlock full 19-pillar diagnosis → $1,200"

---

## 🔢 **INPUT: THE GOLDILOCKS ZONE (8 FIELDS)**

| # | Field | Why It Exists | Target Audience |
|---|-------|---------------|-----------------|
| 1 | Monthly Revenue | Core metric | Both |
| 2 | Monthly COGS | Enables GP% calc | Both |
| 3 | Monthly Fixed Costs (OpEx) | Enables burn rate, BEP | Both |
| 4 | Current Cash Balance | Enables runway | Both |
| 5 | Monthly Debt Service (optional) | Refines burn rate | CFO/CPA |
| 6 | **Industry Type (dropdown)** | **Benchmark comparison — the key hook** | **Both** |
| 7 | Business Age (years, dropdown) | Context for "where you should be" | Founder |
| 8 | Team Size (headcount) | Enables revenue-per-head metric | CFO |

**Why 8 and not 5?**
- 5 inputs = generic calculator (any Excel template)
- 8 inputs = personalized results with industry benchmarks
- **Industry Type dropdown** = psychological anchor (makes it feel tailored)

---

## 📤 **OUTPUT: 4-LAYER REVEAL ARCHITECTURE**

### **Layer 1: "THE NUMBERS" — Free, Specific, Scary**

Real calculations. Undeniable. The founder goes "oh shit."

| Metric | Example Output | Psychology |
|--------|----------------|------------|
| Cash Runway | "67 days" + projected Cash-Zero Date: **April 19, 2026** | Dates are scarier than numbers |
| Gross Profit % | "Your GP: 42%" | Baseline reality check |
| Net Burn Rate | "$12,400/month bleeding out" | Visceral language |
| Break-Even Revenue | "You need $87,000/mo to survive. You make $65,000." | Gap = panic |

### **Layer 2: "THE COMPARISON" — Free, Vague, Creates Curiosity Gap**

Compare to benchmarks. Show the gap. Don't explain it.

| Output | Example | Curiosity Created |
|--------|---------|-------------------|
| GP vs Industry | "Your GP: 42%. Industry median: 55-62%." | "Why am I 13-20% below?" |
| Estimated Leakage | "$3,200 — $7,800/month in hidden capital drain" | "WHERE is it going?!" |
| Efficiency Index | "34% below industry peers in operational efficiency" | "Compared to WHAT? HOW?" |
| Risk Verdict | 🔴 CRITICAL / 🟡 WARNING / 🟢 FORTRESS | Emotional anchor |

**TIP:** The range ("$3,200 — $7,800") is intentional. A specific number ($5,500) feels final. A range feels like "it could be WORSE than I think" — this keeps the anxiety alive and the curiosity burning.

### **Layer 3: "THE LOCKED X-RAY" — The Killer Feature 🔒**

Show forensic pillar names and colors (red/yellow/green), but BLUR/LOCK the scores and details.

```
┌─────────────────────────────────────────────────────┐
│  FORENSIC HEAT MAP — 19 PILLAR SCAN                 │
│                                                     │
│  ██ GP Leakage Analysis        🔴 ██████░░ [🔒]    │
│  ██ Cash Velocity Index        🟡 ████████░ [🔒]    │
│  ██ Labor Efficiency Ratio     🔴 ███░░░░░░ [🔒]    │
│  ██ Break-Even Dynamics        🟡 ██████░░░ [🔒]    │
│  ██ Inventory Decay Rate       🟢 █████████ [🔒]    │
│  ██ ... 13 more pillars        ░░ ░░░░░░░░░ [🔒]    │
│                                                     │
│  ⚠ 3 CRITICAL vulnerabilities detected.             │
│  ⚠ Estimated annual impact: $38,400 — $93,600       │
│                                                     │
│  [ 🔓 UNLOCK FULL FORENSIC AUDIT → $1,200 ]        │
└─────────────────────────────────────────────────────┘
```

**This is the conversion engine.** The user can SEE the red areas. They can see pillar NAMES they recognize (GP Leakage, Cash Velocity). They can see the bars. But the actual scores, the explanations, the "how to fix" — all locked.

It's like looking at your own X-ray with the radiologist's notes blacked out. You KNOW something is wrong. You can SEE it. But you can't READ the diagnosis.

### **Layer 4: "THE CTA" — Relief from Anxiety**

Position the paid audit as RELIEF, not a product.

```
"Your business has 67 days of cash runway and an estimated 
 $3,200 — $7,800/month in hidden leakage across 3 critical pillars.
 
 A full FIP™ Forensic Audit will:
 ✓ Identify the EXACT sources of leakage across all 19 pillars
 ✓ Provide a prioritized recovery roadmap
 ✓ Project your 12-month financial trajectory
 
 → Book Full Forensic Audit ($1,200)"
```

---

## 🎯 **WHY THIS WORKS FOR BOTH AUDIENCES**

### **For Founders/Owners (Emotional Brain)**
- See scary numbers (runway, burn rate) → "I'm dying"
- See industry gap → "I'm worse than my competitors"
- See locked red pillars → "WHAT is wrong?!"
- **Trigger:** "I'm losing $5,000/month and I don't know where"

### **For CFOs/CPAs (Analytical Brain)**
- See GP%, BEP, Burn Rate → "These are legitimate metrics"
- See industry benchmarks → "I can present this to the board"
- See 19-pillar framework → "This tool has depth I respect"
- **Trigger:** "This tool knows things I should know. I need the full version."

---

## 🛠️ **IMPLEMENTATION CHECKLIST**

### **Phase 1: Types & Engine** ✅ (Already Complete)
- [x] `fip-lite.ts` - New types defined
- [x] `fip-engine.ts` - Calculation engine implemented
- [x] Industry benchmarks database
- [x] 4-layer output structure

### **Phase 2: UI Rebuild** 🔄 (In Progress)
- [ ] Replace 4-step wizard with single-page form (8 fields)
- [ ] Build Layer 1: Big scary numbers dashboard
- [ ] Build Layer 2: Benchmark comparison cards
- [ ] Build Layer 3: Locked forensic heat map (THE CONVERSION ENGINE)
- [ ] Build Layer 4: Relief-focused CTA section
- [ ] Mobile responsiveness optimization

### **Phase 3: Conversion Optimization**
- [ ] Add industry type dropdown with all 8 options
- [ ] Implement blurred/locked pillar visualization
- [ ] Add Cash-Zero Date countdown
- [ ] Add range-based leakage estimates
- [ ] Personalized CTA copy based on verdict

### **Phase 4: Testing**
- [ ] Test with "healthy business" numbers → GREEN verdict
- [ ] Test with "dying business" numbers → RED verdict with max urgency
- [ ] Test with "borderline" numbers → YELLOW with widest curiosity gap
- [ ] Mobile responsiveness check
- [ ] Verify locked pillars are visually compelling but NOT readable

---

## 📐 **UI WIREFRAME**

```
┌─────────────────────────────────────────────────────────────┐
│  FIP™ LITE v2 - BUSINESS HEALTH MRI                         │
│  Free 30-Second Diagnostic Scan                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  INPUT FORM (Single Page, 8 Fields)                         │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Monthly Revenue     │  │ Monthly COGS        │          │
│  └─────────────────────┘  └─────────────────────┘          │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Monthly OpEx        │  │ Current Cash        │          │
│  └─────────────────────┘  └─────────────────────┘          │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Debt Service (opt)  │  │ Industry Type ▼     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Business Age ▼      │  │ Team Size           │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
│  [  RUN DIAGNOSTIC SCAN  ]                                  │
└─────────────────────────────────────────────────────────────┘

↓ RESULTS ↓

┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: THE NUMBERS (Scary, Specific)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Cash Runway  │  │ Gross Profit │  │ Burn Rate    │      │
│  │   67 DAYS    │  │     42%      │  │  $12,400/mo  │      │
│  │ Zero: Apr 19 │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: THE COMPARISON (Vague, Creates Gap)               │
│  Your GP: 42%  │  Industry: 55-62%  │  Gap: -13 to -20%    │
│  Estimated Leakage: $3,200 — $7,800/month                   │
│  Efficiency Index: 34% below industry peers                 │
│  Verdict: 🔴 CRITICAL                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: LOCKED FORENSIC HEAT MAP 🔒                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ██ GP Leakage Analysis      🔴 ██████░░ [🔒]      │    │
│  │  ██ Cash Velocity Index      🟡 ████████░ [🔒]      │    │
│  │  ██ Labor Efficiency Ratio   🔴 ███░░░░░░ [🔒]      │    │
│  │  ██ Break-Even Dynamics      🟡 ██████░░░ [🔒]      │    │
│  │  ██ ... 14 more pillars      ░░ ░░░░░░░░░ [🔒]      │    │
│  │                                                     │    │
│  │  ⚠ 3 CRITICAL vulnerabilities detected              │    │
│  │  ⚠ Annual impact: $38,400 — $93,600                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: THE CTA (Relief from Anxiety)                     │
│  Your business has 67 days of runway and $3,200-$7,800/mo   │
│  in hidden leakage across 3 critical pillars.               │
│                                                             │
│  A full FIP™ Forensic Audit will:                           │
│  ✓ Identify EXACT sources of leakage across 19 pillars     │
│  ✓ Provide prioritized recovery roadmap                    │
│  ✓ Project 12-month financial trajectory                   │
│                                                             │
│  [  🔓 UNLOCK FULL FORENSIC AUDIT → $1,200  ]               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 **DESIGN PRINCIPLES**

1. **Layer 1:** Big, bold numbers. Dates (not just days). Visceral language.
2. **Layer 2:** Show ranges (not specific numbers). Create curiosity gap.
3. **Layer 3:** Visual heat map with blurred bars. Lock icons. Red/yellow/green colors visible.
4. **Layer 4:** Personalized copy based on their specific numbers. Relief framing.

---

## 🚀 **NEXT STEPS**

1. **Rebuild `fip-lite.tsx`** with single-page form
2. **Implement 4-layer results dashboard**
3. **Add locked pillar visualization** (the conversion engine)
4. **Test with different business scenarios**
5. **Optimize for mobile**
6. **Deploy and monitor conversion rates**

---

**Status:** Types & Engine Complete ✅ | UI Rebuild In Progress 🔄  
**Target:** Transform FIP-Lite into a high-converting lead magnet  
**Conversion Goal:** 15-25% of users who see results book the $1,200 audit

