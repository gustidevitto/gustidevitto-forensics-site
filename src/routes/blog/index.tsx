import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"

// @ts-ignore
export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
})

// MOCK DATA - Nanti ini bisa diganti dengan MDX atau data dari CMS / Database
const BLOG_POSTS = [
    {
        slug: "mengenal-phantom-costs",
        title: "Apa itu Phantom Costs? Musuh Tersembunyi Profit Bisnis",
        excerpt: "Biaya ini tidak ada di laporan laba rugi, tapi menggerogoti cashflow Anda setiap hari. Pelajari cara mendeteksinya.",
        date: "16 Dec 2025",
        readTime: "5 min read",
        category: "Financial Forensics",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop"
    },
    {
        slug: "cara-hitung-hpp-akurat",
        title: "Jangan Salah Hitung HPP: Panduan Forensik untuk F&B",
        excerpt: "Salah hitung HPP = Salah menentukan harga jual. Temukan celah di mana 70% bisnis F&B kehilangan margin.",
        date: "10 Dec 2025",
        readTime: "8 min read",
        category: "Unit Economics",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
    },
    {
        slug: "cashflow-vs-profit",
        title: "Profit di Kertas vs Uang di Bank: Memahami Liquidity Velocity",
        excerpt: "Kenapa laporan keuangan untung tapi tidak bisa bayar supplier? Jawabannya ada di Cash Conversion Cycle.",
        date: "05 Dec 2025",
        readTime: "6 min read",
        category: "Strategic Finance",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258822f87?q=80&w=800&auto=format&fit=crop"
    }
]

function BlogIndex() {
    return (
        <div className="container py-20 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Financial Insights</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Artikel, studi kasus, dan panduan teknis untuk menjaga kesehatan finansial bisnis Anda.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, idx) => (
                    <Card key={idx} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-muted">
                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
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
                ))}
            </div>
        </div>
    )
}
