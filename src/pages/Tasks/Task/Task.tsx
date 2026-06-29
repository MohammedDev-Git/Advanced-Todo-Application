import {
    Search,
    Users,
    Clock,
    PenLine,
    Edit,
    X,
    Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks, editTaskTitle, editTaskCategories, editTaskDescription } from "@/features/tasks/tasksSlice";
import { selectMembers } from "@/features/members/membersSlice";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import EditTaskThumbnailModal from "@/components/Tasks/EditTaskThumbnailModal";
import AssignMemberTaskModal from "@/pages/Tasks/Task/AssignMemberTaskModal";
import { taskDetailsSchema } from "@/features/tasks/schemas/taskSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useError } from "@/hooks/useError";
import { InputError } from "@/components/custom/InputError";
import EditDeadlineModal from "@/pages/Tasks/Task/EditDeadlineModal";
import type { taskObject } from "@/types";

const Task = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const members = useSelector(selectMembers);
    const task = useSelector(selectAllTasks).find((task: taskObject) => task.id === id);

    const tasksByUserIdArr = Object.entries(task?.tasksByUserId || {});

    const [editThumbnailModalOpen, setEditThumbnailModalOpen] = useState<boolean>(false);
    const [titleEditMode, setTitleEditMode] = useState<boolean>(false);
    const [categoriesEditMode, setCategoriesEditMode] = useState<boolean>(false);
    const [descriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [deadlineModalOpen, setDeadlineModalOpen] = useState<boolean>(false);
    const [assignTaskModalOpen, setAssignTaskModalOpen] = useState<boolean>(false);
    const [selectedMemberId, setSelectedMemberId] = useState<string>("");

    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);
    const [categoriesValue, setCategoriesValue] = useState<string[]>([""]);
    const [categoryErrors, setCategoryErrors] = useState<(string | undefined)[]>([]);

    const titleError = useError(undefined);
    const descriptionError = useError(undefined);
    const deadlineError = useError(undefined);
    const [errorKey, setErrorKey] = useState<number>(0);

    useEffect(() => {
        if (deadlineModalOpen) {
            const taskDeadlineDate = new Date(task ? task.deadline : new Date().toISOString());
            setDeadlineDate(taskDeadlineDate);
        }
    }, [deadlineModalOpen])

    useEffect(() => {
        if (!task) return;
        setTitleValue(task.title);
        setDescriptionValue(task.description);
        setCategoriesValue(task.categories.length > 0 ? task.categories : [""]);
        setDeadlineDate(task.deadline ? new Date(task.deadline) : undefined);
    }, [task]);

    const existingFilteredCategories = task?.categories.filter((cat) => cat.trim() !== "") || [];

    const resetEditModes = () => {
        setTitleEditMode(false);
        setCategoriesEditMode(false);
        setDescriptionEditMode(false);
        setDeadlineModalOpen(false);
        if (task) setTitleValue(task.title);
    };

    const handleTitleEdit = () => {
        if (!task) return;

        const data = {
            title: titleValue.trim(),
            categories: task.categories,
            description: task.description,
            deadline: task.deadline,
        };

        const validationResult = taskDetailsSchema.safeParse(data);

        if (!validationResult.success) {
            const formatted = validationResult.error.format();
            setErrorKey((pre) => pre + 1);
            titleError.setErrorMsg(formatted.title?._errors[0]);
            return;
        }

        dispatch(editTaskTitle({ taskId: task.id, title: data.title }));
        setTitleEditMode(false);
    };

    const handleCategoriesEdit = () => {
        if (!task) return;

        const data = {
            title: task.title,
            categories: categoriesValue,
            description: task.description,
            deadline: task.deadline,
        };

        const validationResult = taskDetailsSchema.safeParse(data);

        if (!validationResult.success) {
            const formatted = validationResult.error.format();
            setErrorKey((pre) => pre + 1);
            const errors = categoriesValue.map((_, index) => {
                const itemError = formatted.categories?.[index]?._errors?.[0];
                return itemError ? String(itemError) : undefined;
            });
            setCategoryErrors(errors);
            return;
        }

        setCategoryErrors([]);
        const filteredCategories = categoriesValue.filter((cat) => cat.trim() !== "");
        dispatch(editTaskCategories({ taskId: task.id, categories: filteredCategories }));
        setCategoriesEditMode(false);
    };

    const handleDescriptionEdit = () => {
        if (!task) return;

        const data = {
            title: task.title,
            categories: task.categories,
            description: descriptionValue.trim(),
            deadline: task.deadline,
        };

        const validationResult = taskDetailsSchema.safeParse(data);

        if (!validationResult.success) {
            const formatted = validationResult.error.format();
            setErrorKey((pre) => pre + 1);
            descriptionError.setErrorMsg(formatted.description?._errors[0]);
            return;
        }

        dispatch(editTaskDescription({ taskId: task.id, description: data.description }));
        setDescriptionEditMode(false);
    };

    const handleAddCategory = () => {
        if (categoriesValue.length >= 6) {
            setErrorKey((pre) => pre + 1);
            return;
        }

        setCategoriesValue((prev) => [...prev, ""]);
        setCategoryErrors((prev) => [...prev, undefined]);
    };

    const handleRemoveCategory = (index: number) => {
        if (categoriesValue.length <= 1) return;
        setCategoriesValue((prev) => prev.filter((_, idx) => idx !== index));
        setCategoryErrors((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleOpenAssignTaskModal = (memberId: string) => {
        resetEditModes();
        setSelectedMemberId(memberId);
        setAssignTaskModalOpen(true);
    };

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
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm overflow-hidden">
                {task?.thumbnail ? (
                    <div className="relative">
                        <img src={task.thumbnail} className="w-full h-88 object-cover" draggable="false" />
                        <div
                            onClick={() => {
                                resetEditModes();
                                setEditThumbnailModalOpen(true);
                            }}
                            className="overlay cursor-pointer bg-black opacity-50 absolute inset-0 size-full"
                        />
                        <Button
                            onClick={() => {
                                resetEditModes();
                                setEditThumbnailModalOpen(true);
                            }}
                            className="absolute right-0 bottom-0 rounded-tl-4xl! text-white rounded-none"
                        >
                            <Edit />
                        </Button>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            resetEditModes();
                            setEditThumbnailModalOpen(true);
                        }}
                        className="h-88 p-4 w-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer"
                    >
                        <div className="border-2 gap-2 rounded-2xl border-primary border-dashed h-40 w-64 flex flex-col items-center justify-center">
                            <Edit className="text-primary size-10" />
                            <span className="text-primary">Add a thumbnail</span>
                        </div>
                    </div>
                )}

                <div className="p-5 sm:p-6 space-y-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-end gap-4 flex-wrap">
                            <div>
                                {titleEditMode ? (
                                    <div className="space-y-3">
                                        <Label htmlFor="task-title">Title</Label>
                                        <Input
                                            id="task-title"
                                            placeholder="Enter task title"
                                            value={titleValue}
                                            onChange={(e) => setTitleValue(e.target.value)}
                                            className="md:w-60 lg:w-80 transition-all"
                                        />
                                        <InputError keyErr={errorKey} message={titleError.errorMsg} />

                                    </div>
                                ) : (
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                                        {task?.title}
                                    </h2>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {titleEditMode ? (
                                    <>
                                        <Button type="button" variant="outline" onClick={() => setTitleEditMode(false)}>
                                            Close
                                        </Button>
                                        <Button className="text-white" type="button" onClick={handleTitleEdit}>
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            titleError.setErrorMsg(undefined);
                                            resetEditModes();
                                            setTitleEditMode(true);
                                        }}
                                        className="text-xs"
                                    >
                                        <PenLine className="size-4 text-white" />
                                    </Button>
                                )}
                            </div>
                        </div>


                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {!categoriesEditMode && (
                                    <>
                                        {task?.categories.map((cat, idx) => (
                                            cat ? (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs font-medium px-2.5 py-0.5 rounded-md"
                                                >
                                                    {cat}
                                                </Badge>
                                            ) : null
                                        ))}
                                        <Button
                                            type="button"
                                            className="text-xs font-semibold text-white transition-all"
                                            onClick={() => {
                                                setCategoryErrors([]);
                                                resetEditModes();
                                                setCategoriesValue(existingFilteredCategories.length > 0 ? existingFilteredCategories : [""]);
                                                setCategoriesEditMode(true);
                                            }}
                                        >
                                            {existingFilteredCategories.length === 0 ? (
                                                <>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="ml-2">Add tags</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PenLine className="size-4" />
                                                    <span className="ml-2">Edit tags</span>
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </div>
                            {categoriesEditMode && (
                                <div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {categoriesValue.map((category, index) => (
                                            <div key={index} className="relative min-w-24">
                                                <div className="relative">

                                                    <Input
                                                        placeholder={`Category ${index + 1}`}
                                                        value={category}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setCategoriesValue((prev) => {
                                                                const next = [...prev];
                                                                next[index] = value;
                                                                return next;
                                                            });
                                                            setCategoryErrors((prev) => {
                                                                const next = [...prev];
                                                                next[index] = undefined;
                                                                return next;
                                                            });
                                                        }}
                                                        className="pr-8 transition-all h-8 w-full "
                                                    />

                                                    {categoriesValue.length > 1 ? (
                                                        <Button
                                                            type="button"
                                                            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-transparent text-destructive hover:bg-destructive/10"
                                                            onClick={() => handleRemoveCategory(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    ) : null}
                                                </div>

                                                <InputError keyErr={errorKey + index} message={categoryErrors[index]} />
                                            </div>
                                        ))}
                                        {
                                            categoriesValue.length < 6 && (
                                                <Button type="button" size="sm" className="text-white bg-primary/50 border-2 border-dotted border-primary" onClick={handleAddCategory}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )
                                        }
                                    </div>
                                    <div className="flex items-center gap-2 my-3">
                                        <Button type="button" variant="outline" onClick={() => { setCategoriesEditMode(false); setTitleValue(task?.title || ""); }}>
                                            Close
                                        </Button>
                                        <Button className="text-white" type="button" onClick={handleCategoriesEdit}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{tasksByUserIdArr.length} {tasksByUserIdArr.length === 1 ? "Member" : "Members"} Involved</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <div className="flex items-center gap-2">
                                <span>{task?.deadline ? "Due " + format(new Date(task.deadline), "dd-MMM-yy") : "No deadline"}</span>
                                <Button
                                    type="button"
                                    className="text-xs"
                                    onClick={() => {
                                        deadlineError.setErrorMsg(undefined);
                                        resetEditModes();
                                        setDeadlineModalOpen(true);
                                    }}
                                >
                                    <PenLine className="size-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    <section className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h2 className="text-base sm:text-lg font-bold text-foreground">Description</h2>
                            {!descriptionEditMode && (
                                <Button
                                    type="button"
                                    className="text-xs"
                                    onClick={() => {
                                        descriptionError.setErrorMsg(undefined);
                                        resetEditModes();
                                        setDescriptionEditMode(true);
                                    }}
                                >
                                    <PenLine className="text-white size-4" />
                                </Button>
                            )}
                        </div>
                        {descriptionEditMode ? (
                            <div className="space-y-3">
                                <Textarea
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                    className="min-h-32 max-h-64 transition-all"
                                    placeholder="Describe your task requirements"
                                />
                                <InputError keyErr={errorKey} message={descriptionError.errorMsg} />
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setDescriptionValue(task?.description || "");
                                            setDescriptionEditMode(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                    <Button className="text-white" type="button" onClick={handleDescriptionEdit}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground leading-relaxed">{task?.description || "No Description"}</p>
                        )}
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">Members tasks</h2>
                        <div className="grid gap-3">
                            {task ? (
                                tasksByUserIdArr.map(([memberId, memberTasks]) => {
                                    const member = members.find((mem) => mem.id === memberId);
                                    return (
                                        <button
                                            key={memberId}
                                            type="button"
                                            onClick={() => handleOpenAssignTaskModal(memberId)}
                                            className="cursor-pointer group w-full rounded-3xl border border-border p-4 text-left transition hover:border-primary hover:bg-primary/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={member?.avatar}
                                                    alt={member?.personalDetails.name || "Member avatar"}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground truncate">{member?.personalDetails.name || "Unnamed member"}</p>
                                                    <p className="text-xs text-muted-foreground">{memberTasks.length ? `${memberTasks.length} task${memberTasks.length === 1 ? "" : "s"}` : "No tasks yet"}</p>
                                                </div>
                                            </div>
                                            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                                {memberTasks.length ? (
                                                    [...memberTasks].map((taskItem, idx) => (
                                                        <p key={idx}>- {taskItem}</p>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No tasks assigned</p>
                                                )}
                                            </ul>
                                        </button>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </section>
                </div>
            </div >

            <EditTaskThumbnailModal
                activeImage={task?.thumbnail}
                taskId={task?.id}
                open={editThumbnailModalOpen}
                setOpen={setEditThumbnailModalOpen}
            />

            <EditDeadlineModal
                deadlineDate={deadlineDate}
                setDeadlineDate={setDeadlineDate}
                deadlineModalOpen={deadlineModalOpen}
                setDeadlineModalOpen={setDeadlineModalOpen}
                task={task}
            />

            <AssignMemberTaskModal
                open={assignTaskModalOpen}
                setOpen={setAssignTaskModalOpen}
                taskId={task?.id}
                memberId={selectedMemberId}
                resetEditModes={resetEditModes}
            />

        </div >
    );
};

export default Task;