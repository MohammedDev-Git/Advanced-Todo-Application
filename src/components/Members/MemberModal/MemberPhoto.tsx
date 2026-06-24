import { Upload } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react"

export interface MemberPhotoRef {
    handleStep: () => boolean;
}

const MemberPhoto = forwardRef<MemberPhotoRef, {}>((_, ref) => {

    useImperativeHandle(ref, () => {
        return {
            handleStep,
        }
    })

    const handleStep = () => {
        return true;
    }

    const memberImages = Array.from({ length: 9 }, (_, idx) => {
        return {
            id: idx+1,
            path: `/assets/members/member${idx+1}.png`,
        }
    })

    return (
        <div className="border-2 border-dotted border-primary bg-primary/30 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                <div
                    className="size-24 rounded-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer border border-primary"
                >
                    <Upload className="text-primary" />
                </div>
                {memberImages.map((item) => (
                    <div
                        key={item.id}
                        className="size-24 rounded-full bg-white shadow-md flex items-center cursor-pointer justify-center"
                    >
                        <img src={item.path} className="size-full rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
})

MemberPhoto.displayName = "MemberPhoto";

export default MemberPhoto