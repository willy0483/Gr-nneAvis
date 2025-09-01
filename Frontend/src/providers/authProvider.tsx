import { useEffect, useState } from "react";
import { AuthContext } from "../lib/utils";
import { BACKEND_URL } from "@/lib/constants";
import { useNavigate } from "@tanstack/react-router";
import type { Session } from "@/lib/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("session");

    if (sessionData) {
      try {
        const parsedUserData: Session = JSON.parse(sessionData);
        setLoginData(parsedUserData);
      } catch (error) {
        console.error("Error parsing userData:", error);
        setLoginData(null);
      }
    } else {
      setLoginData(null);
    }
    setLoading(false);
  }, []);

  const createSession = (payload: Session): boolean => {
    setLoginData(payload);
    sessionStorage.setItem("session", JSON.stringify(payload));
    return true;
  };

  const logout = (): boolean => {
    setLoginData(null);
    sessionStorage.removeItem("session");
    return true;
  };

  const checkAuth = async (): Promise<boolean> => {
    const sessionData = sessionStorage.getItem("session");

    if (!sessionData) {
      logout();
      navigate({ to: "/login" });
    }

    let user: Session | null = null;
    try {
      if (sessionData) {
        user = JSON.parse(sessionData);
      } else {
        logout();
        navigate({ to: "/login" });
        return false;
      }
    } catch (error) {
      console.error("Error parsing session data:", error);
      logout();
      navigate({ to: "/login" });
      return false;
    }

    if (!user?.refreshToken) {
      logout();
      navigate({ to: "/login" });
      return false;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.refreshToken}`,
        },
      });

      if (!response.ok) {
        logout();
        navigate({ to: "/login" });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error verifying auth:", error);
      logout();
      navigate({ to: "/login" });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginData, loading, createSession, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
