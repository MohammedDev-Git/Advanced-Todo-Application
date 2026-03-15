import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ModalProps } from "@/types";


import { useDispatch } from "react-redux";
import { addTempProject } from "@/features/members/membersSlice";
import PersonalDetails from "@/components/Members/MemberModal/PersonalDetails";
import Description from "@/components/Members/MemberModal/Description";
import ProjectsContribution from "@/components/Members/MemberModal/ProjectsContribution";
import SkillsAndSocials from "@/components/Members/MemberModal/SkillsAndSocials";

const AddMemberModal = ({ open, onOpenChange }: ModalProps) => {

    const dispatch = useDispatch();

    const [progress, setProgress] = useState<number>(1);

    const modalRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (open) {
            setProgress(1);
        }

    }, [open]);

    const playModalRefAnimation = () => {
        modalRef?.current?.classList.remove("animate-scale-in-out!");
        setTimeout(() => {
            modalRef?.current?.classList.add("animate-scale-in-out!");
        }, 10);
    }

    const handleAddTempProject = () => {
        dispatch(addTempProject());
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                ref={modalRef}
                aria-describedby="member modal"
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                onPointerDownOutside={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                className={`w-full custom-scrollbar max-w-[340px] md:max-w-xl lg:max-w-2xl shadow-2xl border-muted-foreground/10 max-h-148 overflow-y-auto`}>
                <CardHeader className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>Step {progress} of 4</span>
                        </div>
                        <Progress value={progress * (100 / 4)} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                        <DialogTitle className="space-y-1">
                            <CardTitle className="text-2xl">Add a Member</CardTitle>
                            <CardDescription>
                                {progress === 1 && "Personal Details"}
                                {progress === 2 && ""}
                                {progress === 3 && "Project Contribution"}
                                {progress === 4 && "Skills & Socials"}
                            </CardDescription>
                        </DialogTitle>
                        {
                            progress === 3 &&
                            <Button
                                type="button"
                                size="sm"
                                className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                                onClick={() => {
                                    handleAddTempProject();
                                }}
                            >
                                <Plus />
                            </Button>
                        }
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {progress === 1 && (
                        <PersonalDetails />
                    )}

                    {progress === 2 && (
                        <Description />
                    )}

                    {progress === 3 && (
                        <ProjectsContribution />
                    )}

                    {progress === 4 && (
                        <SkillsAndSocials />
                    )}

                </CardContent>

                <CardFooter className="flex justify-between border-t p-6 mt-2">
                    <Button onClick={() => {
                        if (progress > 1) {
                            setProgress(pre => pre - 1);
                        } else {
                            onOpenChange?.(false);
                        }
                    }} variant="ghost">{progress > 1 ? "Previous" : "Cancel"}</Button>
                    <Button
                        onClick={() => {
                            setProgress(prog => {
                                if (prog === 4) {
                                    onOpenChange?.(false);
                                }
                                return prog + 1;
                            });
                        }}
                        className="gap-2 text-white">
                        {progress === 4 ? 'Submit' : 'Next Step'}
                        {progress === 4 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </CardFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberModal;