import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";

interface User {
  avatarUrl: string;
  name: string;
  email: string;
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await ky.get(`${BASE_URL}/logout`, {
        credentials: "include",
      });
      setUser(null);
      // redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getMe = async () => {
    try {
      setLoading(true);
      const res = await ky
        .get(`${BASE_URL}/me`, {
          credentials: "include",
        })
        .json<User>();

      setUser(res);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <img src={user.avatarUrl} alt={user.name} />
          <p>{user.name}</p>
        </div>
      )}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default Dashboard;
