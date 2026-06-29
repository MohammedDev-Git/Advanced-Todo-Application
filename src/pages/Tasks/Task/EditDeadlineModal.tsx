import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { editTaskDeadline } from "@/features/tasks/tasksSlice";

interface TaskType {
    id: string;
    title: string;
    categories: string[];
    description: string;
    deadline: string;
}

interface EditDeadlineModalProps {
    task: TaskType | null | undefined;
    deadlineModalOpen: boolean;
    setDeadlineModalOpen: (open: boolean) => void;
    deadlineDate: Date | undefined;
    setDeadlineDate: (date: Date) => void;
}

const EditDeadlineModal = ({
    task,
    deadlineModalOpen,
    setDeadlineModalOpen,
    deadlineDate,
    setDeadlineDate,
}: EditDeadlineModalProps) => {
    const dispatch = useDispatch();

    const handleUpdateDeadline = () => {
        if (!task) return;
        dispatch(editTaskDeadline({ taskId: task.id, deadline: deadlineDate ? deadlineDate.toISOString() : "" }));
        setDeadlineModalOpen(false);
    }

    return (
        <Dialog open={deadlineModalOpen} onOpenChange={(open) => setDeadlineModalOpen(open)}>
            <DialogContent className="sm:max-w-120 max-h-148 overflow-y-hidden rounded-[2rem] border-none p-0">
                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                            Choose Deadline
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <Calendar
                            mode="single"
                            selected={deadlineDate}
                            onSelect={(date) => {
                                if (date) setDeadlineDate(date);
                            }}
                            captionLayout="dropdown"
                            startMonth={new Date()}
                            endMonth={new Date(new Date().getFullYear() + 3, 11)}
                            disabled={{ before: new Date() }}
                            className="w-full rounded-3xl border border-border"
                        />
                    </div>
                    <DialogFooter className="mt-8 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setDeadlineModalOpen(false)}>
                            Close
                        </Button>
                        <Button
                            type="button"
                            className="text-white"
                            onClick={() => {
                                handleUpdateDeadline();
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditDeadlineModal