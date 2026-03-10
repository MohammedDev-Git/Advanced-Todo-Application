import type { ThemeType } from "@/types";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"


interface ThemeContextType {
    theme: ThemeType;
    themes: ThemeType[];
    setTheme: (newTheme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const themes: ThemeType[] = [
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
    ];

    const [theme, setTheme] = useState<ThemeType>(() => {
        return (localStorage.getItem("nuegas-theme") as ThemeType) || "first";
    })

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove(...themes);
        root.classList.add(theme);
        localStorage.setItem("nuegas-theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, themes, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("Theme Context is not found");
    }

    return context;
};
export default ThemeProvider