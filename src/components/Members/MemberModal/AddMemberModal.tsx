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
import { addTempProject, resetAllTemps } from "@/features/members/membersSlice";
import PersonalDetails, { type PersonalDetailsRef } from "@/components/Members/MemberModal/PersonalDetails";
import Description, { type DescriptionRef } from "@/components/Members/MemberModal/Description";
import ProjectsContribution from "@/components/Members/MemberModal/ProjectsContribution";
import SkillsAndSocials from "@/components/Members/MemberModal/SkillsAndSocials";

const AddMemberModal = ({ open, onOpenChange }: ModalProps) => {

    const dispatch = useDispatch();

    const [progress, setProgress] = useState<number>(3);

    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open) {
            setProgress(3);
        } else {
            dispatch(resetAllTemps());
        }
    }, [open]);

    useEffect(() => {
        if (progress > 4) {
            onOpenChange?.(false);
        }
    }, [progress])

    const playModalRefAnimation = () => {
        modalRef?.current?.classList.remove("animate-shake!");
        closeRef?.current?.classList.remove("bg-primary/90");
        setTimeout(() => {
            modalRef?.current?.classList.add("animate-shake!");
            closeRef?.current?.classList.add("bg-primary/90");
        }, 10);

        setTimeout(() => {
            closeRef?.current?.classList.remove("bg-primary/90");
        }, 1000);
    }

    const handleAddTempProject = () => {
        dispatch(addTempProject());
    }

    const personalDetailsRef = useRef<PersonalDetailsRef | null>(null);
    const detailsRef = useRef<DescriptionRef | null>(null);

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
                className={`w-full max-w-[300px] md:max-w-xl lg:max-w-2xl shadow-2xl max-h-148 p-2 md:p-6`}>
                <div className="space-y-2 px-2 md:px-6">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Step {progress} of 4</span>
                    </div>
                    <Progress value={progress * (100 / 4)} className="h-2" />
                </div>
                <div className="custom-scrollbar max-h-100 overflow-y-auto">

                    <CardHeader className="space-y-4 px-2 md:px-6">
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

                    <CardContent className="space-y-4 px-2 md:px-6">
                        {progress === 1 && (
                            <PersonalDetails ref={personalDetailsRef} />
                        )}

                        {progress === 2 && (
                            <Description ref={detailsRef} />
                        )}

                        {progress === 3 && (
                            <ProjectsContribution />
                        )}

                        {progress === 4 && (
                            <SkillsAndSocials />
                        )}

                    </CardContent>
                </div>


                <CardFooter className="flex justify-between border-t px-2 md:px-6 mt-2 pt-4!">
                    <Button onClick={() => {
                        if (progress > 1) {
                            setProgress(pre => pre - 1);
                        } else {
                            onOpenChange?.(false);
                        }
                    }} variant="ghost">{progress > 1 ? "Previous" : "Cancel"}
                    </Button>
                    <Button
                        onClick={() => {

                            const condition =
                                (progress === 1 && personalDetailsRef.current?.handleStepOne())
                                ||
                                (progress === 2 && detailsRef.current?.handleStepTwo())
                                ||
                                (progress === 3)


                            if (condition) {
                                setProgress(pre => pre + 1);
                            }

                        }}
                        className="gap-2 text-white">
                        {progress === 4 ? 'Submit' : 'Next Step'}
                        {progress === 4 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </CardFooter>
                <div ref={closeRef} className="absolute right-3 top-3 transition-all rounded-2xl w-6 h-6" />
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberModal;