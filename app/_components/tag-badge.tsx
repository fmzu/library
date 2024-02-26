import { Badge } from "@/components/ui/badge"

type Props = {
  children: string
}

export const TagBadge = (props: Props) => {
  return <Badge variant={"secondary"}>{props.children}</Badge>
}
