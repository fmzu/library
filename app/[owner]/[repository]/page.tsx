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

  return null
}
