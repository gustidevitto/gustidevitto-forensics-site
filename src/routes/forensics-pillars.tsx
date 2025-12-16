import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/forensics-pillars')({
    component: PillarsComponent,
})

function PillarsComponent() {
    const pillars = [
        { title: "1. COGS Analysis", desc: "Revealing the gap between Theoretical vs Actual Consumption." },
        { title: "2. LTV/CAC Ratio", desc: "Measuring the true efficiency of your marketing spend." },
        { title: "3. Cash Conversion Cycle", desc: "How fast your inventory turns back into cash." },
        { title: "4. Customer Retention", desc: "The silent compounder of business value." },
        { title: "5. Break-Even Point", desc: "Dynamic sensitivity analysis for safety margins." },
        { title: "6. Labor Efficiency", desc: "Revenue per Man Hour (RPMH) optimization." },
        { title: "7. Inventory Forensics", desc: "Identifying shrinkage, waste, and dead stock." },
    ]

    return (
        <div className="container py-10 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">The 7 Pillars of Business Health</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Business failure isn't an event; it's a process. These 7 pillars are your early warning system.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pillars.map((p, i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-xl">{p.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{p.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
