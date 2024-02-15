import { TagBadge } from "@/app/_components/tag-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Props = {
  tagName: string
  nextTagNames: string[]
  tagSlug: string
}

export const TagCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{props.tagName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {props.nextTagNames.map((tagName) => (
            <Link href={`/tags/${tagName}`} key={tagName}>
              <TagBadge>{tagName}</TagBadge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
