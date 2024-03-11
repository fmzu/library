import { ProductCard } from "@/app/_components/product-card"
import { TagBadge } from "@/app/_components/tag-badge"
import { daysAgo } from "@/app/_utils/days-ago"
import { formatNumber } from "@/app/_utils/format-number"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { database } from "@/lib/database"
import { Star } from "lucide-react"
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
  })

  const relatedRepositories = await database.repositories.findMany({
    where: {
      tag_names: {
        hasSome: repository?.tag_names,
      },
      NOT: {
        id: repository?.id,
      },
    },
    take: 128,
  })

  return (
    <main className="space-y-4 container">
      <img className="w-full" src={repository?.open_graph_image_url!} alt="" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {repository?.name}
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          {repository?.tag_names.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <TagBadge>{tag}</TagBadge>
            </Link>
          ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          {repository?.description}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">
          {`最終更新日:${daysAgo(new Date(repository?.updated_at || ""))}`}
        </span>
        <div className="flex items-center">
          <Star className="mr-2 w-4" />
          <span className="text-sm">
            {formatNumber(repository?.stargazers_count!)}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link
          className="flex-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${repository?.owner_login}/${repository?.name}`}
        >
          <Button className="w-full">{"GitHub"}</Button>
        </Link>
        {repository?.homepage_url && (
          <Link
            className="flex-1"
            target="_blank"
            rel="noopener noreferrer"
            href={repository?.homepage_url}
          >
            <Button className="w-full" variant={"secondary"}>
              {"Webサイト"}
            </Button>
          </Link>
        )}
      </div>
      <Separator />
      <div className="grid gap-4">
        {relatedRepositories.map((repository) => (
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
