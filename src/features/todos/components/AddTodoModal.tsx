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
import { todoSchema } from "@/features/todos/schemas/todoSchema";
import type { addTodoError, ModalProps, todoObject } from "@/types";
import { InputError } from "@/components/custom/InputError";



export function AddTodoModal({ open, onOpenChange }: ModalProps) {

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
            if (errors) {
                setZodErrors(errors);
            }
            return;
        }

        const { title, category1, category2 } = validationResult?.data;

        const todo: todoObject = {
            id: nanoid(),
            title,
            category: [category1, category2],
            isCompleted: false,
            createdAt: new Date().toISOString(),
            edited: false,
        }

        dispatch(addTodo(todo));
        resetAll();
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Add New Todo</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTodo();
                }}
                    className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            className="focus-visible:ring-2 focus-visible:ring-primary transition-all"
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
                                    className="focus-visible:ring-2 focus-visible:ring-primary transition-all"
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
                                    className="focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    {...category2Input}
                                />
                            </div>
                            <InputError message={zodErrors?.category2?.[0]} keyErr={errorKey} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Todo</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
