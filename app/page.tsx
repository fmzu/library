import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { toFamousTagNames } from "@/app/_utils/to-famous-tag-names"
import { Separator } from "@/components/ui/separator"
import { config } from "@/lib/config"
import { database } from "@/lib/database"
import Link from "next/link"

export default async function Home() {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
    },
    take: 128,
    orderBy: { stargazers_count: "desc" },
  })

  const allTagNames = repositories.flatMap((repository) => repository.tag_names)

  const famousTagNames = toFamousTagNames(allTagNames)

  const hotTags = Array.from(config.keys())

  return (
    <main className="space-y-4 container">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {hotTags.map((tagName) => (
            <Link href={`/tags/${tagName}`} key={tagName}>
              <TagBadge>{tagName}</TagBadge>
            </Link>
          ))}
        </div>
      </div>
      <Separator />
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
