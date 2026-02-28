import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Ellipsis, PencilIcon, TrashIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectNotes } from '@/features/notes/notesSlice'
import type { noteObject } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import sadNote from "@/assets/images/sadNote.png"
import NoData from '@/components/custom/NoData'

type notesProps = {
    setAddNoteOpen: (open: boolean) => void,
    setDeleteNoteOpen: (open: boolean) => void,
    setDeletedID: (id: string | undefined) => void,
}

const NotesList = ({ setAddNoteOpen, setDeleteNoteOpen, setDeletedID }: notesProps) => {
    const notes = useSelector(selectNotes);

    const badgeColors = [
        { bg: "bg-pink-100", text: "text-pink-700", hover: "hover:bg-pink-200" },
        { bg: "bg-blue-100", text: "text-blue-700", hover: "hover:bg-blue-200" },
        { bg: "bg-emerald-100", text: "text-emerald-700", hover: "hover:bg-emerald-200" },
        { bg: "bg-amber-100", text: "text-amber-700", hover: "hover:bg-amber-200" },
        { bg: "bg-purple-100", text: "text-purple-700", hover: "hover:bg-purple-200" },
        { bg: "bg-cyan-100", text: "text-cyan-700", hover: "hover:bg-cyan-200" },
    ];

    const optionsArr = [
        { action: "edit", text: "Edit", icon: <PencilIcon /> },
        { action: "delete", text: "Delete", icon: <TrashIcon /> }
    ]

    return (
        <>
            {
                notes && notes.length > 0 ?
                    notes.map((note: noteObject) => (
                        <Card key={note.id} className="border-0 shadow-sm p-4 bg-white ring-1 ring-slate-100 rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] text-slate-400 font-medium">{note.createdAt}</span>
                                <DropdownMenu >
                                    <DropdownMenuTrigger className="border-0 outline-0">
                                        <Ellipsis className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white mr-9">
                                        <DropdownMenuGroup>
                                            {
                                                optionsArr.map((option, idx) => (
                                                    <DropdownMenuItem onClick={() => {
                                                        if (option.action === "edit") {
                                                            // c
                                                        } else {
                                                            setDeleteNoteOpen(true);
                                                            setDeletedID(note.id);
                                                        }
                                                    }} key={idx} className="cursor-pointer">
                                                        {option.icon}
                                                        {option.text}
                                                    </DropdownMenuItem>
                                                ))
                                            }
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <h4 className="font-bold text-sm text-slate-800 mb-1">{note.title}</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                                {note.description || "No Description"}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {
                                    note?.category?.map((cat, idx) => {
                                        const colorStyle = badgeColors[idx];
                                        return (
                                            <Badge key={idx} variant="secondary" className={`${colorStyle.bg} ${colorStyle.text} ${colorStyle.hover} h-5 px-2 text-[10px] rounded-full`}>
                                                {cat || "Unknown Category"}
                                            </Badge>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    ))
                    :
                    <NoData
                        src={sadNote}
                        message="No Notes? put your thoughts!"
                        image={true}
                        setAddOpen={setAddNoteOpen}
                    />
            }
        </>
    )
}

export default NotesList