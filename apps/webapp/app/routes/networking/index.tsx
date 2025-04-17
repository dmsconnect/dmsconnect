import type { Route } from "./+types/index";

export async function loader(args: Route.LoaderArgs) {}
function NetworkingPage() {
  return <div>NetworkingIndexPage</div>;
}

export default NetworkingPage;
