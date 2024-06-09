import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { ToolBotton } from "./tool-button"


interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canRedo,
    canUndo
}: ToolbarProps) => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolBotton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />
                <ToolBotton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, LayerType: LayerType.Text })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Text
                    }
                />
                <ToolBotton
                    label="Sticky note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, LayerType: LayerType.Note })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Note
                    }
                />
                <ToolBotton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, LayerType: LayerType.Rectangle })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Rectangle
                    }
                />
                <ToolBotton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, LayerType: LayerType.Ellipse })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Ellipse
                    }
                />
                <ToolBotton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolBotton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    isDisabled={!canUndo}
                />
                <ToolBotton
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    isDisabled={!canRedo}
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