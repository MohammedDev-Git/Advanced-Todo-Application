import type { LanguageObject, MemberObject, tempStackError } from '@/types';
import {
    Github,
    Linkedin,
    Globe,
    Mail,
    ChartNoAxesColumn,
    Youtube,
    Dribbble,
    Facebook,
    X,
    Send,
    PenLine,
    Plus,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { tempStackSchema } from '@/features/members/schemas/skillsSocialsSchema';
import { InputError } from '@/components/custom/InputError';
import { useDispatch } from 'react-redux';
import { editSkills } from '@/features/members/membersSlice';

interface infoCardProps {
    member: MemberObject | undefined;
    resetEditModes: () => void;
    stackEditMode: boolean;
    setStackEditMode: (mode: boolean) => void;
    langsEditMode: boolean;
    setLangsEditMode: (mode: boolean) => void;
}

export const InfoCard = ({
    member,
    resetEditModes,
    stackEditMode,
    setStackEditMode,
    langsEditMode,
    setLangsEditMode,
}: infoCardProps) => {

    const dispatch = useDispatch();

    const logos = [
        { key: "github", text: "GitHub", Icon: <Github /> },
        { key: "linkedin", text: "LinkedIn", Icon: <Linkedin /> },
        { key: "facebook", text: "Facebook", Icon: <Facebook /> },
        { key: "fb.", text: "Facebook", Icon: <Facebook /> },
        { key: "twitter", text: "Twitter", Icon: <X /> },
        { key: "x.com", text: "Twitter", Icon: <X /> },
        { key: "youtube", text: "YouTube", Icon: <Youtube /> },
        { key: "youtu.be", text: "YouTube", Icon: <Youtube /> },
        { key: "dribbble", text: "Dribbble", Icon: <Dribbble /> },
        { key: "telegram", text: "Telegram", Icon: <Send /> },
        { key: "t.me", text: "Telegram", Icon: <Send /> },
        { key: "codeforces", text: "Codeforces", Icon: <ChartNoAxesColumn /> },
        { key: "mail", text: "Email", Icon: <Mail /> },
    ]

    let skills: string[] = [];
    let languages: LanguageObject[] = [];
    if (member) {
        skills = [...member?.skillsAndSocials?.stackAndLinks?.stack];
        languages = [...member?.skillsAndSocials.languages];
    }

    const memberSocials = member?.skillsAndSocials?.stackAndLinks?.social;
    const memberSocialsFiltered = memberSocials?.filter((link) => {
        return link.trim() !== "";
    });

    const [localTempStack, setLocalTempStack] = useState<string[]>(skills);

    const [errorKey, setErrorKey] = useState<number>(0);
    const [stackError, setStackError] = useState<tempStackError | null>(null);
    const [stackLengthError, setStackLengthError] = useState<string | undefined>(undefined);

    const reseStacktErrors = () => {
        setStackError(null);
        setStackLengthError(undefined);
    }

    const handleStackChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const updatedStack = [...localTempStack];
        updatedStack[idx] = e.target.value.trim();
        setLocalTempStack(updatedStack);
    }

    const handleAddStack = () => {
        setLocalTempStack([...localTempStack, ""]);
    }

    const handleUpdateStack = () => {
        const data = {
            tempStack: localTempStack,
        }

        const validationResult = tempStackSchema.safeParse(data);

        if (!validationResult.success) {
            const error = validationResult.error.format();
            if (error) {
                setErrorKey(prev => prev + 1);
                setStackLengthError(undefined);
                setStackError(error);
            }
            return;
        }

        const cleanedData = data.tempStack.filter((skill) => skill.trim() !== "");

        if (cleanedData.length === 0) {
            setStackError(null);
            setErrorKey(prev => prev + 1);
            setStackLengthError("add at least one skill");
            return;
        }

        setLocalTempStack(cleanedData);

        dispatch(editSkills({ id: member?.id, tempstack: cleanedData }));
        setStackEditMode(false);
        reseStacktErrors();

    }

    const handleUpdatelangs = () => {
        // code
    }

    return (
        <aside className="w-full bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8 top-24">

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{member?.personalDetails?.name}</h2>

            <hr className="border-gray-100" />

            <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 flex-col">
                        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">Tech Stack</h3>
                        <InputError className='text-xs!' keyErr={errorKey} message={stackLengthError} />
                    </div>
                    {
                        stackEditMode ?
                            <div className="flex gap-2">
                                <Button className="size-6" onClick={() => {
                                    setStackEditMode(false);
                                    setLocalTempStack(skills);
                                }}>
                                    <X className="text-white" />
                                </Button>
                                <Button className="size-6" onClick={() => {
                                    handleUpdateStack();
                                }}>
                                    <Check className="text-white" />
                                </Button>
                            </div>
                            :
                            <Button className="size-6" onClick={() => {
                                resetEditModes();
                                setStackEditMode(true);
                            }}>
                                <PenLine className="text-white" />
                            </Button>
                    }
                </div>
                {
                    stackEditMode ?
                        <div className="grid max-[350px]:grid-cols-1 grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                            {localTempStack.map((skill, idx) => (
                                <div key={idx} className="flex flex-col items-start">
                                    <div className="relative w-full">
                                        <Input
                                            id={`skill-${idx}`}
                                            className="h-6 px-3 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                                            value={skill}
                                            onChange={(e) => {
                                                handleStackChange(e, idx);
                                            }}
                                        />
                                        {
                                            localTempStack.length > 1 &&
                                            <Button
                                                onClick={() => {
                                                    const updatedStack = localTempStack.filter((_, index) => index !== idx);
                                                    setLocalTempStack(updatedStack);
                                                }}
                                                className="absolute top-1/2 right-0 rounded-full size-3 bg-primary/20 h-full -translate-y-1/2 flex justify-center items-center"
                                            >
                                                <X className="text-white size-3" />
                                            </Button>
                                        }
                                    </div>
                                    <InputError className='text-xs!' keyErr={errorKey} message={stackError?.tempStack?.[idx]?._errors[0]} />
                                </div>
                            ))}
                            {
                                localTempStack.length < 9 &&
                                <Button
                                    onClick={handleAddStack}
                                    className="h-6 flex justify-center items-center border-2 border-dotted border-primary dark:border-primary bg-primary/20 dark:bg-primary/20 hover:bg-primary/50 hover:dark:bg-primary/50">
                                    <Plus className="text-primary size-3" />
                                </Button>
                            }
                        </div>
                        :
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                }
            </div>

            <hr className="border-gray-100" />

            <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">Languages</h3>
                    {
                        langsEditMode ?
                            <div className="flex gap-2">
                                <Button className="size-6" onClick={() => {
                                    setLangsEditMode(false);
                                }}>
                                    <X className="text-white" />
                                </Button>
                                <Button className="size-6" onClick={() => {
                                    handleUpdatelangs();
                                }}>
                                    <Check className="text-white" />
                                </Button>
                            </div>
                            :
                            <Button className="size-6" onClick={() => {
                                resetEditModes();
                                setLangsEditMode(true);
                            }}>
                                <PenLine className="text-white" />
                            </Button>
                    }

                </div>
                <div className="space-y-3">
                    {languages.map((lang) => (
                        <div key={lang?.lang} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{lang.lang}</span>
                            <span className="text-xs text-primary dark:text-primary bg-primary/20 dark:bg-primary/20 px-2 py-0.5 hover:bg-primary/20 dark:hover:bg-primary/20 rounded-md font-semibold">
                                {lang.level}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="pt-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">Social Media</h3>
                {
                    memberSocialsFiltered && memberSocialsFiltered.length >= 1 ?
                        <div className="grid grid-cols-2 gap-3">
                            {
                                memberSocialsFiltered?.map((link, idx) => {
                                    const chosenLogo = logos.find((logo) => link.includes(logo.key))
                                    return (
                                        <a key={idx} href={link} target='_blank' className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-primary/10 dark:hover:bg-primary/10 transition-all text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/50" >
                                            {chosenLogo ? chosenLogo.Icon : <Globe />}
                                            <span className="text-xs font-medium">{chosenLogo ? chosenLogo.text : "External"}</span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                        :
                        <p className="text-gray-400 dark:text-gray-500">No Socials Provided</p>
                }
            </div>
        </aside >
    );
};