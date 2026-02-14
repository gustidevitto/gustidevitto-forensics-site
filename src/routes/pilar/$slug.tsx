import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import pillarsData from '@/data/pillarsData.json'
import { useTranslation } from 'react-i18next'

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
        .replace(/™/g, '&trade;')
        .replace(/®/g, '&reg;')
        .replace(/©/g, '&copy;')
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
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    // Jump back to top on navigation
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    // Find pillar from JSON
    const pillarIndex = pillarsData.findIndex(p => p.id === slug)
    const pillar = pillarsData[pillarIndex]

    if (!pillar) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t('pilar_detail.not_found')}</h1>
                <Button asChild variant="outline">
                    <Link to="/forensics-pillars">{t('pilar_detail.back_to_list')}</Link>
                </Button>
            </div>
        )
    }

    // Load Markdown Content (Try localized first, then fallback to original)
    const rawArticles = import.meta.glob('../../../content/pillars-articles/*.md', { query: '?raw', import: 'default', eager: true })

    const findArticle = (slugBase: string, lang: string) => {
        const langSuffix = lang === 'en' ? '.en' : ''
        const targetFilename = `${slugBase}${langSuffix}`

        return Object.entries(rawArticles).find(([path, _]) => {
            const filename = path.split('/').pop()?.replace('.md', '') || ''
            return filename === targetFilename
        })
    }

    let articleEntry = findArticle(slug, currentLang)
    // Fallback to primary if localized not found
    if (!articleEntry && currentLang !== 'id') {
        articleEntry = findArticle(slug, 'id')
    }
    // Final fallback to just the slug
    if (!articleEntry) {
        articleEntry = Object.entries(rawArticles).find(([path, _]) => {
            const filename = path.split('/').pop()?.replace('.md', '') || ''
            return filename === slug
        })
    }

    let articleContent = null
    let metadata = {}

    if (articleEntry) {
        const parsed = parseFrontmatter(articleEntry[1] as string)
        articleContent = mdToHtml(parsed.content)
        metadata = parsed.data
    }

    // SEO Overrides
    const displayTitle = (metadata as any).title || t(`pillars.${pillar.id}.title`)

    // Navigation
    const prevPillar = pillarIndex > 0 ? pillarsData[pillarIndex - 1] : null
    const nextPillar = pillarIndex < pillarsData.length - 1 ? pillarsData[pillarIndex + 1] : null

    // Breadcrumb Data for Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('nav.home'),
                "item": "https://gustidevitto.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": t('nav.financial_forensics'),
                "item": "https://gustidevitto.com/forensics-pillars"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": t(`pillars.${pillar.id}.title`),
                "item": `https://gustidevitto.com/pilar/${slug}`
            }
        ]
    }

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": displayTitle,
        "description": (metadata as any).description || t(`pillars.${pillar.id}.definition`),
        "image": `https://gustidevitto.com${pillar.img_placeholder}`,
        "author": {
            "@type": "Person",
            "name": "Gusti Devitto",
            "url": "https://gustidevitto.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "gustidevitto.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://gustidevitto.com/assets/images/android-chrome-192x192.png"
            }
        },
        "datePublished": (metadata as any).last_updated || "2025-01-02",
        "dateModified": (metadata as any).last_updated || "2025-01-02",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://gustidevitto.com/pilar/${slug}`
        }
    }

    return (
        <div className="flex-1 flex flex-col bg-background pb-20">
            <title>{`${displayTitle} - Financial Forensics Pillar`}</title>
            <meta name="description" content={(metadata as any).description || t(`pillars.${pillar.id}.definition`)} />

            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(articleSchema)}
            </script>

            {/* Header / Breadcrumb */}
            <div className="border-b bg-card/30 backdrop-blur-sm sticky top-16 z-40">
                <div className="container py-4 flex items-center justify-between px-4 md:px-8">
                    <Button variant="ghost" asChild size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
                        <Link to="/forensics-pillars">
                            <ArrowLeft className="mr-2 w-4 h-4" /> {t('pilar_detail.back_to_list')}
                        </Link>
                    </Button>
                    <div className="text-sm font-medium text-muted-foreground hidden md:block">
                        <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
                        <span className="mx-2">/</span>
                        <Link to="/forensics-pillars" className="hover:text-primary transition-colors">{t('nav.financial_forensics')}</Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">{t(`pillars.${pillar.id}.title`)}</span>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/60 uppercase tracking-tighter">
                        {t('pilar_detail.last_updated')} <time dateTime={(metadata as any).last_updated || "2025-01-02"}>
                            {new Date((metadata as any).last_updated || "2025-01-02").toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
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
                            "{t(`pillars.${pillar.id}.attribution`)}"
                        </p>
                    </div>
                </div>

                {/* Visual Proof */}
                <div className="mb-16 relative group mx-auto max-w-3xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
                        <img
                            src={pillar.img_placeholder.startsWith('/') ? pillar.img_placeholder : `/${pillar.img_placeholder}`}
                            alt={`${t(`pillars.${pillar.id}.title`)} - Financial Forensics Dashboard by Gusti Devitto`}
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
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">{t('pilar_detail.field_language')}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-primary">
                            {t(`pillars.${pillar.id}.layer1`)}
                        </h2>
                    </div>
                    <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">{t('pilar_detail.forensic_term')}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                            {t(`pillars.${pillar.id}.title`)}
                        </h2>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-12 max-w-3xl mx-auto">
                    <section className="prose prose-slate dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-bold border-b border-border pb-4 mb-6 text-center">{t('pilar_detail.definition_title')}</h3>
                        <p className="text-xl text-muted-foreground leading-relaxed text-center">
                            {t(`pillars.${pillar.id}.definition`)}
                        </p>
                    </section>

                    <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
                        <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">🔬</div>
                            {t('pilar_detail.deep_dive_title')}
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
                                    {t('pilar_detail.article_in_progress')}
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
                                <ChevronLeft className="w-3 h-3" /> {t('pilar_detail.prev_pillar')}
                            </span>
                            <span className="font-bold text-lg group-hover:text-primary transition-colors">
                                {t(`pillars.${prevPillar.id}.title`)}
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
                                {t('pilar_detail.next_pillar')} <ChevronRight className="w-3 h-3" />
                            </span>
                            <span className="font-bold text-lg group-hover:text-primary transition-colors">
                                {t(`pillars.${nextPillar.id}.title`)}
                            </span>
                        </Link>
                    ) : <div />}
                </div>

                {/* Final CTA */}
                <div className="mt-20 bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 md:p-16 text-center space-y-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">{t('pilar_detail.cta_title')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('pilar_detail.cta_desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20">
                            <Link to="/get-access">{t('pilar_detail.cta_calculator')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold">
                            <Link to="/contact">{t('pilar_detail.cta_consult')}</Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

