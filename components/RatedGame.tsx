import { RatedGameType } from "@/types";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

type RatedGameProps = {
  game: RatedGameType;
};

const RatedGame: React.FC<RatedGameProps> = ({ game }) => {
  return (
    <div
      className="bg-linear-to-r from-gray to-blue-800/12 p-5 rounded-lg w-full h-90 flex items-center justify-between mb-8"
      key={game.id}
    >
      <div className="game flex items-center flex-col">
        <img
          className="w-sm h-sm rounded-lg h-64 object-cover"
          src={game.bg_img}
          alt={game.name}
        />
        <h2 className="text-4xl font-bold pt-5">{game.name}</h2>
      </div>
      <div className="rating flex items-center gap-10 mr-8">
        <div className="text-shadow-lg text-shadow-purple-600/20 flex gap-4 text-4xl font-semibold text-purple-500">
          <Tooltip className="text-purple-500" content="Сюжет">
            <span className="cursor-default transition-all hover:scale-120">
              {game.rating.story}
            </span>
          </Tooltip>
          <Tooltip className="text-purple-500" content="Визуал">
            <span className="cursor-default transition-all hover:scale-120">
              {game.rating.visual}
            </span>
          </Tooltip>
          <Tooltip className="text-purple-500" content="Геймплей">
            <span className="cursor-default transition-all hover:scale-120">
              {game.rating.gameplay}
            </span>
          </Tooltip>
          <Tooltip className="text-purple-500" content="Тех. часть">
            <span className="cursor-default transition-all hover:scale-120">
              {game.rating.tech}
            </span>
          </Tooltip>
        </div>
        <div className="flex items-center shadow-lg shadow-blue-800 justify-center bg-blue-900 rounded-full w-22 h-22">
          <h2 className="text-5xl font-bold">{game.rating.summary}</h2>
        </div>
      </div>
    </div>
  );
};

export default RatedGame;
