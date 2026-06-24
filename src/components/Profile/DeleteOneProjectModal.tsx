import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteMemberProject } from "@/features/members/membersSlice";
import { useDispatch } from "react-redux";

interface DeleteProjectsModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    memberId: string;
    projectIdx: number
}

const DeleteOneProjectModal = ({ open, setOpen, memberId, projectIdx }: DeleteProjectsModalProps) => {
    const dispatch = useDispatch();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete This Project ?</DialogTitle>
                    <DialogDescription>
                        This action can't be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => {
                            dispatch(deleteMemberProject({ memberId, projectIdx }));
                            setOpen(false);
                        }}
                    >Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteOneProjectModal