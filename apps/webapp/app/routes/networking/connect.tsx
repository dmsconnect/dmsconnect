import type { Route } from "./+types/connect";

export async function loader(args: Route.LoaderArgs) {}
function ConnectPage() {
  return <div>Connect</div>;
}

export default ConnectPage;
