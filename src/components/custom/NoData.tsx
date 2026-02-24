import Lottie from "lottie-react"
import type { NoDataProps } from "@/types"
import { useDispatch } from "react-redux"
import { resetTempCategory } from "@/features/notes/notesSlice";

const NoData = ({ setAddOpen, animationData, message, image = false, src }: NoDataProps) => {

    const dispatch = useDispatch();


    return (
        <div
            onClick={() => {
                setAddOpen(true);
                if (image) dispatch(resetTempCategory());
            }}
            className="cursor-pointer flex flex-col items-center justify-center w-60 mx-auto border-2 border-dotted border-primary rounded-4xl">
            <div className="h-25 w-25">
                {
                    image ?
                        <div className="flex items-center justify-center mt-4 animate-up-down">
                            <img src={src} className="w-20 h-20" />
                        </div>
                        :
                        <Lottie
                            animationData={animationData}
                            loop={true}
                        />
                }
            </div>
            <p className="text-primary text-center text-sm mb-5">{message}</p>
        </div>
    )
}

export default NoData