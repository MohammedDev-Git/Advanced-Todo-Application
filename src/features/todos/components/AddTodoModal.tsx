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
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "@/features/todos/todosSlice";
import { todoSchema } from "../schemas/todoSchema";
import type { addTodoError } from "@/types";
import { InputError } from "@/components/custom/InputError";

interface AddTodoModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function AddTodoModal({ open, onOpenChange }: AddTodoModalProps) {

    const dispatch = useDispatch();

    const [zodErrors, setZodErrors] = useState<addTodoError | null>(null);
    const [errorKey, setErrorKey] = useState<number | null>(null);

    const titleInput = useInput("");
    const category1Input = useInput("");
    const category2Input = useInput("");

    const resetAll = () => {
        setZodErrors(null);
        titleInput.reset();
        category1Input.reset();
        category2Input.reset();
    }

    useEffect(() => {
        if (open) {
            resetAll();
        }
    }, [open, onOpenChange])

    const handleAddTodo = () => {

        const formData = {
            title: titleInput.value,
            category1: category1Input.value,
            category2: category2Input.value,
        }

        const validationResult = todoSchema.safeParse(formData);

        if (!validationResult.success) {
            const errors: addTodoError = validationResult.error.flatten().fieldErrors;
            setErrorKey(pre => pre ? pre + 1 : 1);
            setZodErrors(errors);
            return;
        }

        const todo = {
            id: nanoid(),
            title: validationResult.data.title,
            category: [validationResult?.data.category1, validationResult?.data.category2],
            isCompleted: false,
            createdAt: new Date().toISOString()
        }

        dispatch(addTodo(todo));
        resetAll();
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Todo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            {...titleInput}
                        />
                        <InputError message={zodErrors?.title?.[0]} key={errorKey} />
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
                                <InputError message={zodErrors?.category1?.[0]} key={errorKey} />
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
                            <InputError message={zodErrors?.category2?.[0]} key={errorKey} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddTodo}>Add Todo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
