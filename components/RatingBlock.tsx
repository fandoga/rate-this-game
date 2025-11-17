"use client";

import { Slider } from "@heroui/slider";
import { Button } from "@heroui/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import { saveRatedGame } from "@/utils/localStorage";
import { SliderConfig } from "@/types";

const RatingBlock = () => {
  const dispatch = useAppDispatch();
  const { setScore } = rateSlice.actions;
  const { game } = useAppSelector((state) => state.rateSlice);

  const [Story, setStory] = useState<number>(4);
  const [Visual, setVisual] = useState<number>(4);
  const [Gameplay, setGameplay] = useState<number>(4);
  const [Tech, setTech] = useState<number>(4);
  const [Sub, setSub] = useState<number>(4);

  const sliders: SliderConfig[] = [
    {
      key: "Story",
      label: "Сюжет",
      setter: setStory,
      value: Story,
    },
    {
      key: "Visual",
      label: "Визуал",
      setter: setVisual,
      value: Visual,
    },
    {
      key: "Gameplay",
      label: "Геймплей",
      setter: setGameplay,
      value: Gameplay,
    },
    {
      key: "Tech",
      label: "Тех. часть",
      setter: setTech,
      value: Tech,
    },
    {
      key: "Sub",
      label: "Общие впечатления",
      className: "col-span-2 w-full",
      color: "primary",
      setter: setSub,
      value: Sub,
    },
  ];

  const isGameSelected = game.id > 0 ? true : false;

  const resultValue: number = useMemo(() => {
    return Math.floor((Story + Visual + Gameplay + Tech) * 1.4 + Sub * 4.4);
  }, [Story, Visual, Gameplay, Tech, Sub]);

  return (
    <div className="flex flex-col bg-gray p-7 rounded-lg w-full max-w-3xl">
      <div>
        <h2 className="text-3xl font-semibold mb-16">
          {isGameSelected ? "Оцените эту игру" : "Сначала выберети игру"}
        </h2>
      </div>
      <div className="inline-grid w-full grid-rows-2 grid-cols-2 gap-x-10 gap-y-8 items-center">
        {sliders.map(({ key, label, className, color, setter, value }) => {
          const sliderColor: "primary" | "secondary" = color ?? "secondary";

          return (
            <Slider
              key={key}
              onChange={(val) => {
                const nextValue = Array.isArray(val) ? (val[0] ?? value) : val;
                setter(nextValue);
              }}
              className={className ?? "w-full"}
              defaultValue={4}
              value={value}
              label={label}
              isDisabled={!isGameSelected}
              color={sliderColor}
              maxValue={10}
              minValue={1}
              step={1}
            />
          );
        })}
      </div>
      <div className="flex mt-20 justify-between">
        <h1 className="text-7xl font-bold">
          {isGameSelected ? resultValue : "..."}
        </h1>
        <Button
          size="lg"
          color="secondary"
          isDisabled={!isGameSelected}
          onClick={() => {
            dispatch(setScore(resultValue));
            saveRatedGame({
              id: game.id,
              name: game.name,
              bg_img: game.background_image || "",
              rating: {
                story: Story,
                visual: Visual,
                gameplay: Gameplay,
                tech: Tech,
                sub: Sub,
                summary: resultValue,
              },
            });
          }}
        >
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default RatingBlock;
