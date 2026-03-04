import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSelector } from 'react-redux'
import { selectTodos } from '@/features/todos/todosSlice'

const chartConfig = {
    tasks: {
        label: "Tasks",
    },
} satisfies ChartConfig

export function TopMembersChart() {
    const completedTodosCount = useSelector(selectTodos).filter((todo) => todo.isCompleted).length;

    const chartData = [
        { member: "Ali", tasks: completedTodosCount, color: "#60A5FA" },
        { member: "Emad", tasks: 10, color: "#34D399" },
        { member: "Omar", tasks: 6, color: "#818CF8" },
        { member: "Ahmed", tasks: 1, color: "#34D399" }
    ]

    return (
        <Card className="col-span-1 border-0 shadow-none bg-white dark:bg-card rounded-3xl p-6 xl:px-4 xl:py-4 h-full flex flex-col">
            <CardHeader className="p-0 pb-6 xl:pb-4 xl:px-2">
                <CardTitle className="text-base font-semibold">Top Members Tasks</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 w-full p-0 relative min-h-[250px]">
                <ChartContainer config={chartConfig} className="absolute inset-0 w-full h-full pb-0 pr-6">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 0, bottom: 20, left: -20 }}
                        barSize={32}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="member"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                            ticks={[0, 5, 10]}
                            domain={[0, 10]}
                        />
                        <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="tasks"
                            radius={[6, 6, 6, 6]}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
