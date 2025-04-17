import { type Session, type User } from "better-auth";
import { createAuthClient } from "better-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface IAuthContext {
  authClient: ReturnType<typeof createAuthClient>;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  updateCurrentSession: (
    callback?: (data?: any) => Promise<any> | any
  ) => Promise<void>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authClient = createAuthClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { signOut } = authClient;
  const updateCurrentSession = async (
    callback?: (data?: any) => Promise<any> | any
  ) => {
    const { data, error } = await authClient.getSession();
    if (data) {
      setUser(data.user);
      setSession(data.session);
    } else {
      setUser(null);
      setSession(null);
    }
    setIsLoading(false);
    if (callback) {
      callback();
    }
  };

  const signOutWrapper = async () => {
    await signOut();
    await updateCurrentSession();
    navigate("/");
  };

  useEffect(() => {
    updateCurrentSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authClient,
        isLoading,
        session,
        user,
        updateCurrentSession,
        signOut: signOutWrapper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Hooks from Auth Client should be used inside AuthProvider"
    );
  }
  return context;
};

export default AuthProvider;

export { useAuth };
