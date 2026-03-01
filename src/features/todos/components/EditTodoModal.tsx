import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "@/features/todos/todosSlice";
import { todoSchema } from "@/features/todos/schemas/todoSchema";
import type { addTodoError, todoObject } from "@/types";
import { InputError } from "@/components/custom/InputError";

interface EditTodoModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    editedTodo?: todoObject | undefined;
}

export function EditTodoModal({ open, onOpenChange, editedTodo }: EditTodoModalProps) {

    const dispatch = useDispatch();

    const [zodErrors, setZodErrors] = useState<addTodoError | null>(null);
    const [errorKey, setErrorKey] = useState<number | null>(null);

    const titleInput = useInput(editedTodo?.title || "");
    const category1Input = useInput(editedTodo?.category[0] || "");
    const category2Input = useInput(editedTodo?.category[1] || "");

    const resetAll = () => {
        setZodErrors(null);
        titleInput.reset();
        category1Input.reset();
        category2Input.reset();
    }

    useEffect(() => {
        if (open) {
            titleInput.fillInitialState();
            category1Input.fillInitialState();
            category2Input.fillInitialState();
        }
    }, [open, editedTodo])

    const handleEditTodo = () => {
        if (!editedTodo) return;

        const formData = {
            title: titleInput.value,
            category1: category1Input.value,
            category2: category2Input.value,
        }

        const validationResults = todoSchema.safeParse(formData);

        if (!validationResults.success) {
            const errors = validationResults?.error?.flatten().fieldErrors;
            if (errors) setZodErrors(errors);
            setErrorKey((p) => p ? p + 1 : 1);
            return;
        }

        const { title, category1, category2 } = validationResults?.data;

        const updatedTodo: todoObject = {
            ...editedTodo,
            title,
            category: [category1, category2],
            edited: true,
            createdAt: new Date().toISOString(),
        }

        onOpenChange?.(false);

        resetAll();

        dispatch(editTodo(updatedTodo));

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEditTodo();
                }}
                    className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            {...titleInput}
                        />
                        <InputError message={zodErrors?.title?.[0]} keyErr={errorKey} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="grid gap-2">
                                <Label htmlFor="category1">Category 1</Label>
                                <Input
                                    id="category1"
                                    placeholder="e.g. Backend"
                                    {...category1Input}
                                />
                                <InputError message={zodErrors?.category1?.[0]} keyErr={errorKey} />
                            </div>
                        </div>
                        <div>
                            <div className="grid gap-2">
                                <Label htmlFor="category2">Category 2</Label>
                                <Input
                                    id="category2"
                                    placeholder="e.g. Design"
                                    {...category2Input}
                                />
                            </div>
                            <InputError message={zodErrors?.category2?.[0]} keyErr={errorKey} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">EditTodo</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
