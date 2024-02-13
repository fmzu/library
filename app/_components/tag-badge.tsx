import { Badge } from "@/components/ui/badge"

type Props = {
  tagName: string
}

export const TagBadge = (props: Props) => {
  return <Badge>{props.tagName}</Badge>
}
