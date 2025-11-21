import { Dispatch, SetStateAction, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// RAWG shared types
export interface RawgGame {
  id: number;
  name: string;
  description_raw: string;
  slug: string;
  platforms?: [
    {
      platform: {
        slug: string;
      };
    },
  ];
  released?: string;
  background_image?: string;
  rating?: number;
  score: number;
  ratings_count: number;
}

export interface RatedGameType {
  id: number;
  name: string;
  bg_img: string;
  rating: {
    story: number;
    visual: number;
    gameplay: number;
    tech: number;
    sub: number;
    summary: number;
  };
}

export interface RawgPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

type ScoreKey = "Story" | "Visual" | "Gameplay" | "Tech" | "Sub";

export type SliderConfig = {
  key: ScoreKey;
  label: string;
  className?: string;
  setter: Dispatch<SetStateAction<number>>;
  value: number;
  color?: "secondary" | "primary";
};
