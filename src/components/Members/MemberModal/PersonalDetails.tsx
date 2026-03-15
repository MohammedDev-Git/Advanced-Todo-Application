import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BriefcaseBusiness, Mail, Phone, User } from "lucide-react"

const PersonalDetails = () => {
    return (
        <div className="space-y-4">
            <div className="grid gap-1.5">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="John Doe" className="pl-10" />
                </div>
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                    <BriefcaseBusiness className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="role" placeholder="Frontend Developer" className=" pl-10" />
                </div>
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="m@example.com" className="pl-10" />
                </div>
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="+20 123 456 789" className="pl-10" />
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails