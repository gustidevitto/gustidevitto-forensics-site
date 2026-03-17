# FFD™ RESIDUE CLEANUP CHECKLIST

## 🔍 SCAN RESULTS: 50+ INSTANCES FOUND

**Status:** IN PROGRESS (6/50 cleaned)  
**Priority:** HIGH - Critical for brand consistency

---

## ✅ CLEANED (Batch 1 - 6 instances)

### **Indonesian Translation (`id.json`)**
1. ✅ Line 34: `seo_desc` - FFD™ v4.00 → FIP™ Protocol
2. ✅ Line 58: `methodology_subtitle` - FFD™ v4.00 Engine → FIP™ Protocol
3. ✅ Line 68: `visual_interface` - FFD™ v4.00 → FIP™ Protocol
4. ✅ Line 81: `text` (about FAQ) - FFD™ v4.00 → FIP™ Protocol
5. ✅ Line 152: `story.p4` - FFD™ v4.00 → FIP™ Protocol
6. ✅ Line 294: `attribution.text` - FFD™ v4.00 Network Edition → FIP™ Protocol

---

## 🔄 REMAINING TO CLEAN

### **CRITICAL: Indonesian Translation (`id.json`) - 22 instances**

#### **Investasi Section:**
- [ ] Line 321: `sme_subtitle` - "Didukung oleh FFD™ v4.00 Neural Engine"
- [ ] Line 337: `attribution_text` - "model 'Predictive Forensic Loss' milik FFD™"
- [ ] Line 352: `faq_a2` - "akses ke Dasbor FFD™ v4.00"

#### **Calculator Section:**
- [ ] Line 404: `boot.connecting` - "MENGHUBUNGKAN KE CLUSTER INTI FFD™v4.00..."

#### **Get Access Section:**
- [ ] Line 428: `left_panel_badge` - "PCC Lite — by FFD™ v4.00 Core"
- [ ] Line 433: `testimonial_text` - "FFD™ buka mata saya"

#### **Segmentation Section:**
- [ ] Line 479: `network_headline` - "SIAPA YANG MEMBUTUHKAN FFD™ NETWORK EDITION"

#### **Pilot Section:**
- [ ] Line 495: `subheader` - "FFD™ v4.00 NETWORK EDITION"

#### **Transparency Section:**
- [ ] Line 513: `p1` - "FFD™ v4.00 Network Edition telah tervalidasi"

#### **Demo Video Section:**
- [ ] Line 522: `header` - "LIHAT FFD™ NETWORK EDITION BERAKSI"

#### **Master Index Section:**
- [ ] Line 554: `footer_desc` - "FFD™ v4.00 untuk pemetaan 19 pilar"

#### **Pillars Page Section:**
- [ ] Line 625: `mri_title` - "FFD™ v4.00 Digital Mirror"
- [ ] Line 626: `mri_desc` - "FFD™ v4.00 Dashboard"
- [ ] Line 648: `cta_desc` - "FFD™ v4.00 Dashboard"

#### **Pillar Details (Attributions):**
- [ ] Line 663: `net-burn-rate.attribution` - "FFD™ v4.00"
- [ ] Line 681: `breakeven-point.attribution` - "FFD™ v4.00"
- [ ] Line 699: `net-profit-trans.attribution` - "Framework FFD v4.00"
- [ ] Line 717: `net-contribution-sku.attribution` - "audit SKU FFD"
- [ ] Line 729: `gp-leakage.attribution` - "dalam FFD"
- [ ] Line 741: `forensic-insight.attribution` - "Algoritma FFD™ v4.00"
- [ ] Line 747: `concentration-risk.attribution` - "FFD™ v4.00 Network Edition"

---

### **MEDIUM: English Translation (`en.json`) - 1 instance**

- [ ] Line 338: `investasi.attribution_text` - "FFD™'s 'Predictive Forensic Loss' model"

---

### **MEDIUM: React Components - 8 instances**

#### **`index.tsx`:**
- [ ] Line 219: `t('hero.desc', { brand: 'FFD™ v4.00' })`
- [ ] Line 222: Hardcoded "FFD™ v4.00 finds the leaks"
- [ ] Line 544: Alt text "FFD v4 Master Lab Aggregator Interface"
- [ ] Line 804: Comment "FFD v3 Dashboard Visual"
- [ ] Line 869: Alt text "FFD™ v3 Financial Forensics Dashboard"
- [ ] Line 1184: Hardcoded "If FFD™ v3 dashboard says"

