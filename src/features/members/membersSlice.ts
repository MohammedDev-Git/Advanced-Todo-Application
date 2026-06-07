import type { RootState } from "@/app/store";
import type {
    MemberProject,
    MembersState,
    NestedCategory,
    SkillsAndSocialsObject,
    TempPersonalDetails,
    TempProjectErrorData
} from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";
import type { updateLinkProps } from "@/components/Members/MemberModal/SkillsAndSocials";

const initialState: MembersState = {
    members: [],
    storedEmails: [],
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
        tempSkillsAndSocials: {
            tempLanguages: [{ lang: "", level: "", id: nanoid() }],
            tempStackAndLinks: {
                tempStack: [""],
                tempLinks: [""],
            }
        }
    },
    tempMember: {
        id: nanoid(),
        personalDetails: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
        description: {
            text: "",
        },
        projects: [],
        skillsAndSocials: {
            languages: [],
            stackAndLinks: {
                stack: [],
                social: [],
            }
        },
        rating: {
            avgRating: null,
            ratedBy: [],
        },
        avatar: "",
        createdAt: new Date(),
    },
}

export interface ChangeInputData {
    text: string;
    projectIdx: number;
    catIdx?: number;
}

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: (state: MembersState, action: PayloadAction<SkillsAndSocialsObject>) => {
            const fillMemberData = () => {
                // fill the skills and socials object
                const newSkillsAndSocials = { ...action.payload };
                state.tempMember.skillsAndSocials = { ...newSkillsAndSocials };
                state.tempMember.id = nanoid();

                // fill the projects object
                const projects = state.form.tempProjects;
                state.tempMember.projects = [...projects];
                state.tempMember.avatar = `/assets/members/member${((state.members.length) % 9) + 1}.png`;
                state.tempMember.createdAt = new Date();
            }
            fillMemberData();

            const email = state.tempMember.personalDetails.email;
            if (email) {
                state.storedEmails.push(email);
            }

            // add an actual member to fake database
            const newMember = { ...state.tempMember };
            state.members.push(newMember);
        },
        deleteMember: (state: MembersState, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!id) return;
            const memberIdx = state.members.findIndex((mem) => mem.id === id);
            state.members.splice(memberIdx, 1);
            if (memberIdx !== -1) {
                const email = state.members[memberIdx].personalDetails?.email;
                const emailIdx = state.storedEmails.findIndex((em) => em === email);
                if (emailIdx !== -1) {
                    state.storedEmails.splice(emailIdx, 1);
                }
            }
        },
        editNameAndRole: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { name: string | undefined, role: string | undefined } }>) => {
            const { id, data } = action.payload;

            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.personalDetails.name = data.name;
                member.personalDetails.role = data.role;
            }
        },
        editDescription: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { text: string | undefined } }>) => {
            const { id, data } = action.payload;
            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.description.text = data.text;
            }

        },
        editEmail: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { email: string | undefined } }>) => {
            const { id, data } = action.payload;
            if (!id || !data.email) return;
            const member = state.members.find((mem) => mem.id === id);
            const oldEmail = member?.personalDetails.email;
            const newEmail = data.email;
            if (member) {
                member.personalDetails.email = newEmail;
            }
            const emailIdx = state.storedEmails.findIndex((em) => em === oldEmail);
            if (emailIdx !== -1) {
                state.storedEmails[emailIdx] = newEmail;
            }
        },
        editPhone: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { phone: string | undefined } }>) => {
            const { id, data } = action.payload;
            if (!id) return;
            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.personalDetails.phone = data.phone;
            }
        },
        editSkills: (state: MembersState, action: PayloadAction<{ id: string | undefined, tempstack: string[] }>) => {
            const { id, tempstack } = action.payload;
            const member = state.members.find((mem) => mem.id === id);
            if(member) {
                member.skillsAndSocials.stackAndLinks.stack = tempstack;
            }
        },
        resetAllTemps: (state: MembersState) => {
            const newForm = {
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
                tempSkillsAndSocials: {
                    tempLanguages: [{ lang: "", level: "", id: nanoid() }],
                    tempStackAndLinks: {
                        tempStack: [""],
                        tempLinks: [""],
                    }
                }
            }
            const newTempMember = {
                id: nanoid(),
                personalDetails: {
                    name: "",
                    role: "",
                    email: "",
                    phone: "",
                },
                description: {
                    text: "",
                },
                projects: [],
                skillsAndSocials: {
                    languages: [],
                    stackAndLinks: {
                        stack: [],
                        social: [],
                    }
                },
                rating: {
                    avgRating: null,
                    ratedBy: [],
                },
                avatar: "",
                createdAt: new Date(),
            }
            state.form = { ...newForm };
            state.tempMember = { ...newTempMember };
        },
        addTempProject: (state: MembersState) => {
            const emptyProject = { ...initialState.form.tempProjects[0] };
            state.form.tempProjects.push(emptyProject);
        },
        removeAllTempProjects: (state: MembersState) => {

            const emptyProject = { ...initialState.form.tempProjects[0] };

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
        resetAllErrors: (state: MembersState) => {
            state.form.tempProjects.map((project) => {
                project.errors = null;
            })
        },
        updateLanguageText: (state: MembersState, action: PayloadAction<{ language: string, id: string }>) => {
            const { language, id } = action.payload;
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === id);
            if (chosenRow) {
                chosenRow.lang = language;
            }
        },
        updateLanguageLevel: (state: MembersState, action: PayloadAction<{ level: string, id: string }>) => {
            const { level, id } = action.payload;
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === id);
            if (chosenRow) {
                chosenRow.level = level;
            }
        },
        addLanguageObject: (state: MembersState) => {
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;

            if (languagesArr.length < 4) {
                const emptyLanguageObject = { lang: "", level: "", id: nanoid() };
                languagesArr.push(emptyLanguageObject);
            }
        },
        removeLanguageRow: (state: MembersState, action: PayloadAction<string>) => {
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === action.payload);
            const isFull = languagesArr.find((row) => row.lang === "" || row.level === "") === undefined;
            if (chosenRow) {
                const idx = languagesArr.indexOf(chosenRow);
                languagesArr.splice(idx, 1);
                if (languagesArr.length === 3 && isFull) {
                    const emptyLanguageObject = { lang: "", level: "", id: nanoid() };
                    languagesArr.push(emptyLanguageObject);
                }
            }
        },
        addTempStack: (state: MembersState) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack.push("");
        },
        removeTempStack: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack.splice(action.payload, 1);
        },
        updateTempStack: (state: MembersState, action: PayloadAction<{ idx: number, text: string }>) => {
            const { idx, text } = action.payload;
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack[idx] = text;
        },
        addTempLink: (state: MembersState) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks.push("");
        },
        removeTempLink: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks.splice(action.payload, 1);
        },
        updateTempLink: (state: MembersState, action: PayloadAction<updateLinkProps>) => {
            const { idx, text } = action.payload;
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks[idx] = text;
        }
    }
})

export const {
    addMember,
    deleteMember,
    editNameAndRole,
    editDescription,
    editEmail,
    editPhone,
    editSkills,
    addTempProject,
    removeTempProject,
    removeAllTempProjects,
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
    updateLanguageText,
    updateLanguageLevel,
    addLanguageObject,
    removeLanguageRow,
    addTempStack,
    removeTempStack,
    updateTempStack,
    addTempLink,
    removeTempLink,
    updateTempLink,
} = membersSlice.actions;
export const selectStoredEmails = (state: RootState) => state.members.storedEmails;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempStack = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export const selectLanguages = (state: RootState) => state.members.form.tempSkillsAndSocials.tempLanguages;
export default membersSlice.reducer;