"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const SearchBox = () => {
  const router = useRouter()

  const [search, setSearch] = useState("")

  const onSearch = () => {
    router.push(`/search/${search}`)
    setSearch("")
  }

  return (
    <div className="flex w-full space-x-2">
      <Input
        className="flex-1 w-full md:w-40"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
      />
      <Button size="icon" onClick={onSearch} variant={"secondary"}>
        <SearchIcon className="w-4" />
        <span className="sr-only">{"検索"}</span>
      </Button>
    </div>
  )
}
