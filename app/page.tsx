import { ProductCard } from "@/app/_components/product-card"
import { SearchBox } from "@/app/_components/search-box"
import { database } from "@/lib/database"

export default async function Home() {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
    },
    take: 64,
    include: { tags: true },
  })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="flex text-3xl font-bold tracking-tight">
          <span>{"Libraries"}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {"自分のスタイルに合わせていろいろなライブラリが探せます。"}
        </p>
      </div>
      <div className="flex justify-between">
        <SearchBox />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {repositories.map((repository) => (
          <ProductCard
            key={repository.id}
            name={repository.name}
            description={repository.description || ""}
            starCount={repository.stargazers_count}
            createdAt={repository.updated_at.toLocaleDateString()}
            tagNames={repository.tags.map((tag) => tag.slug)}
            ownerLogin={repository.owner_login}
            imageUrl={repository.open_graph_image_url}
          />
        ))}
      </div>
    </main>
  )
}
