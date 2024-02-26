import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { toFamousTagNames } from "@/app/_utils/to-famous-tag-names"
import { database } from "@/lib/database"
import Link from "next/link"

export default async function Home() {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
    },
    take: 128,
    // include: { tags: true },
    orderBy: { stargazers_count: "desc" },
  })

  const allTagNames = repositories.flatMap((repository) => repository.tag_names)

  const famousTagNames = toFamousTagNames(allTagNames)

  return (
    <main className="p-6 space-y-4">
      {/* <div className="space-y-4">
        <h1 className="flex text-3xl font-bold tracking-tight">
          <span>{"Libraries"}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {"自分のスタイルに合わせていろいろなライブラリが探せます。"}
        </p>
      </div> */}
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
