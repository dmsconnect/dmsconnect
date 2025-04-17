import type { Route } from "./+types/tracker";

export async function loader(args: Route.LoaderArgs) {}
function Tracker() {
  return <div>Tracker</div>;
}

export default Tracker;
