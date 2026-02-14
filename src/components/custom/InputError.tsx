import type { InputErrorProps } from "@/types";


export function InputError({ message, keyErr }: InputErrorProps) {
    if (!message) return null;

    return (
        <p key={keyErr} className="animate-shake text-red-500 text-[13px] font-medium selection:bg-red-100">
            {message}
        </p>
    );
}