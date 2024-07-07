"use client"

import { memo } from "react";
import { useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const Selectiontools = memo(({
    camera,
    setLastUsedColor
}: SelectionToolsProps) => {

    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div className="absolute p-3 text-black rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
            )`
            }}
        >selectiontools
        </div>
    );
});

Selectiontools.displayName = "SelectionTools";