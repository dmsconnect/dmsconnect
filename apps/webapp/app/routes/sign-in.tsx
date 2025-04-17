import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { auth } from "@/lib/auth.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dmsconnect/ui/tabs";
import { redirect } from "react-router";
import type { Route } from "./+types/sign-in";

export async function loader(args: Route.LoaderArgs) {
  const authSession = await auth.api.getSession({
    headers: args.request.headers,
  });
  if (authSession) {
    throw redirect("/");
  }
}
function TabPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabPage;
