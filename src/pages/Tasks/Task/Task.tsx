import { useState, useRef } from "react";
import {
    Search,
    Users,
    Clock,
    Play,
    Pause,
    Maximize2,
    PictureInPicture2,
    Volume2,
    CheckCircle2,
    PenLine,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectAllTasks } from "@/features/tasks/tasksSlice";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

const assessmentItems = [
    "Understanding the tools in Figma",
    "Understand the basics of making designs",
    "Designing a mobile application using figma",
    "Presenting the design flow",
];

function VideoPlayer() {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0.387);
    const totalSeconds = 600;
    const currentSeconds = Math.round(progress * totalSeconds);
    const barRef = useRef<HTMLDivElement>(null);

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        setProgress(ratio);
    };

    return (
        <div className="relative w-full rounded-2xl overflow-hidden bg-black select-none">
            {/* Thumbnail */}
            <div className="w-full aspect-video bg-linear-to-br from-slate-700 to-slate-900 relative">
                {/* Mock thumbnail image using CSS */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "url('https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80') center/cover no-repeat",
                    }}
                />

                {/* Dark overlay when paused */}
                {!playing && (
                    <div className="absolute inset-0 bg-black/20" />
                )}
            </div>

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
                {/* Progress bar */}
                <div
                    ref={barRef}
                    className="w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group"
                    onClick={seek}
                >
                    <div
                        className="h-full bg-white rounded-full relative"
                        style={{ width: `${progress * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Bottom controls */}
                <div className="flex items-center justify-between">
                    {/* Left: play + time */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPlaying((p) => !p)}
                            className="text-white hover:text-white/80 transition-colors"
                        >
                            {playing ? (
                                <Pause className="w-5 h-5 fill-white" />
                            ) : (
                                <Play className="w-5 h-5 fill-white" />
                            )}
                        </button>
                        <span className="text-white text-xs font-medium tracking-wide">
                            {formatTime(currentSeconds)}/{formatTime(totalSeconds)}
                        </span>
                    </div>

                    {/* Right: extra controls */}
                    <div className="flex items-center gap-3 text-white">
                        <button className="hover:text-white/80 transition-colors">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-white/80 transition-colors">
                            <PictureInPicture2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-white/80 transition-colors">
                            <Volume2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Task = () => {

    const { id } = useParams();

    const task = useSelector(selectAllTasks).find((task) => task.id === id);

    return (
        <div className="animate-page space-y-8">
            {/* Search bar */}
            <div className="bg-white dark:bg-card rounded-xl border border-border px-4 py-2.5 flex items-center shadow-sm">
                <input
                    type="text"
                    placeholder="Search Task"
                    className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
                />
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>

            {/* Main content card */}
            <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                {/* Video player */}
                <VideoPlayer />

                {/* Text content */}
                <div className="p-5 sm:p-6 space-y-5">
                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                        {task?.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                        {
                            task?.categories.map((cat, idx) => (
                                cat &&
                                <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs font-medium px-2.5 py-0.5 rounded-md"
                                >
                                    {cat}
                                </Badge>
                            )
                            )
                        }
                        <Button className="text-xs font-semibold text-white transition-all">
                            <PenLine className="size-4" />
                            Edit / Add tag
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{task?.associatedMembersIDs.length} {task?.associatedMembersIDs.length === 1 ? "Member" : "Members"} Involved</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span> {task ? "Due " + format(new Date(task.deadline), "dd-MMM-yy") : "No deadline"}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-border" />

                    {/* Description */}
                    <section className="space-y-2">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                            Description
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {task?.description || "No Description"}
                        </p>
                    </section>

                    {/* Divider */}
                    <hr className="border-border" />

                    {/* Essence of Assessment */}
                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                            Essence of Assessment
                        </h2>
                        <ul className="space-y-3">
                            {assessmentItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-px" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Task;