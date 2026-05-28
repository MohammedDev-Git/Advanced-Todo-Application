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
import { deleteMember } from "@/features/members/membersSlice";
import type { ModalProps } from "@/types"
import { useDispatch } from "react-redux";

interface DeleteMemberModalProps extends ModalProps {
    deletedId?: string;
    setDeletedId: (id: string) => void;
}

function DeleteMemberModal({ open, onOpenChange, deletedId, setDeletedId }: DeleteMemberModalProps) {

    const dispatch = useDispatch();

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Member?</DialogTitle>
                        <DialogDescription>
                            This Action will permanently delete the member. Are you sure you want to proceed?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                if (deletedId) {
                                    dispatch(deleteMember(deletedId));
                                }
                                onOpenChange?.(false);
                                setDeletedId("");
                            }}
                            className="text-white">Delete Permanently</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default DeleteMemberModal;