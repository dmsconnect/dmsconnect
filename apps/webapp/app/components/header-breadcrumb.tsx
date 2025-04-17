import getCurrentModule from "@/utils/getCurrentModule";
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

import { Link, useLocation } from "react-router";

function HeaderBreadcrumb() {
  const { pathname } = useLocation();

  const currentModule = getCurrentModule(pathname);

  const currentSubModule =
    currentModule?.subModules &&
    currentModule.subModules?.find(
      (subModule) =>
        pathname === `${currentModule.href}${subModule.href}` ||
        pathname.startsWith(`${currentModule.href}${subModule.href}`)
    );

  if (currentModule) {
    return (
      <Breadcrumb className="flex flex-row flex-1 items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              {!currentModule.subModules ? (
                <Link
                  to={currentModule.href}
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
                        <Link to={`${currentModule.href}${subModules.href}`}>
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
                  <Link to={`${currentModule.href}${currentSubModule.href}`}>
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
