import { GameBlock, OpenningModal, RatingBlock } from "@/components";

export default function Home() {
  return (
    <div className="flex items-stretch pt-26 gap-10 justify-center min-h-130 w-full">
      <OpenningModal />
      <GameBlock />
      <RatingBlock />
    </div>
  );
}
