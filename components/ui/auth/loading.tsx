import Image from "next/image";

import logo from "@/public/logo.svg"

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                priority={true}
                src={logo}
                alt="Logo"
                width={120}
                height={120}
                // placeholder="blur"
                // blurDataURL={logo}
                className="animate-pulse duration-700"
            />
        </div>
    )
}