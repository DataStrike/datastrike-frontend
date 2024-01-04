import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-24">
      <h1 className="text-5xl font-semibold">Datastrike</h1>
      <h2 className="text-lg mt-2">Best analysis and results tracking tool</h2>
      <Separator className="w-80 my-4" />
      <div className="flex flex-col items-center gap-2">
        <ButtonWithIcon
          icon={"google"}
          label={"Login with Google"}
          route={"google"}
        />
        <ButtonWithIcon
          icon={"discord"}
          label={"Login with Discord"}
          route={"discord"}
        />
      </div>
    </div>
  );
};

export default Home;
