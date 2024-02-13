import { database } from "@/lib/database"

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
        name: props.params.repository,
        owner_login: props.params.owner,
      },
    },

    include: { tags: true },
  })
  console.log(repository)

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {repository?.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {repository?.description}
        </p>
      </div>
    </main>
  )
}
