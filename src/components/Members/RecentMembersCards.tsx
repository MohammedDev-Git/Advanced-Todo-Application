import { MoreHorizontal, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectMembers } from '@/features/members/membersSlice'
import { Button } from '@/components/ui/button'
import type { MemberObject } from '@/types'
import { formatDate } from 'date-fns'
import { useNavigate } from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RecentMembersCardsProps {
    setAddOpen: (open: boolean) => void;
    setDeleteOpen: (open: boolean) => void;
    setDeletedId: (id: string) => void;
}

const RecentMembersCards = ({ setAddOpen, setDeleteOpen, setDeletedId }: RecentMembersCardsProps) => {
    const navigate = useNavigate();
    const members = useSelector(selectMembers);
    const recentMembers = members.length ? members.slice(-3) : [];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {

                    recentMembers.map((member: MemberObject) => {
                        const createdDate = formatDate(member.createdAt, "dd/MM/yyyy")
                        return (
                            <div key={member.id} className="relative group overflow-hidden">
                                <div
                                    className="bg-white dark:bg-card p-6 shadow-sm border-none hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <img className='size-12 rounded-full' src={member.avatar} />
                                            <span className="font-semibold text-slate-700 dark:text-slate-200">{member.personalDetails.name || 'Member'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                                        <span>joined {createdDate}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="border-0 outline-0">
                                                <MoreHorizontal className="h-5 w-5 cursor-pointer text-slate-300 dark:text-slate-400" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-white dark:bg-card mr-9">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem onClick={() => navigate(`/profile/${member.id}`)} className="cursor-pointer">
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive" onClick={() => {
                                                        setDeleteOpen(true);
                                                        setDeletedId(member.id);
                                                    }} className="cursor-pointer">
                                                        Delete Member
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="glow transition-all group-hover:shadow-[0_0_320px_50px] group-hover:shadow-primary bg-transparent absolute right-0 bottom-0"></div>
                            </div>
                        )
                    })
                }
                {
                    Array.from({ length: 3 - recentMembers.length }).map((_, idx) => (
                        <div key={idx} className="relative">
                            <Button onClick={() => setAddOpen(true)} className="w-full p-6 shadow-sm bg-primary/30 hover:bg-primary/50 transition-all flex items-center justify-center h-full rounded-3xl">
                                <div className="h-11 w-11 rounded-full bg-white text-primary shadow-sm flex items-center justify-center hover:bg-slate-100">
                                    <Plus className="h-5 w-5" />
                                </div>
                            </Button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default RecentMembersCards