import { Tags, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ModalProps } from "@/types";
import { useInput } from "@/hooks/useInput";

export function AddNoteModal({ open, onOpenChange }: ModalProps) {

    const noteTitle = useInput("");
    const noteDetails = useInput("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-120 rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                {/* Header Decor */}
                <div className="h-2 w-full bg-linear-to-r from-blue-500 to-blue-600 via-primary-500" />

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800">
                            Create New Note
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Fill in the details below to organize your day.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Title Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Note Title
                            </Label>
                            <div className="relative">
                                <LayoutList className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="title"
                                    placeholder="e.g. Task 1 is a priority"
                                    className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
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
                            />
                        </div>

                        {/* Categories Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {

                            }
                            <div className="grid gap-2">
                                <Label htmlFor="cat1" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                    Primary Tag
                                </Label>
                                <div className="relative">
                                    <Tags className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="cat1"
                                        placeholder="Backend"
                                        className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cat2" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                    Secondary Tag
                                </Label>
                                <Input
                                    id="cat2"
                                    placeholder="Design"
                                    className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <Button
                            type="submit"
                            className="w-full h-14 bg-slate-900 hover:bg-primary text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all text-base"
                        >
                            Add a Note
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}