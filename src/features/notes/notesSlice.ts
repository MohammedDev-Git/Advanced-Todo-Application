import type { RootState } from "@/app/store";
import type { notesState } from "@/types";
import { createSlice, nanoid } from "@reduxjs/toolkit";

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
        deleteAllNotes: (state: notesState) => {
            state.notes = [];
        }
    }
})

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectTempCategories = (state: RootState) => state.notes.tempCategories;
export const { deleteAllNotes } = notesSlice.actions;
export default notesSlice.reducer;