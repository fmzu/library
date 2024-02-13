import { ProductCard } from "@/app/_components/product-card"
import { SearchBox } from "@/app/_components/search-box"
import { database } from "@/lib/database"

export default async function Home() {
  const repositories = await database.repositories.findMany({ take: 64 })
  console.log(repositories)

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
        {repositories.map((repository) => (
          <ProductCard
            name={repository.name}
            description={repository.description || ""}
            starCount={repository.stargazers_count}
            createdAt={repository.updated_at.toLocaleDateString()}
          />
        ))}
      </div>
    </main>
  )
}
