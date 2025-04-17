import HeaderBreadcrumb from "@/components/header-breadcrumb";
import MainNav from "@/components/main-nav";
import NavigationProgress from "@/components/navigation-progress";
import UserNav from "@/components/user-nav";
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

import {
  isRouteErrorResponse,
  Link,
  useOutlet,
  useRouteError,
} from "react-router";

function RootLayout({ showUserNav }: { showUserNav?: boolean }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className="flex flex-row items-center gap-2">
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
        <SidebarFooter className="">{showUserNav && <UserNav />}</SidebarFooter>
      </Sidebar>
      <SidebarInset className="max-h-[calc(100svh-16px)] overflow-y-auto overflow-x-hidden flex flex-col flex-1 p-2">
        <header className="flex flex-row  min-h-8">
          <SidebarTrigger />
          <HeaderBreadcrumb />
        </header>
        <NavigationProgress />

        <div className="flex flex-col flex-1">
          <ErrorBoundaryWrapper></ErrorBoundaryWrapper>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function ErrorBoundaryWrapper() {
  const outlet = useOutlet();
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  if (!outlet) {
    return (
      <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    );
  }
  return outlet;
}

export default RootLayout;
