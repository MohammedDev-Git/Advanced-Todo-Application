import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Description = () => {
    return (
        <div className="grid gap-1.5">
            <Label htmlFor="description">About the Member</Label>
            <Textarea
                id="description"
                placeholder="Describe the member's background and expertise..."
                className="mt-4 min-h-48 max-h-48"
            />
        </div>
    )
}

export default Description