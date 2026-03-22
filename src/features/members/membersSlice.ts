import type { RootState } from "@/app/store";
import type { MembersState, TempPersonalDetails } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";

const initialState = {
    members: [],
    form: {
        tempProjects: [{}],
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
            state.form = {
                tempProjects: [{}],
                tempStack: [""],
                tempLinks: [""],
            }

            state.tempMember = {
                personalDetails: {
                    name: "",
                    role: "",
                    email: "",
                    phone: "",
                },
                description: {
                    text: "",
                },
            }
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
    resetAllTemps
} = memebersSlice.actions;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempStack = (state: RootState) => state.members.form.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export default memebersSlice.reducer;