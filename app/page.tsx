import { ProductCard } from "@/app/_components/product-card"
import { database } from "@/lib/database"

export default async function Home() {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
    },
    take: 128,
    include: { tags: true },
    orderBy: { stargazers_count: "desc" },
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {repositories.map((repository) => (
          <ProductCard
            key={repository.id}
            name={repository.name}
            description={repository.description || ""}
            starCount={repository.stargazers_count}
            updatedAt={repository.updated_at.toLocaleDateString()}
            tagNames={repository.tags.map((tag) => tag.slug)}
            ownerLogin={repository.owner_login}
            imageUrl={repository.open_graph_image_url}
            homepageUrl={repository.homepage_url}
          />
        ))}
      </div>
    </main>
  )
}
