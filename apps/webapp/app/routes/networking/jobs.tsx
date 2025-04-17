import type { Route } from "./+types/jobs";

export async function loader(args: Route.LoaderArgs) {}
function JobsPage() {
  return <div>JobsPage</div>;
}

export default JobsPage;
