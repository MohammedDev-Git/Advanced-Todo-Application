export interface todoObject {
    id: string;
    title: string;
    category: (string | undefined)[];
    isCompleted: boolean;
    createdAt: string;
}

export interface todoState {
    todos: todoObject[];
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