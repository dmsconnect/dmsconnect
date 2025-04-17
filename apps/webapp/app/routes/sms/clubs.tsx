import type { Route } from "./+types/clubs";

export async function loader(args: Route.LoaderArgs) {}

function ClubsPage() {
  return <div>Clubs</div>;
}

export default ClubsPage;
