import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";
import tracer from "@/assets/tracer.png";
import logo from "@/assets/logo.png";
import FooterCategory from "@/components/landing/FooterCategory.tsx";
import MainComponent from "@/components/landing/MainComponent.tsx";
import {GradualSpacing} from "@/components/ui/gradual-spacing";
import { SparklesCore } from "@/components/ui/sparkles";
import { NumberTicker } from "@/components/ui/number-ticket";



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

          <span className="text-3xl">Datastrike</span>
        </div>
        <div className={"flex gap-8"}></div>
      </nav>
      
      <div className="mt-24 mb-20">
        
      <div className="mt-24 mb-20 flex flex-col items-center justify-center">
      <div className="w-full absolute inset-0 h-screen" style={{zIndex: -1}}>
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={2}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#FFFFFF"

          
        />
      </div>
        <div className="h-[40vh]">
          <GradualSpacing
        className="font-display text-center text-6xl font-semibold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
        text="Unlock Your"
        duration={1}
        />
        <GradualSpacing
        className="font-display text-center text-6xl font-semibold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
        text="Overwatch Potential."
        duration={1.5}
        delay={0.5}
        />
        
          <h2 className="text-lg mt-2 w-1/2 ml-3">
          Take control of your performance with the best analysis and results tracking tool. All your data, insights, and team management in one place. With Datastrike, dominate the game with actionable insights and intuitive tools designed for gamers like you.
          </h2>
          <div
            className={
              "bg-blue-900 hidden absolute top-32 rounded-lg right-0 lg:block lg:w-[500px] xl:w-[670px]"
            }
          >
            
          </div>
          <Separator className="w-1/2 my-6" />
          <div className="flex flex-row items-start gap-16 ml-20">
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
          
          <div className="flex flex-col items-start ml-40 mt-10">
          <div className="flex flex-row items-start gap-4 mb-8 items-center">
            <p className="text-6xl font-bold text-blue-600 transition-transform duration-300 hover:scale-105">
              <NumberTicker value={278} />
            </p>
            <p className="text-4xl text-gray-700 font-medium">Users</p>
          </div>

          <div className="flex flex-row items-start gap-4 items-center">
            <p className="text-5xl font-bold text-blue-600 transition-transform duration-300 hover:scale-105">
              <NumberTicker value={111} />
            </p>
            <p className="text-4xl text-gray-700 font-medium">Teams</p>
          </div>
          </div>
          
        </div>
           
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tracer})`,
         filter: 'brightness(1)',
         opacity: 0.9,
         backgroundSize: '85%',
         backgroundRepeat: 'no-repeat',
         transform: 'translate(100px, -30px)',
         zIndex: -2,
        }} // width: '100%' n'est pas nécessaire ici
         />

        </div>

        <div className="flex flex-col mt- gap-24 lg:mt-48 w">
          <MainComponent />
        </div>
        <footer className="h-fit absolute w-full left-0 border-t bg-gray-50">
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
