import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import { deleteAllNotes } from "@/features/notes/notesSlice";
import type { ModalProps } from "@/types";



export function DeleteAllNotesModal({ open, onOpenChange }: ModalProps) {
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(deleteAllNotes());
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete All Notes</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete all notes? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleDeleteAll()}>Delete All</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}