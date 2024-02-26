import { TagCard } from "@/app/_components/tag-card"
import { toFamousTagNames } from "@/app/_utils/to-famous-tag-names"
import { database } from "@/lib/database"
import Link from "next/link"

export default async function Home() {
  const repositories = await database.repositories.findMany({
    where: {
      is_deleted: false,
    },
    take: 1024,
    orderBy: { stargazers_count: "desc" },
    select: {
      tag_names: true,
    },
  })

  const allTagNames = repositories.flatMap((repository) => repository.tag_names)

  const famousTagNames = toFamousTagNames(allTagNames)

  const tags = famousTagNames.map((tag) => {
    const relatedRepositories = repositories.filter((repository) =>
      repository.tag_names.includes(tag),
    )
    const relatedTagNames = relatedRepositories
      .flatMap((repository) => repository.tag_names)
      .filter((tagName) => tagName !== tag)
    const famousRelatedTagNames = toFamousTagNames(relatedTagNames)
    return {
      name: tag,
      relatedTagNames: famousRelatedTagNames,
    }
  })

  console.log(tags)

  return (
    <main className="p-6 space-y-4">
      {/* <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{"Tags"}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div> */}
      <div className="flex flex-col space-y-2">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name}`}>
            <TagCard
              tagName={tag.name}
              nextTagNames={tag.relatedTagNames}
              tagSlug={tag.name}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
