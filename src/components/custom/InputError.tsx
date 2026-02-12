import type { InputErrorProps } from "@/types";


export function InputError({ message, key }: InputErrorProps) {
    if (!message) return null;

    return (
        <p key={key} className="animate-shake text-red-500 text-[13px] font-medium selection:bg-red-100">
            {message}
        </p>
    );
}