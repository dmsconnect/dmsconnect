import MainNav from "@/components/mainNav";
import UserNavSection from "@/components/userNavSection";
import { ClerkProvider } from "@clerk/nextjs";
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
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMS Connect",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <Sidebar variant="inset">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link
                        href="/"
                        className="flex flex-row items-center gap-2"
                      >
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
            <SidebarInset className="max-h-[calc(100svh-16px)] overflow-scroll flex flex-col flex-1">
              <header className="flex flex-row p-2 min-h-8">
                <SidebarTrigger />
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
