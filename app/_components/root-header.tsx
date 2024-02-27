import { DarkModeDropdown } from "@/app/_components/dark-mode-dropdown"
import { SearchBox } from "@/app/_components/search-box"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export const RootHeader = () => {
  return (
    <header className="flex py-4 items-center space-x-2 container">
      <div className="flex space-x-1 items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Home className="h-6 w-6" />
          </Link>
        </Button>
        <span>{"/"}</span>
        <DarkModeDropdown />
      </div>
      <SearchBox />
    </header>
  )
}
