"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@dmsconnect/ui/button";
import { Skeleton } from "@dmsconnect/ui/skeleton";

function UserNavSection() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <Skeleton className="min-h-8 rounded-xl"></Skeleton>;
  if (isLoaded && user) {
    return <>{user.fullName}</>;
  }

  return (
    <SignInButton mode="modal" withSignUp>
      <Button>Sign Up / Login</Button>
    </SignInButton>
  );
}

export default UserNavSection;
