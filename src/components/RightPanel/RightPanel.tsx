import { cn } from "@/lib/utils"

import TodosSection from "@/components/RightPanel/TodosSection"
import NotesSection from "@/components/RightPanel/NotesSection"

export function RightPanel({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col h-full bg-white dark:bg-card border-l dark:border-slate-700 px-6 py-8 overflow-y-auto w-[320px] shrink-0", className)}>

            <TodosSection />

            <NotesSection />

        </div>
    )
}
