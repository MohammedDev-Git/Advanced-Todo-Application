import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { addLanguageObject, removeLanguageRow, selectLanguages, updateLanguageLevel, updateLanguageText } from "@/features/members/membersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { LanguageObject } from "@/types";

const LanguageInput = () => {
    const tempLanguages = useSelector(selectLanguages);

    const dispatch = useDispatch();

    return (
        <>
            {
                tempLanguages.map((languageObject: LanguageObject) => {
                    const filledRow = languageObject.lang !== "" && languageObject.level !== "";
                    return (
                        <div key={languageObject.id} className="flex flex-col relative lg:flex-row justify-between items-start lg:items-center border-2 p-4 mt-2 rounded-xl gap-4 lg:gap-0">
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 w-full">
                                <div className="grid gap-1.5 w-full lg:w-auto">
                                    <Select onValueChange={(e) => {
                                        if (languageObject.level && languageObject.lang === "") {
                                            dispatch(addLanguageObject());
                                        }
                                        dispatch(updateLanguageText({ language: e, id: languageObject.id }));
                                    }}>
                                        <SelectTrigger className="w-full lg:w-48">
                                            <SelectValue placeholder="Select a Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Languages</SelectLabel>
                                                <SelectItem value="arabic">Arabic</SelectItem>
                                                <SelectItem value="english">English</SelectItem>
                                                <SelectItem value="french">French</SelectItem>
                                                <SelectItem value="german">German</SelectItem>
                                                <SelectItem value="spanish">Spanish</SelectItem>
                                                <SelectItem value="italian">Italian</SelectItem>
                                                <SelectItem value="chinese">Chinese</SelectItem>
                                                <SelectItem value="japanese">Japanese</SelectItem>
                                                <SelectItem value="turkish">Turkish</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-1.5 w-full lg:w-auto">
                                    <Select onValueChange={(e) => {
                                        if (languageObject.lang && languageObject.level === "") {
                                            dispatch(addLanguageObject());
                                        }
                                        dispatch(updateLanguageLevel({ level: e, id: languageObject.id }));

                                    }}>
                                        <SelectTrigger className="w-full lg:w-48">
                                            <SelectValue placeholder="Select a Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Level</SelectLabel>
                                                <SelectItem value="beginner">Beginner</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="professional">Professional</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                                <SelectItem value="native">Native</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    if (filledRow) {
                                        dispatch(removeLanguageRow(languageObject.id));
                                    }
                                }}
                                className={`${filledRow ? "" : "cursor-not-allowed opacity-50"} size-6 lg:size-8 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 lg:translate-y-0 lg:translate-x-0 lg:relative hover:bg-primary self-end lg:self-auto shrink-0`}>
                                <X className="w-8 h-2 text-white" />
                            </Button>
                        </div>
                    )
                })
            }
        </>

    )
}

export default LanguageInput