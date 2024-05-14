"use client";

import Image from "next/image";
import { useMutation } from "convex/react";
import EmptyVisonLogo from "@/public/note.svg"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyVison = () => {

    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create);
    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization?.id,
            title: "Untitled",
        })
            .then((id) => {
                toast.success("Board created")
            })
            .catch(() => {
                toast.error("Failed to create board")
            })
    }


    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={EmptyVisonLogo}
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Vision
                </Button>
            </div>
        </div>
    )
}