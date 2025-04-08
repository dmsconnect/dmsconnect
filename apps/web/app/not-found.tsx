import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h2 className="text-2xl font-semibold tracking-tight">404 | Not Found</h2>
      <Link href="/" className="text-base font-medium">
        Return Home
      </Link>
    </div>
  );
}
