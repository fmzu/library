import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { toFamousTagNames } from "@/app/_utils/to-famous-tag-names"
import { database } from "@/lib/database"
import Link from "next/link"

type Props = {
  params: {
    search: string
    tag: string
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
          tag_names: {
            has: props.params.search,
          },
        },
      ],
    },
    // include: { tags: true },
    take: 128,
  })

  const allTagNames = repositories
    .flatMap((repository) => repository.tag_names)
    .filter((tagName) => tagName !== props.params.tag)

  const famousTagNames = toFamousTagNames(allTagNames, 32)

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="flex text-3xl font-bold tracking-tight">
          <span>{props.params.search}</span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {famousTagNames.map((tagName) => (
          <Link href={`/tags/${tagName}`} key={tagName}>
            <TagBadge>{tagName}</TagBadge>
          </Link>
        ))}
      </div>
      <div className="grid gap-4">
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
