import React from "react";
import FeatureCard from "@/components/landing/FeatureCard"; // Assurez-vous que ce chemin est correct.

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  url_video?: string;
  thumbnail?: string;
  rowSpan?: number; // Nombre de lignes que la carte occupera
  colSpan?: number; // Nombre de colonnes que la carte occupera
}

interface FeatureGridProps {
  features: Feature[];
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`col-span-${feature.colSpan ?? 1} row-span-${feature.rowSpan ?? 1}`}
        >
          <FeatureCard
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            thumbnail={feature.thumbnail}
            url_video={feature.url_video}
          />
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
