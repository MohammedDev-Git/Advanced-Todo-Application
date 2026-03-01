import { selectNotes } from "@/features/notes/notesSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import NotesList from "@/features/notes/components/NotesList";
import { useState } from "react";
import { AddNoteModal } from "@/features/notes/components/AddNoteModal";
import { DeleteAllNotesModal } from "@/features/notes/components/DeleteAllNotesModal";
import { DeleteNoteModal } from "@/features/notes/components/DeleteNoteModal";
import { EditNoteModal } from "@/features/notes/components/EditNoteModal";
import type { noteObject } from "@/types";

const NotesSection = () => {

    // All Note Modals
    const [addNoteOpen, setAddNoteOpen] = useState<boolean>(false);
    const [deleteAllOpen, setDeleteAllOpen] = useState<boolean>(false);
    const [deleteNoteOpen, setDeleteNoteOpen] = useState<boolean>(false);
    const [editNoteOpen, setEditNoteOpen] = useState<boolean>(false);
    const [deletedID, setDeletedID] = useState<string | undefined>(undefined);
    const [editedNote, setEditedNote] = useState<noteObject|undefined>(undefined);

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
                            <Button
                                onClick={() => { setDeleteAllOpen(true); }}
                                size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-100 text-red-600 hover:bg-red-200 shadow-none">
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
                <NotesList
                    setAddNoteOpen={setAddNoteOpen}
                    setDeleteNoteOpen={setDeleteNoteOpen}
                    setDeletedID={setDeletedID}
                    setEditNoteOpen={setEditNoteOpen}
                    setEditedNote={setEditedNote}
                />
            </div>

            <AddNoteModal
                open={addNoteOpen}
                onOpenChange={setAddNoteOpen}
            />

            <EditNoteModal
                open={editNoteOpen}
                onOpenChange={setEditNoteOpen}
                editedNote={editedNote}
            />

            <DeleteAllNotesModal
                open={deleteAllOpen}
                onOpenChange={setDeleteAllOpen}
            />

            <DeleteNoteModal
                open={deleteNoteOpen}
                onOpenChange={setDeleteNoteOpen}
                deletedId={deletedID}
            />

        </section >
    )
}

export default NotesSection