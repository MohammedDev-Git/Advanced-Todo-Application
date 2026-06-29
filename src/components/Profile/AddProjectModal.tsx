import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Globe, Plus, Trash, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useError } from "@/hooks/useError"
import { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema"
import { nanoid } from "@reduxjs/toolkit"
import type { projectContributionError } from "@/types"
import { addMemberProject } from "@/features/members/membersSlice"
import { useDispatch } from "react-redux"
import { InputError } from "../custom/InputError"

interface AddProjectsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  memberId: string;
  resetEditModes: () => void;
}

const AddProjectModal = ({ open, setOpen, memberId, resetEditModes }: AddProjectsModalProps) => {

  const dispatch = useDispatch();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [tempCategory, setTempCategory] = useState<string[]>([""]);
  const sourceCodeRef = useRef<HTMLInputElement | null>(null);
  const liveLinkRef = useRef<HTMLInputElement | null>(null);

  const [errorKey, setErrorKey] = useState<number>(0);

  const [zodError, setZodError] = useState<projectContributionError | null>(null);

  useEffect(() => {
    if (zodError) {
      setZodError(null);
    }

    if (open) {
      resetEditModes();
    }

  }, [open])

  const categoryLengthError = useError(undefined);

  const handleRemoveAllCategories = () => {
    setTempCategory([""]);
  }

  const handleAddCategoryRow = () => {
    if (tempCategory.length >= 6) {
      categoryLengthError.setErrorMsg("Max 6 categories.");
      return;
    }
    categoryLengthError.setErrorMsg(undefined);
    setTempCategory((prev) => [...prev, ""]);
  };

  const handleRemoveCategoryRow = (idxToRemove: number) => {
    if (tempCategory.length <= 1) return;
    setTempCategory((prev) => prev.filter((_, idx) => idx !== idxToRemove));
    categoryLengthError.setErrorMsg(undefined);
  };

  const handleCategoryChange = (idxToUpdate: number, value: string) => {
    setTempCategory((prev) => {
      const updated = [...prev];
      updated[idxToUpdate] = value;
      return updated;
    });
  };

  const handleAddProject = () => {
    const data = {
      id: nanoid(),
      title: titleRef.current?.value.trim() || "",
      description: descriptionRef.current?.value.trim() || "",
      sourceCode: sourceCodeRef.current?.value.trim() || "",
      liveCode: liveLinkRef.current?.value.trim() || "",
      category: tempCategory || [""],
    };

    const validationResult = projectContributionSchema.safeParse(data);

    if (!validationResult.success) {
      const error = validationResult.error.format();
      if (error) {
        setErrorKey((prev) => prev + 1);
        setZodError(error);
      }
      return;
    }

    dispatch(addMemberProject({ memberId, project: data }));
    setOpen(false);
    setTempCategory([""]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl max-h-148 p-2 md:p-6"
      >
        <form
          className="flex flex-col justify-center gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProject();
          }}>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Add a project
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar max-h-100 overflow-y-auto">

            <div className="rounded-lg relative border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title" placeholder="eg. Portfolio Website" ref={titleRef}
                />
                <InputError keyErr={errorKey} message={zodError?.title?._errors[0]} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="desc">Project Description (Optional)</Label>
                <Textarea id="desc"
                  placeholder="Briefly explain the project..."
                  className=" min-h-20 max-h-20"
                  ref={descriptionRef}
                />
                <InputError keyErr={errorKey} message={zodError?.description?._errors[0]} />
              </div>
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <div>
                    <Label>Project Category (Optional)</Label>
                    <InputError keyErr={errorKey} message={categoryLengthError.errorMsg} />
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    {
                      tempCategory.length > 1 &&
                      <Button
                        type="button"
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white"
                        onClick={() => {
                          handleRemoveAllCategories();
                        }}
                      >
                        <Trash />
                      </Button>
                    }
                    <Button
                      type="button"
                      size="sm"
                      className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                      onClick={() => {
                        handleAddCategoryRow();
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <div
                  className="mt-2 border-2 border-primary/50 border-dotted p-5 rounded-2xl flex flex-col justify-center gap-4">
                  {
                    tempCategory.map((cat, catIdx) => (
                      <div key={catIdx} className="relative">
                        <Input
                          placeholder={`Category ${catIdx + 1}`}
                          value={cat}
                          onChange={(e) => handleCategoryChange(catIdx, e.target.value)}
                        />
                        {
                          tempCategory.length > 1 &&
                          <Button
                            type="button"
                            className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-5 h-5 rounded-full"
                            onClick={() => handleRemoveCategoryRow(catIdx)}
                          >
                            <X className="h-2 w-2 text-white" />
                          </Button>
                        }
                        {/* <InputError keyErr={ } message={ } /> */}
                      </div>
                    ))
                  }
                </div>

              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`source`}>Source Code Link (Optional)</Label>
                <div className="relative">
                  <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`source`}
                    placeholder="https://github.com/..."
                    className="pl-10"
                    ref={sourceCodeRef}
                  />

                  <InputError keyErr={errorKey} message={zodError?.sourceCode?._errors[0]} />

                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`link`}>Live Link (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`link`}
                    placeholder="https://project.com"
                    className="pl-10 "
                    ref={liveLinkRef}
                  />
                  <InputError keyErr={errorKey} message={zodError?.liveCode?._errors[0]} />
                </div>
              </div>
            </div>
            <button type="submit" className="hidden" />
          </div>

        </form>
        <DialogFooter className="flex justify-end items-center">
          <Button onClick={() => {
            handleAddProject();
          }}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default AddProjectModal