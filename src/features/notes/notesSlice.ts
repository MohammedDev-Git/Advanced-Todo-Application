import type { RootState } from "@/app/store";
import type { noteObject, notesState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface updateTempProps {
    text: string;
    idx: number;
}

const initialState: notesState = {
    notes: [],
    tempCategories: [""]
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state: notesState, action: PayloadAction<noteObject>) => {
            state.notes.push(action.payload);
            console.log(action.payload);
        },
        editNote: (state: notesState, action: PayloadAction<noteObject>) => {
            const updatedNote = action.payload;
            const editedNote = state.notes.find((note: noteObject) => note.id === updatedNote.id);
            if (editedNote) {
                editedNote.title = updatedNote.title;
                editedNote.category = updatedNote.category;
                editedNote.createdAt = updatedNote.createdAt;
                editedNote.description = updatedNote.description;
                editedNote.edited = true;
            }
        },
        deleteAllNotes: (state: notesState) => {
            state.notes = [];
        },
        deleteNote: (state: notesState, action: PayloadAction<string | undefined>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        addTempCategory: (state: notesState) => {
            state.tempCategories.push("");
        },
        setTempCategory: (state: notesState, action: PayloadAction<string[]>) => {
            state.tempCategories = [...action.payload];
        },
        removeTempCategory: (state: notesState, action: PayloadAction<number | undefined>) => {
            state.tempCategories.splice(Number(action.payload), 1);
        },
        resetTempCategory: (state: notesState) => {
            state.tempCategories = [""];
        },
        updateTempCategory: (state: notesState, action: PayloadAction<updateTempProps>) => {
            state.tempCategories[action.payload.idx] = action.payload.text;
        }
    }
})

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectTempCategories = (state: RootState) => state.notes.tempCategories;
export const {
    deleteAllNotes,
    deleteNote,
    addTempCategory,
    removeTempCategory,
    resetTempCategory,
    updateTempCategory,
    addNote,
    editNote,
    setTempCategory,
} = notesSlice.actions;
export default notesSlice.reducer;