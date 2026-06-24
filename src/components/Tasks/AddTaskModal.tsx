import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ChevronRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskDetailsForm, { type TaskDetailsRefType } from "@/components/Tasks/TaskDetailsForm";
import MembersChoose from "@/components/Tasks/MembersChoose";
import Media, { type MediaRefType } from "@/components/Tasks/Media";
import { selectMembers } from "@/features/members/membersSlice";
import type { MemberObject } from "@/types";
import { addAssociatedMembers, addNewTask, resetTempTask } from "@/features/tasks/tasksSlice";
import { InputError } from "@/components/custom/InputError";
import { useError } from "@/hooks/useError";

type DivElementType = HTMLDivElement | null;

type ModifiedMember = MemberObject & { selected: boolean };

interface AddTaskModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddTaskModal = ({ open, setOpen }: AddTaskModalProps) => {
    const members = useSelector(selectMembers);
    const [progress, setProgress] = useState(1);
    const [modifiedMembers, setModifiedMembers] = useState<ModifiedMember[]>([]);

    const selectedCount = modifiedMembers.filter((member) => member.selected).length;

    const progressWidth = `${(progress / 3) * 100}%`;

    const taskDetailsFormRef = useRef<TaskDetailsRefType | null>(null);

    const mediaRef = useRef<MediaRefType | null>(null);

    const dispatch = useDispatch();

    const resetOnOpen = () => {
        setProgress(1);
        setModifiedMembers(members.map((member) => ({ ...member, selected: false })));
    };

    const resetForm = () => {
        dispatch(resetTempTask());
    };

    useEffect(() => {
        resetOnOpen();
        resetForm();
    }, [open]);

    const selectedMembersError = useError(undefined);
    const [errorKey, setErrorKey] = useState<number>(0);

    useEffect(() => {
        if (progress === 2) {
            selectedMembersError.setErrorMsg(undefined);
        }
    }, [progress])

    const handleStepTwo = () => {
        const selected = modifiedMembers.filter((member) => member.selected).map((mem) => mem.id);

        if (selected.length === 0) {
            selectedMembersError.setErrorMsg("choose at least one member");
            setErrorKey(p => p + 1);
            return false;
        }

        selectedMembersError.setErrorMsg(undefined);

        dispatch(addAssociatedMembers({ selected }));
        return true;
    };

    const handleNext = () => {
        if (progress === 1) {
            if (!taskDetailsFormRef.current?.handleStepOne()) return;
            setProgress(p => p + 1);
            return;
        }

        if (progress === 2) {
            if (!handleStepTwo()) return;
            setProgress(p => p + 1);
            return;
        }

        if (progress === 3) {
            if (!mediaRef.current?.handleStepThree()) return;
        }

        dispatch(addNewTask());

        setOpen(false);
    };

    const handlePrevious = () => {
        if (progress > 1) {
            setProgress((prev) => prev - 1);
            return;
        }
        setOpen(false);
    };

    const modalRef = useRef<DivElementType>(null);
    const closeRef = useRef<DivElementType>(null);

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

    return (
        <Dialog open={open} onOpenChange={(value) => {
            setOpen(value);
        }}>
            <DialogTrigger asChild>
                <Button
                    className="animate-fade-in sticky bottom-4 left-4 z-40 p-4 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center"
                    aria-label="Add task"
                >
                    <Plus className="h-8 w-8 text-white" />
                </Button>
            </DialogTrigger>
            <DialogContent
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                onPointerDownOutside={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                ref={modalRef}
                className={`w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl p-2 md:p-6`}>
                <div className="space-y-4">
                    <div className="flex mt-4 items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Step {progress} of 3</span>
                        <div className="flex-1 mx-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-primary transition-all" style={{ width: progressWidth }} />
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                    </DialogHeader>
                    {
                        progress === 2 &&
                        <>
                            <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Choose teammates</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Pick team members by tapping their card.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary shadow-sm dark:bg-slate-900/80">
                                    <span className="font-semibold">{selectedCount}</span>
                                    selected
                                </div>
                            </div>
                            <InputError keyErr={errorKey} message={selectedMembersError.errorMsg} />
                        </>
                    }
                    <form className={`grid ${progress === 2 ? "max-h-100" : "max-h-128"} gap-5 p-2 custom-scrollbar overflow-y-auto`} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                        {progress === 1 ? (
                            <TaskDetailsForm ref={taskDetailsFormRef} />
                        ) : progress === 2 ? (
                            <MembersChoose
                                modifiedMembers={modifiedMembers}
                                setModifiedMembers={setModifiedMembers}
                            />
                        ) : <Media ref={mediaRef} />
                        }
                        <div ref={closeRef} className="absolute right-3 top-3 transition-all rounded-2xl w-6 h-6" />
                    </form>
                    <DialogFooter className="flex items-center justify-between gap-3">
                        <Button type="button" variant="outline" onClick={handlePrevious}>
                            {progress === 1 ? "Cancel" : (
                                <>
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </>
                            )}
                        </Button>
                        <Button type="button" className="gap-2 text-white" onClick={handleNext}>
                            {progress === 1 || progress === 2 ? "Next Step" : "Submit"}
                            {progress === 1 || progress === 2 ? <ChevronRight className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskModal;