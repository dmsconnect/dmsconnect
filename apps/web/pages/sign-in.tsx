import isValidPath from "@/utils/isValidUrl";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

function SignInPage() {
  const router = useRouter();
  const { query } = router;

  const redirect =
    typeof query.redirect === "string" && isValidPath(query.redirect)
      ? query.redirect
      : undefined;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <SignIn routing="hash" withSignUp forceRedirectUrl={redirect} />
    </div>
  );
}

export default SignInPage;
