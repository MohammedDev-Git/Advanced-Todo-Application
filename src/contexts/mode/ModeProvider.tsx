import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ModeContextType {
    setLight: () => void;
    setDark: () => void;
    mode: string;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const ModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<string>(() => {
        return localStorage.getItem("nuegas-mode") || "light";
    })

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark");
        if (mode === "dark") root.classList.add("dark");
        localStorage.setItem("nuegas-mode", mode);
    }, [mode])

    const setLight = () => {
        setMode("light");
    }

    const setDark = () => {
        setMode("dark");
    }

    return (
        <ModeContext.Provider value={{ mode, setDark, setLight }}>
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