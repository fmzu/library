import { ProductCard } from "@/app/_components/product-card"
import { database } from "@/lib/database"

type Props = {
  params: {
    tag: string
    second: string
  }
}

export default async function Home(props: Props) {
  const repositories = await database.repositories.findMany({
    where: {
      tag_names: { hasEvery: [props.params.tag, props.params.second] },
    },
    take: 128,
    // include: {
    //   tags: true,
    // },
    orderBy: {
      stargazers_count: "desc",
    },
  })

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
          {" / "}
          {props.params.second}
        </h1>
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
