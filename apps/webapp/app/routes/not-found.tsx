import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        404 | Not Found
      </p>

      <Link to="/" className="text-balance font-semibold tracking-tight">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
