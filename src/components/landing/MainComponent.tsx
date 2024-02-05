import { ReactNode } from "react";
import StepCard from "@/components/landing/StepCard";
import FeatureCard from "@/components/landing/FeatureCard.tsx";
import { ScatterChart, TableIcon, UsersRoundIcon } from "lucide-react";
import create_team from "@/assets/create.png";
import join_team from "@/assets/join_team.png";
import explore from "@/assets/explore.png";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface Step {
  stepTitle: string;
  description: string;
  img: string;
}

const FEATURES: Feature[] = [
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

const STEPS: Step[] = [
  {
    stepTitle: "Create a team",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: create_team,
  },
  {
    stepTitle: "Invite your mates",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: join_team,
  },
  {
    stepTitle: "Explore",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: explore,
  },
];

interface Props {
  title: string;
  description: string;
  data: (Feature | Step)[];
  renderItem: (item: any) => ReactNode;
}

const Section = ({ title, description, data, renderItem }: Props) => (
  <div>
    <div className="flex flex-col items-center gap-2 w-full">
      <h2 className="text-4xl text-center">{title}</h2>
      <h3 className="opacity-60 text-center">{description}</h3>
    </div>
    <div className="grid grid-cols-1 justify-items-center gap-6 mt-8 lg:grid-cols-3 lg:content-center">
      {data.map((item: Feature | Step, index) =>
        renderItem({ ...item, key: index }),
      )}
    </div>
  </div>
);

const MainComponent = () => (
  <div className="flex flex-col gap-24">
    <Section
      title="3 steps"
      description="Some description"
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

    <Section
      title="Main features"
      description="Here's a quick overview of our core features. Feel free to dive into our tool to explore the other features. If you need help or want new stuff, you can join our Discord."
      data={FEATURES}
      renderItem={(feature: Feature & { key: number }) => (
        <FeatureCard
          key={feature.key}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      )}
    />
  </div>
);

export default MainComponent;
