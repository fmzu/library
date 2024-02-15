import { TagCard } from "@/app/_components/tag-card"
import { database } from "@/lib/database"
import Link from "next/link"

export default async function Home() {
  const tags = await database.tags.findMany({
    take: 128,
    include: {
      repository: true,
      next_tags: true,
    },
  })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{"Tags"}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.slug}`}>
            <TagCard
              key={tag.id}
              tagName={tag.name}
              nextTagNames={tag.next_tags.map((tag) => tag.slug)}
              tagSlug={tag.slug}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
