import { assignRandomImage } from "@/features/tasks/tasksSlice";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";

export interface MediaRefType {
    handleStepThree: () => boolean;
}

const Media = forwardRef<MediaRefType, {}>((_, ref) => {
    const cards = Array(6).fill(null);
    const dispatch = useDispatch();
    
        const handleStepThree = () => {
            dispatch(assignRandomImage());
            return true;
        }

    useImperativeHandle(ref, () => {
        return {
            handleStepThree,
        }
    })

    return (
        <div>
            <p className="mb-4">Add media to clarify the task (optional)</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((_, idx) => (
                    <div
                        key={idx}
                        className="group flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center transition-all duration-200 hover:border-primary hover:bg-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-primary/10"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-slate-300 bg-white text-primary transition-all duration-200 group-hover:border-primary group-hover:bg-primary/30 dark:border-slate-700 dark:bg-slate-950">
                            <span className="text-2xl font-bold">+</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Add photo or video</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

Media.displayName = "Media";

export default Media;