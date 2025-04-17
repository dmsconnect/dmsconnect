import protectRoute from "@/lib/protectRoute";
import type { Route } from "./+types/live";

export async function loader(args: Route.LoaderArgs) {
  return await protectRoute(args);
}

function LivePage() {
  return <div>Live</div>;
}

export default LivePage;
