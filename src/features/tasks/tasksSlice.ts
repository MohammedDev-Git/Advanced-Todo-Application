import type { RootState } from "@/app/store";
import type { taskDetailsObject, tasksState } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

const initialState: tasksState = {
    tasks: [],
    tempTaskDetails: {
        id: nanoid(),
        progress: 0,
        title: "",
        categories: [""],
        description: "",
        deadline: "",
        associatedMembersIDs: [],
        media: [""],
        tasksByUserId: [],
        createdAt: "",
    },
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTempTaskDetails: (state: tasksState, action: PayloadAction<{ data: taskDetailsObject }>) => {
            const { data } = action.payload;
            if (data.categories.length === 0) {
                data.categories.push("");
            }
            if (data) {
                state.tempTaskDetails = {
                    ...state.tempTaskDetails,
                    ...data,
                }
            }
        },
        resetTempTask: (state: tasksState) => {
            state.tempTaskDetails = {
                id: nanoid(),
                progress: 0,
                title: "",
                categories: [""],
                description: "",
                deadline: "",
                associatedMembersIDs: [],
                media: [""],
                tasksByUserId: [],
                createdAt: "",
            };
        },
        addAssociatedMembers: (state: tasksState, action: PayloadAction<{ selected: string[] }>) => {
            const { selected } = action.payload;
            state.tempTaskDetails.associatedMembersIDs = [...selected];
        },
        deleteTask: (state: tasksState, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        addNewTask: (state: tasksState) => {
            state.tempTaskDetails.createdAt = new Date().toISOString();
            state.tasks.push({ ...state.tempTaskDetails });
        },
        assignRandomImage: (state: tasksState) => {
            const randomFrom1To6 = Math.floor(Math.random() * 6) + 1;

            const randomImage = `/assets/tasks/task${randomFrom1To6}.png` || "";
            state.tempTaskDetails.media[0] = randomImage;
        }
    }
})

export const {
    addTempTaskDetails,
    resetTempTask,
    addAssociatedMembers,
    deleteTask,
    addNewTask,
    assignRandomImage
} = tasksSlice.actions;

export const selectTempTaskDetails = (state: RootState) => state.tasks.tempTaskDetails;
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;