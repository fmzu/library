import { TagBadge } from "@/app/_components/tag-badge"
import { database } from "@/lib/database"
import Link from "next/link"

type Props = {
  params: {
    owner: string
    repository: string
  }
}

export default async function Home(props: Props) {
  const repository = await database.repositories.findUnique({
    where: {
      name_owner_login: {
        owner_login: props.params.owner,
        name: props.params.repository,
      },
    },
    include: { tags: true },
  })

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {repository?.name}
        </h1>
        <div className="space-x-1">
          {repository?.tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <TagBadge key={tag.id}>{tag.name}</TagBadge>
            </Link>
          ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          {repository?.description}
        </p>
      </div>
    </main>
  )
}
