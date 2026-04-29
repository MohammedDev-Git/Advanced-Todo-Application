import type z from "zod";
import type { noteSchema, tempCategoriesSchema } from "@/features/notes/schemas/noteSchema";
import type { personalDetailsSchema } from "@/features/members/schemas/personalDetailsSchema";
import type { projectContributionSchema } from "./features/members/schemas/projectContributionSchema";
import type { skillsSocialsSchema } from "./features/members/schemas/skillsSocialsSchema";

export interface todoObject {
    id: string;
    title: string;
    category: (string | undefined)[];
    isCompleted: boolean;
    createdAt: string;
    edited?: boolean;
}

export interface todoState {
    todos: todoObject[];
}

export interface noteObject {
    id: string | undefined;
    createdAt: string;
    edited?: boolean;
    title: string;
    description: string;
    category: string[];
}

export interface notesState {
    notes: noteObject[]
    tempCategories: string[];
}

export interface TempPersonalDetails {
    name?: string,
    role?: string,
    email?: string,
    phone?: string,
}

export interface TempDescription {
    text?: string
}


export interface RatingObject {
    user: string,
    rate: number;
}

export interface MemberObject {
    id: string;
    personalDetails: TempPersonalDetails;
    description: TempDescription;
    projects: MemberProject[];
    skillsAndSocials: SkillsAndSocialsObject;
    rating: {
        avgRating: number,
        ratedBy: RatingObject[],
    },
}

export interface TempMemberProject extends MemberProject {
    errors: TempProjectError | null;
}

export interface MemberProject {
    category: string[]
    id: string;
    title: string;
    description: string;
    sourceCode: string;
    liveCode: string;
}

export interface LanguageObject {
    lang: string,
    level: string,
    id: string,
}

export interface TempStackAndLinksObject {
    tempStack: string[],
    tempLinks: string[],
}

export interface stackAndLinksObject {
    stack: string[],
    social: string[],
}

export interface SkillsAndSocialsObject {
    languages: LanguageObject[];
    stackAndLinks: stackAndLinksObject;
}

export interface TempSkillsAndSocialsObject {
    tempLanguages: LanguageObject[];
    tempStackAndLinks: TempStackAndLinksObject;
}


export interface MembersState {
    members: MemberObject[],
    form: {
        tempProjects: TempMemberProject[],
        tempSkillsAndSocials: TempSkillsAndSocialsObject,

    },
    tempMember: MemberObject,
}

export interface addTodoError {
    title?: string[];
    category1?: string[];
    category2?: string[];
}

export interface editTodoError {
    title?: string[];
    category1?: string[];
    category2?: string[];
}

export type NoteAddError = z.inferFormattedError<typeof noteSchema>

export type CatSizeError = z.inferFormattedError<typeof tempCategoriesSchema>

export type PersonalDetailsError = z.inferFormattedError<typeof personalDetailsSchema>;

export type TempProjectError = z.inferFormattedError<typeof projectContributionSchema>;

export type SkillsAndSocialsError = z.inferFormattedError<typeof skillsSocialsSchema>

export type TempProjectErrorData = {
    error: TempProjectError,
    projectIdx: number,
}

export interface InputErrorProps {
    message?: string;
    keyErr: number | null;
    className?: string;
}

export interface NoDataProps {
    setAddOpen: (open: boolean) => void,
    animationData?: any;
    message: string;
    image?: boolean;
    src?: string;
}

export interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface deleteModalProps {
    open: boolean;
    deletedId: string | undefined;
    onOpenChange?: (open: boolean) => void;
}

export type ThemeType = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface NestedCategory {
    projectIdx: number,
    catIdx: number
}