import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

// import stylesheet from "@/app.css?url";
import "@/app.css";

import RootLayout from "@/layouts/root-layout";

import { ApplicationConfig } from "@dmsconnect/constants";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import AuthProvider from "./hooks/providers/auth-client";
import protectRoute from "./lib/protectRoute";

export async function loader(args: Route.LoaderArgs) {
  await protectRoute(args);
}

export const links: Route.LinksFunction = () => [
  // { rel: "stylesheet", href: stylesheet },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: ApplicationConfig.appName },
    { name: "description", content: ApplicationConfig.appDescription },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return <RootLayout showUserNav />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();

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

  useEffect(() => {
    navigate("/error", { state: { error } });
  }, [error, navigate]);

  return null;
}
