import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"

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

const BLOG_POSTS = Object.entries(rawBlogs).map(([path, content]) => {
    const { data } = parseFrontmatter(content as string)
    // Extract slug from filename or frontmatter
    const filename = path.split('/').pop()?.replace('.md', '') || ''

    // Normalize slug: remove date prefix if exists for URL clarity, 
    // but the user wants date prefix for sorting.
    // We'll use the full filename as slug for safety, or a cleaned version.
    const slug = data.slug || filename.replace(/[\s\W]+/g, '-').toLowerCase()

    return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || 'Unknown Date',
        readTime: data.readTime || '5 min read',
        category: data.category || 'General',
        image: data.image || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop'
    }
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function BlogIndex() {
    return (
        <div className="container py-20 max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Financial Insights</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Artikel, studi kasus, dan panduan teknis untuk menjaga kesehatan finansial bisnis Anda.
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
                                        Baca Selengkapnya <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
