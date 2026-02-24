import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { deleteModalProps } from "@/types";
import { useDispatch } from "react-redux";
import { deleteNote } from "@/features/notes/notesSlice";

export function DeleteNoteModal({ open, onOpenChange, deletedId }: deleteModalProps) {

    const dispatch = useDispatch();

    const handleDeleteTodo = (id: string | undefined) => {
        if (id) dispatch(deleteNote(id));
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this Note? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleDeleteTodo(deletedId)}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}