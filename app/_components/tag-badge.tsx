import { Badge } from "@/components/ui/badge"

type Props = {
  children: string
}

export const TagBadge = (props: Props) => {
  return <Badge>{props.children}</Badge>
}
