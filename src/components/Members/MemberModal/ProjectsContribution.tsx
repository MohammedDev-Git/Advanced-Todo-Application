import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { removeTempProject, selectTempProjects } from "@/features/members/membersSlice"
import { Code2, Globe, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

const ProjectsContribution = () => {

    const tempProjects = useSelector(selectTempProjects);

    const dispatch = useDispatch();

    const handleRemoveTempProject = (idx: number) => {
        dispatch(removeTempProject(idx));
    }

    return (
        <div className="flex flex-col justify-center gap-10">
            {
                tempProjects.map((project, idx) => (
                    <div key={idx} className="rounded-lg relative border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                        {
                            tempProjects.length > 1 &&
                            <Button
                                onClick={() => {
                                    handleRemoveTempProject(idx);
                                }}
                                className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-8 h-8 rounded-full">
                                <X className="h-4 w-4 text-white" />
                            </Button>
                        }
                        <div className="grid gap-1.5">
                            <Label htmlFor="p-title">Project Title</Label>
                            <Input id="p-title" placeholder="Portfolio Website" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="p-desc">Project Description</Label>
                            <Textarea id="p-desc"
                                placeholder="Briefly explain the project..."
                                className=" min-h-20 max-h-20" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="p-cat">Project Category</Label>
                            <Input id="p-cat" placeholder="E-commerce / SaaS" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="p-source">Source Code Link</Label>
                            <div className="relative">
                                <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="p-source" placeholder="https://github.com/..." className="pl-10 " />
                            </div>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="p-link">Live Link</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="p-link" placeholder="https://project.com" className="pl-10 " />
                            </div>
                        </div>

                    </div>

                ))
            }

        </div>
    )
}

export default ProjectsContribution