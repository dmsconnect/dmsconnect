import { useRouter } from "next/router";

function Breadcrumb() {
  const router = useRouter();
  const pathArray = router.pathname.split("/");
  return <div>{pathArray}</div>;
}

export default Breadcrumb;
