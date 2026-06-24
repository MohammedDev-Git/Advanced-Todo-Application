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
import { deleteAllMemberProjects } from "@/features/members/membersSlice";
import { useDispatch } from "react-redux";

interface DeleteProjectsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  memberId: string;
}

const DeleteProjectsModal = ({ open, setOpen, memberId }: DeleteProjectsModalProps) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete All Projects ?</DialogTitle>
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
              dispatch(deleteAllMemberProjects(memberId));
              setOpen(false);
            }}
          >Delete All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProjectsModal