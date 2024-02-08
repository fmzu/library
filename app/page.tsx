import { ProductCard } from "@/app/_components/product-card"
import { SearchBox } from "@/app/_components/search-box"

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
      <SearchBox />
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
