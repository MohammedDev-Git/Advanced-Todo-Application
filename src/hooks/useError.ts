import { useState } from "react";

export const useError = (initialValue: string | undefined) => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>(initialValue);
    return { errorMsg, setErrorMsg };
}