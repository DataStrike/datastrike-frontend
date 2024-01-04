import { DashboardIcon } from "@radix-ui/react-icons";
import { LineChart, LogOut, ScatterChart } from "lucide-react";
import { NavbarButton } from "@/components/navbar/NavbarButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { User } from "@/models/models.ts";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

interface Props {
  user: User | null;
}
export function VerticalNavbar(props: Props) {
  const logout = async () => {
    try {
      await ky.get(`${BASE_URL}/logout`, {
        credentials: "include",
      });
      // redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="bg-neutral-800 w-56 h-full mr-8 p-2 pr-8 relative">
      <div className="flex justify-end pt-4">
        <img src="overwatch.svg" alt="Datastrike" className="w-10 h-10 " />
      </div>

      <div className="flex flex-col items-end gap-2 mt-16 text-white">
        <NavbarButton label="Dashboard" route="dashboard">
          <DashboardIcon className="align-baseline w-6 h-6 mr-2" />
        </NavbarButton>
        <NavbarButton label="Tracker" route="tracker">
          <LineChart className="w-6 h-6 mr-2" />
        </NavbarButton>
        <NavbarButton label="Analysis" route="analysis">
          <ScatterChart className="w-6 h-6 mr-2" />
        </NavbarButton>
      </div>

      <div className="text-white inline-flex justify-between items-end pl-2 w-48 absolute bottom-4">
        <div className="flex flex-col">
          <img
            src={props.user?.avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>{props.user?.name}</div>
        </div>

        <Button onClick={logout} className="p-2 bg-red-700 hover:bg-red-800">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
