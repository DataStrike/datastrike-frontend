import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
  route: string;
}
export function NavbarButton(props: Props) {
  return (
    <a
      href={props.route}
      className="text-lg flex font-semibold hover:font-black"
    >
      <div className="align-baseline w-6 h-6 mr-2">{props.children}</div>
      <span>{props.label}</span>
    </a>
  );
}
