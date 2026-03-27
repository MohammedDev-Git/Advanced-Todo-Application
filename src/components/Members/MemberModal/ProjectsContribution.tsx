import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addTempProjectCategory, removeTempProject, removeTempProjectCategory, selectTempProjects } from "@/features/members/membersSlice"
import type { NestedCategory } from "@/types"
import { Code2, Globe, Plus, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

const ProjectsContribution = () => {

    const tempProjects = useSelector(selectTempProjects);

    const dispatch = useDispatch();

    const handleRemoveTempProject = (idx: number) => {
        dispatch(removeTempProject(idx));
    }

    const handleAddTempProjectCategory = (id: string) => {
        dispatch(addTempProjectCategory(id));
    }

    const handleRemoveTempProjectCategory = (object: NestedCategory) => {
        dispatch(removeTempProjectCategory(object));
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
                            <div className="flex justify-between items-center">
                                <Label>Project Category</Label>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                                    onClick={() => {
                                        console.log("added");
                                        handleAddTempProjectCategory(project.id);
                                    }}
                                >
                                    <Plus />
                                </Button>
                            </div>
                            <div
                                className="mt-2 border-2 border-primary/50 border-dotted p-5 rounded-2xl flex flex-col justify-center gap-4">
                                {
                                    project.tempCategory.map(() => (
                                        <div className="relative">
                                            <Input placeholder="E-commerce / SaaS" />
                                            {
                                                project.tempCategory.length > 1 &&
                                                <Button
                                                    onClick={() => {
                                                        handleRemoveTempProjectCategory(
                                                            { projectId: project.id, catIdx: idx }
                                                        );
                                                    }}
                                                    className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-5 h-5 rounded-full">

                                                    <X className="h-2 w-2 text-white" />
                                                </Button>
                                            }
                                        </div>

                                    ))
                                }
                            </div>

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