import { InputError } from "@/components/custom/InputError"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addTempPersonalDetails, selectPersonalDetails, selectStoredEmails } from "@/features/members/membersSlice"
import { personalDetailsSchema } from "@/features/members/schemas/personalDetailsSchema"
import { useError } from "@/hooks/useError"
import { useInput } from "@/hooks/useInput"
import type { PersonalDetailsError, TempPersonalDetails } from "@/types"
import { BriefcaseBusiness, Mail, Phone, User } from "lucide-react"
import { forwardRef, useImperativeHandle, useState, type Ref } from "react"
import { useDispatch, useSelector } from "react-redux"

export interface PersonalDetailsRef {
    handleStep: () => boolean;
}

const PersonalDetails = ({ }, ref: Ref<PersonalDetailsRef>) => {

    const dispatch = useDispatch();

    const storedPersonalDetails = useSelector(selectPersonalDetails);

    const nameInput = useInput(storedPersonalDetails.name || "");
    const roleInput = useInput(storedPersonalDetails.role || "");
    const emailInput = useInput(storedPersonalDetails.email || "");
    const phoneInput = useInput(storedPersonalDetails.phone || "");

    const nameError = useError("");
    const roleError = useError("");
    const emailError = useError("");
    const phoneError = useError("");

    const storedEmails = useSelector(selectStoredEmails);

    const [renderKey, setRenderKey] = useState<number>(0);

    const inputData = [
        {
            id: "name",
            label: "Full Name (Required)",
            placeholder: "Ahmed Ali",
            type: "text",
            icon: <User className="size-4" />,
            ...nameInput,
            ...nameError
        },
        {
            id: "role",
            label: "Role (Required)",
            placeholder: "Frontend Developer",
            type: "text",
            icon: <BriefcaseBusiness className="size-4" />,
            ...roleInput,
            ...roleError,
        },
        {
            id: "email",
            label: "Email Address (Required)",
            placeholder: "example@gmail.com",
            type: "email",
            icon: <Mail className="size-4" />,
            ...emailInput,
            ...emailError
        },
        {
            id: "phone",
            label: "Phone Number (optional)",
            placeholder: "01*********",
            type: "text",
            icon: <Phone className="size-4" />,
            ...phoneInput,
            ...phoneError
        },
    ]

    const getValueOf = (id: string) => {
        return inputData.find((data) => data.id === id)?.value.trim();
    }

    const handleStep = () => {

        const personalData: TempPersonalDetails = {
            name: getValueOf("name"),
            role: getValueOf("role"),
            email: getValueOf("email"),
            phone: getValueOf("phone"),
        }

        const validationResult = personalDetailsSchema.safeParse(personalData);


        const duplicatedEmail = storedEmails.some((em:string) => em === personalData.email);
        if (duplicatedEmail) {
            setRenderKey(pre => pre + 1);
            emailError.setErrorMsg("Email is already taken");
            nameError.setErrorMsg("");
            roleError.setErrorMsg("");
            phoneError.setErrorMsg("");
        }

        if (!validationResult.success) {
            const error: PersonalDetailsError = validationResult.error.format();
            if (error) {
                setRenderKey(pre => pre + 1);
                nameError.setErrorMsg(error.name?._errors[0]);
                roleError.setErrorMsg(error.role?._errors[0]);
                if (!duplicatedEmail) {
                    emailError.setErrorMsg(error.email?._errors[0]);
                }
                phoneError.setErrorMsg(error.phone?._errors[0]);
            }

            return false;
        }

        if (duplicatedEmail) {
            return false;
        }

        dispatch(addTempPersonalDetails(personalData));
        return true;

    }

    useImperativeHandle(ref, () => ({
        handleStep,
    }))

    return (
        <>
            <div className="space-y-4">
                {
                    inputData.map((input, idx) => (
                        <div key={input.id} className="grid gap-1.5">
                            <Label htmlFor={input.id}>{input.label}</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-muted-foreground">
                                    {input.icon}
                                </div>
                                <Input
                                    type={input.type}
                                    id={input.id}
                                    placeholder={input.placeholder}
                                    className="pl-10"
                                    value={input.value}
                                    onChange={(e) => {
                                        input.onChange(e);
                                    }}
                                />
                                <InputError keyErr={idx + renderKey} message={input.errorMsg} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

PersonalDetails.displayName = "PersonalDetails";

export default forwardRef(PersonalDetails);