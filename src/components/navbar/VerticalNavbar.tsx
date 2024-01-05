import { TableIcon } from "@radix-ui/react-icons";
import { LogOut, ScatterChart } from "lucide-react";
import { NavbarButton } from "@/components/navbar/NavbarButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { User } from "@/models/models.ts";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import overwatch from "@/assets/overwatch.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User | null;
}
export function VerticalNavbar(props: Props) {
  let navigate = useNavigate();
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
    <div className="bg-neutral-800 w-56 h-full mr-8 p-2 pr-8 flex flex-col">
      <div className="flex justify-end pt-4">
        <img src={overwatch} alt="Datastrike" className="w-10 h-10 " />
      </div>

      <div className="flex flex-col items-end gap-2 mt-16 text-white">
        <NavbarButton label="Tracker" route="tracker">
          <TableIcon className="w-6 h-6 mr-2" />
        </NavbarButton>
        <NavbarButton label="Analysis" route="analysis">
          <ScatterChart className="w-6 h-6 mr-2" />
        </NavbarButton>
      </div>

      <div className="text-white inline-flex justify-between items-end pl-2 mt-auto">
        <div className="flex flex-col mr-4">
          <img
            src={props.user?.avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>{props.user?.name}</div>
        </div>

        <Button onClick={logout} className="px-2 bg-red-700 hover:bg-red-800">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
