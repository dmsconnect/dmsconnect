import { NavigationConfigs } from "@dmsconnect/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@dmsconnect/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@dmsconnect/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function MainNav() {
  return (
    <SidebarContent>
      {NavigationConfigs.map((navItem, index) => {
        if (!navItem.subModules || navItem.subModules.length === 0) {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={navItem.href}
                        className="!text-base font-semibold"
                      >
                        {navItem.moduleTitle}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        }
        return (
          <Collapsible key={index} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="!text-base font-semibold">
                  {navItem.moduleTitle}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItem.subModules &&
                      navItem.subModules.map((subModule, index) => {
                        return (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                              <Link href={`${navItem.href}${subModule.href}`}>
                                {subModule.moduleTitle}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}
    </SidebarContent>
  );
}

export default MainNav;
