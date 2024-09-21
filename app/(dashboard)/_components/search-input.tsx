"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState('');

    // Debounce the state update (value) outside of handleChange
    const debouncedSetValue = useDebounceCallback((newValue: string) => {
        setValue(newValue);
    }, 500); // 500ms debounce delay

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetValue(e.target.value);
    };

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: { search: value },
        }, {
            skipEmptyString: true,
            skipNull: true,
        });
        router.push(url);
    }, [value, router]); // Include 'value' as a dependency

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                className="w-full max-w-[516px] pl-9"
                placeholder="Search Boards"
                onChange={handleChange} // No debounce logic here
                value={value}
            />
        </div>
    );
};
