import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";
import tracker from "@/assets/tracker.png";
import { FeatureCard } from "@/components/landing/FeatureCard.tsx";
import { ScatterChart, UsersRoundIcon, TableIcon } from "lucide-react";
import overwatch from "@/assets/overwatch.svg";
import { Button } from "@/components/ui/button.tsx";
const FEATURES = [
  {
    title: "Tracker",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: <TableIcon size={48} />,
  },
  {
    title: "Analysis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    icon: <ScatterChart size={48} />,
  },
  {
    title: "Teams",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    icon: <UsersRoundIcon size={48} />,
  },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 m-auto w-4/5 overflow-y-auto xl:w-3/5">
      <nav className="h-24 font-bold flex items-center justify-between p-4">
        <div className={"flex items-center gap-3"}>
          <img src={overwatch} alt="Datastrike" className="w-10 h-10" />
          <span className="text-lg">Datastrike</span>
        </div>
        <div className={"flex gap-8"}>
          <Button className={"text-md font-bold"} variant={"link"}>
            Features
          </Button>
          <Button className={"text-md font-bold"} variant={"link"}>
            Doc
          </Button>
        </div>
      </nav>

      <div className="mt-24">
        <div className="h-[40vh]">
          <h1 className="text-6xl font-semibold">Datastrike</h1>
          <h2 className="text-lg mt-2">
            Best analysis and results tracking tool
          </h2>
          <div
            className={
              "bg-blue-900 hidden absolute top-32 right-0 lg:block lg:w-[500px] xl:w-[670px]"
            }
          >
            <img src={tracker} alt="tracker" className={"object-fill"} />
          </div>
          <Separator className="w-80 my-4" />
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

        <div>
          <div className={"lg:mt-48 flex flex-col items-center gap-2 w-full"}>
            <h2 className="text-4xl text-center">Our main features</h2>
            <h3 className="opacity-60 text-center">
              Here's a quick overview of our core features. Feel free to dive
              into our tool to explore the other features. <br /> If you need
              help or want new stuff, you can join{" "}
              <a href={""} className={"font-semibold"}>
                our Discord
              </a>
              .
            </h3>
          </div>
          <div
            className={
              "flex flex-col w-full justify-center items-center gap-6 mt-8 lg:flex-row lg:items-stretch"
            }
          >
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
        <footer className="h-48 mt-16 absolute w-full left-0 border-t bg-gray-50"></footer>
      </div>
    </div>
  );
};

export default Home;
