import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ModeContextType {
    setLight: () => void;
    setDark: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const ModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<string>(() => {
        return localStorage.getItem("nuegus-mode") || "light";
    })

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark");
        if (mode === "dark") root.classList.add("dark");
        localStorage.setItem("nuegus-mode", mode);
    }, [mode])

    const setLight = () => {
        setMode("light");
    }

    const setDark = () => {
        setMode("dark");
    }

    return (
        <ModeContext.Provider value={{ setDark, setLight }}>
            {children}
        </ModeContext.Provider>
    )
}

export const useModeContext = () => {
    const context = useContext(ModeContext);

    if (!context) {
        throw new Error("Mode Context is not found");
    }

    return context;
};
export default ModeProvider