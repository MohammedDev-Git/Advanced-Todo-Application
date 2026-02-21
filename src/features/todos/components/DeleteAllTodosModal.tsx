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
import { deleteAllTodos } from "../todosSlice";

interface deleteModalProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteAllTodosModal({ open, onOpenChange }: deleteModalProps) {
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(deleteAllTodos());
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete All Todos</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete all todos? This action cannot be undone.
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