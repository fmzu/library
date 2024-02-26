import { ProductCard } from "@/app/_components/product-card"
import { database } from "@/lib/database"

type Props = {
  params: {
    search: string
  }
}

export default async function Home(props: Props) {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
      OR: [
        {
          description: {
            contains: props.params.search,
          },
        },
        {
          name: {
            contains: props.params.search,
          },
        },
        {
          tags: {
            some: {
              slug: props.params.search,
            },
          },
        },
      ],
    },
    // include: { tags: true },
    take: 128,
  })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="flex text-3xl font-bold tracking-tight">
          <span>{props.params.search}</span>
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
            tagNames={repository.tag_names}
            ownerLogin={repository.owner_login}
            imageUrl={repository.open_graph_image_url}
            homepageUrl={repository.homepage_url}
          />
        ))}
      </div>
    </main>
  )
}
