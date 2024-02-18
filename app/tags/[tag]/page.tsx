import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { database } from "@/lib/database"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
  params: {
    tag: string
  }
}

export default async function Home(props: Props) {
  const tag = await database.tags.findUnique({
    where: {
      slug: props.params.tag,
    },
    include: {
      repository: true,
      repositories: {
        take: 128,
        include: {
          tags: true,
        },
      },
      next_tags: true,
    },
  })

  if (!tag) {
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
        <h1 className="text-3xl font-bold tracking-tight">{tag?.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {tag?.description || " "}
        </p>
      </div>
      {tag.next_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span>{"関連タグ:"}</span>
          {tag.next_tags.map((nextTag) => (
            <Link href={`/tags/${tag.slug}/${nextTag.slug}`} key={nextTag.slug}>
              <TagBadge key={nextTag.id}>{nextTag.name}</TagBadge>
            </Link>
          ))}
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {tag.repositories.map((repository) => (
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
