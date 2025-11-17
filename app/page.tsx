import GameBlock from "@/components/GameBlock";
import RatingBlock from "@/components/RatingBlock";

export default function Home() {
  return (
    <div className="flex items-stretch gap-10 justify-center min-h-130 w-full">
      <GameBlock />
      <RatingBlock />
    </div>
  );
}
