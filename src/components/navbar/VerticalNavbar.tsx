import { TableIcon } from "@radix-ui/react-icons";
import {
  FileLineChart,
  ScatterChart,
  UserIcon,
  UsersRoundIcon,
} from "lucide-react";
import { NavbarButton } from "@/components/navbar/NavbarButton.tsx";
import { User } from "@/models/models.ts";
import overwatch from "@/assets/overwatch.svg";
import { useState } from "react";

interface Props {
  user: User | null;
}
export function VerticalNavbar(props: Props) {
  const [selected, setSelected] = useState<string>(window.location.pathname);
  const handleNavigation = (newPath: string) => {
    setSelected(newPath);
    // Optionally, you can perform other actions related to navigation here
  };

  return (
    <div className="bg-neutral-800 w-40 h-full p-2 flex flex-col">
      <div className="flex justify-center pt-4">
        <img src={overwatch} alt="Datastrike" className="w-10 h-10 " />
      </div>

      <div className="flex flex-col items-start gap-1.5 mt-12 text-white">
        <NavbarButton
          isSelected={selected === "/tracker"}
          label="Tracker"
          route="/tracker"
          onNavigate={handleNavigation}
        >
          <TableIcon className="w-6 h-6" />
        </NavbarButton>
        <NavbarButton
          isSelected={selected === "/analysis"}
          label="Analysis"
          route="/analysis"
          onNavigate={handleNavigation}
        >
          <ScatterChart className="w-6 h-6" />
        </NavbarButton>
        <NavbarButton
          isSelected={selected === "/scouting"}
          label="Scouting"
          route="/scouting"
          onNavigate={handleNavigation}
        >
          <FileLineChart className="w-6 h-6" />
        </NavbarButton>
        <NavbarButton
          isSelected={selected === "/teams"}
          label="Teams"
          route="/teams"
          onNavigate={handleNavigation}
        >
          <UsersRoundIcon className="w-6 h-6" />
        </NavbarButton>
        <NavbarButton
          isSelected={selected === "/profile"}
          label="Profile"
          route="/profile"
          onNavigate={handleNavigation}
        >
          <UserIcon className="w-6 h-6" />
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
      </div>
    </div>
  );
}
