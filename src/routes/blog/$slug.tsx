import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react"

// @ts-ignore
export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
})

function BlogPost() {
    // @ts-ignore
    const { slug } = Route.useParams()

    // MOCK DATA FETCHING based on Slug
    // Nanti di sini kita fetch content MDX atau data dari CMS beneran
    const post = {
        title: "Apa itu Phantom Costs? Musuh Tersembunyi Profit Bisnis",
        date: "16 Dec 2025",
        author: "Gusti Devitto",
        category: "Financial Forensics",
        content: `
            <p>Pernahkah Anda merasa omzet naik terus tapi uang di rekening segitu-gitu saja? Hati-hati, mungkin bisnis Anda sedang dimakan oleh <strong>Phantom Costs</strong>.</p>
            
            <h2>Apa itu Phantom Cost?</h2>
            <p>Phantom Cost adalah biaya-biaya yang tidak tercatat secara eksplisit dalam laporan laba rugi standar (P&L), namun secara nyata mengurangi uang kas yang Anda bawa pulang.</p>
            
            <h3>Contoh Paling Umum:</h3>
            <ul>
                <li><strong>Idle Time:</strong> Karyawan digaji 8 jam, tapi efektif kerja hanya 4 jam. Sisa 4 jam adalah biaya hangus.</li>
                <li><strong>Shrinkage:</strong> Bahan baku yang hilang, rusak, atau dicuri sebelum jadi produk.</li>
                <li><strong>Waste:</strong> Porsi yang terlalu besar atau reject produk yang tidak dicatat.</li>
            </ul>

            <div class="bg-muted p-4 rounded-lg my-8 border-l-4 border-primary">
                "Jika Anda tidak bisa mengukurnya, Anda tidak bisa memperbaikinya."
            </div>

            <h2>Solusi Forensik</h2>
            <p>Langkah pertama adalah audit operasional. Gunakan stopwatch, timbang ulang bahan baku, dan cek CCTV. Bandingkan output teoritis dengan output aktual.</p>
       `
    }

    return (
        <div className="container py-20 max-w-3xl">
            <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
                {/* @ts-ignore */}
                <Link to="/blog">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Kembali ke Blog
                </Link>
            </Button>

            <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
                <div className="space-y-4 mb-8 not-prose">
                    <div className="flex flex-wrap gap-2 text-sm text-primary font-medium">
                        <span className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-foreground">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>

                {/* Content Rendering */}
                {/* Note: In real app, use a Markdown parser like react-markdown */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="mt-16 pt-8 border-t border-border">
                <div className="bg-muted/50 p-8 rounded-2xl text-center space-y-4">
                    <h3 className="text-xl font-bold">Ingin Audit Bisnis Anda?</h3>
                    <p className="text-muted-foreground">
                        Jangan biarkan Phantom Costs berlarut-larut. Cek kesehatan finansial bisnis Anda sekarang.
                    </p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                        <Link to="/calculator">
                            Buka Calculator Forensik
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
