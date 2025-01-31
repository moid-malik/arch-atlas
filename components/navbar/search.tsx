"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
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
    <Input
      type="search"
      name="search"
      placeholder="Search..."
      className="w-[400px]"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={getCurrentSearchTerm()}
    />
  );
}
