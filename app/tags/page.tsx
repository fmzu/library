import { TagCard } from "@/app/_components/tag-card"
import { database } from "@/lib/database"

export default async function Home() {
  const tags = await database.tags.findMany({
    take: 64,
    include: {
      repository: true,
      next_tags: true,
    },
  })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {"React Libraries"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div>
      {tags.map((tag) => (
        <TagCard
          key={tag.id}
          tagName={tag.name}
          nextTagNames={tag.next_tags.map((tag) => tag.slug)}
        />
      ))}
    </main>
  )
}
