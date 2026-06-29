import AddMemberModal from '@/components/Members/MemberModal/AddMemberModal';
import DeleteMemberModal from '@/components/Members/MemberModal/DeleteMemberModal';
import { MembersList } from '@/components/Members/MembersList';
import RecentMembersCards from '@/components/Members/RecentMembersCards';
import MembersSearchDropdown from '@/components/Members/MembersSearchDropdown';
import { selectMembers } from '@/features/members/membersSlice';
import { useInput } from '@/hooks/useInput';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Members() {

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const [deletedId, setDeletedId] = useState<string>("");

    const [addMemberOpen, setAddMemberOpen] = useState<boolean>(false);

    const members = useSelector(selectMembers);

    const searchQuery = useInput("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    useEffect(() => {

        const id = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery.value);
        }, 500);

        return () => clearTimeout(id);

    }, [searchQuery.value])

    const filteredMembers = members.filter((mem) => {
        return mem.personalDetails.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    })

    return (
        <div className="space-y-12 animate-page">
            {/* Search Header */}
            <div className="relative bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
                <input
                    value={searchQuery.value}
                    onChange={(e) => {
                        searchQuery.onChange(e);
                    }}
                    type="text"
                    placeholder="Search Member"
                    className="bg-transparent outline-none w-full text-sm text-slate-600 dark:text-slate-300"
                    onFocus={() => {
                        setTimeout(() => {
                            setShowDropDown(true);
                        }, 100);
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setShowDropDown(false);
                        }, 100);
                    }}
                />
                {
                    showDropDown &&
                    <MembersSearchDropdown members={filteredMembers} query={debouncedSearchQuery} />
                }
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
