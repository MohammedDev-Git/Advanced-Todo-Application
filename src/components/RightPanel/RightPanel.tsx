import { cn } from "@/lib/utils"

import TodosSection from "./TodosSection"
import NotesSection from "./NotesSection"

export function RightPanel({ className }: { className?: string }) {

    return (
        <div className={cn("flex flex-col h-full bg-white border-l px-6 py-8 overflow-y-auto w-[320px] shrink-0", className)}>

            <TodosSection />

            <NotesSection />

        </div>
    )
}
