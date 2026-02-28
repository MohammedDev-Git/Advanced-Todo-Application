import type { InputErrorProps } from "@/types";

export function InputError({ message, keyErr, className }: InputErrorProps) {
    if (!message) return null;

    return (
        <p key={keyErr} className={`${className} animate-shake text-red-500 text-[13px] font-medium selection:bg-red-100`}>
            {message}
        </p>
    );
}