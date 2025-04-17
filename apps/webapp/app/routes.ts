import { NavigationConfigs } from "@dmsconnect/constants";
import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";
export default [
  index("routes/index.tsx"),
  route("/error", "routes/error.tsx"),
  route("/sign-in", "routes/sign-in.tsx"),
  route("/api/auth/*?", "routes/api/auth.ts"),
  ...NavigationConfigs.flatMap((moduleConfig) => {
    if (moduleConfig.subModules) {
      return prefix(moduleConfig.href, [
        index(`routes/${moduleConfig.href}/index.tsx`),
        ...moduleConfig.subModules.map((subModule) =>
          route(
            subModule.href,
            `routes/${moduleConfig.href}${subModule.href}.tsx`
          )
        ),
      ]);
    } else {
      return route(moduleConfig.href, `routes${moduleConfig.href}.tsx`);
    }
  }),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
