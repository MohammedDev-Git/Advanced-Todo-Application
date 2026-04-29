import { InputError } from "@/components/custom/InputError"
import LanguageInputs from "@/components/Members/MemberModal/LanguageInputs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMember, addTempLink, addTempStack, removeTempLink, removeTempStack, selectLanguages, selectTempLinks, selectTempStack, updateTempLink, updateTempStack } from "@/features/members/membersSlice"
import { skillsSocialsSchema } from "@/features/members/schemas/skillsSocialsSchema"
import { useError } from "@/hooks/useError"
import type { SkillsAndSocialsError } from "@/types"
import { Plus, Share2, X } from "lucide-react"
import { forwardRef, useImperativeHandle, useRef, useState, type Ref } from "react"
import { useDispatch, useSelector } from "react-redux"

export interface SkillsAndSocialsRef {
    handleStepFour: () => boolean;
}

export interface updateLinkProps {
    idx: number;
    text: string;
}

const SkillsAndSocials = ({ }, ref: Ref<SkillsAndSocialsRef>) => {

    const tempStack = useSelector(selectTempStack);
    const tempLinks = useSelector(selectTempLinks);
    const tempLanguages = useSelector(selectLanguages);

    const langLengthError = useError("");
    const stackLengthError = useError("");
    const linksLengthError = useError("");

    const [zodError, setZodError] = useState<SkillsAndSocialsError | null>(null);
    const [errorKey, setErrorKey] = useState<number>(0);

    const [errorKeyLangLen, setErrorKeyLangLen] = useState(0);
    const [errorKeyStackLen, setErrorKeyStackLen] = useState(0);
    const [errorKeyLinksLen, setErrorKeyLinksLen] = useState(0);

    const timerRef = useRef<number | null>(null);

    const dispatch = useDispatch();

    const placeholdersStackArr = [
        "GSAP",
        "ThreeJS",
        "React",
        "TypeScript",
        "Tailwind",
        "JavaScript",
        "Redux",
        "Strapi",
        "Nodejs",
    ]

    const placeholdersLinksArr = [
        "github",
        "linkedin",
        "portfolio",
        "facebook",
    ]

    const handleAddTempStack = () => {
        dispatch(addTempStack());
    }

    const handleRemoveTempStack = (idx: number) => {
        dispatch(removeTempStack(idx));
    }

    const handleAddTempLink = () => {
        dispatch(addTempLink());
    }

    const handleRemoveTempLink = (idx: number) => {
        dispatch(removeTempLink(idx));
    }

    const handleUpdateTempLinks = (object: updateLinkProps) => {
        dispatch(updateTempLink(object));
    }

    const clearStackZodErrors = () => {
        const stackError = zodError?.tempStack;
        if (stackError) {
            const newZodError = { ...zodError, tempStack: undefined };
            setZodError(newZodError);
        }
    }

    const clearLinksZodErrors = () => {
        const linksError = zodError?.tempLinks;
        if (linksError) {
            const newZodError = { ...zodError, tempLinks: undefined };
            setZodError(newZodError);
        }
    }

    const clearStackLengthError = () => {
        if (stackLengthError.errorMsg) {
            stackLengthError.setErrorMsg("");
        }
    }

    const clearlinksLengthError = () => {
        if (linksLengthError.errorMsg) {
            linksLengthError.setErrorMsg("");
        }
    }

    const handleLinksLength = () => {
        setErrorKeyLinksLen((pre) => pre + 1);

        linksLengthError.setErrorMsg("You can add only 4 links");

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            linksLengthError.setErrorMsg("");
            timerRef.current = null;
        }, 3000);
    }

    // submit handler
    const handleStepFour = () => {

        linksLengthError.setErrorMsg("");

        const cleanedTempLanguages = tempLanguages.filter((language) => {
            return language.lang !== "" && language.level !== "";
        })

        const tempSkillsAndSocials = {
            tempLanguages: cleanedTempLanguages,
            tempStackAndLinks: {
                tempStack: tempStack,
                tempLinks: tempLinks,
            }
        }

        // custom validation
        const sentLangs = tempSkillsAndSocials.tempLanguages;
        const cleanedStack = tempSkillsAndSocials.tempStackAndLinks.tempStack.filter((stack) => stack !== "");

        const emptyStack = cleanedStack.length === 0;

        const handleLanguagesLength = () => {
            if (sentLangs.length < 1) {
                langLengthError.setErrorMsg("Add at least one language");
                setErrorKeyLangLen((pre) => pre + 1);
            } else {
                langLengthError.setErrorMsg("");
            }
        }

        const handleStackLength = () => {
            if (emptyStack) {
                stackLengthError.setErrorMsg("Add at least one Technology");
                setErrorKeyStackLen((pre) => pre + 1);
            } else {
                stackLengthError.setErrorMsg("");
            }
        }

        // zod validation
        const validationResult = skillsSocialsSchema.safeParse(tempSkillsAndSocials.tempStackAndLinks);
        const handleZodErrors = () => {
            if (!validationResult.success) {
                const error: SkillsAndSocialsError = validationResult.error.format();
                if (error) {
                    setZodError(error);
                    setErrorKey((pre) => pre + 1);
                }
            }
        }


        const fail = !validationResult.success || sentLangs.length < 1 || emptyStack;

        if (fail) {
            handleLanguagesLength();
            handleStackLength();
            handleZodErrors();
            return false;
        }

        const cleanedLinks = tempSkillsAndSocials.tempStackAndLinks.tempLinks.filter((link, idx) => {
            if (idx !== 0) {
                return link !== ""
            }
            return true;
        });

        const cleanedData = {
            languages: cleanedTempLanguages,
            stackAndLinks: {
                stack: cleanedStack,
                social: cleanedLinks,
            }
        }

        dispatch(addMember(cleanedData));

        return true;

    }
    
    useImperativeHandle(ref, () => ({
        handleStepFour,
    }))

    return (
        <div className="space-y-6">
            <div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                <Label className="text-primary font-bold">Member Languages (Max 4)</Label>
                <InputError message={langLengthError.errorMsg} keyErr={errorKeyLangLen} />
                <LanguageInputs setLangLengthError={langLengthError.setErrorMsg} />
            </div>

            <div className="grid gap-1.5">
                <Label>Tech Stack</Label>
                <InputError message={stackLengthError.errorMsg} keyErr={errorKeyStackLen} />
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                    {
                        tempStack.map((tech, idx) => (
                            <div key={idx} className="relative">
                                <Input
                                    key={idx}
                                    placeholder={`eg. ${placeholdersStackArr[idx]}`}
                                    value={tech}
                                    onChange={(e) => {
                                        const stackObject = { idx, text: e.target.value }
                                        dispatch(updateTempStack(stackObject));
                                        clearStackZodErrors();
                                        clearStackLengthError();
                                    }}
                                />
                                <InputError message={zodError?.tempStack?.[idx]?._errors[0]} keyErr={errorKey} />
                                {
                                    tempStack.length > 1 &&
                                    <Button
                                        onClick={() => {
                                            handleRemoveTempStack(idx);
                                            clearStackZodErrors();
                                            clearStackLengthError();
                                        }}
                                        className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                        <X className="size-4 text-white" />
                                    </Button>
                                }
                            </div>
                        ))
                    }
                    {
                        tempStack.length < 9 &&
                        <Button
                            onClick={() => {
                                handleAddTempStack();
                                clearStackZodErrors();
                                clearStackLengthError();
                            }}
                            className="bg-primary/10 hover:bg-primary/20 flex items-center justify-center rounded-sm border-dotted border-2 border-primary">
                            <Plus className="w-4 h-4 text-primary" />
                        </Button>
                    }
                </div>
            </div>

            <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-start gap-3 items-start">
                        <Label>Social Media Links (Optional)</Label>
                        <InputError message={linksLengthError.errorMsg} keyErr={errorKeyLinksLen} />
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                        onClick={() => {
                            if (tempLinks.length === 4) {
                                handleLinksLength();
                                return;
                            }
                            handleAddTempLink();
                            linksLengthError.setErrorMsg("");
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                {
                    tempLinks.map((link, idx) => (
                        <div key={idx} className="relative mt-3">
                            <div className="relative">
                                <Share2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={link}
                                    onChange={(e) => {
                                        const updatedLink = { idx, text: e.target.value };
                                        handleUpdateTempLinks(updatedLink);
                                        clearLinksZodErrors();
                                    }}

                                    placeholder={`https://www.${placeholdersLinksArr[idx]}.com`} className="pl-10 " />
                                <InputError className="mt-2" message={zodError?.tempLinks?.[idx]?._errors[0]} keyErr={errorKey} />
                            </div>
                            {
                                tempLinks.length > 1 &&
                                <Button
                                    onClick={() => {
                                        handleRemoveTempLink(idx);
                                        clearLinksZodErrors();
                                        clearlinksLengthError();
                                    }}
                                    className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                    <X className="size-4 text-white" />
                                </Button>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

SkillsAndSocials.displayName = "SkillsAndSocials";

export default forwardRef(SkillsAndSocials);