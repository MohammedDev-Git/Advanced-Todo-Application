export interface todoObject {
    id: string;
    title: string | boolean;
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

export interface InputErrorProps {
    message?: string;
    key: number | null;
}