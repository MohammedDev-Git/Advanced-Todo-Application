
import TodosList from "@/features/todos/components/TodosList"
import { AddTodoModal } from "@/features/todos/components/AddTodoModal"
import { EditTodoModal } from "@/features/todos/components/EditTodoModal"
import { DeleteTodoModal } from "@/features/todos/components/DeleteTodoModal"
import { DeleteAllTodosModal } from "@/features/todos/components/DeleteAllTodosModal"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectTodos } from "@/features/todos/todosSlice"
import type { todoObject } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"

const TodosSection = () => {

    const [addTodoOpen, setAddTodoOpen] = useState<boolean>(false);
    const [editTodoOpen, setEditTodoOpen] = useState<boolean>(false);
    const [deleteTodoOpen, setDeleteTodoOpen] = useState<boolean>(false);

    const [editedTodo, setEditedTodo] = useState<todoObject | undefined>(undefined);
    const [deletedTodoId, setDeletedTodoId] = useState<string | undefined>(undefined);

    const [deleteAllTodosOpen, setDeleteAllTodosOpen] = useState<boolean>(false);

    const todos = useSelector(selectTodos);

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-foreground underline decoration-2 decoration-gray-300 underline-offset-4">My Todos</h2>
                <div className="flex justify-center items-center gap-2">
                    {
                        todos && todos.length > 0 ?
                            <Button onClick={() => setDeleteAllTodosOpen(true)} size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-100 text-red-600 hover:bg-red-200 shadow-none">
                                <Trash className="h-4 w-4" />
                            </Button>
                            :
                            null
                    }
                    <Button onClick={() => setAddTodoOpen(true)} size="icon" variant="secondary" className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-200 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <TodosList
                    setEditedTodo={setEditedTodo}
                    setEditTodoOpen={setEditTodoOpen}
                    setDeleteTodoOpen={setDeleteTodoOpen}
                    setDeletedTodoId={setDeletedTodoId}
                    setAddTodoOpen={setAddTodoOpen}
                />
            </div>
            
            <AddTodoModal
                open={addTodoOpen}
                onOpenChange={setAddTodoOpen}
            />
            
            <EditTodoModal
                open={editTodoOpen}
                onOpenChange={setEditTodoOpen}
                editedTodo={editedTodo}
            />
            <DeleteTodoModal
                open={deleteTodoOpen}
                onOpenChange={setDeleteTodoOpen}
                deletedId={deletedTodoId}
            />

            <DeleteAllTodosModal
                open={deleteAllTodosOpen}
                onOpenChange={setDeleteAllTodosOpen}
            />
        </section>
    )
}

export default TodosSection