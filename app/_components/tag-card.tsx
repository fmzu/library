import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  tagName: string
  nextTagNames: string[]
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
            <Badge key={tagName}>{tagName}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
