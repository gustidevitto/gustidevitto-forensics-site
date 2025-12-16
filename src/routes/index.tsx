import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-14rem)]">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        The Hidden <span className="text-destructive">Phantom Costs</span><br />
                        Killing Your Margins.
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        You might be losing millions without realizing it. Only 1 in 10 business owners knows their true COGS inefficiency.
                        Are you one of them?
                    </p>
                    <div className="space-x-4">
                        <Link to="/get-access">
                            <Button size="lg" className="h-12 px-8 text-lg font-bold">
                                Check Your Risk Now (Free)
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                        Why Forensics Matter
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Traditional accounting hides the leaks. Forensic analysis reveals them.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Implicit Costs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Idle time, waste, and theft don't show up on a P&L until it's too late.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>COGS Drift</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Small variations in recipe execution compound into massive losses over time.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Labor Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Are you paying for productivity or presence? The difference is your profit margin.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
