import { Fragment, ReactNode } from "react";
interface Props {
  children: ReactNode;
  title: string;
}
export function TableContainer({ children, title }: Props) {
  return (
    <div className="flex flex-grow flex-col gap-1">
      <span className="text-xl font-bold">{title}</span>
      <Fragment>{children}</Fragment>
    </div>
  );
}
