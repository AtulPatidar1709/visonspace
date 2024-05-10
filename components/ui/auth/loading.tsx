import Image from "next/image";

import logo from "@/public/logo.svg";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Image
                src={logo}
                alt="Logo"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    )
}