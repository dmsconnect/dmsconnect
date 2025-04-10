import { NavigationConfigs } from "@dmsconnect/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@dmsconnect/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dmsconnect/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/router";

function HeaderBreadcrumb() {
  const router = useRouter();
  const [_, modulePath, subModulePath] = router.pathname.split("/");

  const currentModule = NavigationConfigs.find(
    (navConfig) => navConfig.href.slice(1) === modulePath
  );
  const currentSubModule =
    currentModule &&
    currentModule.subModules &&
    currentModule.subModules.find(
      (subNavConfig) => subNavConfig.href.slice(1) === subModulePath
    );

  const isValid =
    currentModule &&
    ((currentModule.subModules && currentSubModule) ||
      !currentModule.subModules);

  if (isValid) {
    return (
      <Breadcrumb className="flex flex-row flex-1 items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              {!currentModule.subModules ? (
                <Link
                  href={currentModule.href}
                  className="text-sm font-medium leading-none"
                >
                  {currentModule.moduleTitle}
                </Link>
              ) : (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <p className="text-sm font-medium leading-none">
                      {currentModule.moduleTitle}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {currentModule.subModules.map((subModules, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link href={`${currentModule.href}${subModules.href}`}>
                          {subModules.moduleTitle}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentSubModule && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`${currentModule.href}${currentSubModule.href}`}>
                    {currentSubModule.moduleTitle}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
}

export default HeaderBreadcrumb;
