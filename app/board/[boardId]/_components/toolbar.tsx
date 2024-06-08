import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolBotton } from "./tool-button"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolBotton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => { }}
                    isActive={false}
                />
                <ToolBotton
                    label="Text"
                    icon={Type}
                    onClick={() => { }}
                    isActive={false}
                />
                <ToolBotton
                    label="Sticky note"
                    icon={StickyNote}
                    onClick={() => { }}
                    isActive={false}
                />
                <ToolBotton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => { }}
                    isActive={false}
                />
                <ToolBotton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => { }}
                    isActive={false}
                />
                <ToolBotton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => { }}
                    isActive={false}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolBotton
                    label="Undo"
                    icon={Undo2}
                    onClick={() => { }}
                    isDisabled={true}
                />
                <ToolBotton
                    label="Redo"
                    icon={Redo2}
                    onClick={() => { }}
                    isDisabled={true}
                />
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
    )
}