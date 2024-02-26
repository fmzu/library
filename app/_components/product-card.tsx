import { TagBadge } from "@/app/_components/tag-badge"
import { daysAgo } from "@/app/_utils/days-ago"
import { formatNumber } from "@/app/_utils/format-number"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { differenceInYears } from "date-fns"
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
  const a = 5

  const tagNames = props.tagNames.slice(0, a)

  const remainingTags = Math.max(0, props.tagNames.length - a)

  const updatedAtDate = new Date(props.updatedAt)

  const isUpdatedMoreThanOneYearsAgo =
    differenceInYears(new Date(), updatedAtDate) >= 1

  return (
    <Card
      className={cn({
        "bg-gray-300 dark:bg-card": isUpdatedMoreThanOneYearsAgo,
      })}
    >
      {/* <img
        className="w-full h-64 object-cover"
        src={props.imageUrl || "https://via.placeholder.com/300"}
        alt={props.name}
      /> */}
      <CardHeader>
        <CardTitle
          className={cn("text-nowrap overflow-hidden text-ellipsis", {
            "dark:text-gray-500": isUpdatedMoreThanOneYearsAgo,
          })}
        >{`${props.ownerLogin}/${props.name}`}</CardTitle>
        <CardDescription
          className={cn("whitespace-break-spaces md:h-[60px] overflow-hidden", {
            "dark:text-gray-500": isUpdatedMoreThanOneYearsAgo,
          })}
        >
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
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
          <span className="text-sm">
            {`最終更新日:${daysAgo(new Date(props.updatedAt))}`}
          </span>
          <div className="flex items-center">
            <Star className="mr-2 w-4" />
            <span className="text-sm">{formatNumber(props.starCount)}</span>
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
            <Button className="w-full" variant={"secondary"}>
              {"Webサイト"}
            </Button>
          </Link>
        )}
        <Link href={`/${props.ownerLogin}/${props.name}`}>
          <Button variant={"secondary"}>{"詳細"}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
