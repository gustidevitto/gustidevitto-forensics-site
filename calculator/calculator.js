document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('calculator-app');
    const resultOutput = document.getElementById('result-output');
    const exportBtn = document.querySelector('.export-btn');
    const currentYearSpan = document.getElementById('currentYear');

    // 1. Tampilkan Tahun Dinamis di Footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Helper Format Mata Uang (Rupiah) ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // --- Helper Format Angka Input (Auto Titik, Desimal Koma) ---
    const formatNumberForInput = (value) => {
        // Hilangkan semua titik yang sudah ada
        const cleanValue = String(value).replace(/\./g, '');
        // Tambahkan separator ribuan (titik)
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // --- Helper Parse Angka dari Input (Hilangkan Titik) ---
    const parseNumberFromInput = (value) => {
        if (!value) return 0;
        // Hapus semua titik dan ganti koma dengan titik (untuk JS)
        return parseFloat(String(value).replace(/\./g, '').replace(/,/g, '.'));
    };

    // --- Inisialisasi Data Default ---
    const initialData = {
        // Input Data Kunci 
        omzetKotor: 0,
        biayaBaku: 0,
        gajiTotal: 0,
        avgJamKosong: 3.5,

        // Output Data Kunci
        kerugianBahanBaku: 0,
        kerugianJamKosong: 0,
        totalPhantomCost: 0,
    };

    let data = { ...initialData };

    // --- 2. Fungsi Tooltip ---
    function getTooltipIcon(text) {
        return `
            <span class="tooltip-wrapper">
            <span class="tooltip-wrapper">
                <span class="material-icons tooltip-icon">help</span>
                <span class="tooltip-text">${text}</span>
            </span>
        `;
    }

    // --- 3. Fungsi Render Input (Form Tunggal) ---
    function renderInputForm() {
        // Format nilai default untuk ditampilkan di input
        const omzetFormatted = data.omzetKotor > 0 ? formatNumberForInput(data.omzetKotor) : '';
        const biayaFormatted = data.biayaBaku > 0 ? formatNumberForInput(data.biayaBaku) : '';
        const gajiFormatted = data.gajiTotal > 0 ? formatNumberForInput(data.gajiTotal) : '';

        app.innerHTML = `
            <div class="input-card single-form-card">
                <h3><span class="material-icons">calculate</span> Phantom Cost Calculator™</h3>
                <p class="intro-note">Masukkan data bisnis Anda untuk mengungkap kebocoran tersembunyi</p>
                <p class="note-small"><span class="material-icons" style="font-size: 0.9rem; vertical-align: text-bottom;">warning</span> Angka pembulatan kira-kira saja, tidak perlu terlalu detail</p>
                
                <form id="phantom-cost-form">

                    <div class="form-group">
                        <label for="omzetKotor"><span class="material-icons">analytics</span> Omzet Kotor Bulanan (Estimasi)</label>
                        ${getTooltipIcon('Total omzet kotor (penjualan) sebelum dikurangi biaya operasional dan COGS.')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="text" id="omzetKotor" value="${omzetFormatted}" placeholder="ex: 100.000.000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="biayaBaku"><span class="material-icons">shopping_basket</span> Biaya Bahan Baku Total Bulanan</label>
                        ${getTooltipIcon('Total biaya pembelian bahan baku atau barang dagangan yang terjual (COGS murni).')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="text" id="biayaBaku" value="${biayaFormatted}" placeholder="ex: 40.000.000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="gajiTotal"><span class="material-icons">groups</span> Gaji Total Karyawan Bulanan</label>
                        ${getTooltipIcon('Total gaji yang dibayarkan kepada semua karyawan (termasuk gaji pemilik, jika ada).')}
                        <div class="input-prefix">
                            <span>Rp</span>
                            <input type="text" id="gajiTotal" value="${gajiFormatted}" placeholder="ex: 15.000.000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="avgJamKosong"><span class="material-icons">schedule</span> Rata-rata Jam Kosong per Hari</label>
                        ${getTooltipIcon('Estimasi rata-rata jam kerja yang hilang atau tidak produktif di semua outlet per hari.')}
                        <div class="input-suffix">
                            <input type="text" id="avgJamKosong" value="${data.avgJamKosong}" placeholder="ex: 3,5">
                            <span>jam</span>
                        </div>
                    </div>

                    <button type="submit" id="calculate-btn" class="form-action-btn">
                        <span class="material-icons" style="vertical-align: middle;">calculate</span> HITUNG PHANTOM COST
                    </button>
                </form>
            </div>
        `;

        // Attach event listeners
        attachFormListeners();
    }

    // --- 4. Fungsi Listener & Update Data (Termasuk Auto Titik & Zero Removal) ---
    function attachFormListeners() {
        const form = document.getElementById('phantom-cost-form');
        // PENTING: Ubah selector ke type="text"
        const inputs = form.querySelectorAll('input[type="text"]');

        inputs.forEach(input => {
            const isRupiah = input.id !== 'avgJamKosong';

            // 1. Zero Removal (Focus) & Prepare for Input
            input.addEventListener('focus', (e) => {
                const rawValue = parseNumberFromInput(e.target.value);
                // Hilangkan formatting saat fokus, hapus 0 jika nilai > 0
                e.target.value = rawValue > 0 ? String(rawValue).replace(/\./g, '').replace(/,/g, '.') : '';
            });

            // 2. Auto Titik (Input) & Parse Data
            input.addEventListener('input', (e) => {
                let cleanValue = e.target.value;

                if (isRupiah) {
                    // Hapus semua karakter non-digit kecuali koma
                    cleanValue = cleanValue.replace(/[^0-9]/g, '');

                    // Update tampilan input dengan titik ribuan
                    e.target.value = formatNumberForInput(cleanValue);

                    // Update data object
                    data[e.target.id] = parseNumberFromInput(e.target.value);

                } else {
                    // Input Desimal (Jam Kosong)
                    // Hanya izinkan angka, koma (desimal), dan titik (desimal)
                    cleanValue = cleanValue.replace(/[^0-9,.]/g, '');
                    // Pastikan hanya satu pemisah desimal (gunakan koma)
                    if (cleanValue.match(/[,.]/g)) {
                        cleanValue = cleanValue.replace(/\./g, ',').replace(/,(?=[^,]*$)/, ',');
                    }
                    e.target.value = cleanValue;

                    // Update data object
                    data[e.target.id] = parseNumberFromInput(e.target.value);
                }
            });

            // 3. Re-format saat Blur (agar titik kembali terlihat)
            input.addEventListener('blur', (e) => {
                const rawValue = parseNumberFromInput(e.target.value);
                if (rawValue > 0 && isRupiah) {
                    e.target.value = formatNumberForInput(String(rawValue).replace('.', ','));
                } else if (rawValue > 0 && !isRupiah) {
                    // Pastikan desimal menggunakan koma saat blur
                    e.target.value = String(rawValue).replace('.', ',');
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateResults();
        });
    }

    // --- 5. Fungsi Utama Perhitungan ---
    function calculateResults() {
        const { omzetKotor, biayaBaku, gajiTotal, avgJamKosong } = data;

        // Validasi input minimal
        if (omzetKotor <= 0 || biayaBaku <= 0 || gajiTotal <= 0) {
            resultOutput.innerHTML = '<p class="error-message">Mohon lengkapi semua data Omzet, Biaya Baku, dan Gaji Karyawan (tidak boleh nol).</p>';
            exportBtn.style.display = 'none'; // Sembunyikan tombol export
            return;
        }

        // Asumsi Perhitungan
        const kerugianBahanBaku = biayaBaku * 0.125;

        // Kerugian Jam Kosong: (Jam Kosong / Total Jam Kerja) * Total Gaji
        // Rumus Detail: (AvgIdle / 8) * (DailySalary) * 25Days
        const dailySalary = gajiTotal / 25; // Asumsi 25 hari kerja
        const idleRatio = avgJamKosong / 8; // Asumsi 8 jam kerja/hari

        // Kerugian Per Hari = Ratio * DailySalary
        const dailyLoss = idleRatio * dailySalary;

        // Kerugian Bulanan = DailyLoss * 25
        const kerugianJamKosong = dailyLoss * 25;

        // Total Phantom Cost
        const totalPhantomCost = kerugianBahanBaku + kerugianJamKosong;

        // Update Data Output
        data.kerugianBahanBaku = kerugianBahanBaku;
        data.kerugianJamKosong = kerugianJamKosong;
        data.totalPhantomCost = totalPhantomCost;

        // Render Hasil
        renderResults();

        // Aktifkan Export Button
        exportBtn.disabled = false;
        exportBtn.style.display = 'inline-block';
    }

    // --- 6. Fungsi Render Hasil ---
    function renderResults() {
        const { omzetKotor, biayaBaku, gajiTotal, kerugianBahanBaku, kerugianJamKosong, totalPhantomCost } = data;

        // Asumsi COGS Standard (35%)
        const stdCOGS = 0.35;

        // Contoh perhitungan COGS Actual (untuk detail card)
        const cogsActualPercent = ((biayaBaku + kerugianBahanBaku) / omzetKotor) * 100;

        // Helper untuk format Rupiah
        const formatRupiah = (number) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(number);
        };

        // Helper untuk format Desimal Koma
        const formatDecimalComma = (number) => {
            return (Math.round(number * 10) / 10).toString().replace('.', ',');
        }


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
                    <small>COGS Actual: ${formatDecimalComma(cogsActualPercent)}% (Ideal: ${stdCOGS * 100}%)</small>
                </div>
                <div class="detail-card">
                    <p class="detail-label">KERUGIAN JAM KOSONG</p>
                    <h3 class="detail-value">${formatRupiah(kerugianJamKosong)}</h3>
                    <small>Rugi ${formatDecimalComma(data.avgJamKosong)} jam/hari kerja</small>
                </div>
            </div>
            
            <div class="result-card result-insight">
                <p><i class="fas fa-lightbulb"></i> <b>Ini Baru Permulaan...</b></p>
                <p>Phantom Cost (COGS Inefficiency) hanya sedikit dari 7 pilar kesehatan bisnis: COGS Analysis, LTV/CAC Ratio, Cash Conversion Cycle, Customer Retention, Break-Even Point, dan Labor Efficiency yang sangat potensial menyimpan <i>red flag</i> tersembunyi.</p>
                <p>Dengan investigasi forensik di atas, Anda setidaknya melihat gambaran utuh kesehatan bisnis Anda dari semua sudut.</p>
            </div>
            
            <div class="result-actions">
                <button class="btn-primary action-stop" onclick="window.open('https://wa.me/6281234567890?text=Halo%20Admin%20Dashboard%20PCC,%20saya%20ingin%20konsultasi%20hasil%20kalkulator', '_blank')">
                    <span class="material-icons" style="vertical-align: middle;">monetization_on</span> HENTIKAN PENDARAHAN! JADWALKAN BEDAH 3 PRIORITAS
                </button>
                <p class="small-link">Mau Tahu Kesehatan Bisnis dari 6 Pilar Lainnya?</p>
                <div class="secondary-actions">
                    <button class="btn-secondary" onclick="alert('Fungsi share telah disalin')">
                        <span class="material-icons">share</span> Bagikan
                    </button>
                    <button class="btn-secondary" onclick="renderInputForm()">
                        <span class="material-icons">refresh</span> Hitung Ulang
                    </button>
                </div>
            </div>
        `;
    }

    // --- 7. Fungsi Export ke CSV ---
    function exportToExcel() {
        if (!data.omzetKotor || !data.totalPhantomCost) {
            alert("Silakan hitung data terlebih dahulu!");
            return;
        }

        const { omzetKotor, biayaBaku, gajiTotal, avgJamKosong, kerugianBahanBaku, kerugianJamKosong, totalPhantomCost } = data;

        // Format Tanggal
        const date = new Date().toLocaleDateString('id-ID');

        // Buat konten CSV
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "PHANTOM COST CALCULATOR REPORT\n";
        csvContent += `Tanggal Report,${date}\n\n`;

        csvContent += "INPUT DATA\n";
        csvContent += `Omzet Kotor (Est),${omzetKotor}\n`;
        csvContent += `Biaya Bahan Baku,${biayaBaku}\n`;
        csvContent += `Gaji Total Karyawan,${gajiTotal}\n`;
        csvContent += `Rata-rata Jam Kosong (Jam/Hari),${String(avgJamKosong).replace('.', ',')}\n\n`;

        csvContent += "HASIL ANALISIS\n";
        csvContent += `Kerugian Bahan Baku (Est 12.5%),${Math.round(kerugianBahanBaku)}\n`;
        csvContent += `Kerugian Jam Kosong,${Math.round(kerugianJamKosong)}\n`;
        csvContent += `TOTAL PHANTOM COST,${Math.round(totalPhantomCost)}\n`;

        // Encode URI Component (Fix for browser compatibility)
        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);

        // Buat link download palsu
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `PCC_Report_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);

        link.click(); // Trigger download
        document.body.removeChild(link); // Bersihkan
    }

    // Attach Listener untuk Export Btn
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToExcel);
    }

    // --- Inisialisasi Aplikasi ---
    renderInputForm();
});