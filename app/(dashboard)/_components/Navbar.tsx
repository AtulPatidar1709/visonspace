"use client"

import { UserButton } from "@clerk/nextjs"

UserButton

export const Navbar = () => {
    return (
        <div className='flex items-center gap-x-4 p-5 bg-green-500'>
            <div className="hidden lg:flex lg:flex-1">
                {/* Todo:Add Search */}
            </div>
            <UserButton />
        </div>
    )
}
