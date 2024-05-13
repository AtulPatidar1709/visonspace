"use client";

import qs from "query-string";
import { Search, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import {
    ChangeEvent,
    useEffect,
    useState,
} from "react"
import { Input } from "@/components/ui/input";

export const SearchInput = () => {

    const router = useRouter();
    const [value, setValue] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        return useDebounceCallback(setValue, 500)
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: value,
            },
        }, {
            skipEmptyString: true, skipNull: true
        });
        router.push(url)
    }, [handleChange, router])

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2  text-muted-foreground h-4 w-4" />
            <Input className="w-full max-w-[516px] pl-9"
                placeholder="Search Boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};