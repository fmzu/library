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
import { Star } from "lucide-react"
import Link from "next/link"

type Props = {
  name: string
  description: string
  starCount: number
  updatedAt: string
  tagNames: string[]
  ownerLogin: string
  imageUrl: string | null
  homepageUrl: string | null
}

export const ProductCard = (props: Props) => {
  const tagNames = props.tagNames.slice(0, 3)

  const remainingTags = Math.max(0, props.tagNames.length - 3)

  return (
    <Card>
      <img
        className="w-full h-64 object-cover"
        src={props.imageUrl || "https://via.placeholder.com/300"}
        alt={props.name}
      />
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="text-base text-nowrap overflow-hidden text-ellipsis">{`${props.ownerLogin}/${props.name}`}</CardTitle>
          <CardDescription className="whitespace-break-spaces md:h-[60px] overflow-hidden">
            {props.description}
          </CardDescription>
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
              <TagBadge>{tagName}</TagBadge>
            </Link>
          ))}
          {remainingTags > 0 && (
            <div>
              <TagBadge>{`+${remainingTags}`}</TagBadge>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span>{`最終更新日:${props.updatedAt}`}</span>
          <div className="flex space-x-2 items-center">
            <Star />
            <span>{props.starCount}</span>
          </div>
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
        {props.homepageUrl && (
          <Link
            className="flex-1"
            target="_blank"
            rel="noopener noreferrer"
            href={props.homepageUrl}
          >
            <Button className="w-full">{"Webサイト"}</Button>
          </Link>
        )}
        <Link href={`/${props.ownerLogin}/${props.name}`}>
          <Button variant={"secondary"}>{"詳細"}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
