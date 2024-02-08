import { DarkModeDropdown } from "@/app/_components/dark-mode-dropdown"

export const RootHeader = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <DarkModeDropdown />
    </header>
  )
}
