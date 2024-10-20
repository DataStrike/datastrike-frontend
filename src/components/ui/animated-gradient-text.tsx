import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex max-w-fit flex-row items-center justify-center rounded-2xl  px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]  dark:bg-black/40",
        className,
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ed9b2f]/50 via-[#FFFFF]/50 to-[#ed9b2f]/50 bg-[length:var(--bg-size)_100%]  ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />

      {children}
    </div>
  );
}
