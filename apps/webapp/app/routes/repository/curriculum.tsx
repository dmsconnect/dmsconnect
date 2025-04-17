import type { Route } from "./+types/curriculum";

export async function loader(args: Route.LoaderArgs) {}
function Curriculum() {
  return <div>Curriculum</div>;
}

export default Curriculum;
