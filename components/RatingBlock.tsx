"use client";

import { Slider } from "@heroui/slider";
import { Button } from "@heroui/react";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";

const RatingBlock = () => {
  const dispatch = useAppDispatch();
  const { setScore } = rateSlice.actions;

  const [Story, setStory] = useState<any>(4);
  const [Visual, setVisual] = useState<any>(4);
  const [Gameplay, setGameplay] = useState<any>(4);
  const [Tech, setTech] = useState<any>(4);

  const resultValue: number = useMemo(() => {
    return Math.floor(((Story + Visual + Gameplay + Tech) * 10) / 4);
  }, [Story, Visual, Gameplay, Tech]);

  return (
    <div className="bg-gray h-140 p-7 rounded-lg w-fit">
      <div>
        <h2 className="text-3xl font-semibold mb-16">Make a review</h2>
      </div>
      <div className="inline-grid grid-rows-2 grid-cols-2 gap-x-20 gap-y-8 items-center">
        <Slider
          onChange={(val) => setStory(val)}
          className="w-sm"
          defaultValue={4}
          label="Сюжет"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setVisual(val)}
          className="w-sm"
          defaultValue={4}
          label="Визуал"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setGameplay(val)}
          className="w-sm"
          defaultValue={4}
          label="Геймплей"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setTech(val)}
          className="w-sm"
          defaultValue={4}
          label="Тех. часть"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
      </div>
      <div className="flex mt-20 justify-between">
        <h1 className="text-7xl font-bold">{resultValue ?? 40}</h1>
        <Button
          size="lg"
          color="secondary"
          onClick={() => dispatch(setScore(resultValue))}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default RatingBlock;
