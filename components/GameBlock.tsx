"use client";

import { useAppSelector } from "@/utils/hooksRedux";

const GameBlock = () => {
  const { game } = useAppSelector((state) => state.rateSlice);

  return (
    <div>
      {game.name.length > 0 && (
        <div className="max-w-lg h-120 bg-gray p-7 rounded-lg">
          <img
            className="rounded-lg"
            src={game.background_image}
            alt={game.name}
          />
          <h1 className="pt-7 pb-4 text-[44px] font-bold">{game.name}</h1>
          <p>{game.released}</p>
        </div>
      )}
    </div>
  );
};

export default GameBlock;
