import type { RootState } from "@/app/store";
import type { noteObject, notesState } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface updateTempProps {
    text: string;
    idx: number;
}

const initialState: notesState = {
    notes: [
        {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            edited: false,
            title: "note 1",
            description: `loremloremlorem 
    loremloremlorem loremloremlor
    emloremlorem 
    loremloremlorem`,
            category: ["cat1", "cat2", "cat3", "cat4"],
        },
    ],
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
        deleteAllNotes: (state: notesState) => {
            state.notes = [];
        },
        deleteNote: (state: notesState, action: PayloadAction<string | undefined>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        addTempCategory: (state: notesState) => {
            state.tempCategories.push("");
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
export const { deleteAllNotes,
    deleteNote,
    addTempCategory,
    removeTempCategory,
    resetTempCategory,
    updateTempCategory,
    addNote
} = notesSlice.actions;
export default notesSlice.reducer;