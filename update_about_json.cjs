const fs = require('fs');

const enJsonPath = './src/i18n/locales/en.json';
const idJsonPath = './src/i18n/locales/id.json';

const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const idData = JSON.parse(fs.readFileSync(idJsonPath, 'utf8'));

enData.about_ssot = {
    seo_title: "About Gusti Devitto | The Profit Diagnostician",
    seo_desc: "I find the structural leakage your P&L was never designed to see.",
    hero_badge: "ABOUT GUSTI DEVITTO",
    p1_hook: "You're not worried about sales. Sales are fine.",
    p2_hook: "You're worried about the thing you can't explain.",
    p3_context: "Revenue's up. Locations are running. Team's working.<br />But cash doesn't behave the way the numbers say it should.",
    p4_context: "You've asked your accountant. P&L checks out. Everything's 'within normal range.'",
    p5_context: "So why does it feel like something is quietly being extracted from the business — without leaving a trace in any report you've seen?",
    p6_answer: "It usually is.",
    p7_desc: "Not fraud. Not incompetence. Nothing your accountant did wrong.<br/><strong class=\"text-white font-medium\">Structural margin decay.</strong> The kind that never violates an accounting rule, so it never triggers an alert.",
    p8_quote1: "Food cost drifting 2 points. Labor productivity down 9%. Cash cycle stretching 25 days longer than it should. Each one — explainable. Manageable. Fine.",
    p8_quote2: "Combined, on a $5M operation? That's often <strong class=\"text-[#BFA26A] font-bold tracking-wider\">$300,000–$500,000</strong> that evaporated through gaps your P&L was never designed to see.",
    p9_danger: "The dangerous part isn't the number. It's the timeline.",
    p10_compounding: "By the time it surfaces in a way you can't dismiss — you've already lost two, sometimes three years of it. Silently. Compounding.",
    pos_title: "I'm Gusti Devitto.",
    pos_sub: "I increase your profit without increasing your sales — by finding the structural leakage your P&L was never designed to see.",
    pos_p1: "Standard accounting records what happened.<br/><strong class=\"text-[#0A84FF] font-medium\">I find what's happening</strong> — before it becomes a number you have to explain to your partners, your investors, or yourself.",
    pos_p2: "I work with portfolio operators and multi-unit businesses who are running well by every visible metric. And privately know something doesn't add up.",
    pos_p3: "If that's you — the numbers already tell the story. You just need someone who knows how to read them.",
    table_title: "How This Works",
    th_accounting: "Standard Accounting",
    th_ai: "AI Prompts / ChatGPT",
    th_me: "Working With Me",
    tr1_td1: "Records what happened",
    tr1_td2: "Gives frameworks based on what you already know to look for",
    tr1_td3: "Finds what is happening — in the gaps you don't know to look for",
    tr2_td1: "Compliance. Tax. Score.",
    tr2_td2: "Ratios. Questions to ask. General direction.",
    tr2_td3: "Cross-correlated diagnosis. Specific dollar amount. Exact recovery path.",
    tr3_td1: "Snapshot. Static.",
    tr3_td2: "Works with what you give it.",
    tr3_td3: "Trend. Velocity. Structural pattern across time.",
    who_title: "Who I Work With",
    who_p1_1: "Portfolio operators. Multi-unit businesses. F&B, retail, franchise, hospitality.",
    who_p1_2: "5–30+ LOCATIONS · $2M–$20M+ REVENUE",
    who_p2_1: "Revenue growing. Cash behavior inconsistent. Accountant says it's fine.",
    who_p2_2: "It doesn't feel fine.",
    who_p2_3: "That's where I come in.",
    cta_title: "Ready to find what's missing?",
    cta_btn_scan: "Run Free Diagnostic Scan",
    cta_btn_call: "Book Diagnostic Call"
};

