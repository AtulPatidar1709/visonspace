"use client"

import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEvnetToCanvasPoint } from "@/lib/utils";
import { LayerPreview } from "./layerPreview";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {

    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({
        x: 0, y: 0
    });

    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayersIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        })

        liveLayersIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor])

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

    const onPointerUp = useMutation((
        { }, e
    ) => {
        const point = pointerEvnetToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.LayerType, point);
        }
        else {
            setCanvasState({
                mode: CanvasMode.None,
            })
        }

        history.resume();

    }, [
        camera,
        canvasState,
        history,
        insertLayer,
    ])

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
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transition: `translate(${camera.x}px,  ${camera.y}px)`
                    }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={() => { }}
                            selectionColor="#000"
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
