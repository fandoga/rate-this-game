import GamesList from "@/components/GamesList";
import RatingBlock from "@/components/RatingBlock";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <div className="flex items-start justify-around">
      <GamesList />
      <RatingBlock />
    </div>
  );
}
