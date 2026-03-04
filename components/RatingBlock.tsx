"use client";

import { Slider } from "@heroui/slider";
import { Button } from "@heroui/react";
import { useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/shared/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import { SliderConfig } from "@/app/shared/types";
import { useGameRatings } from "@/app/shared/hooks/useGameRatings";
import { signIn } from "next-auth/react";

const RatingBlock = () => {
  const { rateGame, isAuthenticated } = useGameRatings();
  const dispatch = useAppDispatch();
  const { setScore } = rateSlice.actions;
  const { game } = useAppSelector((state) => state.rateSlice);

  const [Story, setStory] = useState<number>(4);
  const [Visual, setVisual] = useState<number>(4);
  const [Gameplay, setGameplay] = useState<number>(4);
  const [Tech, setTech] = useState<number>(4);
  const [Sub, setSub] = useState<number>(4);

  const [isPressed, setPress] = useState(false);

  const handleRate = async () => {
    // Можно оставить возможность оценивать без входа (localStorage)
    // Или заставить войти:
    // if (!isAuthenticated) {
    //   signIn('google')
    //   return
    // }

    await rateGame({
      gameId: String(game.id),
      gameName: game.name,
      gameImage: game.background_image || "",
      rating: {
        story: Story,
        visual: Visual,
        gameplay: Gameplay,
        tech: Tech,
        sub: Sub,
        summary: resultValue,
      },
    });

    onPress();
    dispatch(setScore(resultValue));
  };

  const check = (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4.5 12.75 6 6 9-13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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

  const isGameSelected = game.id > 0;

  const onPress = () => {
    setPress(true);
  };

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
              className={className ?? "w-full"}
              color={sliderColor}
              defaultValue={4}
              isDisabled={!isGameSelected}
              label={label}
              maxValue={10}
              minValue={1}
              step={1}
              value={value}
              onChange={(val) => {
                const nextValue = Array.isArray(val) ? (val[0] ?? value) : val;

                setter(nextValue);
              }}
            />
          );
        })}
      </div>
      <div className="flex mt-20 justify-between">
        <h1 className="text-7xl font-bold">
          {isGameSelected ? resultValue : "..."}
        </h1>
        <Button
          className={`transform-all shadow-pink-400/50 ${isPressed ? "shadow-lg" : ""}`}
          color={"secondary"}
          isDisabled={!isGameSelected || isPressed}
          size="lg"
          startContent={isPressed ? check : ""}
          onClick={() => {
            if (isAuthenticated) {
              handleRate();
            } else {
              signIn("google");
            }
          }}
        >
          {isAuthenticated
            ? isPressed
              ? "Оценка принята"
              : "Подтвердить"
            : "Сначала войти"}
        </Button>
      </div>
    </div>
  );
};

export default RatingBlock;
