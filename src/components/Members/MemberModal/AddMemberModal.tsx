import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, Check, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTempProject, removeAllTempProjects, resetAllErrors, resetAllTemps, selectTempProjects } from "@/features/members/membersSlice";
import PersonalDetails, { type PersonalDetailsRef } from "@/components/Members/MemberModal/PersonalDetails";
import Description, { type DescriptionRef } from "@/components/Members/MemberModal/Description";
import ProjectsContribution, { type ProjectsContributionRef } from "@/components/Members/MemberModal/ProjectsContribution";
import SkillsAndSocials, { type SkillsAndSocialsRef } from "@/components/Members/MemberModal/SkillsAndSocials";
import MemberPhoto, { type MemberPhotoRef } from "@/components/Members/MemberModal/MemberPhoto";
type DivElementType = HTMLDivElement | null;

interface AddMemberModalProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}

const AddMemberModal = ({ setOpen, open }: AddMemberModalProps) => {

    const dispatch = useDispatch();

    const [progress, setProgress] = useState<number>(1);

    const modalRef = useRef<DivElementType>(null);
    const closeRef = useRef<DivElementType>(null);

    const tempProjects = useSelector(selectTempProjects);

    useEffect(() => {

        if (open) {
            setProgress(1);
        } else {
            dispatch(resetAllTemps());
        }
    }, [open]);

    const prevProgress = useRef<number>(progress);

    useEffect(() => {
        if (prevProgress.current === 2 && progress === 3) {
            dispatch(resetAllErrors());
        }
        if (progress > 5) {
            setOpen(false);
        }
        prevProgress.current = progress;
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

    const personalDetailsRef = useRef<PersonalDetailsRef | null>(null);
    const detailsRef = useRef<DescriptionRef | null>(null);
    const projectsContributionRef = useRef<ProjectsContributionRef | null>(null);
    const skillsAndSocialsRef = useRef<SkillsAndSocialsRef | null>(null);
    const memberPhotoRef = useRef<MemberPhotoRef | null>(null);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="animate-fade-in sticky bottom-4 left-4 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                    <Plus className="h-6 w-6 text-white" />
                </Button>
            </DialogTrigger>
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
                className={`w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl max-h-148 p-2 md:p-6`}>
                <div className="space-y-2 px-2 md:px-6">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Step {progress} of 5</span>
                    </div>
                    <Progress value={progress * (100 / 5)} className="h-2" />
                </div>
                <div className="custom-scrollbar max-h-100 overflow-y-auto">

                    <CardHeader className="space-y-4 px-2 md:px-6">
                        <div className="flex justify-between items-center">
                            <DialogTitle className="space-y-1">
                                <CardTitle className="text-2xl">Add a Member</CardTitle>
                                <CardDescription>
                                    {progress === 1 && "Personal Details"}
                                    {progress === 2 && "Add Personal Photo (Optional)"}
                                    {progress === 3 && ""}
                                    {progress === 4 && "Project Contribution"}
                                    {progress === 5 && "Skills & Socials"}
                                </CardDescription>
                            </DialogTitle>
                            {
                                progress === 4 &&
                                <div className="flex justify-center items-center gap-2">
                                    {
                                        tempProjects.length > 1 &&
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white"
                                            onClick={() => {
                                                dispatch(removeAllTempProjects())
                                            }}
                                        >
                                            <Trash />
                                        </Button>
                                    }
                                    {
                                        tempProjects.length < 10 &&
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                                            onClick={() => {
                                                dispatch(addTempProject())
                                            }}
                                        >
                                            <Plus />
                                        </Button>
                                    }
                                </div>
                            }
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 px-2 md:px-6">
                        {progress === 1 && (
                            <PersonalDetails ref={personalDetailsRef} />
                        )}

                        {progress === 2 && (
                            <MemberPhoto ref={memberPhotoRef} />
                        )}
                        {progress === 3 && (
                            <Description ref={detailsRef} />
                        )}

                        {progress === 4 && (
                            <ProjectsContribution ref={projectsContributionRef} />
                        )}

                        {progress === 5 && (
                            <SkillsAndSocials ref={skillsAndSocialsRef} />
                        )}

                    </CardContent>
                </div>


                <CardFooter className="flex justify-between border-t px-2 md:px-6 mt-2 pt-4!">
                    <Button onClick={() => {
                        if (progress > 1) {
                            setProgress(pre => pre - 1);
                        } else {
                            setOpen?.(false);
                        }
                    }} variant="ghost">{progress > 1 ? "Previous" : "Cancel"}
                    </Button>
                    <Button
                        onClick={() => {

                            const condition =
                                (progress === 1 && personalDetailsRef.current?.handleStep())
                                ||
                                (progress === 2 && memberPhotoRef.current?.handleStep())
                                ||
                                (progress === 3 && detailsRef.current?.handleStep())
                                ||
                                (progress === 4 && projectsContributionRef.current?.handleStep())
                                ||
                                (progress === 5 && skillsAndSocialsRef.current?.handleStep())

                            if (condition) {
                                setProgress(pre => pre + 1);
                            }

                        }}
                        className="gap-2 text-white"
                    >
                        {progress === 5 ? 'Submit' : 'Next Step'}
                        {progress === 5 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </CardFooter>
                <div ref={closeRef} className="absolute right-3 top-3 transition-all rounded-2xl w-6 h-6" />
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberModal;