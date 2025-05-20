import { createContext } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean; // ✅ Add this
  login: (user: User, token: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
