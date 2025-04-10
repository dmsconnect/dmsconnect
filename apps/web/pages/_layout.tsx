import HeaderBreadcrumb from "@/components/header-breadcrumb";
import MainNav from "@/components/main-nav";
import UserNavSection from "@/components/user-nav-section";
import { ApplicationConfig } from "@dmsconnect/constants";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@dmsconnect/ui/sidebar";
import { Component } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex flex-row items-center gap-2">
                  <Component />
                  <span className="text-base font-semibold">
                    {ApplicationConfig.appName}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <MainNav />
        <SidebarFooter className="">
          <UserNavSection />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="max-h-[calc(100svh-16px)] overflow-y-auto overflow-x-hidden flex flex-col flex-1 p-2">
        <header className="flex flex-row  min-h-8">
          <SidebarTrigger />
          <HeaderBreadcrumb />
        </header>
        <div className="flex flex-col flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
