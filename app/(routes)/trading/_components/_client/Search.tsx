"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export const Search = () => {
  const searchParams = useSearchParams();
  const input = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  if (input.current && !searchParams.get("card")) input.current.value = "";

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set("card", value);
    else params.delete("card");
    params.delete("page");

    const newUrl = `${pathname}?${params.toString()}`;
    replace(newUrl);
  }, 300);

  return (
    <div className="my-4 w-lg">
      <Label className="my-2">Search for a card</Label>
      <Input
        type="search"
        id="search"
        ref={input}
        placeholder="Search for a trade"
        onChange={handleSearch}
        defaultValue={searchParams.get("card")?.toString()}
      />
    </div>
  );
};
