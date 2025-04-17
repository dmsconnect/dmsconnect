import { protectedPattern } from "@dmsconnect/constants";
import { redirect } from "react-router";
import type { Route } from "../+types/root";
import { auth, type AuthSession } from "./auth.server";

export default async function protectRoute(args: Route.LoaderArgs) {
  const authSession = await auth.api.getSession({
    headers: args.request.headers,
  });
  const { pathname } = new URL(args.request.url);

  return checkAuthentication(authSession, pathname);
}

function checkAuthentication(
  authSession: AuthSession | null,
  pathname: string
) {
  const isProtected = protectedPattern.test(pathname);
  if (isProtected && !authSession) {
    throw redirect(`/sign-in?redirect=${encodeURIComponent(pathname)}`, {
      status: 307,
    });
  }
}
