import { ReactNode } from "react";
import StepCard from "@/components/landing/StepCard";
import FeatureCard from "@/components/landing/FeatureCard.tsx";
import { ScatterChart, TableIcon, UsersRoundIcon } from "lucide-react";
import create_team from "@/assets/create.png";
import join_team from "@/assets/join_team.png";
import explore from "@/assets/explore.png";

import { cn } from "@/lib/utils";

interface Step {
  stepTitle: string;
  description: string;
  img: string;
}

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  url_video?: string;
}

const STEPS: Step[] = [
  {
    stepTitle: "Create a team",
    description:
      "Create a team on the Teams page. Just give it a name and you're good to go.",
    img: create_team,
  },
  {
    stepTitle: "Invite your mates",
    description:
      "Share the code of your team to your friends so they can join it.",
    img: join_team,
  },
  {
    stepTitle: "Explore",
    description:
      "Explore the tool and enjoy the features we've built for you. If you need help, you can read our Documentation or join us on Discord.",
    img: explore,
  },
];

const FEATURES: Feature[] = [
  {
    title: "Tracker",
    description:
      "Track your latest results easily with our easy-to-use interface. Stats and charts are automatically displayed for you so you can focus on your game.",
    icon: <TableIcon size={48} />,
    url_video: "https://www.youtube.com/embed/Vll_PC9GouU"
  },
  {
    title: "Analysis",
    description:
      "Our brand new analysis tool allows you to analyze your games in depth. All you have to do is import the file generated by your game and we'll do the rest.",
    icon: <ScatterChart size={48} />,
    url_video: "https://www.youtube.com/embed/jhBMSz3cXec"
  },
  {
    title: "Teams",
    description:
      "Exhausted to create a team by your own ? No worries, we got you covered. You can create a team and invite your mates to join it.",
    icon: <UsersRoundIcon size={48} />,
  },
];

interface Props<T extends Feature | Step> {
  title: string;
  description: string;
  data: T[];
  renderItem: (item: T & { key: number }) => ReactNode;
}

const StepSection = ({ title, description, data, renderItem }: Props<Step>) => (
  <div>
    <div className="flex flex-col items-center gap-2 w-full">
      <h2 className="text-4xl text-center font-bold">{title}</h2>
      <h3 className="opacity-60 text-center">{description}</h3>
    </div>
    <div className="grid grid-cols-1 justify-items-center gap-8 mt-8 lg:grid-cols-3 lg:content-center">
      {data.map((item: Step, index) => renderItem({ ...item, key: index }))}
    </div>
  </div>
);

const FeatureSection = ({
  title,
  description,
  data,
  renderItem,
}: Props<Feature>) => (
  <div>
    <div className="flex flex-col items-center gap-2 w-full">
      <h2 className="text-4xl text-center font-bold">{title}</h2>
      <h3 className="opacity-60 text-center">{description}</h3>
    </div>
    <div className="grid grid-cols-1 justify-items-center gap-8 mt-8 lg:grid-cols-3 lg:content-center">
      {data.map((item: Feature, index) => renderItem({ ...item, key: index }))}
    </div>
  </div>
);

const BenefitsSection = () => (
  <div className="flex flex-col items-center gap-4 w-full my-2">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md transition-all hover:shadow hover:scale-105 duration-200">
        <h3 className="text-2xl font-semibold mb-4">Real-time Performance Monitoring</h3>
        <p className="text-base opacity-70">
          Instantly track and visualize your data after each match. Stay on top of your performance with charts and stats that are auto-updated after every game.
        </p>
      </div>
      
      <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md transition-all hover:shadow hover:scale-105 duration-200">
        <h3 className="text-2xl font-semibold mb-4">Customizable Analysis</h3>
        <p className="text-base opacity-70">
          Dive as deep as you want—choose from general overviews or detailed, tactical insights to fine-tune your gameplay. Analyze individual performances or team-wide strategies.
        </p>
      </div>

      <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md transition-all hover:shadow hover:scale-105 duration-200">
        <h3 className="text-2xl font-semibold mb-4">Seamless Team Collaboration</h3>
        <p className="text-base opacity-70">
          Manage your team effortlessly. Whether you're competing casually or climbing the ranks, keep everyone on the same page with shared data and performance comparisons.
        </p>
      </div>

      <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md transition-all hover:shadow hover:scale-105 duration-200">
        <h3 className="text-2xl font-semibold mb-4">Constant Updates</h3>
        <p className="text-base opacity-70">
          Our tools evolve with the game, ensuring you're always ahead of the competition. We're constantly refining our features based on community feedback and Overwatch's meta.
        </p>
      </div>
    </div>

    <p className="text-center mt-10">
      Whether you're aiming for the top ranks or just want to improve with every game, Datastrike is here to elevate your Overwatch experience.
    </p>
  </div>
);

const DiscordSection = () => (
  <div className="flex flex-col items-center gap-4 w-full my-12  bg-gray-100 p-6 rounded-lg shadow-md">
    <h2 className="text-4xl font-bold text-center">Join Our Discord Community!</h2>
    <p className="text-lg text-center max-w-3xl opacity-70">
      Connect with fellow players, share strategies, and stay updated on the latest features and improvements. Our Discord community is the perfect place to get feedback, suggest new ideas, and join discussions with other passionate gamers.
    </p>
    <a
      href="https://discord.gg/geaCjtY6" // Remplacez par votre lien Discord
      target="_blank"
      rel="noopener noreferrer"
      className="bg-neutral-900 text-white px-4 py-2 rounded-md mt-4 hover:bg-neutral-800 transition duration-200"
    >
      Join Now
    </a>
  </div>
);

const MainComponent = () => (
  <div className="flex flex-col gap-20 mt-40 w-full">
    <FeatureSection
      title="Main features"
      description="Here's a quick overview of our core features. Feel free to dive into our tool to explore our tool. If you need help or want new stuff, you can join our Discord."
      data={FEATURES}
      renderItem={(feature: Feature & { key: number }) => (
        <div>
        <FeatureCard
          key={feature.key}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          url_video={feature.url_video}
        />
      </div>
        
      )}
    />

<BenefitsSection />
<StepSection
      title="Team Management – Build, Grow, Dominate"
      description="Tired of managing teams solo? Datastrike takes the hassle out of team management. Create and customize your own team hub, invite your friends, and track the entire squad’s performance all in one place. Whether you’re planning strategies or comparing player stats, building a top-tier team has never been easier.
    Focus on winning, we’ll take care of the rest."
      data={STEPS}
      renderItem={(step: Step & { key: number }) => (
        <StepCard
          key={step.key}
          stepNumber={step.key + 1}
          stepTitle={step.stepTitle}
          description={step.description}
          img={step.img}
        />
      )}
    />
<DiscordSection />
  </div>
);

export default MainComponent;
