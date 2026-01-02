import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"

// @ts-ignore
export const Route = createFileRoute('/terms')({
    component: Terms,
})

function Terms() {
    return (
        <div className="container py-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Syarat & Ketentuan</h1>
            <Card>
                <CardContent className="p-8 prose dark:prose-invert max-w-none">
                    <h3>1. Definisi Layanan</h3>
                    <p>
                        Gusti Devitto Forensics menyediakan layanan konsultasi keuangan, audit operasional, dan strategi bisnis.
                        Kami bertindak sebagai penasihat independen dan bukan sebagai auditor publik yang memberikan opini audit atas laporan keuangan untuk keperluan bursa atau pihak ketiga publik.
                    </p>

                    <h3>2. Batasan Tanggung Jawab</h3>
                    <p>
                        Hasil analisis dan rekomendasi kami didasarkan pada data yang Anda berikan. Kami tidak bertanggung jawab atas:
                        <ul className="list-disc list-inside">
                            <li>Ketidakakuratan data yang disajikan oleh klien.</li>
                            <li>Keputusan bisnis yang diambil klien tanpa konsultasi lebih lanjut.</li>
                            <li>Kerugian finansial yang terjadi akibat faktor eksternal di luar kendali manajemen.</li>
                        </ul>
                    </p>

                    <h3>3. Kebijakan Pembayaran</h3>
                    <p>
                        <ul>
                            <li><strong>Tier 1 (Instant Diagnosis)</strong>: Pembayaran penuh (100%) wajib dilakukan di muka sebelum sesi dijadwalkan.</li>
                            <li><strong>Tier 2 (Surgical Blueprint)</strong>: Pembayaran penuh (100%) wajib dilakukan di muka untuk mengamankan slot dan memulai proses review data.</li>
                            <li><strong>Tier 3 (Turnaround Protocol)</strong>: Skema pembayaran dapat didiskusikan (Termin), namun deposit 50% wajib dibayarkan sebelum kick-off project.</li>
                        </ul>
                    </p>

                    <h3>4. Kebijakan Refund & Reschedule</h3>
                    <p>
                        <strong>Refund (Pengembalian Dana):</strong>
                        <ul>
                            <li>Refund 100% dapat diajukan jika sesi dibatalkan oleh pihak Gusti Devitto Forensics.</li>
                            <li>Refund tidak berlaku jika klien membatalkan sesi kurang dari 24 jam sebelum jadwal, atau tidak hadir (No-Show) pada sesi online/offline.</li>
                            <li>Refund untuk layanan Tier 2 & 3 yang sudah berjalan tidak dapat dilakukan, namun sisa sesi dapat dialihkan ke kredit layanan lain.</li>
                        </ul>
                        <br />
                        <strong>Reschedule (Penjadwalan Ulang):</strong>
                        <ul>
                            <li>Reschedule diperbolehkan maksimal 1x per sesi dengan pemberitahuan minimal 24 jam sebelumnya.</li>
                        </ul>
                    </p>

                    <h3>5. Hak Kekayaan Intelektual</h3>
                    <p>
                        Seluruh materi, template, framework (termasuk 15-Pillars), dan laporan yang diberikan adalah hak cipta Gusti Devitto Forensics.
                        Klien diberikan lisensi penggunaan internal, namun dilarang keras menjual kembali, menyebarkan, atau menggunakan materi tersebut untuk kepentingan komersial pihak ketiga tanpa izin tertulis.
                    </p>

                    <h3>6. Hukum yang Berlaku</h3>
                    <p>
                        Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa akan diselesaikan melalui musyawarah untuk mufakat, atau melalui Badan Arbitrase Nasional Indonesia (BANI) jika tidak tercapai kesepakatan.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
