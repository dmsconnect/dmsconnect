import type { Route } from "./+types/notes";

export async function loader(args: Route.LoaderArgs) {}
function NotesPage() {
  return <div>NotesPage</div>;
}

export default NotesPage;
