import type { RootState } from "@/app/store";
import type { MembersState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    members: [],
    form: {
        tempProjects: [{}],
        tempStack: [""],
        tempLinks: [""],
    }
}

const memebersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: () => {
            console.log("member added");
        },
        addTempProject: (state: MembersState) => {
            state.form.tempProjects.push({});
        },
        removeTempProject: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempProjects.splice(action.payload, 1);
        },
        addTempStack: (state: MembersState) => {
            state.form.tempStack.push("");
        },
        removeTempStack: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempStack.splice(action.payload, 1);
        },
        addTempLink: (state: MembersState) => {
            state.form.tempLinks.push("");
        },
        removeTempLink: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempLinks.splice(action.payload, 1);
        },
    }
})

export const {
    addMember,
    addTempProject,
    removeTempProject,
    addTempStack,
    removeTempStack,
    addTempLink,
    removeTempLink
} = memebersSlice.actions;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempStack = (state: RootState) => state.members.form.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempLinks;
export default memebersSlice.reducer;