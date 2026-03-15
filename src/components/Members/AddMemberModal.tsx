import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, User, Mail, Phone, Check, BriefcaseBusiness, Code2, Globe, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ModalProps } from "@/types";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AddMemberModal = ({ open, onOpenChange }: ModalProps) => {

    const [progress, setProgress] = useState<number>(1);

    const modalRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (open) {
            setProgress(1);
        }

    }, [open]);

    const playModalRefAnimation = () => {
        modalRef?.current?.classList.remove("animate-scale-in-out!");
        setTimeout(() => {
            modalRef?.current?.classList.add("animate-scale-in-out!");
        }, 10);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                ref={modalRef}
                aria-describedby="member modal"
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                onPointerDownOutside={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                className={`w-full custom-scrollbar max-w-[340px] md:max-w-xl lg:max-w-2xl shadow-2xl border-muted-foreground/10 max-h-148 overflow-y-auto`}>
                <CardHeader className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>Step {progress} of 4</span>
                        </div>
                        <Progress value={progress * (100 / 4)} className="h-2" />
                    </div>

                    <DialogTitle className="space-y-1">
                        <CardTitle className="text-2xl">Add a Member</CardTitle>
                        <CardDescription>
                            {progress === 1 && "Personal Details"}
                            {progress === 2 && ""}
                            {progress === 3 && "Project Contribution"}
                            {progress === 4 && "Skills & Socials"}
                        </CardDescription>
                    </DialogTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {progress === 1 && (
                        <div className="space-y-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="name" placeholder="John Doe" className="pl-10" />
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="role">Role</Label>
                                <div className="relative">
                                    <BriefcaseBusiness className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="role" placeholder="Frontend Developer" className=" pl-10" />
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="m@example.com" className="pl-10" />
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="phone" placeholder="+20 123 456 789" className="pl-10" />
                                </div>
                            </div>
                        </div>
                    )}

                    {progress === 2 && (
                        <div className="grid gap-1.5">
                            <Label htmlFor="description">About the Member</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the member's background and expertise..."
                                className="mt-4 min-h-48 max-h-48"
                            />
                        </div>
                    )}

                    {progress === 3 && (
                        <div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="p-title">Project Title</Label>
                                <Input id="p-title" placeholder="Portfolio Website" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="p-desc">Project Description</Label>
                                <Textarea id="p-desc"
                                    placeholder="Briefly explain the project..."
                                    className=" min-h-20 max-h-20" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="p-cat">Project Category</Label>
                                <Input id="p-cat" placeholder="E-commerce / SaaS" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="p-source">Source Code Link</Label>
                                <div className="relative">
                                    <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="p-source" placeholder="https://github.com/..." className="pl-10 " />
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="p-link">Live Link</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="p-link" placeholder="https://project.com" className="pl-10 " />
                                </div>
                            </div>
                        </div>
                    )}

                    {progress === 4 && (

                        // arabic languge
                        // tech stack add !

                        <div className="space-y-6">
                            <div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                                <Label className="text-primary font-bold">Member Languages</Label>
                                <div className="flex gap-2 mt-2">
                                    <div className="grid flex-1 gap-1.5">
                                        <Select>
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Select a Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Languages</SelectLabel>
                                                    <SelectItem value="arabic">Arabic</SelectItem>
                                                    <SelectItem value="english">English</SelectItem>
                                                    <SelectItem value="french">French</SelectItem>
                                                    <SelectItem value="german">German</SelectItem>
                                                    <SelectItem value="spanish">Spanish</SelectItem>
                                                    <SelectItem value="italian">Italian</SelectItem>
                                                    <SelectItem value="chinese">Chinese</SelectItem>
                                                    <SelectItem value="japanese">Japanese</SelectItem>
                                                    <SelectItem value="turkish">Turkish</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid flex-1 gap-1.5">
                                        <Select>
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Select a Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Level</SelectLabel>
                                                    <SelectItem value="beginner">Beginner</SelectItem>
                                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="professional">Professional</SelectItem>
                                                    <SelectItem value="advanced">Advanced</SelectItem>
                                                    <SelectItem value="native">Native</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="social">Social Media Link</Label>
                                <div className="relative">
                                    <Share2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="social" placeholder="https://linkedin.com/in/..." className="pl-10 " />
                                </div>
                            </div>
                        </div>
                    )}


                </CardContent>

                <CardFooter className="flex justify-between border-t p-6 mt-2">
                    <Button onClick={() => {
                        if (progress > 1) {
                            setProgress(pre => pre - 1);
                        } else {
                            onOpenChange?.(false);
                        }
                    }} variant="ghost">{progress > 1 ? "Previous" : "Cancel"}</Button>
                    <Button
                        onClick={() => {
                            setProgress(prog => {
                                if (prog === 4) {
                                    onOpenChange?.(false);
                                }
                                return prog + 1;
                            });
                        }}
                        className="gap-2 text-white">
                        {progress === 4 ? 'Submit' : 'Next Step'}
                        {progress === 4 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </CardFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberModal;