import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout,getme } from "../services/auth.api";

export const useauth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useauth must be used inside AuthProvider");
  }

  const { user, setuser, loading, setloading } = context;

  const handlelogin = async ({ email, password }) => {
    try {
      setloading(true);
      const data = await login({ email, password });

      if (data?.user) {
        setuser(data.user);
      }

      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      setloading(false);
    }
  };

  const handleregister = async ({ username, email, password }) => {
    try {
      setloading(true);
      const data = await register({ username, email, password });

      if (data?.user) {
        setuser(data.user);
      }

      return data;
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    } finally {
      setloading(false);
    }
  };

  const handlelogout = async () => {
    try {
      setloading(true);
      await logout();
      setuser(null);
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    } finally {
      setloading(false);
    }
  };

  const handlegetme = async () => {
    try {
      setloading(true);
      const data = await getme();
      if (data?.user) {
        setuser(data.user);
      }
      return data;
    } catch (err) {
      console.error("Get me error:", err);
      throw err;
    } finally {
      setloading(false);
    }
  };

  return {
    user,
    loading,
    handlelogin,
    handleregister,
    handlelogout,
    handlegetme,
  };
};