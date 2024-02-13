import { database } from "@/lib/database"

type Props = {
  params: {
    tag: string
  }
}

export default async function Home(props: Props) {
  const tag = await database.tags.findUnique({
    where: {
      slug: props.params.tag,
    },
  })
  console.log(tag)

  return (
    <main className="p-4 space-y-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{tag?.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "コミュニティによって厳選された最高の React ライブラリとパッケージを見つけてください。"
          }
        </p>
      </div>
    </main>
  )
}
