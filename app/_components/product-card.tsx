import { TagBadge } from "@/app/_components/tag-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

type Props = {
  name: string
  description: string
  starCount: number
  createdAt: string
  tagNames: string[]
  ownerLogin: string
  imageUrl: string | null
}

export const ProductCard = (props: Props) => {
  const tagNames = props.tagNames.slice(0, 3)

  return (
    <Card>
      <img
        className="w-full h-64 object-cover"
        src={props.imageUrl || "https://via.placeholder.com/300"}
        alt={props.name}
      />
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="text-base">{`${props.ownerLogin}/${props.name}`}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* <div className="flex space-x-2 items-center">
          <div className="flex space-x-0 items-center">
            <Star className="mr-2 w-4" />
            <p>{props.starCount}</p>
          </div>
          <div className="flex space-x-2">
            <p>{props.createdAt}</p>
          </div>
        </div> */}
        <div className="flex flex-wrap gap-1">
          {tagNames.map((tagName) => (
            <Link key={tagName} href={`/tags/${tagName}`}>
              <TagBadge tagName={tagName} />
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Link
          className="flex-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${props.ownerLogin}/${props.name}`}
        >
          <Button className="w-full">{"GitHub"}</Button>
        </Link>
        <Link href={`/${props.ownerLogin}/${props.name}`}>
          <Button variant={"secondary"}>{"View"}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
