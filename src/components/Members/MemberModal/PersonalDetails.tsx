import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInput } from "@/hooks/useInput"
import { BriefcaseBusiness, Mail, Phone, User } from "lucide-react"

const PersonalDetails = () => {

    const name = useInput("");
    const role = useInput("");
    const email = useInput("");
    const phone = useInput("");

    const inputData = [
        {
            id: "name",
            label: "Full Name",
            placeholder: "Ahmed Ali",
            type: "text",
            icon: <User className="size-4" />,
            ...name
        },
        {
            id: "role",
            label: "Role",
            placeholder: "Frontend Developer",
            type: "text",
            icon: <BriefcaseBusiness className="size-4" />,
            ...role
        },
        {
            id: "email",
            label: "Email Address",
            placeholder: "example@gmail.com",
            type: "email",
            icon: <Mail className="size-4" />,
            ...email
        },
        {
            id: "phone",
            label: "Phone",
            placeholder: "+20 123 456 789",
            type: "text",
            icon: <Phone className="size-4" />,
            ...phone
        },
    ]

    return (
        <div className="space-y-4">
            {
                inputData.map((input) => (
                    <div key={input.id} className="grid gap-1.5">
                        <Label htmlFor={input.id}>{input.label}</Label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-muted-foreground">
                                {input.icon}
                            </div>
                            <Input
                                type={input.type}
                                id={input.id}
                                placeholder={input.placeholder}
                                className="pl-10"
                                value={input.value}
                                onChange={(e) => {
                                    input.onChange(e);
                                }}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PersonalDetails