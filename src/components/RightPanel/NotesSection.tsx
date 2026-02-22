import { selectNotes } from "@/features/notes/notesSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import NotesList from "@/features/notes/components/NotesList";
import { useState } from "react";

const NotesSection = () => {

    // for modal
    const [addNoteOpen, setAddNoteOpen] = useState<boolean>(false);

    const notes = useSelector(selectNotes);
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    {/* Pencil Icon */}
                    <div className="grid place-items-center rotate-45">
                        <div className="w-3 h-1 bg-slate-400 rounded-full" />
                    </div>
                    <h2 className="font-bold text-lg text-primary underline decoration-2 decoration-gray-300 underline-offset-4">Notes</h2>
                </div>
                <div className="flex justify-center items-center gap-2">

                    {
                        notes && notes.length > 0 ?
                            <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-100 text-red-600 hover:bg-red-200 shadow-none">
                                <Trash className="h-4 w-4" />
                            </Button>
                            :
                            null
                    }

                    <Button onClick={() => { setAddNoteOpen(true); }} size="icon" variant="secondary" className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-200 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <NotesList setAddNoteOpen={setAddNoteOpen} />
            </div>
        </section >
    )
}

export default NotesSection