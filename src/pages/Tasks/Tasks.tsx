import { Search, MoreHorizontal, Plus } from 'lucide-react';
import { ProjectsList } from '@/components/Dashboard/ProjectsList';
import ProgressModal from '@/components/projects/ProgressModal';

export default function Tasks() {

    const folders = [
        { label: 'Team projects', color: 'bg-pink-500' },
        { label: 'Collabrations', color: 'bg-emerald-500' },
        { label: 'Personal Projects', color: 'bg-amber-500' }
    ]

    return (
        <div className="min-h-screen space-y-12 animate-page relative ">
            {/* Search Header */}
            <div className="bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
                <input type="text" placeholder="Search Task" className="bg-transparent outline-none w-full text-sm text-slate-600 dark:text-slate-300" />
            </div>

            {/* Top 3 Projects */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-slate-200">Top 3 Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {folders.map((folder, i) => (
                        <div key={i} className="relative pt-4">
                            <div
                                className="bg-white dark:bg-card folder-shape p-6 pt-10 shadow-sm dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 ${folder.color} rounded-lg flex items-center justify-center shadow-inner`}>
                                            <div className="w-3.5 h-3.5 bg-white/40 dark:bg-gray-800/40 rounded-sm" />
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{folder.label}</span>
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
            </section>

            {/* Main Projects Section */}
            <section className="space-y-6">
                <ProjectsList title="All Projects" />
            </section>

            {/* Floating Action Button */}
            <button className="animate-fade-in cursor-pointer sticky bottom-4 left-4 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
            </button>

            <ProgressModal />
        </div>
    );
};

