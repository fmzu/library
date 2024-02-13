import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

type Props = {
  name: string
  description: string
  starCount: number
  createdAt: string
  tagNames: string[]
  ownerLogin: string
}

export const ProductCard = (props: Props) => {
  const tagNames = props.tagNames.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{`${props.ownerLogin}/${props.name}`}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-0 items-center">
            <Star className="mr-2 w-4" />
            <p>{props.starCount}</p>
          </div>
          <div className="flex space-x-2">
            <p>{props.createdAt}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {tagNames.map((tagName) => (
            <Badge key={tagName}>{tagName}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/${props.ownerLogin}/${props.name}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
