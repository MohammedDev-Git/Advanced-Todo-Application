import { InputError } from "@/components/custom/InputError";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addTempDescription, selectDescription } from "@/features/members/membersSlice";
import { descriptionSchema } from "@/features/members/schemas/descriptionSchema";
import { useError } from "@/hooks/useError";
import { useInput } from "@/hooks/useInput"
import { forwardRef, useImperativeHandle, useState, type Ref } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface DescriptionRef {
    handleStepTwo: () => boolean;
}

const Description = ({ }, ref: Ref<DescriptionRef>) => {

    const storedDescription = useSelector(selectDescription);

    const descriptionInput = useInput(storedDescription.text);

    const descriptionError = useError(undefined);

    const [renderKey, setRenderKey] = useState<number>(0);

    const dispatch = useDispatch();

    const handleStepTwo = () => {

        const tempDescription = {
            text: descriptionInput.value,
        }

        const validationResult = descriptionSchema.safeParse(tempDescription);

        if (!validationResult.success) {
            const error = validationResult.error.format().text?._errors[0];
            if (error) {
                descriptionError.setErrorMsg(error);
                setRenderKey(pre => pre + 1);
            }
            return false;
        }

        dispatch(addTempDescription(tempDescription));
        return true;
    }

    useImperativeHandle(ref, () => ({
        handleStepTwo,
    }))

    return (
        <div className="grid gap-1.5">
            <Label htmlFor="description">About the Member (Optional)</Label>
            <Textarea
                id="description"
                placeholder="Describe the member's background and expertise..."
                className="mt-4 min-h-48 max-h-48"
                {...descriptionInput}
            />
            <InputError message={descriptionError.errorMsg} keyErr={renderKey} />
        </div>
    )
}

export default forwardRef(Description)