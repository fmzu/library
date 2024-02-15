import { ProductCard } from "@/app/_components/product-card"
import { database } from "@/lib/database"
import { notFound } from "next/navigation"

type Props = {
  params: {
    tag: string
    second: string
  }
}

export default async function Home(props: Props) {
  const parentTag = await database.tags.findUnique({
    where: {
      slug: props.params.tag,
    },
  })

  const tag = await database.tags.findUnique({
    where: {
      slug: props.params.second,
    },
    include: {
      repositories: {
        where: {
          tags: {
            some: {
              slug: props.params.tag,
            },
          },
        },
        take: 128,
        include: {
          tags: true,
        },
        orderBy: {
          stargazers_count: "desc",
        },
      },
    },
  })

  if (parentTag === null || tag === null) {
    notFound()
  }

  // const repositories = await database.repositories.findMany({
  //   where: {
  //     is_deleted: false,
  //     tags: {
  //       some: {
  //         slug: props.params.tag,
  //       },
  //     },
  //   },
  // })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {parentTag?.name}
          {" / "}
          {tag?.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {tag.repositories.map((repository) => (
          <ProductCard
            key={repository.id}
            name={repository.name}
            description={repository.description || ""}
            starCount={repository.stargazers_count}
            createdAt={repository.updated_at.toLocaleDateString()}
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
