import { useAuth } from "@/hooks/providers/auth-client";
import getInitials from "@/utils/getInitials";
import { Avatar, AvatarFallback } from "@dmsconnect/ui/avatar";
import { Button } from "@dmsconnect/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dmsconnect/ui/dropdown-menu";
import { useIsMobile } from "@dmsconnect/ui/hooks/use-mobile";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@dmsconnect/ui/sidebar";

import {
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import { Link } from "react-router";

function UserNav() {
  const isMobile = useIsMobile();
  const { isLoading, user, signOut } = useAuth();

  if (!isLoading && user) {
    const initials = getInitials(user.name ?? "").toUpperCase();
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <SidebarMenuButton asChild>
              <DropdownMenuTrigger className="flex flex-row items-center justify-between !pl-0 gap-2 w-full rounded-2xl focus-visible:ring-2 ring-sidebar-ring">
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {(user.name ?? "").toUpperCase()}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <MoreVerticalIcon className="ml-auto size-4" />
              </DropdownMenuTrigger>
            </SidebarMenuButton>
            <DropdownMenuContent
              className="min-w-72 p-2 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {(user.name ?? "").toUpperCase()}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/account">
                    <UserCircleIcon />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
  return (
    <Button variant="ghost" asChild>
      <Link to={`/sign-in`}>Sign Up / Login</Link>
    </Button>
  );
}

export default UserNav;
