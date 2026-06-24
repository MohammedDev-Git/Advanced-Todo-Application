import todosReducer from "@/features/todos/todosSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import notesReducer from "@/features/notes/notesSlice";
import membersReducer from "@/features/members/membersSlice";
import tasksReducer from "@/features/tasks/tasksSlice";

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    todos: todosReducer,
    notes: notesReducer,
    members: membersReducer,
    tasks: tasksReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gdm) => gdm({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);