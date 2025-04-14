export const runtime = "experimental-edge";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import AuthUtilsInstance from "./utils/accessUtils";

const isProtectedRoute = createRouteMatcher(AuthUtilsInstance.protectedRoutes);

function handleRouteAuthentication(
  sessionClaims: CustomJwtSessionClaims | null,
  req: NextRequest
) {
  if (isProtectedRoute(req) && !sessionClaims) {
    const redirectUrl = `${req.nextUrl.origin}/sign-in/?redirect=${encodeURIComponent(req.nextUrl.pathname)}`;
    console.debug(
      "Authentication Redirect ->",
      req.nextUrl.pathname,
      "->",
      redirectUrl
    );
    return NextResponse.redirect(redirectUrl);
  }
}

function handleRouteProtection(
  sessionClaims: CustomJwtSessionClaims | null,
  req: NextRequest
) {
  return handleRouteAuthentication(sessionClaims, req);
}

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  const sessionClaims: CustomJwtSessionClaims | null = authObject.userId
    ? authObject.sessionClaims
    : null;

  return handleRouteProtection(sessionClaims, req) || NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
