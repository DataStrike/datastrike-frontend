import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await ky.get(`${BASE_URL}/logout`, {
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Profile</div>
      </div>
      <Button onClick={logout} className="px-6 w-fit bg-red-700 hover:bg-red-800">
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </Button>

    </div>
  );
}

export default ProfilePage;