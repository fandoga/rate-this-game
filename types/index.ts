import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// RAWG shared types
export interface RawgGame {
  id: number;
  name: string;
  slug: string;
  released?: string;
  background_image?: string;
  rating?: number;
  score: number;
}

export interface RawgPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
