import { Tooltip } from "@heroui/tooltip";
import { RatedGameType } from "@/types";

const RatingSpan = ({ game }: { game: RatedGameType }) => {
  const isGOAT = game.rating.summary === 100;

  return (
    <div className="rating flex items-center gap-6 mr-1">
      <div className="text-shadow-lg text-shadow-purple-600/20 flex gap-5 text-4xl font-semibold text-purple-500">
        <Tooltip className="text-purple-500" content="Сюжет">
          <span className="inline-flex w-6 justify-center cursor-default transition-all hover:scale-120">
            {game.rating.story}
          </span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Визуал">
          <span className="inline-flex w-6 justify-center cursor-default transition-all hover:scale-120">
            {game.rating.visual}
          </span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Геймплей">
          <span className="inline-flex w-6 justify-center cursor-default transition-all hover:scale-120">
            {game.rating.gameplay}
          </span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Тех. часть">
          <span className="inline-flex w-6 justify-center cursor-default transition-all hover:scale-120">
            {game.rating.tech}
          </span>
        </Tooltip>
      </div>
      <div
        className={`flex items-center shadow-lg justify-center ${isGOAT ? "bg-yellow-500 shadow-yellow-300 w-24 h-24" : "bg-blue-900 shadow-blue-800 w-22 h-22"} rounded-full`}
      >
        <h2 className="text-5xl font-bold">{game.rating.summary}</h2>
      </div>
    </div>
  );
};

export default RatingSpan;
