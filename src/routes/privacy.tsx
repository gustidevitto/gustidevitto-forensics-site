import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"

// @ts-ignore
export const Route = createFileRoute('/privacy')({
    component: Privacy,
})

function Privacy() {
    return (
        <div className="container py-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Kebijakan Privasi</h1>
            <Card>
                <CardContent className="p-8 prose dark:prose-invert max-w-none">
                    <h3>1. Pengumpulan Data</h3>
                    <p>
                        Kami mengumpulkan informasi yang Anda berikan secara sukarela, termasuk namun tidak terbatas pada:
                        <ul>
                            <li>Nama Lengkap dan Kontak (Email, WhatsApp).</li>
                            <li>Data Keuangan dan Operasional Bisnis untuk keperluan analisis.</li>
                            <li>Informasi transaksi pembayaran.</li>
                        </ul>
                    </p>

                    <h3>2. Penggunaan Data</h3>
                    <p>
                        Data Anda digunakan semata-mata untuk:
                        <ul>
                            <li>Memberikan layanan konsultasi dan forensik sesuai kontrak.</li>
                            <li>Memproses transaksi pembayaran dan administrasi.</li>
                            <li>Mengirimkan laporan analisis dan rekomendasi bisnis.</li>
                            <li>Komunikasi terkait jadwal dan update layanan.</li>
                        </ul>
                    </p>

                    <h3>3. Non-Disclosure Agreement (NDA) & Kerahasiaan</h3>
                    <p>
                        Kami menjunjung tinggi kode etik profesional. <strong>Seluruh data keuangan dan rahasia dagang klien bersifat SANGAT RAHASIA.</strong>
                        <br /><br />
                        Kami TIDAK AKAN mendistribusikan, menjual, atau membocorkan data sensitif bisnis Anda kepada pihak ketiga manapun, kecuali diwajibkan oleh hukum yang berlaku di Indonesia. Seluruh tim kami terikat perjanjian kerahasiaan (NDA) yang ketat.
                    </p>

                    <h3>4. Penyimpanan & Keamanan Data</h3>
                    <p>
                        Kami menerapkan standar keamanan teknis dan organisasi yang wajar untuk melindungi data Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Data disimpan dalam server terenkripsi dan hanya dapat diakses oleh personel yang berwenang.
                    </p>

                    <h3>5. Hak Anda</h3>
                    <p>
                        Anda berhak untuk:
                        <ul>
                            <li>Meminta salinan data pribadi yang kami simpan.</li>
                            <li>Meminta penghapusan data setelah kontrak layanan berakhir (Right to be Forgotten).</li>
                            <li>Menarik persetujuan penggunaan data untuk komunikasi pemasaran.</li>
                        </ul>
                    </p>

                    <h3>6. Hubungi Kami</h3>
                    <p>
                        Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau pengelolaan data Anda, silakan hubungi kami melalui halaman <a href="/contact" className="text-primary hover:underline">Kontak</a>.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
