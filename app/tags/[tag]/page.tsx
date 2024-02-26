import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { toFamousTagNames } from "@/app/_utils/to-famous-tag-names"
import { database } from "@/lib/database"
import Link from "next/link"

type Props = {
  params: {
    tag: string
  }
}

export default async function Home(props: Props) {
  const repositories = await database.repositories.findMany({
    where: {
      tag_names: { has: props.params.tag },
    },
    take: 128,
    // include: {
    //   tags: true,
    // },
    orderBy: {
      stargazers_count: "desc",
    },
  })

  const allTagNames = repositories
    .flatMap((repository) => repository.tag_names)
    .filter((tagName) => tagName !== props.params.tag)

  const famousTagNames = toFamousTagNames(allTagNames, 32)

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
          {props.params.tag}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {famousTagNames.map((tagName) => (
          <Link href={`/tags/${tagName}`} key={tagName}>
            <TagBadge>{tagName}</TagBadge>
          </Link>
        ))}
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
