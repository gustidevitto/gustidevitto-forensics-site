import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react"
import { useTranslation } from 'react-i18next'

// @ts-ignore
export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
})

// Simple Markdown to HTML converter (for basic tags used in blog)
const mdToHtml = (md: string) => {
    // Process line-by-line for block elements
    const lines = md.split('\n')
    const processedLines = lines.map(line => {
        let trimmed = line.trim()

        // Blockquotes
        if (trimmed.startsWith('>')) {
            return `<blockquote class="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">${trimmed.substring(1).trim()}</blockquote>`
        }

        // Headings
        if (trimmed.startsWith('###')) return `<h3 class="text-xl font-bold mt-8 mb-4">${trimmed.substring(3).trim()}</h3>`
        if (trimmed.startsWith('##')) return `<h2 class="text-2xl font-bold mt-10 mb-6">${trimmed.substring(2).trim()}</h2>`
        if (trimmed.startsWith('#')) return `<h1 class="text-3xl font-extrabold mt-12 mb-8">${trimmed.substring(1).trim()}</h1>`

        // Lists
        if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
            return `<li class="ml-4 list-disc mb-2">${trimmed.substring(1).trim()}</li>`
        }

        // Horizontal Rule
        if (trimmed === '---') return '<hr class="my-8 border-border" />'

        // Paragraphs (only if not empty)
        if (trimmed.length > 0) {
            return `<p class="mb-4">${trimmed}</p>`
        }

        return ''
    })

    let html = processedLines.join('\n')

    // Inline elements (apply to the whole thing)
    return html
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-8 w-full shadow-md" />')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline font-medium hover:text-primary/80 transition-colors">$1</a>')
        // Clean up citation markers or other specific patterns
        .replace(/\[cite_start\].*?\[cite:.*?\]/g, '')
}

// Parsing function for Frontmatter (Duplicate from index for now or move to lib later)
const parseFrontmatter = (content: string) => {
    const lines = content.split('\n')
    const data: any = {}
    let isFrontmatter = false

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            if (!isFrontmatter) {
                isFrontmatter = true
            } else {
                return { data, content: lines.slice(i + 1).join('\n') }
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

function BlogPost() {
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    // @ts-ignore
    const { slug } = Route.useParams()

    // Load Blogs Dynamically
    const rawBlogs = import.meta.glob('../../../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

    // Find the blog with matching slug (considering language)
    const baseIdMatches = (filename: string, slug: string) => {
        const baseId = filename.endsWith('.en.md') ? filename.replace('.en.md', '') : filename.replace('.md', '')
        return baseId.replace(/[\s\W]+/g, '-').toLowerCase() === slug
    }

    const blogEntries = Object.entries(rawBlogs).filter(([path, _]) => baseIdMatches(path.split('/').pop() || '', slug))

    // Select best entry: preference for .en.md if currentLang is 'en'
    let blogEntry = blogEntries.find(([path, _]) => path.endsWith('.en.md') && currentLang === 'en')
    if (!blogEntry) {
        // Fallback to default (.md)
        blogEntry = blogEntries.find(([path, _]) => !path.endsWith('.en.md'))
    }

    if (!blogEntry) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t('blog.not_found')}</h1>
                <Button asChild variant="outline">
                    <Link to="/blog">{t('blog.back_to_blog')}</Link>
                </Button>
            </div>
        )
    }

    const { data, content } = parseFrontmatter(blogEntry[1] as string)

    const post = {
        title: data.title || 'Untitled',
        date: data.date || 'Unknown Date',
        author: data.author || 'Gusti Devitto',
        category: data.category || 'Financial Forensics',
        image: data.image || '',
        content: mdToHtml(content)
    }

    return (
        <div className="container py-20 max-w-3xl mx-auto px-4">
            <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
                {/* @ts-ignore */}
                <Link to="/blog">
                    <ArrowLeft className="mr-2 w-4 h-4" /> {t('blog.back_to_blog')}
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

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full aspect-video object-cover rounded-2xl mb-12 shadow-xl border border-muted"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                )}

                {/* Content Rendering */}
                <div
                    className="blog-content prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <div className="mt-16 pt-8 border-t border-border">
                <div className="bg-muted/50 p-8 rounded-2xl text-center space-y-4">
                    <h3 className="text-xl font-bold">{t('blog.cta_title')}</h3>
                    <p className="text-muted-foreground">
                        {t('blog.cta_desc')}
                    </p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                        <Link to="/get-access">
                            {t('blog.cta_btn')}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
