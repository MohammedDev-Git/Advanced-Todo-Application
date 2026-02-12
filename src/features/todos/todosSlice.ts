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
        }
    }
})

export const { addTodo, toggleTodo } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer