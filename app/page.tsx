import { ProductCard } from "@/app/_components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {"React Libraries"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div>
      <header className="flex  w-full items-center">
        <form className="flex w-full md:max-w-xs">
          <Label className="sr-only" htmlFor="search">
            {"Search"}
          </Label>
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
      </header>
      <div className="grid gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  )
}
