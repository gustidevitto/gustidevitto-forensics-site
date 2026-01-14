import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { useTranslation } from 'react-i18next'

// @ts-ignore
export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
})

// Parsing function for Frontmatter
const parseFrontmatter = (content: string) => {
    const lines = content.split('\n')
    const data: any = {}
    let isFrontmatter = false

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            if (!isFrontmatter) {
                isFrontmatter = true
            } else {
                // End of frontmatter
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

// Load Blogs Dynamically
const rawBlogs = import.meta.glob('../../../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function BlogIndex() {
    const { t, i18n } = useTranslation()
    const isEn = i18n.language.startsWith('en')

    // Process and filter blogs based on language
    const blogMap = new Map<string, { default: string, en?: string }>()

    Object.entries(rawBlogs).forEach(([path, content]) => {
        const filename = path.split('/').pop() || ''
        const isEnFile = filename.endsWith('.en.md')
        const baseId = isEnFile ? filename.replace('.en.md', '') : filename.replace('.md', '')

        if (!blogMap.has(baseId)) {
            blogMap.set(baseId, { default: '' })
        }

        const entry = blogMap.get(baseId)!
        if (isEnFile) entry.en = content as string
        else entry.default = content as string
    })

    const BLOG_POSTS = Array.from(blogMap.values()).map(entry => {
        const content = (isEn && entry.en) ? entry.en : entry.default
        const { data } = parseFrontmatter(content)
        return {
            slug: data.slug || '',
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            date: data.date || 'Unknown Date',
            readTime: data.readTime || '5 min read',
            category: data.category || 'General',
            image: data.image || '/assets/images/blog-default.png',
        }
    }).filter(p => p.slug).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="container py-20 max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{t('blog.title')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('blog.subtitle')}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {BLOG_POSTS.length > 0 ? (
                    BLOG_POSTS.map((post, idx) => (
                        <Card key={idx} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-muted max-w-md mx-auto w-full">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
                                    }}
                                />
                                <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground hover:bg-primary">
                                    {post.category}
                                </Badge>
                            </div>
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </div>
                                </div>
                                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                    {/* @ts-ignore */}
                                    <Link to={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="line-clamp-3">
                                    {post.excerpt}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="mt-auto pt-0">
                                <Button variant="link" className="p-0 h-auto font-semibold text-primary" asChild>
                                    {/* @ts-ignore */}
                                    <Link to={`/blog/${post.slug}`}>
                                        {t('blog.read_more')} <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-muted-foreground">{t('blog.no_posts')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
