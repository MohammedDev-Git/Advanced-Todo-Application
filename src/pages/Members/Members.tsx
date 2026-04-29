import AddMemberModal from '@/components/Members/MemberModal/AddMemberModal';
import { MembersList } from '@/components/Members/MembersList';
import RecentMemberCard from '@/components/Members/RecentMembersCards';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Members() {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="space-y-12 animate-page">
            {/* Search Header */}
            <div className="bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
                <input type="text" placeholder="Search Member" className="bg-transparent outline-none w-full text-sm text-slate-600 dark:text-slate-300" />
            </div>

            {/* Recent Members */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-slate-200">Recent Members</h2>
                <RecentMemberCard />
            </section>

            {/* All Members Section */}
            <section className="space-y-6">
                <MembersList />
            </section>

            {/* Floating Action Button */}
            <button
                onClick={() => setOpen(true)}
                className="animate-fade-in cursor-pointer sticky bottom-4 left-4 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
            </button>

            <AddMemberModal open={open} onOpenChange={setOpen} />

        </div>
    );
};
