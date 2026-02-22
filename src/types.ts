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
    id: string;
    createdAt: string;
    edited?: boolean;
    title: string;
    description: string;
    category: string[];
}

export interface notesState {
    notes: noteObject[]
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

export interface InputErrorProps {
    message?: string;
    keyErr: number | null;
}

export interface NoDataProps {
    setAddOpen: (open: boolean) => void,
    animationData?: any;
    message: string;
    image?: boolean;
    src?: string;
}