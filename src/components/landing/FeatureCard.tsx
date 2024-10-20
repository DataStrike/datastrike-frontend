import { ReactNode } from "react";
import {HeroVideoDialog} from "@/components/ui/hero-video-dialog";
interface Props {
  icon?: ReactNode;
  title: string;
  description: string;
  url_video?: string;
}
export default function FeatureCard({ icon, title, description, url_video }: Props) {
  return (
    <div className="bg-white border rounded-lg cursor-default p-6 w-full max-w-[500px] transition-all hover:shadow hover:-translate-y-2">
      <div className={"bg-neutral-200 w-fit p-3 rounded-xl"}>
        {icon && <>{icon}</>}
      </div>
      <div className="text-xl font-semibold mt-4">{title}</div>
      <div className="text-gray-600 mt-2">{description}</div>
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc={url_video}
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
