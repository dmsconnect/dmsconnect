import {
  NavigationConfigs,
  type INavigationConfig,
} from "@dmsconnect/constants";

export default function getCurrentModule(pathname: string) {
  return findModule(NavigationConfigs, pathname);
}

function findModule(
  configs: INavigationConfig[],
  path: string
): INavigationConfig | undefined {
  for (const config of configs) {
    // Exact match or starts with submodule prefix
    if (path === config.href || path.startsWith(config.href + "/")) {
      // Try to find a deeper subModule match
      const subMatch = config.subModules
        ? findModule(config.subModules, path)
        : undefined;
      return subMatch ?? config;
    }
  }
  return undefined;
}
