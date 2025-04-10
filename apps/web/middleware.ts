import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NavigationConfigs } from "@dmsconnect/constants";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(
  NavigationConfigs.map((navConfig) => `${navConfig.href}(.*)`)
);

function handleRouteAuthentication(
  sessionClaims: CustomJwtSessionClaims | null,
  req: NextRequest
) {
  if (isProtectedRoute(req) && !sessionClaims) {
    console.error("Authentication Redirect ->", req.nextUrl.pathname);
    return NextResponse.redirect(
      `${req.nextUrl.origin}?redirect=${req.nextUrl.pathname}&promptLogin=true`
    );
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
