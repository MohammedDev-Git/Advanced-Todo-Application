import { useState } from "react";

export const useError = (initialValue: undefined) => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>(initialValue);
    return { errorMsg, setErrorMsg };
}