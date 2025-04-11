import { NavigationConfigs } from "@dmsconnect/constants";

export class AuthUtils {
  private static instance: AuthUtils;
  protectedRoutes: string[];
  private constructor() {
    const protectedRoutes: string[] = [];
    NavigationConfigs.forEach((navConfig) => {
      if (navConfig.protected) {
        protectedRoutes.push(`${navConfig.href}(.*)`);
        return;
      }
      if (Array.isArray(navConfig.subModules)) {
        navConfig.subModules.forEach((subModuleConfig) => {
          if (subModuleConfig.protected) {
            protectedRoutes.push(
              `${navConfig.href}${subModuleConfig.href}(.*)`
            );
          }
        });
      }
    });
    this.protectedRoutes = protectedRoutes;
  }

  public static getInstance() {
    if (!AuthUtils.instance) {
      AuthUtils.instance = new AuthUtils();
    }
    return AuthUtils.instance;
  }
}

const AuthUtilsInstance = AuthUtils.getInstance();
export default AuthUtilsInstance;
