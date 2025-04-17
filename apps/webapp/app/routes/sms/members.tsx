import type { Route } from "./+types/members";

export async function loader(args: Route.LoaderArgs) {}
function MembersPage() {
  return <div>MembersPage</div>;
}

export default MembersPage;
