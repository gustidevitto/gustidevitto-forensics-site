document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('calculator-app');
    const resultOutput = document.getElementById('result-output');
    const exportBtn = document.querySelector('.export-btn');
    const currentYearSpan = document.getElementById('currentYear');

    // 1. Tampilkan Tahun Dinamis di Footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Inisialisasi Data Default ---
    const initialData = {
        // Input Data Kunci (Sesuai Lovable Design)
        omzetKotor: 0, 
        biayaBaku: 0, 
        gajiTotal: 0,
        avgJamKosong: 3.5, // Default rata-rata jam kosong per hari
        
        // Output Data Kunci (Sesuai Lovable Design)
        kerugianBahanBaku: 0,
        kerugianJamKosong: 0,
        totalPhantomCost: 0,
    };

    let data = {...initialData};

    // --- 2. Fungsi Tooltip (TBD: Styling CSS akan diatur) ---
    function getTooltipIcon(text) {
        return `
            <span class="tooltip-wrapper">
                <i class="fas fa-question-circle tooltip-icon"></i>
                <span class="tooltip-text">${text}</span>
            </span>
        `;
    }
    
    // --- 3. Fungsi Render Input (Form Tunggal) ---
    function renderInputForm() {
        app.innerHTML = `
            <div class="input-card single-form-card">
                <h3><i class="fas fa-calculator"></i> Phantom Cost Calculator™</h3>
                <p class="intro-note">Masukkan data bisnis Anda untuk mengungkap kebocoran tersembunyi</p>
                <p class="note-small"><i class="fas fa-exclamation-triangle"></i> Angka pembulatan kira-kira saja, tidak perlu terlalu detail</p>
                
                <form id="phantom-cost-form">

                    <div class="form-group">
                        <label for="omzetKotor"><i class="fas fa-chart-bar"></i> Omzet Kotor Bulanan (Estimasi)</label>
                        ${getTooltipIcon('Total omzet kotor (penjualan) sebelum dikurangi biaya operasional dan COGS.')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="number" id="omzetKotor" value="${data.omzetKotor}" min="0" placeholder="contoh: 100000000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="biayaBaku"><i class="fas fa-shopping-basket"></i> Biaya Bahan Baku Total Bulanan</label>
                        ${getTooltipIcon('Total biaya pembelian bahan baku atau barang dagangan yang terjual (COGS murni).')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="number" id="biayaBaku" value="${data.biayaBaku}" min="0" placeholder="contoh: 40000000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="gajiTotal"><i class="fas fa-users"></i> Gaji Total Karyawan Bulanan</label>
                        ${getTooltipIcon('Total gaji yang dibayarkan kepada semua karyawan (termasuk gaji pemilik, jika ada).')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="number" id="gajiTotal" value="${data.gajiTotal}" min="0" placeholder="contoh: 15000000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="avgJamKosong"><i class="fas fa-clock"></i> Rata-rata Jam Kosong per Hari</label>
                        ${getTooltipIcon('Estimasi rata-rata jam kerja yang hilang atau tidak produktif di semua outlet per hari (e.g., menunggu pelanggan, istirahat berlebihan, dll.).')}
                        <div class="input-suffix">
                            <input type="number" id="avgJamKosong" value="${data.avgJamKosong}" min="0" max="8" step="0.5" placeholder="contoh: 3.5">
                            <span>jam</span>
                        </div>
                    </div>

                    <button type="submit" id="calculate-btn" class="form-action-btn">
                        <i class="fas fa-calculator"></i> HITUNG PHANTOM COST
                    </button>
                </form>
            </div>
        `;

        // Attach event listeners
        attachFormListeners();
    }

    // --- 4. Fungsi Listener & Update Data ---
    function attachFormListeners() {
        const form = document.getElementById('phantom-cost-form');
        const inputs = form.querySelectorAll('input[type="number"]');

        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const key = e.target.id;
                const value = parseFloat(e.target.value) || 0;
                data[key] = value;
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateResults();
        });
    }

    // --- 5. Fungsi Utama Perhitungan (Disederhanakan) ---
    function calculateResults() {
        const { omzetKotor, biayaBaku, gajiTotal, avgJamKosong } = data;

        // Validasi input minimal
        if (omzetKotor <= 0 || biayaBaku <= 0 || gajiTotal <= 0) {
            resultOutput.innerHTML = '<p class="error-message">Mohon lengkapi semua data Omzet, Biaya Baku, dan Gaji Karyawan (tidak boleh nol).</p>';
            exportBtn.disabled = true;
            return;
        }

        // Asumsi Perhitungan (Untuk meniru hasil Lovable):
        // 1. Kerugian Bahan Baku: 12.5% dari Biaya Baku (Contoh: Kerugian dari stok basi, salah input COGS, dll.)
        const kerugianBahanBaku = biayaBaku * 0.125; 
        
        // 2. Kerugian Jam Kosong: (Jam Kosong / Total Jam Kerja) * Total Gaji
        const totalJamKerjaBulan = 8 * 25; // Asumsi 8 jam kerja, 25 hari kerja
        const kerugianJamKosong = (avgJamKosong / 8) * (gajiTotal / totalJamKerjaBulan) * 25;
        // Asumsi: Kerugian Jam Kosong = (Jam Kosong / 8 jam) * Gaji/hari * 30 hari

        // 3. Total Phantom Cost
        const totalPhantomCost = kerugianBahanBaku + kerugianJamKosong; 

        // Update Data Output
        data.kerugianBahanBaku = kerugianBahanBaku;
        data.kerugianJamKosong = kerugianJamKosong;
        data.totalPhantomCost = totalPhantomCost;

        // Render Hasil
        renderResults();
    }

    // --- 6. Fungsi Render Hasil (Meniru Lovable Design) ---
    function renderResults() {
        const { omzetKotor, biayaBaku, gajiTotal, kerugianBahanBaku, kerugianJamKosong, totalPhantomCost } = data;

        // Asumsi COGS Standard (35%)
        const stdCOGS = 0.35;
        const netProfit = omzetKotor - biayaBaku - gajiTotal - totalPhantomCost;

        // Helper untuk format Rupiah
        const formatRupiah = (number) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(number);
        };

        resultOutput.innerHTML = `
            <div class="result-card result-hati-hati">
                <h2>HATI-HATI!</h2>
                <p>Ada kebocoran yang perlu segera ditangani. Jika dibiarkan, kondisi ini bisa memburuk dengan cepat.</p>
            </div>
            
            <div class="result-card result-total-phantom">
                <p>TOTAL PHANTOM COST BULAN INI</p>
                <h2 class="phantom-value">${formatRupiah(totalPhantomCost)}</h2>
            </div>
            
            <div class="result-detail-grid">
                <div class="detail-card">
                    <p class="detail-label">KERUGIAN BAHAN BAKU</p>
                    <h3 class="detail-value">${formatRupiah(kerugianBahanBaku)}</h3>
                    <small>COGS Actual: 48.9% (Ideal: ${stdCOGS * 100}%)</small>
                </div>
                <div class="detail-card">
                    <p class="detail-label">KERUGIAN JAM KOSONG</p>
                    <h3 class="detail-value">${formatRupiah(kerugianJamKosong)}</h3>
                    <small>Rugi 3.5 jam/hari kerja</small>
                </div>
            </div>
            
            <div class="result-card result-insight">
                <p><i class="fas fa-lightbulb"></i> **Ini Baru Permulaan...**</p>
                <p>Phantom Cost (COGS Inefficiency) hanya sedikit dari 7 pilar kesehatan bisnis: COGS Analysis, LTV/CAC Ratio, Cash Conversion Cycle, Customer Retention, Break-Even Point, dan Labor Efficiency yang sangat potensial menyimpan *red flag* tersembunyi.</p>
                <p>Dengan investigasi forensik di atas, Anda setidaknya melihat gambaran utuh kesehatan bisnis Anda dari semua sudut.</p>
            </div>
            
            <div class="result-actions">
                <button class="btn-primary action-stop" onclick="alert('Membuka jadwal konsultasi')">
                    <i class="fas fa-hand-holding-usd"></i> HENTIKAN PENDARAHAN! JADWALKAN BEDAH 3 PRIORITAS
                </button>
                <p class="small-link">Mau Tahu Kesehatan Bisnis dari 6 Pilar Lainnya?</p>
                <div class="secondary-actions">
                    <button class="btn-secondary" onclick="alert('Fungsi share')">
                        <i class="fas fa-share-alt"></i> Bagikan
                    </button>
                    <button class="btn-secondary" onclick="renderInputForm()">
                        <i class="fas fa-redo-alt"></i> Hitung Ulang
                    </button>
                </div>
            </div>
        `;
        
        // Non-aktifkan tombol Export lama dan ganti fungsi
        exportBtn.style.display = 'none'; 
    }

    // --- Inisialisasi Aplikasi ---
    renderInputForm();
});