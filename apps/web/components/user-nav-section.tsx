"use client";
import getInitials from "@/utils/getInitials";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
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
import { Skeleton } from "@dmsconnect/ui/skeleton";
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
function UserNavSection() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const isMobile = useIsMobile();

  if (!isLoaded) return <Skeleton className="min-h-9"></Skeleton>;
  if (isLoaded && user) {
    const initials = getInitials(
      user.fullName ?? user.firstName ?? user.username ?? ""
    ).toUpperCase();
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
                    {(
                      user.fullName ??
                      user.firstName ??
                      user.username ??
                      ""
                    ).toUpperCase()}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.primaryEmailAddress?.emailAddress}
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
                      {(
                        user.fullName ??
                        user.firstName ??
                        user.username ??
                        ""
                      ).toUpperCase()}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
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
    <SignInButton mode="modal" withSignUp>
      <Button variant="ghost">Sign Up / Login</Button>
    </SignInButton>
  );
}

export default UserNavSection;
