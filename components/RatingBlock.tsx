"use client";

import { Slider } from "@heroui/slider";
import { Button } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";

const RatingBlock = () => {
  const dispatch = useAppDispatch();
  const { rating } = useAppSelector((state) => state.rateSlice);
  const { setScore } = rateSlice.actions;
  const [Story, setStory] = useState<any>(4);
  const [Visual, setVisual] = useState<any>(4);
  const [Gameplay, setGameplay] = useState<any>(4);
  const [Tech, setTech] = useState<any>(4);

  useEffect(() => {
    dispatch(
      setScore(Math.floor(((Story + Visual + Gameplay + Tech) * 10) / 4))
    );
  }, [Story, Visual, Gameplay, Tech]);

  return (
    <div className="fixed">
      <div>
        <h2 className="text-4xl font-semibold mb-16">test</h2>
      </div>
      <div className="inline-grid grid-rows-2 grid-cols-2 gap-x-20 gap-y-8 items-center w-fit">
        <Slider
          onChange={(val) => setStory(val)}
          className="w-md"
          defaultValue={4}
          label="Сюжет"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setVisual(val)}
          className="w-md"
          defaultValue={4}
          label="Визуал"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setGameplay(val)}
          className="w-md"
          defaultValue={4}
          label="Геймплей"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
        <Slider
          onChange={(val) => setTech(val)}
          className="w-md"
          defaultValue={4}
          label="Тех. часть"
          color="secondary"
          maxValue={10}
          minValue={1}
          step={1}
        />
      </div>
      <div className="flex mt-20 justify-between">
        <h1 className="text-7xl font-bold">{rating.score ?? 40}</h1>
        <Button size="lg" color="secondary">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default RatingBlock;
