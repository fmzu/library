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
      />
      <Button size="icon" onClick={onSearch}>
        <SearchIcon className="w-4" />
        <span className="sr-only">{"Search"}</span>
      </Button>
    </div>
  )
}
