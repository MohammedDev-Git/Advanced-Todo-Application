import { Tags, LayoutList, X, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { catSizeError, noteAddError, noteObject } from "@/types";
import { useInput } from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addTempCategory, editNote, removeTempCategory, resetTempCategory, selectTempCategories, setTempCategory, updateTempCategory } from "@/features/notes/notesSlice";
import { useEffect, useState } from "react";
import { noteSchema, tempCategoriesSchema } from "@/features/notes/schemas/noteSchema";
import { InputError } from "@/components/custom/InputError";
import { format, parseISO } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

interface EditNoteModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    editedNote?: noteObject | undefined;
}

export function EditNoteModal({ open, onOpenChange, editedNote }: EditNoteModalProps) {

    const dispatch = useDispatch();

    const [zodError, setZodError] = useState<noteAddError | null>(null);
    const [categorySizeError, setCategorySizeError] = useState<catSizeError | null>(null);
    const [keyError, setKeyError] = useState<number>(0);
    const [keyCatError, setKeyCatError] = useState<number>(0);

    const title = useInput(editedNote?.title || "");
    const details = useInput(editedNote?.description || "");
    const tempCategoryArr = useSelector(selectTempCategories);

    useEffect(() => {
        if (open) {
            title.fillInitialState();
            details.fillInitialState();
            if (editedNote) {
                dispatch(setTempCategory(editedNote.category))
            }
        }

        if (zodError) {
            setZodError(null);
        }

        if (categorySizeError) {
            setCategorySizeError(null);
        }

    }, [open, editedNote])

    const handleEditNote = () => {
        if (!editedNote || !tempCategoryArr) {
            return;
        }

        const formData = {
            noteTitle: title.value,
            noteDetails: details.value,
            tempCategories: tempCategoryArr,
        }

        const validationResult = noteSchema.safeParse(formData);

        if (!validationResult.success) {
            const error: noteAddError = validationResult.error.format();
            setKeyError((pre) => pre + 1);
            if (error) {
                setZodError(error);
            }
            return;
        }

        const { noteDetails, noteTitle } = validationResult.data;
        const formattedDate = format(parseISO(new Date().toISOString()), "eeee, dd-MMM-yyyy");

        const filteredCategoryArr = tempCategoryArr.filter((cat) => cat !== "");

        const note: noteObject = {
            ...editedNote,
            category: filteredCategoryArr.length === 0 ? [""] : filteredCategoryArr,
            title: noteTitle,
            description: noteDetails,
            edited: true,
            createdAt: formattedDate,
        }

        dispatch(editNote(note));

        resetAllInputs();
        onOpenChange?.(false);
    }

    const resetAllInputs = () => {
        setZodError(null);
        setCategorySizeError(null);
        title.reset();
        details.reset();
        dispatch(resetTempCategory());
    }

    const handleAddCategory = () => {
        if (!tempCategoryArr) {
            return;
        }

        setKeyCatError((pre) => pre + 1);
        const catSize = { tempCategoriesSize: tempCategoryArr.length + 1 }
        const validationResult = tempCategoriesSchema.safeParse(catSize);

        if (!validationResult.success) {
            const tempCatErr = validationResult.error?.format();
            if (tempCatErr) {
                setCategorySizeError(tempCatErr);
            }
            return;
        }

        dispatch(addTempCategory());
        setZodError(null);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-120 max-h-120 custom-scrollbar overflow-y-scroll rounded-[2rem] border-none shadow-2xl p-0">

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                            Create New Note
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEditNote();
                    }} className="grid gap-6 py-4">
                        {/* Title Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                                Note Title
                            </Label>
                            <div className="relative">
                                <LayoutList className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                <Input
                                    id="title"
                                    placeholder="e.g. Task 1 is a priority"
                                    className="pl-10 h-12"
                                    {...title}
                                />
                            </div>
                            <InputError keyErr={keyError} message={zodError?.noteTitle?._errors[0]} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                                Details
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Write more details about this note..."
                                className="flex min-h-25 max-h-25 w-full text-sm"
                                {...details}
                            />
                            <InputError keyErr={keyError} message={zodError?.noteDetails?._errors[0]} />
                        </div>

                        {/* Categories Row */}
                        <div className="grid grid-cols-1 gap-4">

                            <div className="flex flex-col justify-center gap-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                        Categories
                                    </Label>
                                    <div className="flex justify-center items-center gap-1">
                                        {
                                            tempCategoryArr && tempCategoryArr.length > 1 ?
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-400 hover:text-white"
                                                    onClick={() => {
                                                        dispatch(resetTempCategory());
                                                        setCategorySizeError(null);
                                                    }}
                                                >
                                                    <Trash />
                                                </Button>
                                                :
                                                null
                                        }
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white"
                                            onClick={() => {
                                                handleAddCategory();
                                            }}
                                        >
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                                <InputError keyErr={keyCatError} message={categorySizeError?.tempCategoriesSize?._errors[0]} />
                            </div>

                            <div className="grid gap-4">
                                {
                                    tempCategoryArr?.map((cat, idx) => (
                                        <div className="relative" key={idx}>
                                            <Tags className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder={`Category ${idx + 1}`}
                                                className="pl-10 h-12"
                                                value={cat}
                                                onChange={(e) => {
                                                    dispatch(updateTempCategory({ text: e.target.value, idx }))
                                                }}
                                            />
                                            {
                                                tempCategoryArr && tempCategoryArr.length > 1 ?
                                                    <Button
                                                        type="button"
                                                        className="bg-transparent hover:bg-transparent cursor-pointer absolute right-3 top-2 text-slate-300 dark:text-slate-400 hover:text-destructive transition-colors"
                                                        onClick={() => {
                                                            dispatch(removeTempCategory(idx))
                                                            setZodError(null);
                                                            setCategorySizeError(null);
                                                        }}
                                                    >
                                                        <span className="text-lg"><X size={20} /></span>
                                                    </Button>
                                                    :
                                                    null
                                            }
                                            <InputError keyErr={keyError + idx} message={zodError?.tempCategories?.[idx]?._errors[0]} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <DialogFooter className="mt-8">
                            <Button
                                type="submit"
                                className="w-full h-14 bg-slate-900 dark:bg-slate-700 dark:hover:bg-primary hover:bg-primary text-white dark:text-slate-200 font-bold rounded-2xl transition-all text-base"
                            >
                                Edit Note
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}