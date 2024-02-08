import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export const SearchBox = () => {
  return (
    <form className="flex w-full md:max-w-xs">
      <Input
        className="flex-1 w-full md:w-[300px] text-sm"
        id="search"
        placeholder="Search"
      />
      <Button className="ml-2 md:ml-4" size="icon" type="submit">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">{"Search"}</span>
      </Button>
    </form>
  )
}
