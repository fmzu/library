import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const ProductCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{"@dnd-kit/utilities"}</CardTitle>
        <CardDescription>
          {
            "Utilities for building beautiful, accessible, and resilient drag and drop interfaces with React."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 grid gap-2">
        <div className="inline-flex h-6 items-center gap-2 text-xs font-medium">
          <span>{"drag-and-drop"}</span>
          <span>{"utilities"}</span>
          <span>{"resilient"}</span>
        </div>
      </CardContent>
    </Card>
  )
}
