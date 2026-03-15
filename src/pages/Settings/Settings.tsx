import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModeContext } from '@/contexts/mode/ModeProvider';
import { useThemeContext } from '@/contexts/theme/ThemeProvider';
import type { ThemeType } from '@/types';

const Settings = () => {
    const [timeFormat, setTimeFormat] = useState('24h');

    const { theme, themes, setTheme } = useThemeContext();

    const { setLight, setDark } = useModeContext();

    return (
        <div className="xl:mt-12 animate-page">

            <Card className="max-w-4xl border-none shadow-none p-10 transition-all ">
                <div className="space-y-12">
                    {/* Header */}
                    <div>
                        <h2 className="text-muted-foreground text-lg font-medium">Choose your preference</h2>
                        <div className="h-px bg-border w-full mt-6 transition-all" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

                        {/* Time Format */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Time format</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setTimeFormat('24h')}
                                    className={`flex-1 py-4 px-6 rounded-xl transition-all border-2 font-bold ${timeFormat === '24h'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    24 Hours
                                </button>
                                <button
                                    onClick={() => setTimeFormat('12h')}
                                    className={`flex-1 py-4 px-6 rounded-xl transition-all border-2 font-bold ${timeFormat === '12h'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    12 Hours
                                </button>
                            </div>

                            <div className="pt-8">
                                <Button
                                    onClick={() => {
                                        setTheme("first");
                                        setLight();
                                    }}
                                    className="transition-none w-full text-white bg-primary hover:opacity-90 py-7 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                                    Reset Default
                                </Button>
                            </div>
                        </div>

                        {/* Theme Colors */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Theme</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {themes.map((color, index) => {
                                    const localColorName: ThemeType = color;
                                    const active = localColorName === theme;
                                    return (
                                        <button
                                            onClick={() => {
                                                setTheme(localColorName);
                                            }}
                                            key={index}
                                            className={`
                                                ${color === "first" ? "bg-first" :
                                                    color === "second" ? "bg-second" :
                                                        color === "third" ? "bg-third" :
                                                            color === "fourth" ? "bg-fourth" :
                                                                color === "fifth" ? "bg-fifth" :
                                                                    "bg-sixth"
                                                }
                                                ${active ? 'opacity-100' : 'opacity-50'} aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mode (Sun & Moon) */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Mode</h3>
                            <div className="space-y-4">
                                {/* Light Mode */}
                                <div
                                    onClick={() => setLight()}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all bg-foreground text-background dark:bg-secondary dark:text-muted-foreground`}
                                >
                                    <Sun size={42} strokeWidth={1.5} />
                                </div>

                                {/* Dark Mode */}
                                <div
                                    onClick={() => setDark()}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all dark:bg-foreground dark:text-background bg-secondary text-muted-foreground`}
                                >
                                    <Moon size={42} strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
        </div>

    );
};

export default Settings;