"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          router.push(
            e.target.value.trim()
              ? `${path.split("?")[0]}?q=${e.target.value}`
              : `${path.split("?")[0]}`,
          );
        }}
      />
    </div>
  );
};

export default SearchBar;
