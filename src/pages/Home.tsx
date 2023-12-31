import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-8">
      <h1 className="text-4xl font-semibold mb-3">Login</h1>
      <div className="flex gap-2">
        <ButtonWithIcon icon={"google"} label={"Google"} route={"google"} />
        <ButtonWithIcon icon={"discord"} label={"Discord"} route={"discord"} />
      </div>
    </div>
  );
};

export default Home;
