"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolBottonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export const ToolBotton = ({
    label,
    icon: Icon,
    onClick,
    isActive,
    isDisabled
}: ToolBottonProps) => {
    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled={isDisabled}
                onClick={onClick}
                size="icon"
                variant={isActive ? "boardActive" : "board"}
            >

                <Icon />
            </Button>
        </Hint>
    )
}