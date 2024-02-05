import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title: string;
  description: string;
}
export function FeatureCard({ icon, title, description }: Props) {
  return (
    <div className="bg-white border rounded-lg cursor-default p-6 w-full max-w-[500px] transition-all hover:shadow hover:-translate-y-2 lg:w-[500px]">
      <div className={"bg-neutral-200 w-fit p-3 rounded-xl"}>
        {icon && <>{icon}</>}
      </div>
      <div className="text-xl font-semibold mt-4">{title}</div>
      <div className="text-gray-600 mt-2">{description}</div>
    </div>
  );
}
