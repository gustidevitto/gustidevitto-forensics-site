import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import pillarsData from '@/data/pillarsData.json'

export const Route = createFileRoute('/pilar/$slug')({
    component: PilarPage,
})

// Simple Markdown to HTML converter (compatible with the one in blog)
const mdToHtml = (md: string) => {
    const lines = md.split('\n')
    const processedLines = lines.map(line => {
        let trimmed = line.trim()
        if (trimmed.startsWith('>')) return `<blockquote class="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">${trimmed.substring(1).trim()}</blockquote>`
        if (trimmed.startsWith('###')) return `<h3 class="text-xl font-bold mt-8 mb-4">${trimmed.substring(3).trim()}</h3>`
        if (trimmed.startsWith('##')) return `<h2 class="text-2xl font-bold mt-10 mb-6">${trimmed.substring(2).trim()}</h2>`
        if (trimmed.startsWith('#')) return `<h1 class="text-3xl font-extrabold mt-12 mb-8">${trimmed.substring(1).trim()}</h1>`
        if (trimmed.startsWith('*') || trimmed.startsWith('-')) return `<li class="ml-4 list-disc mb-2">${trimmed.substring(1).trim()}</li>`
        if (trimmed === '---') return '<hr class="my-8 border-border" />'
        if (trimmed.length > 0) return `<p class="mb-4">${trimmed}</p>`
        return ''
    })

    return processedLines.join('\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-8 w-full shadow-md" />')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline font-medium hover:text-primary/80 transition-colors">$1</a>')
}

const parseFrontmatter = (content: string) => {
    const lines = content.split('\n')
    const data: any = {}
    let isFrontmatter = false
    let contentStartLine = 0

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            if (!isFrontmatter) {
                isFrontmatter = true
            } else {
                contentStartLine = i + 1
                return { data, content: lines.slice(contentStartLine).join('\n') }
            }
        } else if (isFrontmatter) {
            const [key, ...valueParts] = lines[i].split(':')
            if (key && valueParts.length > 0) {
                data[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
            }
        }
    }
    return { data, content }
}

function PilarPage() {
    const { slug } = Route.useParams()

    // Find pillar from JSON
    const pillarIndex = pillarsData.findIndex(p => p.id === slug)
    const pillar = pillarsData[pillarIndex]

    if (!pillar) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Pilar Tidak Ditemukan</h1>
                <Button asChild variant="outline">
                    <Link to="/forensics-pillars">Kembali ke Daftar Pilar</Link>
                </Button>
            </div>
        )
    }

    // Load Markdown Content
    const rawArticles = import.meta.glob('../../../content/pillars-articles/*.md', { query: '?raw', import: 'default', eager: true })
    const articleEntry = Object.entries(rawArticles).find(([path, _]) => {
        const filename = path.split('/').pop()?.replace('.md', '') || ''
        return filename === slug
    })

    let articleContent = null
    let metadata = {}

    if (articleEntry) {
        const parsed = parseFrontmatter(articleEntry[1] as string)
        articleContent = mdToHtml(parsed.content)
        metadata = parsed.data
    }

    // SEO Overrides (simplified for now, ideally handled via meta function in TanStack Router)
    const displayTitle = (metadata as any).title || pillar.title

    // Navigation
    const prevPillar = pillarIndex > 0 ? pillarsData[pillarIndex - 1] : null
    const nextPillar = pillarIndex < pillarsData.length - 1 ? pillarsData[pillarIndex + 1] : null

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Breadcrumb */}
            <div className="border-b bg-card/30 backdrop-blur-sm sticky top-16 z-40">
                <div className="container py-4 flex items-center justify-between px-4 md:px-8">
                    <Button variant="ghost" asChild size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
                        <Link to="/forensics-pillars">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Daftar Pilar
                        </Link>
                    </Button>
                    <div className="text-sm font-medium text-muted-foreground truncate max-w-[200px] md:max-w-none">
                        Pilar {pillarIndex + 1} of {pillarsData.length}: {pillar.title}
                    </div>
                </div>
            </div>

            <main className="container max-w-4xl pt-12 px-6 md:px-8 mx-auto">
                {/* Title Section */}
                <div className="space-y-6 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground balance mx-auto">
                        {displayTitle}
                    </h1>

                    {/* Attribution Block */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm mx-auto max-w-3xl">
                        <p className="text-primary font-medium text-lg leading-relaxed italic">
                            "{pillar.attribution_anchor}"
                        </p>
                    </div>
                </div>

                {/* Visual Proof */}
                <div className="mb-16 relative group mx-auto max-w-3xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
                        <img
                            src={pillar.img_placeholder.startsWith('/') ? pillar.img_placeholder : `/${pillar.img_placeholder}`}
                            alt={`${pillar.title} - Financial Forensics Dashboard by Gusti Devitto`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback for missing images
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070&auto=format&fit=crop"
                            }}
                        />
                    </div>
                </div>

                {/* The Dual-Layer Translation */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 mx-auto max-w-3xl">
                    <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Bahasa Lapangan</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-primary">
                            {pillar.layer1_term}
                        </h2>
                    </div>
                    <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Istilah Forensik</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                            {pillar.layer2_term}
                        </h2>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-12 max-w-3xl mx-auto">
                    <section className="prose prose-slate dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-bold border-b border-border pb-4 mb-6 text-center">Definisi Pilar</h3>
                        <p className="text-xl text-muted-foreground leading-relaxed text-center">
                            {pillar.definition}
                        </p>
                    </section>

                    <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
                        <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">🔬</div>
                            Deep Dive Diagnostic
                        </h3>
                        {articleContent ? (
                            <div
                                className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: articleContent }}
                            />
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <div className="text-5xl mb-4">🧪</div>
                                <p className="text-xl text-muted-foreground italic font-medium">
                                    "Forensic Analysis Article in Progress. Check back soon for the full diagnostic breakdown by Gusti Devitto."
                                </p>
                                <div className="pt-4">
                                    <div className="h-1 w-24 bg-primary/30 mx-auto rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Navigation */}
                <div className="mt-20 pt-12 border-t border-border grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {prevPillar ? (
                        <Link
                            to="/pilar/$slug"
                            params={{ slug: prevPillar.id }}
                            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all text-left"
                        >
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
                                <ChevronLeft className="w-3 h-3" /> Previous Pillar
                            </span>
                            <span className="font-bold text-lg group-hover:text-primary transition-colors">
                                {prevPillar.title}
                            </span>
                        </Link>
                    ) : <div />}

                    {nextPillar ? (
                        <Link
                            to="/pilar/$slug"
                            params={{ slug: nextPillar.id }}
                            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all text-right"
                        >
                            <span className="text-xs font-medium text-muted-foreground flex items-center justify-end gap-1 mb-2">
                                Next Pillar <ChevronRight className="w-3 h-3" />
                            </span>
                            <span className="font-bold text-lg group-hover:text-primary transition-colors">
                                {nextPillar.title}
                            </span>
                        </Link>
                    ) : <div />}
                </div>

                {/* Final CTA */}
                <div className="mt-20 bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 md:p-16 text-center space-y-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Siap Menghentikan Kebocoran?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Identifikasi Phantom Costs sekarang dengan FFD™ v3 Dashboard. Mulai audit awal secara mandiri atau hubungi konsultan kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20">
                            <Link to="/get-access">Buka Calculator Forensik</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold">
                            <Link to="/contact">Konsultasi Privat</Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

