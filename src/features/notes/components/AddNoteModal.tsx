import { Tags, LayoutList, X } from "lucide-react";
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
import type { ModalProps } from "@/types";
import { useInput } from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addTempCategory, removeTempCategory, selectTempCategories } from "@/features/notes/notesSlice";

export function AddNoteModal({ open, onOpenChange }: ModalProps) {

    const dispatch = useDispatch();

    const noteTitle = useInput("");
    const noteDetails = useInput("");

    const tempCategories = useSelector(selectTempCategories);

    const handleAddNote = () => {
        console.log(noteTitle.value);
        console.log(noteDetails.value);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-120 max-h-120 custom-scrollbar overflow-y-scroll rounded-[2rem] border-none shadow-2xl p-0">
                {/* Header Decor */}
                <div className="h-2 w-full bg-linear-to-r from-blue-500 to-blue-600 via-primary-500" />

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800">
                            Create New Note
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Title Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Note Title
                            </Label>
                            <div className="relative">
                                <LayoutList className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                <Input
                                    id="title"
                                    placeholder="e.g. Task 1 is a priority"
                                    className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    {...noteTitle}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Details
                            </Label>
                            <textarea
                                id="description"
                                placeholder="Write more details about this note..."
                                className="flex min-h-25 w-full rounded-xl border-none bg-slate-50 px-4 py-3 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all resize-none"
                                {...noteDetails}
                            />
                        </div>

                        {/* Categories Row */}
                        <div className="grid grid-cols-1 gap-4">

                            <div className="flex items-center justify-between">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                    Categories
                                </Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 rounded-full p-0 bg-slate-100 text-slate-600 hover:bg-primary hover:text-white"
                                    onClick={() => {
                                        dispatch(addTempCategory());
                                    }}
                                >
                                    +
                                </Button>
                            </div>

                            <div className="grid gap-4">
                                {
                                    tempCategories?.map((cat, idx) => (
                                        <div className="relative" key={idx}>
                                            <Tags className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder={`Category ${idx + 1}`}
                                                className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                            />
                                            {
                                                tempCategories && tempCategories.length > 1 ?
                                                    <Button
                                                        className="bg-transparent hover:bg-transparent cursor-pointer absolute right-3 top-2 text-slate-300 hover:text-destructive transition-colors"
                                                        onClick={() => {
                                                            dispatch(removeTempCategory())
                                                        }}
                                                    >
                                                        <span className="text-lg"><X size={20} /></span>
                                                    </Button>
                                                    :
                                                    null
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <Button
                            type="submit"
                            className="w-full h-14 bg-slate-900 hover:bg-primary text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all text-base"
                            onClick={handleAddNote}
                        >
                            Add a Note
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}