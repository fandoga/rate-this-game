import GameBlock from "@/components/GameBlock";
import RatingBlock from "@/components/RatingBlock";

export default function Home() {
  return (
    <div className="flex items-start gap-10 justify-center">
      <GameBlock />
      <RatingBlock />
    </div>
  );
}
