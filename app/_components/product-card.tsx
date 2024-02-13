import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star } from "lucide-react"

type Props = {
  name: string
  description: string
  starCount: number
  createdAt: string
  tagNames: string[]
}

export const ProductCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{props.name}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {props.tagNames.map((tagName) => (
            <Badge key={tagName}>{tagName}</Badge>
          ))}
        </div>
        <div className="flex space-x-2 ">
          <div className="flex space-x-2 items-center">
            <Star />
            <p>{props.starCount}</p>
          </div>
          <div className="flex space-x-2">
            <p>{props.createdAt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
