import { useEffect, useState } from "react";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { User } from "@/models/models.ts";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user: User = await ky
          .get(`${BASE_URL}/me`, {
            credentials: "include",
          })
          .json();
        setIsAuth(true);
        setUser(user);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, isAuth, user };
};
