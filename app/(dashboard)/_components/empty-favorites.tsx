import Image from "next/image";

import EmptyFavoritesLogo from "@/public/empty-favorites.svg"

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={EmptyFavoritesLogo}
                height={140}
                width={140}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No favorites Visions!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try favoriting a board.
            </p>
        </div>
    )
}