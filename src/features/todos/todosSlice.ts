import type { RootState } from "@/app/store";
import type { todoObject, todoState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: todoState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state: todoState, action: PayloadAction<todoObject>) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state: todoState, action: PayloadAction<string>) => {
            const toggledTodo = state.todos.find((todo: todoObject) => todo.id === action.payload);
            if (toggledTodo) toggledTodo.isCompleted = !toggledTodo.isCompleted;
        },
        editTodo: (state: todoState, action: PayloadAction<todoObject>) => {
            const updatedTodo = action.payload;
            const editedTodo = state.todos.find((todo: todoObject) => todo.id === updatedTodo.id);
            if (editedTodo) {
                editedTodo.title = updatedTodo.title;
                editedTodo.category = updatedTodo.category;
            }
        },
        deleteTodo: (state: todoState, action: PayloadAction<string>) => {
            const deletedId = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== deletedId);
        }
    }
})

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer