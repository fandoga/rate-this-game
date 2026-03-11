import { Tooltip } from "@heroui/tooltip";

import { GameType } from "@/app/shared/types";

const RatingSpan = ({ game }: { game: GameType }) => {
  const isGOAT = game.summary === 100;

  const textClass =
    "lg:text-4xl text-3xl inline-flex w-6 justify-center cursor-default transition-all hover:scale-120";

  return (
    <div className="rating flex items-center gap-6 mt-4 mr-1">
      <div className="text-shadow-lg text-shadow-purple-600/20 flex gap-5 text-4xl font-semibold text-purple-500">
        <Tooltip className="text-purple-500" content="Сюжет">
          <span className={textClass}>{game.story}</span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Визуал">
          <span className={textClass}>{game.visual}</span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Геймплей">
          <span className={textClass}>{game.gameplay}</span>
        </Tooltip>
        <Tooltip className="text-purple-500" content="Тех. часть">
          <span className={textClass}>{game.tech}</span>
        </Tooltip>
      </div>
      <div
        className={`flex items-center shadow-lg justify-center ${isGOAT ? "bg-yellow-500 shadow-yellow-300 lg:w-24 lg:h-24 w-19 h-19" : "bg-blue-900 shadow-blue-800 lg:w-22 lg:h-22 w-18 h-18"} rounded-full`}
      >
        <h2 className="lg:text-5xl text-4xl font-bold">{game.summary}</h2>
      </div>
    </div>
  );
};

export default RatingSpan;
