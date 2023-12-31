import { useEffect, useState } from "react";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ky.get(`${BASE_URL}/me`, {
          credentials: "include",
        });
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, isAuth };
};
