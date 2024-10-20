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
import {AnimatedGradientText} from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col gap-2 m-auto w-4/5 overflow-y-auto overflow-x-hidden xl:w-4/5">
  <div className=" ">
    <div className=" flex flex-col items-center justify-center min-h-screen ">
      <div className="absolute inset-0 w-full h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={2}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${tracer})`,
            filter: 'brightness(1)',
            opacity: 0.9,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
          }}
        />
      </div>
    
    <div className=" z-10 relative"> {/* Ajout de z-10 pour le niveau supérieur */}
      <AnimatedGradientText>
        <span
          className={cn(
            `inline font-overwatch animate-gradient bg-gradient-to-r from-[#ed9b2f] via-[#ffd94f] to-[#ed9b2f] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent xl:text-9xl sm:text-2xl tracking-widest mb-10`,
          )}
        >
          Datastrike
        </span>
      </AnimatedGradientText>
      <GradualSpacing
        className="font-display text-center font-semibold -tracking-widest  text-black dark:text-white md:text-6xl sm:text-2xl md:leading-[5rem] "
        text="Unlock Your"
        duration={1}
      />
      <GradualSpacing
        className="font-display text-center font-semibold -tracking-widest  text-black dark:text-white md:text-6xl sm:text-2xl md:leading-[5rem]"
        text="Overwatch Potential."
        duration={1.5}
        delay={0.5}
      />
      
      <h2 className="mt-2 w-1/2 mt-8 md:text-xl sm:text-s">
        Take control of your performance with the best analysis and results tracking tool. All your data, insights, and team management in one place. With Datastrike, dominate the game with actionable insights and intuitive tools designed for gamers like you.
      </h2>
      <div className={"bg-blue-900 hidden absolute top-32 rounded-lg right-0 lg:block lg:w-[500px] xl:w-[670px]"} />
      <Separator className="w-1/2 my-6" />
      <div className="flex flex-row items-start gap-16 mt-16">
        <div className="flex flex-col gap-8">
          <ButtonWithIcon
            icon={"google"}
            label={"Login with Google"}
            route={"google"}
          /> 
          <div className="flex flex-row items-start gap-4 items-center align-items-center">
            <p className="xl:text-6xl sm:text-2xl font-bold text-blue-600 transition-transform duration-300 hover:scale-105">
              <NumberTicker value={278} />
            </p>
            <p className="xl:text-4xl sm:text-2xl text-gray-700 font-medium">Users</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8 align-items-center">
        <ButtonWithIcon
          icon={"discord"}
          label={"Login with Discord"}
          route={"discord"}
        />

        <div className="flex flex-row items-start gap-4 items-center">
          <p className="xl:text-6xl sm:text-2xl font-bold text-blue-600 transition-transform duration-300 hover:scale-105">
            <NumberTicker value={111} />
          </p>
          <p className="xl:text-4xl sm:text-2xl text-gray-700 font-medium">Teams</p>
        </div>

      </div>
      </div>
     
    </div>
  </div>

  <div className="flex flex-col gap-24 w">
    <MainComponent />
  </div>

  <footer className="h-fit mt-8 absolute w-full left-0 border-t bg-gray-50">
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
