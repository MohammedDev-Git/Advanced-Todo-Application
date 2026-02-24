import { useState } from "react";

// custom hook for input
export const useInput = (initialState: string) => {
    const [value, setValue] = useState(initialState);
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const reset = () => {
        setValue("");
    }

    const fillInitialState = () => {
        setValue(initialState);
    }

    return { value, onChange, reset, fillInitialState };
}