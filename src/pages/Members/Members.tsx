import AddMemberModal from '@/components/Members/MemberModal/AddMemberModal';
import DeleteMemberModal from '@/components/Members/MemberModal/DeleteMemberModal';
import { MembersList } from '@/components/Members/MembersList';
import RecentMembersCards from '@/components/Members/RecentMembersCards';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Members() {

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const [deletedId, setDeletedId] = useState<string>("");

    const [addMemberOpen, setAddMemberOpen] = useState<boolean>(false);

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
                <RecentMembersCards setAddOpen={setAddMemberOpen} setDeleteOpen={setDeleteOpen} setDeletedId={setDeletedId} />
            </section>

            {/* All Members Section */}
            <section className="space-y-6">
                <MembersList setAddOpen={setAddMemberOpen} setDeleteOpen={setDeleteOpen} setDeletedId={setDeletedId} />
            </section>

            <AddMemberModal open={addMemberOpen} setOpen={setAddMemberOpen} />
            <DeleteMemberModal open={deleteOpen} onOpenChange={setDeleteOpen} deletedId={deletedId} setDeletedId={setDeletedId} />

        </div>
    );
};
