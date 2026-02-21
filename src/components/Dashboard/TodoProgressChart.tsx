import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { selectTodos } from "@/features/todos/todosSlice"
import { useSelector } from "react-redux"

export function TodoProgressChart() {

    const todos = useSelector(selectTodos);

    const completedTodos = todos.filter((todo) => todo.isCompleted);

    let percentage = Number(((completedTodos.length / todos.length) * 100).toFixed(0));

    if (isNaN(Number(percentage))) {
        percentage = 0;
    }

    return (
        <Card className="col-span-1 border-0 shadow-none bg-foreground text-primary-foreground rounded-3xl overflow-hidden relative">
            <CardHeader className="pb-0 relative px-6">
                <CardTitle className="text-base font-semibold text-white text-center">Todo Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-40 relative p-0">
                <div className="absolute inset-0 flex items-center justify-center gap-4 pl-0">
                    {/* Circular Indicator */}
                    <div className="relative h-24 w-24 shrink-0">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="56" fill="none" stroke="#2D3A52" strokeWidth="10" />
                            <circle cx="64" cy="64" r="56" fill="none" stroke="#6366F1" strokeWidth="10" strokeDasharray="351.6" strokeDashoffset={355 - (Number(percentage) * (355 / 100))} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold">
                                {percentage}%
                            </span>
                        </div>
                    </div>

                    {/* Stats Text */}
                    <div className="flex flex-col whitespace-nowrap">
                        <span className="text-lg font-bold">{completedTodos.length}/{todos.length}</span>
                        <span className="text-xs text-slate-400">Tasks</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
