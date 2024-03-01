import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";
import tracker from "@/assets/tracker.png";
import logo from "@/assets/logo.png";
import FooterCategory from "@/components/landing/FooterCategory.tsx";
import MainComponent from "@/components/landing/MainComponent.tsx";

const COMMUNITY_LINKS = [
  {
    title: "Discord",
    link: "https://discord.gg/PtJ8BXuyfX",
  },
  {
    title: "Github",
    link: "https://github.com/datastrike",
  },
];

const HELP_LINKS = [
  {
    title: "Doc",
    link: "https://datastrike.github.io/datastrike-docs/",
  },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 m-auto w-4/5 overflow-y-auto overflow-x-hidden xl:w-3/5">
      <nav className="h-24 font-bold flex items-center justify-between p-4 pl-0">
        <div className={"flex items-center gap-3"}>
          <img src={logo} alt="Datastrike" className="w-10 h-10" />
          <span className="text-lg">Datastrike</span>
        </div>
        <div className={"flex gap-8"}></div>
      </nav>

      <div className="mt-24">
        <div className="h-[40vh]">
          <h1 className="text-6xl font-semibold">Explore</h1>
          <h2 className="text-lg mt-2 w-72">
            Best analysis and results tracking tool, all your data in one place.
          </h2>
          <div
            className={
              "bg-blue-900 hidden absolute top-32 rounded-lg right-0 lg:block lg:w-[500px] xl:w-[670px]"
            }
          >
            <img
              src={tracker}
              alt="tracker"
              className={"object-fill rounded-lg"}
            />
          </div>
          <Separator className="w-80 my-6" />
          <div className="flex flex-col items-start gap-2">
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

        <div className="flex flex-col mt-16 gap-24 lg:mt-48 ">
          <MainComponent />
        </div>
        <footer className="h-fit mt-16 absolute w-full left-0 border-t bg-gray-50">
          <div className="flex justify-center gap-48 w-3/5 m-auto pb-10">
            <FooterCategory title={"Help"} links={HELP_LINKS} />
            <FooterCategory title={"Community"} links={COMMUNITY_LINKS} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
