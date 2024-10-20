import { ReactNode } from "react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface Props {
  icon?: ReactNode;
  title: string;
  description: string;
  url_video?: string;
  thumbnail?: string;
}

export default function FeatureCard({ icon, title, description, url_video, thumbnail }: Props) {
  return (
    <div className="bg-white border rounded-lg cursor-default p-6 w-full max-w-[500px] transition-all hover:shadow hover:-translate-y-2">
      <div className="flex gap-4">
        <div className="bg-white w-fit p-3 rounded-xl">
          {icon && <>{icon}</>}
        </div>
        <div className="text-4xl font-semibold mt-4">{title}</div>
      </div>
      <div className="text-gray-600 test-l mt-2 mb-4">{description}</div>
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc={url_video}
        thumbnailSrc={thumbnail}
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