idData.about_ssot = {
    seo_title: "Tentang Gusti Devitto | The Profit Diagnostician",
    seo_desc: "Saya menemukan kebocoran struktural yang tidak didesain untuk ditangkap oleh laporan P&L standar Anda.",
    hero_badge: "TENTANG GUSTI DEVITTO",
    p1_hook: "Anda tidak sedang mengkhawatirkan omzet. Promosi dan rotasi bisnis Anda baik-baik saja.",
    p2_hook: "Anda mengkhawatirkan sesuatu yang secara tak kasat mata menjanggal perhitungan Anda.",
    p3_context: "Pendapatan naik. Seluruh cabang terekspansi. Tim operasional bekerja.<br />Tapi pergerakan volume kas tak sejalan dengan rekam jejak angka pencapaian di akhir tahun.",
    p4_context: "Anda telah bertanya pada akuntan Anda. P&L disahkan. Segala rasio profitabilitas 'dalam batas standar dan wajar.'",
    p5_context: "Lalu mengapa rasanya seperti ada sesuatu yang diam-diam tersedot kering dari dalam tatanan bisnis Anda — tanpa memicu alarm anomali apa pun di laporan yang Anda baca?",
    p6_answer: "Kenyataannya, memang begitu yang terjadi di baliknya.",
    p7_desc: "Bukan penggelapan dana. Bukan pula inkompetensi karyawan. Akuntan Anda tidak mencatat sesuatu yang fiktif.<br/><strong class=\"text-white font-medium\">Terjadi pembusukan margin struktural (*Structural margin decay*).</strong> Tipe kelumpuhan absolut yang tak pernah menabrak norma akuntansi, alhasil ia tidak akan pernah disensor sebagai lampu merah.",
    p8_quote1: "Food Cost menanjak pelan 2%. Produktivitas SDM mengendur 9%. Pengereman likuiditas (*cash cycle*) membisu 25 hari lebih lama dari batas mati wajarnya. Bila diusut departemen per departemen — masuk akal dan wajar-wajar saja.",
    p8_quote2: "Namun, bila celah itu menggerogoti struktur agregat bervaluasi Rp 50 Miliar? Pada titik tersebut Anda baru menyadari bahwa ada <strong class=\"text-[#BFA26A] font-bold tracking-wider\">Rp 4.500.000.000–Rp 7.500.000.000</strong> lenyap menguap menembus jaring pertahanan P&L tersebut.",
    p9_danger: "Kengerian fatalnya justru tak ada di rincian nominalnya. Penderitaannya ada di kronologinya.",
    p10_compounding: "Saat pola janggal ini membengkak sehingga tak bisa dinormalisasi lagi oleh efisiensi harian — diam-diam Anda telah merugi ke belakang sejauh dua, hingga tiga tahun penuh. Sunyi. Namun berlipat ganda.",
    pos_title: "Saya Gusti Devitto.",
    pos_sub: "Saya mempertajam rasio net margin pada portofolio Anda — tanpa perlu memeras volume penjualan operasional kembali — dengan membekukan deret kebocoran sistemik yang tak dijangkau laporan standar Anda.",
    pos_p1: "Akuntansi konvensional adalah sebuah cermin transaksional. Ia merekam apa yang sudah kandas di garis akhir.<br/><strong class=\"text-[#0A84FF] font-medium\">Saya mencari tahu apa yang persisnya sedang diekstraksi ke luar sistem Anda saat ini</strong> — sebelum rentetan deviasi ini dikalkulasi final menjadi rapor kematian kepada konsorsium pemegang saham dan investor Anda.",
    pos_p2: "Sirkel afiliasi saya diisi oleh jajaran direktur dan grup multi-outlet yang tampil cemerlang di seluruh radar finansial publik. Sayangnya, dalam diam, Anda tahu ada satu pertanyaan profitabilitas inti yang buntu terjawab.",
    pos_p3: "Bila fiksi ini menggemakan kepanikan yang sama terhadap masalah Anda — percayalah, kompilasi data operasional Anda punya jalur bicara yang valid. Anda hanya butuh intelejen analitik yang fasih membaca logikanya.",
    table_title: "Cara Kerja Metodologi",
    th_accounting: "Akuntansi Laporan Keuangan",
    th_ai: "Sintetis AI / Kalkulasi ChatGPT",
    th_me: "Bekerja Dengan Saya",
    tr1_td1: "Perekaman historis (apa yang telah berlalu)",
    tr1_td2: "Daur-ulang framework umum (bergantung jika Anda sendiri tahu apa kuncinya)",
    tr1_td3: "Intervensi proaktif terukur menembus apa yang sedang terjadi",
    tr2_td1: "Ketaatan otoritas wajib pajak. Tabulasi pencapaian murni.",
    tr2_td2: "Anekdot rasio industri rata-rata. Daftar pertanyaan hipotetis.",
    tr2_td3: "Pemetaan silang antar departemen rawan resiko. Nominal rupiah yang sangat presisi atas kerugian. Rute pemulihan yang definitif.",
    tr3_td1: "Garis gembok stagnan akhir kuartal",
    tr3_td2: "Analisis pasif satu arah berbasis syntax tebakan teks Anda semata",
    tr3_td3: "Pola algoritma struktural yang disesuaikan dalam rasio ruang lingkup rentang waktu operasional murni Anda",
    who_title: "Siapa Saja Klien Akses Saya?",
    who_p1_1: "Aliansi manajemen portofolio. Korporasi konglomerat waralaba multi-tapak. Gurita ekspansi kluster F&B, dan properti ritel hospitality.",
    who_p1_2: "KONFIGURASI 5–30+ CABANG · REKAP VALUASI MINIMAL Rp 30 MILIAR+",
    who_p2_1: "Fase inkubasi ekspansi terlampaui. Ketersediaan kas bergeser. Namun akuntan/CFO menjamin semua saldo kas Anda kebal malapetaka.",
    who_p2_2: "Lalu, radar insting Anda berkabung.",
    who_p2_3: "Di situlah otorisasi diagnostik eksekutif saya bertindak langsung.",
    cta_title: "Siap menghentikan pendarahan diam-diam?",
    cta_btn_scan: "Bekerja Sama Menembus Diagnostik",
    cta_btn_call: "Konsultasikan Situasi Bisnis Anda"
};

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(idJsonPath, JSON.stringify(idData, null, 2));
console.log('Translations inserted successfully!');
