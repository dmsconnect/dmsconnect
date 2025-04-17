import type { Route } from "./+types/index";

export async function loader(args: Route.LoaderArgs) {}
function SmsPage() {
  return <div>SmsPage</div>;
}

export default SmsPage;
