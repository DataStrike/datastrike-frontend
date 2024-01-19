import { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  label: string;
  route: string;
  isSelected: boolean;
  onNavigate: (newPath: string) => void;
}

export function NavbarButton(props: Props) {
  const handleClick = () => {
    props.onNavigate(props.route);
  };
  return (
    <Link to={props.route} className="text-white w-full rounded-lg flex hover:bg-neutral-900 hover:text-white">
      <Button
        variant={"ghost"}
        className={`w-full h-fit ${props.isSelected ? 'bg-neutral-900 text-white pointer-events-none' : 'hover:bg-neutral-900 hover:text-white'}`}
        onClick={handleClick}

      >
        <div className="flex text-md flex-col font-bold items-center justify-center gap-2 pt-1">
          <span>{props.children}</span>
          <span>{props.label}</span>
        </div>
      </Button>
    </Link>
  );
}
