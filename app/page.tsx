import GameBlock from "@/components/GameBlock";
import OpenningModal from "@/components/OpenningModal";
import RatingBlock from "@/components/RatingBlock";

export default function Home() {
  return (
    <div className="flex items-stretch gap-10 justify-center min-h-130 w-full">
      <OpenningModal/>
      <GameBlock />
      <RatingBlock />
    </div>
  );
}
