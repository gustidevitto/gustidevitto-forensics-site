import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/offerings')({
    component: OfferingsComponent,
})

function OfferingsComponent() {
    return (
        <div className="container py-10 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Forensic Solutions</h1>
                <p className="text-muted-foreground text-lg">Choose the level of depth your business requires.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {/* Tier 1 */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl">Quick Diagnosis Call</CardTitle>
                        <CardDescription>2-Hour Intensive Session</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <div className="text-3xl font-bold">IDR 2.500.000</div>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>Review of P&L Statement</li>
                            <li>Identification of Top 3 Leaks</li>
                            <li>Immediate Action Plan</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Book Now</Button>
                    </CardFooter>
                </Card>

                {/* Tier 2 */}
                <Card className="flex flex-col border-primary shadow-lg scale-105">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Full Forensics Audit</CardTitle>
                        <CardDescription>Comprehensive 7-Pillar Analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <div className="text-3xl font-bold">Custom Pricing</div>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>Deep Dive into Data & Operations</li>
                            <li>Staff Interviews & Process Audit</li>
                            <li>Full Reconstruction of Financials</li>
                            <li>90-Day Turnaround Roadmap</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Request Proposal</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
