import { MoreHorizontal } from 'lucide-react'

const RecentMembersCards = () => {
    const members = [
        { label: 'Member1', color: 'bg-pink-500' },
        { label: 'Member2', color: 'bg-emerald-500' },
        { label: 'Member3', color: 'bg-amber-500' }
    ]

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {members.map((member, idx) => (
                    <div key={idx} className="relative pt-4">
                        <div
                            className="bg-white dark:bg-card prism-shape p-6 pt-10 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 ${member.color} rounded-lg flex items-center justify-center shadow-inner`}>
                                        <div className="w-3.5 h-3.5 bg-white/40 dark:bg-gray-800/40 rounded-sm" />
                                    </div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{member.label}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                                <span>Apr 2, 2023</span>
                                <MoreHorizontal className="h-5 w-5 text-slate-300 dark:text-slate-400" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RecentMembersCards