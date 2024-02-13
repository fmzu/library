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
}

export const ProductCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{props.name}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-2 items-center">
        <div className="flex space-x-2">
          <Star />
          <p>{props.starCount}</p>
        </div>
        <div className="flex space-x-2">
          <p>{props.createdAt}</p>
        </div>
      </CardContent>
    </Card>
  )
}
