import type { Route } from "./+types/assistant";

export async function loader(args: Route.LoaderArgs) {}
function Assistant() {
  return <div>Assistant</div>;
}

export default Assistant;
