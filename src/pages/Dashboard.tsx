import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { useState, useEffect } from "react";

interface User {
  avatarUrl: string;
  name: string;
  email: string;
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}

export default Dashboard;
