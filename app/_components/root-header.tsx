import { DarkModeDropdown } from "@/app/_components/dark-mode-dropdown"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export const RootHeader = () => {
  return (
    <header className="flex p-4">
      <div className="flex space-x-2 items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Home className="h-8 w-8" />
          </Link>
        </Button>
        <span>{"/"}</span>
        <DarkModeDropdown />
      </div>
    </header>
  )
}
