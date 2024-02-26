"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export const HeaderNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* <NavigationMenuLink
            href={"/tags"}
            className={navigationMenuTriggerStyle()}
          >
            {"Tags"}
          </NavigationMenuLink> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
