import fs from 'fs';
import path from 'path';

const localesDir = path.join('e:\\grafis\\LAPA\\devitto-website\\gustidevitto-forensics-site', 'src', 'i18n', 'locales');
const enPath = path.join(localesDir, 'en.json');
const idPath = path.join(localesDir, 'id.json');

function updateJson(filePath, isId) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 1. Single Entity
    data.single_entity.tension = isId 
        ? "Anda sudah profit. Namun sebagian profit tersebut tidak pernah sampai ke rekening Anda." 
        : "You are already profitable. But part of that profit never reaches your bank account.";
    
    data.single_entity.why_reports_title = isId 
        ? "Mengapa Laporan Keuangan Anda Tidak Menunjukkan Ini" 
        : "Why Your Financial Reports Don't Show This";
    
    data.single_entity.why_reports_p1 = isId 
        ? "Pendapatan dicatat sebelum uang kas tiba." 
        : "Revenue is recorded before cash arrives.";
        
    data.single_entity.why_reports_p2 = isId 
        ? "Biaya dikelompokkan, menyembunyikan inefisiensi." 
        : "Costs are grouped, hiding inefficiencies.";
        
    data.single_entity.why_reports_p3 = isId 
        ? "Profit terlihat sehat padahal uang kas bocor secara diam-diam." 
        : "Profit appears healthy while cash silently leaks.";
        
    data.single_entity.why_reports_close = isId 
        ? "Laporan Anda menunjukkan performa. Laporan tidak menunjukkan di mana uang tersangkut." 
        : "Your reports show performance. They do not show where money gets stuck.";

    // 2. Network Intelligence
    data.network_intelligence.tension = data.single_entity.tension;
    data.network_intelligence.why_reports_title = data.single_entity.why_reports_title;
    data.network_intelligence.why_reports_p1 = data.single_entity.why_reports_p1;
    data.network_intelligence.why_reports_p2 = data.single_entity.why_reports_p2;
    data.network_intelligence.why_reports_p3 = data.single_entity.why_reports_p3;
    data.network_intelligence.why_reports_close = data.single_entity.why_reports_close;

    // 3. Investasi / Bridge Section
    data.investasi.bridge_title = isId 
        ? "Bagaimana Kami Benar-Benar Memulihkan Profit Anda" 
        : "How We Actually Recover Your Profit";
    
    data.investasi.bridge_s1_title = "Step 1 — Identify";
    data.investasi.bridge_s1_desc = isId 
        ? "Kami menemukan secara pasti di mana uang menyangkut atau bocor di dalam operasional Anda." 
        : "We locate exactly where money gets stuck or leaks inside your operation.";
        
    data.investasi.bridge_s2_title = "Step 2 — Quantify";
    data.investasi.bridge_s2_desc = isId 
        ? "Kami menghitung berapa banyak profit yang hilang, tertunda, atau terperangkap." 
        : "We calculate how much profit is being lost, delayed, or trapped.";

    data.investasi.bridge_s3_title = "Step 3 — Extract";
    data.investasi.bridge_s3_desc = isId 
        ? "Kami memberi Anda panduan dan prioritas langkah untuk memulihkan uang tersebut." 
        : "We give you a clear, prioritized action path to recover that money.";

    data.investasi.bridge_s4_title = "Step 4 — Stabilize";
    data.investasi.bridge_s4_desc = isId 
        ? "Kami mencegah kebocoran yang sama terulang kembali." 
        : "We prevent the same leakage from happening again.";

    // 4. Investment Page Anchor & Reassurance
    data.investasi.outcome_anchor = isId 
        ? "Sebagian besar bisnis multi-outlet yang kami audit berhasil memulihkan antara 15–30% dari kebocoran profit tersembunyi setelah tindakan yang tepat diambil." 
        : "Most multi-outlet businesses we audit recover between 15–30% of hidden profit leakage once the right actions are taken.";
        
    data.investasi.micro_proof = isId 
        ? "Contoh: Sebuah operator 12 outlet menemukan lebih dari $180K/tahun kebocoran profit tersembunyi pada efisiensi tenaga kerja dan inventaris di audit pertama." 
        : "A 12-outlet operator discovered over $180K annual profit leakage hidden in labor and inventory inefficiencies during the first audit.";

    data.investasi.reassurance = isId 
        ? "Jika Anda tidak yakin di mana masalahnya, mulailah dengan satu diagnostik. Jika masalahnya struktural, kami akan menunjukkan seberapa dalam dampaknya." 
        : "If you are unsure where your profit is leaking, start with a single diagnostic.  If the problem is structural, we will show you exactly how deep it goes.";

    data.investasi.reassurance_btn = isId ? "Mulai dengan Diagnostik" : "Start with a Diagnostic";

    // Update Tiers and Phases
    // "Reduce feature noise, change focus and outcome"
    data.investasi.tier_diagnostic_focus = isId ? "Fokus: Visibilitas" : "Focus: visibility";
    data.investasi.tier_diagnostic_outcome = isId ? "Hasil: Mengungkap mayoritas penyebab kebocoran" : "Outcome: uncover majority of visible leaks";

    data.investasi.tier_forensic_focus = isId ? "Fokus: Analisis Mendalam" : "Focus: depth";
    data.investasi.tier_forensic_outcome = isId ? "Hasil: Mengidentifikasi kerugian profit struktural" : "Outcome: identify structural profit loss";

    data.investasi.tier_network_focus = isId ? "Fokus: Perbandingan Jaringan" : "Focus: comparison";
    data.investasi.tier_network_outcome = isId ? "Hasil: Menemukan cabang mana yang paling merugikan" : "Outcome: find which locations are destroying profit";

    data.investasi.tier_sovereign_focus = isId ? "Fokus: Sistem Kontrol Penuh" : "Focus: control";
    data.investasi.tier_sovereign_outcome = isId ? "Hasil: Mengubah bisnis menjadi sistem yang dapat mengoreksi diri" : "Outcome: turn business into self-correcting system";

    data.investasi.how_it_works.phase1_title = isId ? "Phase 1: Menghentikan Pendarahan" : "Phase 1: Stopping the Bleeding";
    data.investasi.how_it_works.phase1_desc_upgrade = isId 
        ? "Tindakan segera untuk menghentikan kerugian profit yang sedang berlangsung, seringkali dalam hitungan minggu." 
        : "Immediate actions to stop ongoing profit loss, often within weeks.";
    
    data.investasi.how_it_works.phase2_title = isId ? "Phase 2: Mencegah Kebocoran Berulang" : "Phase 2: Preventing Drift";
    data.investasi.how_it_works.phase2_desc_upgrade = isId 
        ? "Memastikan profit yang pulih tidak bocor lagi." 
        : "Ensure recovered profit does not leak again.";
        
    data.investasi.how_it_works.phase3_title = isId ? "Phase 3: Lapisan Intelejen" : "Phase 3: Intelligence Layer";
    data.investasi.how_it_works.phase3_desc_upgrade = isId 
        ? "Mendukung keputusan berisiko tinggi dengan visibilitas keuangan yang lebih dalam." 
        : "Support high-stakes decisions with deeper financial visibility.";
        
    data.investasi.how_it_works.phase4_title = isId ? "Phase 4: Kontrol Penuh" : "Phase 4: Full Control";
    data.investasi.how_it_works.phase4_desc_upgrade = isId 
        ? "Bisnis Anda beroperasi dengan perlindungan bawaan terhadap kerugian tersembunyi." 
        : "Your business operates with built-in protection against hidden losses.";

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
}

updateJson(enPath, false);
updateJson(idPath, true);

console.log('JSON updated successfully!');
