"use client"

import { useOthers, useSelf } from "@/liveblocks.config"
import { UserAvatar } from "./user-avatar"

const MAX_SHOWN_USERS = 2;

// interface Users {
//     connectionId: string;
//     info: {
//         picture: string;
//         name: string;
//         // Add other properties of 'info' if necessary
//     };
// }

export const Participants = () => {

    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    console.log(users)

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS)
                    .map(({ connectionId, info }) => {
                        return (
                            <UserAvatar
                                key={connectionId}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name.[0] || "T"}
                            />
                        )
                    })
                }
                {currentUser && (
                    <UserAvatar
                        src={currentUser?.info?.picture}
                        name={`${currentUser?.info?.name} (you)`}
                        fallback={currentUser?.info?.name?.[0]}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}

                    />
                )}
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 rounded-md px-1.5 h-12 flex items-center shadow-md w-[100px]" />
    )
}