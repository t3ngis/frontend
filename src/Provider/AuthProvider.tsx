"use client";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";

import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Router from "next/router";

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
  token: string | null;
  setToken: Dispatch<SetStateAction<null | string>>;
};

type decodedTokenType = {
  data: User;
};

const AuthContext = createContext<context | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      const decodedToken: decodedTokenType = jwtDecode(localToken);
      setUser(decodedToken.data);
    } else {
      router.push("../login");
    }
  }, []);

  const values = {
    user: user,
    setUser: setUser,
    token: token,
    setToken: setToken,
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
