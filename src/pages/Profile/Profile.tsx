import { InfoCard } from "@/components/Profile/InfoCard";
import { ProjectsSection } from "@/components/Profile/ProjectsSection";
import { selectMembers } from "@/features/members/membersSlice";
import { Clock, Tag, PenLine } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { format, formatDistanceToNowStrict } from "date-fns";

export default function Profile() {

    const { id } = useParams();

    const members = useSelector(selectMembers);

    const member = members.find(m => m.id === id);

    const createDate = format(member?.createdAt || new Date(), "dd MMM yyyy");
    const createExactDate = format(member?.createdAt || new Date(), "dd MMM yyyy, hh:mm a");
    const lastOnline = formatDistanceToNowStrict(member?.createdAt || new Date(), { addSuffix: true });

    return (
        <div className="flex flex-col gap-8 p-0 animate-page max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="relative w-full rounded-3xl overflow-hidden p-6 md:p-10 min-h-75 flex flex-col justify-end bg-linear-to-br from-primary/70 via-primary/50 to-primary/20">
                {/* Top Actions (optional placeholder for aesthetics, assumed from context) */}

                <div className="flex flex-col justify-between items-start md:items-center gap-6 z-10">
                    {/* Avatar & Title */}
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <img src={member?.avatar} alt={member?.personalDetails?.name?.[0]} className="w-18 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-1 text-white">
                            <h2 className="text-3xl font-bold tracking-tight text-black/80 dark:text-white">{member?.personalDetails.name}</h2>
                            <p className=" font-medium text-sm text-black/80 dark:text-white">{member?.personalDetails.role}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 text-white/90 w-full md:w-auto mt-4 md:mt-0 items-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white mix-blend-overlay">Created</span>
                            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">{createDate}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white  mix-blend-overlay">Closest Deadline</span>
                            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">02 Jun, 04:01 PM</span>
                        </div>
                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white  mix-blend-overlay">online status</span>
                            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">{lastOnline === "0 seconds ago" ? "Online" : lastOnline}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-20 px-4 md:px-2">

                {/* Left Column: Metadata */}
                <div className="flex flex-col gap-y-7 justify-start">
                    {/* Created At */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Created At</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{createExactDate}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Tag className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Tags</span>
                        </div>

                        <div className="flex flex-wrap gap-2  justify-start lg:justify-start">
                            {
                                member?.skillsAndSocials?.stackAndLinks?.stack.map((tech, idx) => (
                                    idx < 3 &&
                                    <span key={idx} className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold">{tech}</span>
                                ))
                            }
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-x-5  gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Email</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{member?.personalDetails?.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">phone</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{member?.personalDetails?.phone || "Not Included"}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">rating</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{member?.rating?.avgRating?.toFixed(1) || "Not rated"}</span>
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Bio</h3>
                    </div>
                    <div className="relative group">
                        <p className="text-muted-foreground leading-relaxed text-[15px]">
                            {member?.description?.text || "No Bio provided."}
                            <button className="ml-2 inline-flex items-center gap-2 mt-2 text-foreground/80 hover:text-foreground transition-colors font-medium">
                                <PenLine className="w-4 h-4" />
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Projects And Skills */}
            <div>
                <div className="mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 items-start">

                    <div className="w-full lg:col-span-8">
                        <ProjectsSection member={member} />
                    </div>

                    <div className="w-full lg:col-span-4 lg:sticky top-30">
                        <InfoCard member={member}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