#### **`get-access.tsx`:**
- [ ] Line 109: Hardcoded "FFD™ opened my eyes"

#### **`forensics-pillars.tsx`:**
- [ ] Line 48: Comment "FFD™ v3 Visual Context"
- [ ] Line 60: Hardcoded "FFD™ v3 Digital Mirror"
- [ ] Line 65: Hardcoded "FFD™ v3 Dashboard"
- [ ] Line 79: Alt text "FFD™ v3 Interface"

#### **`about-gusti-devitto.tsx`:**
- [ ] Line 93: Hardcoded "FFD™ v3"
- [ ] Line 171: Comment "FFD & Neural Engine"

#### **`master-index.tsx`:**
- [ ] Line 38: Alt text "FFD Framework Visual"

---

### **LOW: Data Files - 7 instances**

#### **`pillarsData.json`:**
- [ ] Line 17: `attribution_anchor` - "FFD™ v3"
- [ ] Line 44: `attribution_anchor` - "FFD™ v3"
- [ ] Line 71: `attribution_anchor` - "FFD v3"
- [ ] Line 98: `attribution_anchor` - "FFD"
- [ ] Line 116: `attribution_anchor` - "FFD"
- [ ] Line 134: `attribution_anchor` - "FFD™ v3"
- [ ] Line 143: `attribution_anchor` - "FFD™ v4.00 Network Edition"

---

## 🎯 REPLACEMENT STRATEGY

### **Rule 1: Version References**
- `FFD™ v4.00` → `FIP™ Protocol`
- `FFD™ v3` → `FIP™ Protocol` (or remove version entirely)
- `FFD™` (standalone) → `FIP™`

### **Rule 2: Product Names**
- `FFD™ v4.00 Dashboard` → `FIP™ Protocol`
- `FFD™ v4.00 Network Edition` → `FIP™ Network Edition`
- `FFD™ v4.00 Neural Engine` → `FIP™ Sovereign Intelligence`
- `FFD™ v4.00 Core` → `FIP™ Core`

### **Rule 3: Alt Text & Comments**
- Keep descriptive but update brand
- `"FFD v4 Master Lab"` → `"FIP™ Master Lab"`
- `"FFD™ v3 Dashboard"` → `"FIP™ Protocol Interface"`

### **Rule 4: Attributions (Pillar Details)**
- Technical references can keep "FIP™ method" or "FIP™ framework"
- Remove version numbers from attributions
- Example: `"Algoritma FFD™ v4.00"` → `"Algoritma FIP™"`

---

## 📊 PRIORITY MATRIX

| **Priority** | **Location** | **Count** | **Impact** |
|--------------|--------------|-----------|------------|
| 🔴 **CRITICAL** | `id.json` (user-facing) | 22 | High - Visible to Indonesian users |
| 🟡 **HIGH** | React Components | 14 | Medium - Hardcoded text |
| 🟢 **MEDIUM** | `en.json` | 1 | Low - Single instance |
| 🔵 **LOW** | Data files | 7 | Low - Technical references |

---

## ⚡ QUICK FIX COMMANDS

### **For Translation Files:**
```bash
# Find all FFD references
grep -n "FFD" src/i18n/locales/*.json

# Count remaining
grep -c "FFD" src/i18n/locales/id.json
```

### **For React Components:**
```bash
# Find in TSX files
grep -rn "FFD" src/routes/*.tsx

# Count total
grep -rc "FFD" src/routes/
```

---

## 🎯 COMPLETION CRITERIA

- [ ] **0 FFD™ references** in `id.json` (currently 22 remaining)
- [ ] **0 FFD™ references** in `en.json` (currently 1 remaining)
- [ ] **0 hardcoded FFD™** in React components (currently 14 remaining)
- [ ] **Updated data files** with FIP™ (currently 7 remaining)

**Total Remaining:** 44 instances  
**Estimated Time:** 15-20 minutes for complete cleanup

---

## 📝 NOTES

1. **Alt text** should be updated for accessibility
2. **Comments** can be updated for code clarity
3. **Hardcoded strings** in TSX files should ideally use translation keys
4. **Data files** (pillarsData.json) are lower priority as they're technical

---

**Status:** 🔄 IN PROGRESS  
**Next Batch:** Indonesian translation investasi/calculator/get-access sections  
**Last Updated:** 2026-01-17 22:48
