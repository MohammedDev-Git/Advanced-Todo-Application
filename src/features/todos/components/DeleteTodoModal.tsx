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
import { deleteTodo } from "@/features/todos/todosSlice";

interface deleteModalProps {
    open: boolean;
    deletedTodoId: string | undefined;
    onOpenChange?: (open: boolean) => void;
}


export function DeleteTodoModal({ open, onOpenChange, deletedTodoId }: deleteModalProps) {
    const dispatch = useDispatch();

    const handleDeleteTodo = (id: string | undefined) => {
        if (id) dispatch(deleteTodo(id));
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Todo</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this todo? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleDeleteTodo(deletedTodoId)}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}