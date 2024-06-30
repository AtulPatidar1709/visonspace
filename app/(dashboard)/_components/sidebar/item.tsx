"use client"

import Image from "next/image";

import { useOrganization, useOrganizationList } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";


interface ItemProps {
    id: string,
    name: string,
    imageUrl: string;
}

export const Item = ({
    id,
    name,
    imageUrl,
}: ItemProps) => {

    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) {
            return null;
        }

        setActive({ organization: id });
    }

    return (
        <div>
            <Hint
                label={name}
                side="right"
                align="start"
                sideOffset={18}
            >

                <Image
                    alt={name}
                    src={imageUrl}
                    width={50}
                    height={0}
                    onClick={() => { }}
                    className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition", isActive && "opacity-100")}
                />
            </Hint>
        </div>
    )
}