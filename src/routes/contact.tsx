import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/contact')({
    component: ContactComponent,
})

function ContactComponent() {
    return (
        <div className="container py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Book a Session</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Input id="message" className="h-24 pb-16" placeholder="Tell us about your business challenges..." />
                        </div>
                        <Button type="submit" className="w-full text-lg">Send Inquiry</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
