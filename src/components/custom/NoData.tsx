import Lottie from "lottie-react"
import type { NoDataProps } from "@/types"

const NoData = ({ setAddOpen, animationData, message, image = false, src }: NoDataProps) => {
    return (
        <div
            onClick={() => setAddOpen(true)}
            className="cursor-pointer flex flex-col items-center justify-center w-60 mx-auto border-2 border-dotted border-primary rounded-4xl">
            <div className="h-25 w-25">
                {
                    image ?
                        <div className="flex items-center justify-center mt-4">
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