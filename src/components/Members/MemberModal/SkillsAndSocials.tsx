import LanguageInput from "@/components/custom/LanguageInput"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addTempLink, addTempStack, removeTempLink, removeTempStack, selectTempLinks, selectTempStack } from "@/features/members/membersSlice"
import { Plus, Share2, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

const SkillsAndSocials = () => {

    const tempStack = useSelector(selectTempStack);
    const tempLinks = useSelector(selectTempLinks);

    const dispatch = useDispatch();

    const placeholdersStackArr = [
        "GSAP",
        "ThreeJS",
        "React",
        "TypeScript",
        "Tailwind",
        "JavaScript",
        "Redux",
        "Strapi",
        "Nodejs",
    ]

    const placeholdersLinksArr = [
        "github",
        "linkedin",
        "portfolio",
        "facebook",
    ]

    const handleAddTempStack = () => {
        dispatch(addTempStack());
    }

    const handleRemoveTempStack = (idx: number) => {
        dispatch(removeTempStack(idx));
    }

    const handleAddTempLink = () => {
        dispatch(addTempLink());
    }

    const handleRemoveTempLink = (idx: number) => {
        dispatch(removeTempLink(idx));
    }

    return (
        <div className="space-y-6">
            <div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                <Label className="text-primary font-bold">Member Languages (Max 4)</Label>
                <LanguageInput />
            </div>

            <div className="grid gap-1.5">
                <Label>Tech Stack</Label>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                    {
                        tempStack.map((tech, idx) => (
                            <div key={idx} className="relative">
                                <Input key={idx} placeholder={`eg. ${placeholdersStackArr[idx]}`} />
                                {
                                    tempStack.length > 1 &&
                                    <Button
                                        onClick={() => {
                                            handleRemoveTempStack(idx);
                                        }}
                                        className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                        <X className="size-4 text-white" />
                                    </Button>
                                }
                            </div>
                        ))
                    }
                    {
                        tempStack.length < 9 &&
                        <Button
                            onClick={() => {
                                handleAddTempStack();
                            }}
                            className="bg-primary/10 hover:bg-primary/20 flex items-center justify-center rounded-sm border-dotted border-2 border-primary">
                            <Plus className="w-4 h-4 text-primary" />
                        </Button>
                    }
                </div>
            </div>

            <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                    <Label>Social Media Links</Label>
                    <Button
                        type="button"
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                        onClick={() => {
                            handleAddTempLink();
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                {
                    tempLinks.map((link, idx) => (
                        <div key={idx} className="relative mt-3">
                            <div className="relative">
                                <Share2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder={`https://www.${placeholdersLinksArr[idx]}.com/`} className="pl-10 " />
                            </div>
                            {
                                tempLinks.length > 1 &&
                                <Button
                                    onClick={() => {
                                        handleRemoveTempLink(idx);
                                    }}
                                    className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                    <X className="size-4 text-white" />
                                </Button>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default SkillsAndSocials