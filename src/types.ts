import type z from "zod";
import type { noteSchema, tempCategoriesSchema } from "@/features/notes/schemas/noteSchema";

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

export type noteAddError = z.inferFormattedError<typeof noteSchema>

export type catSizeError = z.inferFormattedError<typeof tempCategoriesSchema>

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
