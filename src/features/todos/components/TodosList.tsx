import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { selectTodos } from "../todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "@/features/todos/todosSlice";
import { formatDistanceToNow } from 'date-fns';
import { PencilIcon, TrashIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import type { todoObject } from "@/types";

import sadSwing from "@/assets/lottie/SadSwing.json";
import Lottie from "lottie-react";

type todoListProps = {
    setEditedTodo: (editedTodo: todoObject) => void,
    setEditTodoOpen: (open: boolean) => void,
    setDeleteTodoOpen: (open: boolean) => void,
    setDeletedTodoId: (id: string | undefined) => void,
    setAddTodoOpen: (open: boolean) => void
}

const TodosList = ({
    setEditedTodo,
    setEditTodoOpen,
    setDeleteTodoOpen,
    setDeletedTodoId,
    setAddTodoOpen
}: todoListProps) => {

    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const optionsArr = [
        { action: "edit", text: "Edit", icon: <PencilIcon /> },
        { action: "delete", text: "Delete", icon: <TrashIcon /> }
    ]

    return (
        <>
            {
                todos && todos.length > 0 ?
                    todos.map((todo) => (
                        <div key={todo.id} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <Checkbox id={todo.id} checked={todo.isCompleted} onCheckedChange={() => dispatch(toggleTodo(todo.id))} className="cursor-pointer mt-1 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 rounded text-white" />
                                    <label htmlFor={todo.id} className={`cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${todo.isCompleted ? "line-through decoration-gray-800 text-indigo-500" : "text-indigo-900"}`}>
                                        {todo.title}
                                    </label>
                                </div>
                                <div>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger className="border-0 outline-0">
                                            <Ellipsis className="cursor-pointer" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-white mr-9">
                                            <DropdownMenuGroup>
                                                {
                                                    optionsArr.map((option, idx) => (
                                                        <DropdownMenuItem onClick={() => {
                                                            if (option.action === "edit") {
                                                                setEditedTodo(todo);
                                                                setEditTodoOpen(true);
                                                            } else {
                                                                setDeleteTodoOpen(true);
                                                                setDeletedTodoId(todo.id);
                                                            }
                                                        }} key={idx} className="cursor-pointer">
                                                            {option.icon}
                                                            {option.text}
                                                        </DropdownMenuItem>
                                                    ))
                                                }
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pl-7">
                                <div className="flex gap-1">
                                    {todo.category.map((cat, idx) => (
                                        cat &&
                                        <Badge key={idx} variant="secondary" className="bg-primary text-primary-foreground h-5 px-1.5 text-[10px] rounded">{cat}</Badge>
                                    ))}
                                </div>
                            </div>
                            <span className="pl-7 text-[10px] w-18 text-muted-foreground">{(todo.edited ? "Edited " : "Created ") + formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</span>
                        </div>
                    ))
                    :
                    <>
                        <div
                            onClick={() => setAddTodoOpen(true)}
                            className="cursor-pointer flex flex-col items-center justify-center w-60 mx-auto border-2 border-dotted border-primary rounded-4xl">
                            <div className="h-25 w-25">
                                <Lottie
                                    animationData={sadSwing}
                                    loop={true}
                                />
                            </div>
                            <p className="text-primary text-center text-sm mb-5">You don't have any todos :&#40;</p>
                        </div>
                    </>
            }
        </>
    )
}

export default TodosList