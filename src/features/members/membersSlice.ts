import type { RootState } from "@/app/store";
import type { MembersState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    members: [],
    tempProjects: [{}],
    tempStack: [""],
}

const memebersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: () => {
            console.log("member added");
        },
        addTempProject: (state: MembersState) => {
            state.tempProjects.push({});
        },
        removeTempProject: (state: MembersState, action: PayloadAction<number>) => {
            state.tempProjects.splice(action.payload, 1);
        },
        addTempStack: (state: MembersState) => {
            state.tempStack.push("");
        },
        removeTempStack: (state: MembersState, action: PayloadAction<number>) => {
            state.tempStack.splice(action.payload, 1);
        },
    }
})

export const { addMember, addTempProject, removeTempProject, addTempStack, removeTempStack } = memebersSlice.actions;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.tempProjects;
export const selectTempStack = (state: RootState) => state.members.tempStack;
export default memebersSlice.reducer;