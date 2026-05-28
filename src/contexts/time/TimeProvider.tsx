import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type TypetimeFormat = "12" | "24";

interface TimeContextType {
    timeFormat: TypetimeFormat;
    setTimeFormat: (timeFormat: TypetimeFormat) => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

const TimeProvider = ({ children }: { children: ReactNode }) => {

    const storedTime = localStorage.getItem("nuegas-time");

    const initialTime = (storedTime === "12" || storedTime === "24") ? storedTime : "12";

    const [timeFormat, setTimeFormat] = useState<TypetimeFormat>(initialTime);

    useEffect(() => {
        localStorage.setItem("nuegas-time", timeFormat);
    }, [timeFormat])

    return (
        <TimeContext.Provider value={{ timeFormat, setTimeFormat }}>
            {children}
        </TimeContext.Provider>
    )
}

export const useTimeContext = () => {
    const context = useContext(TimeContext);

    if (!context) {
        throw new Error("Time Context is not found");
    }

    return context;
}

export default TimeProvider