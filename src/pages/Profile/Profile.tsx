import { InfoCard } from "@/components/Profile/InfoCard";
import { ProjectsSection } from "@/components/Profile/ProjectsSection";
import { editDescription, editEmail, editNameAndRole, editPhone, selectMembers } from "@/features/members/membersSlice";
import { Clock, Tag, PenLine, Mail, Phone, Star, X, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import type { MemberObject } from "@/types";
import { Input } from "@/components/ui/input";
import { emailSchema, phoneSchema, roleAndNameSchema } from "@/features/members/schemas/personalDetailsSchema";
import { useError } from "@/hooks/useError";
import { InputError } from "@/components/custom/InputError";
import { Textarea } from "@/components/ui/textarea";
import { descriptionSchema } from "@/features/members/schemas/descriptionSchema";
import { Label } from "@/components/ui/label";
import DeleteProjectsModal from "@/components/Profile/DeleteProjectsModal";
import AddProjectModal from "@/components/Profile/AddProjectModal";
import DeleteOneProjectModal from "@/components/Profile/DeleteOneProjectModal";

export default function Profile() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const members = useSelector(selectMembers);

    const member = members.find((m: MemberObject) => m.id === id);

    const createDate = format(member?.createdAt || new Date(), "dd MMM yyyy");
    const createExactDate = format(member?.createdAt || new Date(), "dd MMM yyyy, hh:mm a");
    const lastOnline = formatDistanceToNowStrict(member?.createdAt || new Date(), { addSuffix: true });

    // modals
    const [deleteProjectsModalOpen, setDeleteProjectsModalOpen] = useState<boolean>(false);
    const [addProjectModalOpen, setAddProjectModalOpen] = useState<boolean>(false);
    const [deleteOneProjectModal, setDeleteOneProjectModal] = useState<boolean>(false);

    const [deletingProjectIdx, setDeleteingProjectIdx] = useState<number>(-1);

    // Refs 
    const nameInputRef = useRef<null | HTMLInputElement>(null);
    const roleInputRef = useRef<null | HTMLInputElement>(null);
    const descriptionRef = useRef<null | HTMLTextAreaElement>(null);
    const emailInputRef = useRef<null | HTMLInputElement>(null);
    const phoneInputRef = useRef<null | HTMLInputElement>(null);

    // Input Errors
    const [errorKey, setErrorKey] = useState<number>(0);

    const nameError = useError(undefined);
    const roleError = useError(undefined);
    const descriptionError = useError(undefined);
    const emailError = useError(undefined);
    const phoneError = useError(undefined);

    // Edit States
    const [headerEditMode, setHeaderEditMode] = useState<boolean>(false);
    const [descriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [emailEditMode, setEmailEditMode] = useState<boolean>(false);
    const [phoneEditMode, setPhoneEditMode] = useState<boolean>(false);
    const [stackEditMode, setStackEditMode] = useState<boolean>(false);
    const [langsEditMode, setLangsEditMode] = useState<boolean>(false);
    const [linksEditMode, setLinksEditMode] = useState<boolean>(false);
    const [projectsEditMode, setProjectsEditMode] = useState<boolean>(false);

    // Editing / Updating Functions

    const resetEditModes = () => {
        setHeaderEditMode(false);
        setDescriptionEditMode(false);
        setEmailEditMode(false);
        setPhoneEditMode(false);
        setStackEditMode(false);
        setLangsEditMode(false);
        setLinksEditMode(false);
        setProjectsEditMode(false);
    }

    const handleHeaderEdit = () => {
        const name = nameInputRef?.current?.value;
        const role = roleInputRef?.current?.value;

        const data = {
            name,
            role
        }

        const validationResult = roleAndNameSchema.safeParse(data);

        if (!validationResult.success) {
            const error = validationResult.error?.format();

            if (error) {
                setErrorKey((pre) => pre + 1);
                nameError.setErrorMsg(error.name?._errors[0]);
                roleError.setErrorMsg(error.role?._errors[0]);
            }

            return;
        }

        dispatch(editNameAndRole({ id, data }));
        setHeaderEditMode(false);
    }

    const handleDescriptionEdit = () => {
        const data = {
            text: descriptionRef.current?.value.trim(),
        }

        const validationResult = descriptionSchema.safeParse(data);

        if (!validationResult.success) {
            const error = validationResult.error.format();
            if (error) {
                setErrorKey((pre) => pre + 1);
                descriptionError.setErrorMsg(error.text?._errors[0]);
            }
            return;
        }

        dispatch(editDescription({ id, data }));
        setDescriptionEditMode(false);

    }

    const handleEmailEdit = () => {
        const data = {
            email: emailInputRef.current?.value.trim(),
        }

        const validationResult = emailSchema.safeParse(data);
        if (!validationResult.success) {
            const error = validationResult.error.format();
            if (error) {
                setErrorKey((pre) => pre + 1);
                emailError.setErrorMsg(error.email?._errors[0]);
            }
            return;
        }

        dispatch(editEmail({ id, data }));
        setEmailEditMode(false);

    }

    const handlePhoneEdit = () => {
        const data = {
            phone: phoneInputRef.current?.value.trim(),
        }

        const validationResult = phoneSchema.safeParse(data);
        if (!validationResult.success) {
            const error = validationResult.error.format();
            if (error) {
                setErrorKey((pre) => pre + 1);
                phoneError.setErrorMsg(error.phone?._errors[0]);
            }
            return;
        }

        dispatch(editPhone({ id, data }));
        setPhoneEditMode(false);
    }

    return (
        <div className="flex flex-col gap-8 p-0 animate-page max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="relative w-full rounded-3xl overflow-hidden p-6 md:p-10 min-h-75 flex flex-col justify-end bg-linear-to-br from-primary/70 via-primary/50 to-primary/20">

                {/* Header Edit Button */}
                {
                    headerEditMode ?
                        <div className="absolute top-4 right-4 flex gap-2 z-50">
                            <Button
                                onClick={() => {
                                    setHeaderEditMode(false);
                                }}
                                className="text-white">
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    handleHeaderEdit();
                                }}
                                className="text-white">
                                Save
                            </Button>
                        </div>
                        :
                        <Button
                            onClick={() => {
                                nameError.setErrorMsg(undefined);
                                roleError.setErrorMsg(undefined);
                                resetEditModes();
                                setHeaderEditMode(true);
                                setTimeout(() => {
                                    nameInputRef.current?.focus();
                                }, 0);
                            }}
                            className="absolute top-4 right-4">
                            <PenLine className="text-white" />
                        </Button>

                }

                <div className="flex flex-col justify-between items-start md:items-center gap-6 z-10">

                    {/* Avatar & Title */}
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <img src={member?.avatar} alt={member?.personalDetails?.name?.[0]} className="w-18 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-1 text-white">
                            {
                                headerEditMode ?
                                    <>
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" ref={nameInputRef} defaultValue={member?.personalDetails.name} />
                                        <InputError keyErr={errorKey} message={nameError.errorMsg} className="text-red-700! dark:text-red-100!" />
                                        <Label>Role</Label>
                                        <Input placeholder="Enter your role" ref={roleInputRef} defaultValue={member?.personalDetails.role} />
                                        <InputError keyErr={errorKey} message={roleError.errorMsg} className="text-red-700! dark:text-red-100!" />
                                    </>
                                    :
                                    <>
                                        <h2 className="text-3xl font-bold tracking-tight text-black/80 dark:text-white">{member?.personalDetails.name}</h2>
                                        <p className=" font-medium text-sm text-black/80 dark:text-white">{member?.personalDetails.role}</p>
                                    </>
                            }
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 text-white/90 w-full md:w-auto mt-4 md:mt-0 items-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white mix-blend-overlay">Joined</span>
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

                {/* Metadata */}
                <div className="flex flex-col gap-y-7 justify-start">
                    {/* Joined At */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Joined At</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{createExactDate}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Tag className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Top Tags</span>
                        </div>

                        <div className="flex flex-wrap gap-2  justify-start lg:justify-start">
                            {
                                member?.skillsAndSocials?.stackAndLinks?.stack.map((tech, idx: number) => (
                                    idx < 3 &&
                                    <span key={idx} className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold">{tech}</span>
                                ))
                            }
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-start flex-wrap">
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Email</span>
                        </div>
                        {
                            emailEditMode ?
                                <div className="flex flex-col gap-2">
                                    <Input
                                        placeholder="Enter your email"
                                        className="max-w-48"
                                        defaultValue={member?.personalDetails?.email}
                                        ref={emailInputRef}
                                    />
                                    <div>
                                        <InputError keyErr={errorKey} message={emailError.errorMsg} className="mb-2" />
                                        <div className="flex gap-2 items-center">
                                            <Button className="w-6 h-6 text-white" onClick={() => {
                                                setEmailEditMode(false)
                                            }}>
                                                <X className="w-6 h-6 text-white" />
                                            </Button>
                                            <Button className="w-6 h-6 text-white" onClick={() => {
                                                handleEmailEdit()
                                            }}>
                                                <Check className="w-6 h-6 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-foreground/80 font-medium">{member?.personalDetails?.email}</p>
                                        <Button
                                            onClick={() => {
                                                resetEditModes();
                                                emailError.setErrorMsg(undefined);
                                                setEmailEditMode(true);
                                                setTimeout(() => {
                                                    emailInputRef.current?.focus();
                                                }, 0);
                                            }}
                                            className="w-6 h-6 text-white">
                                            <PenLine className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                        }
                    </div>

                    {/* Phone */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-start gap-2">
                            <Phone className="w-5 h-5 opacity-70" />
                            <span className="font-medium">phone</span>
                            {
                                phoneEditMode ?
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            placeholder="Enter your phone number"
                                            className="max-w-48"
                                            defaultValue={member?.personalDetails?.phone}
                                            ref={phoneInputRef}
                                        />
                                        <div>
                                            <InputError keyErr={errorKey} message={phoneError.errorMsg} className="mb-2" />
                                            <div className="flex gap-2 items-center">
                                                <Button className="w-6 h-6 text-white" onClick={() => {
                                                    setPhoneEditMode(false)
                                                }}>
                                                    <X className="w-6 h-6 text-white" />
                                                </Button>
                                                <Button className="w-6 h-6 text-white" onClick={() => {
                                                    handlePhoneEdit()
                                                }}>
                                                    <Check className="w-6 h-6 text-white" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <span className="text-foreground/80 font-medium">{member?.personalDetails?.phone || "Not Included"}</span>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => {
                                                    resetEditModes();
                                                    phoneError.setErrorMsg(undefined);
                                                    setPhoneEditMode(true);
                                                    setTimeout(() => {
                                                        phoneInputRef.current?.focus();
                                                    }, 0);
                                                }}
                                                className="w-6 h-6 text-white">
                                                <PenLine className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </>
                            }
                        </div>

                    </div>

                    {/* Rating */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 opacity-70" />
                            <span className="font-medium">rating</span>
                        </div>
                        <span className="text-foreground/80 font-medium">{member?.rating?.avgRating?.toFixed(1) || "Not rated"}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4 lg:flex lg:justify-center">
                    <div className="lg:w-[70%]">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Bio</h3>
                        </div>
                        <div className="relative group flex flex-wrap gap-2 items-end">
                            {
                                descriptionEditMode ?
                                    <>
                                        <Textarea
                                            defaultValue={member?.description.text}
                                            placeholder="Tell the world about yourself"
                                            className="max-h-40 max-w-full"
                                            ref={descriptionRef}
                                        />
                                        <div>
                                            <InputError keyErr={errorKey} message={descriptionError.errorMsg} className="mb-2" />
                                            <div className="flex gap-2 items-end justify-start">
                                                <Button
                                                    onClick={() => {
                                                        setDescriptionEditMode(false);
                                                    }}
                                                    className="w-6 h-6 text-white">
                                                    <X className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleDescriptionEdit();
                                                    }}
                                                    className="w-6 h-6 text-white">
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <>
                                        <p className="break-all text-muted-foreground leading-relaxed text-[15px]">
                                            {member?.description?.text || "No Bio provided."}
                                        </p>
                                        <Button
                                            onClick={() => {
                                                resetEditModes();
                                                descriptionError.setErrorMsg(undefined);
                                                setDescriptionEditMode(true);
                                                setTimeout(() => {
                                                    descriptionRef.current?.focus();
                                                }, 0);
                                            }}
                                            className="w-6 h-6 text-white">
                                            <PenLine className="w-4 h-4" />
                                        </Button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects And Skills */}
            <div>
                <div className="mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 items-start">

                    <div className="w-full lg:col-span-8">
                        <ProjectsSection
                            setDeleteingProjectIdx={setDeleteingProjectIdx}
                            deleteOneProjectModal={deleteOneProjectModal}
                            setDeleteOneProjectModal={setDeleteOneProjectModal}
                            deleteProjectsModalOpen={deleteProjectsModalOpen}
                            setDeleteProjectsModalOpen={setDeleteProjectsModalOpen}
                            addProjectModalOpen={addProjectModalOpen}
                            setAddProjectModalOpen={setAddProjectModalOpen}
                            member={member}
                            resetEditModes={resetEditModes}
                            projectsEditMode={projectsEditMode}
                            setProjectsEditMode={setProjectsEditMode}
                        />
                    </div>

                    <div className="w-full lg:col-span-4 lg:sticky top-30">
                        <InfoCard
                            member={member}
                            resetEditModes={resetEditModes}
                            stackEditMode={stackEditMode}
                            setStackEditMode={setStackEditMode}
                            langsEditMode={langsEditMode}
                            setLangsEditMode={setLangsEditMode}
                            linksEditMode={linksEditMode}
                            setLinksEditMode={setLinksEditMode}
                        />
                    </div>

                </div>
            </div>

            <DeleteProjectsModal
                memberId={member ? member.id : ""}
                open={deleteProjectsModalOpen}
                setOpen={setDeleteProjectsModalOpen}
            />

            <AddProjectModal
                memberId={member ? member.id : ""}
                open={addProjectModalOpen}
                setOpen={setAddProjectModalOpen}
            />

            <DeleteOneProjectModal
                open={deleteOneProjectModal}
                setOpen={setDeleteOneProjectModal}
                memberId={member ? member.id : ""}
                projectIdx={deletingProjectIdx}
            />
        </div>
    )
}
