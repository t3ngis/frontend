"use client";
import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type User = {
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
};
type context = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  login: (password: string, email: string) => Promise<void>;
};

const AuthContext = createContext<context | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const values = {
    user: user,
    setUser: setUser,
    login: login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth contex buruu bna");
  }
  return authContext;
};
