import type { RootState } from "@/app/store";
import type { MembersState, NestedCategory, TempPersonalDetails } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";

const initialState = {
    members: [],
    form: {
        tempProjects: [
            {
                tempCategory: [""],
                id: nanoid(),
            }
        ],
        tempStack: [""],
        tempLinks: [""],
    },
    tempMember: {
        personalDetails: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
        description: {
            text: "",
        },
    },
}

const memebersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: () => {
            console.log("member added");
        },
        addTempProject: (state: MembersState) => {
            state.form.tempProjects.push({ id: nanoid(), tempCategory: [""] });
        },
        addTempProjectCategory: (state: MembersState, action: PayloadAction<string>) => {
            const chosenProject = state.form.tempProjects.find(project => project.id === action.payload);
            chosenProject?.tempCategory.push("");
        },
        removeTempProjectCategory: (state: MembersState, action: PayloadAction<NestedCategory>) => {
            const { projectId, catIdx } = action.payload;
            const chosenProject = state.form.tempProjects.find(project => project.id === projectId);
            chosenProject?.tempCategory.splice(catIdx, 1);
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
        addTempPersonalDetails: (state: MembersState, action: PayloadAction<TempPersonalDetails>) => {
            const personalDetails = action.payload;
            const currentPersonalDetails = state.tempMember.personalDetails;
            if (personalDetails) {
                currentPersonalDetails.name = personalDetails.name
                currentPersonalDetails.role = personalDetails.role
                currentPersonalDetails.email = personalDetails.email
                currentPersonalDetails.phone = personalDetails.phone
            }
        },
        addTempDescription: (state: MembersState, action: PayloadAction<DescriptionType>) => {
            const description = action.payload;
            const currentDescription = state.tempMember.description;
            if (description) {
                currentDescription.text = description.text;
            }
        },
        resetAllTemps: (state: MembersState) => {
            state.form = initialState.form;

            state.tempMember = initialState.tempMember;
        }
    }
})

export const {
    addMember,
    addTempProject,
    removeTempProject,
    addTempStack,
    removeTempStack,
    addTempLink,
    removeTempLink,
    addTempPersonalDetails,
    addTempDescription,
    resetAllTemps,
    addTempProjectCategory,
    removeTempProjectCategory
} = memebersSlice.actions;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempStack = (state: RootState) => state.members.form.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export default memebersSlice.reducer;