"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface SearchProps {
  isMobile?: boolean;
}

export default function Search({ isMobile = false }: SearchProps) {
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams();

    if (term) {
      params.set("search", term);
    }

    router.push(`/catalog${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  }, 50);

  const getCurrentSearchTerm = () => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("search") || "";
    }
    return "";
  };

  return (
    <div className={cn("relative", isMobile ? "w-full" : "")}>
      <Input
        type="search"
        name="search"
        placeholder="Search..."
        className={cn(
          "border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all",
          isMobile ? "w-full" : "w-[400px]"
        )}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={getCurrentSearchTerm()}
      />
    </div>
  );
}
