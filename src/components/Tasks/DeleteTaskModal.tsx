import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteTask } from "@/features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import type { ModalProps } from "@/types";

interface DeleteTaskModalProps extends ModalProps {
    deletedId?: string;
    setDeletedId: (id: string) => void;
}

function DeleteTaskModal({ open, onOpenChange, deletedId, setDeletedId }: DeleteTaskModalProps) {
    const dispatch = useDispatch();

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Task?</DialogTitle>
                        <DialogDescription>
                            This action will permanently delete the task. Are you sure you want to proceed?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                if (deletedId) {
                                    dispatch(deleteTask(deletedId));
                                }
                                onOpenChange?.(false);
                                setDeletedId("");
                            }}
                            className="text-white"
                        >
                            Delete Permanently
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default DeleteTaskModal;
