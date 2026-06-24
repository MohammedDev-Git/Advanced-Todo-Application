import type { MemberObject, MemberProject, projectContributionError } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, type ChangeEvent } from "react";
import { Edit, ExternalLink, Github, Plus, Trash, X } from "lucide-react";
import { InputError } from "../custom/InputError";
import { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema";
import { useDispatch } from "react-redux";
import { editMemberProject } from "@/features/members/membersSlice";

interface MemberProjectCardProps {
    member: MemberObject;
    project: MemberProject;
    projectsEditMode: boolean;
    setProjectsEditMode: (mode: boolean) => void;
    resetEditModes: () => void;
    deleteOneProjectModal: boolean;
    setDeleteOneProjectModal: (open: boolean) => void;
    setDeleteingProjectIdx: (idx: number) => void;
}

const MemberProjectCard = ({
    member,
    project,
    projectsEditMode,
    resetEditModes,
    setProjectsEditMode,
    setDeleteOneProjectModal,
    setDeleteingProjectIdx,
}: MemberProjectCardProps) => {

    const dispatch = useDispatch();

    const projectTitleRef = useRef<HTMLInputElement | null>(null);
    const projectDetailsRef = useRef<HTMLTextAreaElement | null>(null);
    const [tempProjectCategories, setTempProjectCategories] = useState<(string | undefined)[]>(project.category);
    const sourceCodeRef = useRef<HTMLInputElement | null>(null);
    const liveCodeRef = useRef<HTMLInputElement | null>(null);

    const [zodError, setZodError] = useState<projectContributionError | null>(null);

    const titleError = zodError?.title?._errors[0];
    const descriptionError = zodError?.description?._errors[0];
    const categoriesError = zodError?.category;
    const sourceCodeError = zodError?.sourceCode?._errors[0];
    const liveCodeError = zodError?.liveCode?._errors[0];

    const [errorKey, setErrorKey] = useState<number>(0);

    const handleAddTempCategory = () => {
        const newTempCategory = [...tempProjectCategories, ""];
        setTempProjectCategories(newTempCategory);
    }

    const handleRemoveTempCategory = (removedIndex: number) => {
        const newTempCategory = [...tempProjectCategories].filter((_, idx) => {
            return idx !== removedIndex;
        })
        setTempProjectCategories(newTempCategory);
    }

    const handleCategoryChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
        const newTempCategory = [...tempProjectCategories]
        newTempCategory[idx] = e.target.value;
        setTempProjectCategories(newTempCategory);
    }

    const handleProjectSave = () => {

        const data = {
            id: project.id,
            title: projectTitleRef.current?.value,
            description: projectDetailsRef.current?.value,
            category: tempProjectCategories,
            sourceCode: sourceCodeRef.current?.value,
            liveCode: liveCodeRef.current?.value,
        }

        const validationResult = projectContributionSchema.safeParse(data);
        if (!validationResult.success) {
            const error: projectContributionError | null = validationResult.error.format();
            if (error) {
                setErrorKey(p => p + 1);
                setZodError(error);
            }
            return;
        }

        const cleanedCategory = [...data.category].filter((text) => {
            return text?.trim() !== "";
        })

        data.category = cleanedCategory;

        setTempProjectCategories(data.category);
        dispatch(editMemberProject({ data, memberId: member.id }));
        setProjectsEditMode(false);


    }

    return (
        <div className="group p-4 md:p-6 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-primary/20 dark:hover:border-primary/50 transition-all">
            <div className={`flex gap-2 flex-col-reverse sm:flex-row justify-between sm:${projectsEditMode ? "items-end" : "items-center"} mb-3`}>
                {
                    projectsEditMode ?
                        <div>
                            <Label>
                                Title
                            </Label>
                            <Input
                                ref={projectTitleRef}
                                defaultValue={project.title}
                                placeholder='enter a title'
                            />
                            <InputError keyErr={errorKey} message={titleError} />
                        </div>
                        :
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            {project?.title || "Untitled Project"}
                        </h3>
                }
                <div className="flex gap-3 items-center text-gray-400 dark:text-gray-500">
                    {
                        projectsEditMode ?
                            <>
                                <Button
                                    onClick={() => {
                                        setProjectsEditMode(false);
                                    }}
                                    className="text-white">
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleProjectSave();
                                    }}
                                    className="text-white">
                                    Save
                                </Button>
                            </>
                            :
                            <>
                                {
                                    project?.sourceCode &&
                                    <a href={project?.sourceCode} className='text-gray-400 hover:text-primary transition-colors' target="_blank">
                                        <Github className='size-5' />
                                    </a>
                                }
                                {
                                    project?.liveCode &&
                                    <a href={project?.liveCode} className='text-gray-400 hover:text-primary transition-colors' target="_blank">
                                        <ExternalLink className='size-5' />
                                    </a>
                                }
                                <Button
                                    onClick={() => {
                                        resetEditModes();
                                        setProjectsEditMode(true);
                                        setZodError(null);
                                    }}
                                    className="bg-transparent hover:bg-transparent text-gray-400 hover:text-primary size-6">
                                    <Edit className='size-5' />
                                </Button>

                                <Button
                                    onClick={() => {
                                        setDeleteOneProjectModal(true);
                                        const projectIdx = member.projects.findIndex((pr) => pr === project);
                                        setDeleteingProjectIdx(projectIdx);
                                    }}
                                    className="bg-transparent hover:bg-transparent text-gray-400 hover:text-primary size-6">
                                    <Trash className='size-5' />
                                </Button>
                            </>

                    }
                </div>
            </div>
            {
                projectsEditMode ?
                    <div className='mb-5'>
                        <Label>
                            Project details
                        </Label>
                        <Textarea
                            ref={projectDetailsRef}
                            defaultValue={project.description}
                            placeholder='Describe your work'
                        />
                        <InputError keyErr={errorKey} message={descriptionError} />
                    </div>
                    :
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                        {project?.description || "No description provided for this project."}
                    </p>
            }

            <div>
                {
                    projectsEditMode ?
                        <Label className="mb-2 block">
                            Categories
                        </Label>
                        :
                        <></>
                }
                <div className={`${projectsEditMode ? "grid sm:grid-cols-3 lg:grid-cols-2" : "flex flex-wrap"} gap-2`}>
                    {
                        projectsEditMode ?
                            <>
                                {tempProjectCategories.map((category, idx) => {
                                    return (
                                        <div key={idx} className="flex flex-col items-start">
                                            <div className="relative w-full">
                                                <Input
                                                    id={`skill-${idx}`}
                                                    className="h-6 placeholder-red-200 px-3 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                                                    value={category}
                                                    onChange={(e) => {
                                                        handleCategoryChange(idx, e);
                                                    }}
                                                />
                                                {
                                                    <Button
                                                        onClick={() => {
                                                            handleRemoveTempCategory(idx);
                                                        }}
                                                        className="absolute top-1/2 right-0 rounded-full size-3 bg-primary/20 h-full -translate-y-1/2 flex justify-center items-center"
                                                    >
                                                        <X className="text-white size-3" />
                                                    </Button>
                                                }
                                            </div>
                                            <InputError className='text-xs!' keyErr={errorKey} message={categoriesError?.[idx]?._errors[0]} />
                                        </div>
                                    )
                                })}
                                {
                                    tempProjectCategories.length < 9 &&
                                    <Button
                                        onClick={handleAddTempCategory}
                                        className="h-6 flex justify-center items-center border-2 border-dotted border-primary dark:border-primary bg-primary/20 dark:bg-primary/20 hover:bg-primary/50 hover:dark:bg-primary/50">
                                        <Plus className="text-primary size-3" />
                                    </Button>
                                }
                            </>
                            :
                            <>
                                {project?.category?.map((tag, idx) => {
                                    return tag ?
                                        <span key={idx} className="hover:border-primary dark:hover:border-primary transition-all px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs font-medium rounded-md border border-gray-100 dark:border-slate-700">
                                            {tag}
                                        </span>
                                        :
                                        <span key={idx} className="px-3 w-fit py-1 bg-primary/10 text-gray-400 dark:text-gray-500 text-xs font-medium rounded-md border border-gray-100 dark:border-slate-700">
                                            No categories yet
                                        </span>
                                })}
                            </>
                    }
                </div>
            </div>
            {
                projectsEditMode ?
                    <div className="flex mt-2 flex-col gap-2">
                        <div>
                            <Label>
                                Source Code
                            </Label>
                            <Input
                                ref={sourceCodeRef}
                                className="h-8"
                                defaultValue={project.sourceCode}
                                placeholder="eg. github code link"
                            />
                            <InputError keyErr={errorKey} message={sourceCodeError} />
                        </div>
                        <div>
                            <Label>
                                Live Code
                            </Label>
                            <Input
                                ref={liveCodeRef}
                                className="h-8"
                                defaultValue={project.liveCode}
                                placeholder="eg. website link"
                            />
                            <InputError keyErr={errorKey} message={liveCodeError} />
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default MemberProjectCard