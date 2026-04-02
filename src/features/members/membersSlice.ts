import type { RootState } from "@/app/store";
import type {
    MemberProject,
    MembersState,
    NestedCategory,
    TempPersonalDetails,
    TempProjectErrorData
} from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";

const initialState: MembersState = {
    members: [],
    form: {
        tempProjects: [
            {
                id: nanoid(),
                category: [""],
                title: "",
                description: "",
                sourceCode: "",
                liveCode: "",
                errors: null,
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
        projects: []
    },
}

export interface ChangeInputData {
    text: string;
    projectIdx: number;
    catIdx?: number;
}

const memebersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: () => {
            console.log("member added");
        },
        addTempProject: (state: MembersState) => {
            const emptyProject = {
                id: nanoid(),
                category: [""],
                title: "",
                description: "",
                sourceCode: "",
                liveCode: "",
                errors: null,
            }
            state.form.tempProjects.push(emptyProject);
        },
        removeAllTempProjects: (state: MembersState) => {

            const emptyProject = {
                id: nanoid(),
                category: [""],
                title: "",
                description: "",
                sourceCode: "",
                liveCode: "",
                errors: null,
            }

            state.form.tempProjects = [emptyProject];
        },
        addTempProjectCategory: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            chosenProject?.category.push("");
        },
        removeTempProjectCategory: (state: MembersState, action: PayloadAction<NestedCategory>) => {
            const { projectIdx, catIdx } = action.payload;
            const chosenProject = state.form.tempProjects[projectIdx];
            chosenProject?.category.splice(catIdx, 1);
        },
        removeAllTempProjectCategory: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            chosenProject.category = [""];
        },
        resetProjectCategoryErrors: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            if (chosenProject.errors) {
                chosenProject.errors.category = undefined;
            }
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
        changeProjectTitle: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.title = text;
        },
        changeProjectDescription: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.description = text;
        },
        changeProjectSourceCode: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.sourceCode = text;
        },
        changeProjectLiveCode: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.liveCode = text;
        },
        changeTempProjectCategory: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx, catIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            if (catIdx !== undefined) {
                updatedProject.category[catIdx] = text;
            }
        },
        addTempError: (state: MembersState, action: PayloadAction<TempProjectErrorData>) => {
            const { error, projectIdx } = action.payload;
            const erroredProject = state.form.tempProjects[projectIdx];
            erroredProject.errors = { ...error };
        },
        removeTempError: (state: MembersState, action: PayloadAction<number>) => {
            const projectIdx = action.payload;
            const chosenProject = state.form.tempProjects[projectIdx];
            chosenProject.errors = null;
        },
        addTempMemberProjects: (state: MembersState, action: PayloadAction<MemberProject[]>) => {
            state.tempMember.projects = [...action.payload]
        },
        resetAllTemps: (state: MembersState) => {
            state.form = initialState.form;
            state.tempMember = initialState.tempMember;
        },
        resetAllErrors: (state: MembersState) => {
            state.form.tempProjects.map((project) => {
                project.errors = null;
            })
        }
    }
})

export const {
    addMember,
    addTempProject,
    removeTempProject,
    removeAllTempProjects,
    addTempStack,
    removeTempStack,
    addTempLink,
    removeTempLink,
    addTempPersonalDetails,
    addTempDescription,
    resetAllTemps,
    addTempProjectCategory,
    removeTempProjectCategory,
    resetProjectCategoryErrors,
    changeProjectTitle,
    changeProjectDescription,
    changeProjectSourceCode,
    changeProjectLiveCode,
    changeTempProjectCategory,
    addTempError,
    removeTempError,
    addTempMemberProjects,
    removeAllTempProjectCategory,
    resetAllErrors,
} = memebersSlice.actions;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempStack = (state: RootState) => state.members.form.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export default memebersSlice.reducer;