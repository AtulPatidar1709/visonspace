"use client"

import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useMutation } from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEvnetToCanvasPoint } from "@/lib/utils";


interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({
        x: 0, y: 0
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    }, []);

    const onPointerMove = useMutation((
        { setMyPresence }
        , e: React.PointerEvent
    ) => {
        e.preventDefault();

        const current = pointerEvnetToCanvasPoint(e, camera);

        setMyPresence({ cursor: current });
    }, []);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    return (
        <main
            className="h-full w-full relative bg-neutral-100"
        >
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.canUndo}
                redo={history.canRedo}
            />
            <svg
                className="h-[100vh] w-[100vh]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
