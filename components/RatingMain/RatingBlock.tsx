"use client";

import { Slider } from "@heroui/slider";
import { Button, Card } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/shared/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import { SliderConfig } from "@/app/shared/types";
import { useGameRatings } from "@/app/shared/hooks/useGameRatings";
import { signIn } from "next-auth/react";
import { check } from "@/app/shared/utils/icons";
import { Spinner } from "@heroui/spinner";

const RatingBlock = () => {
  const { rateGame, getRating, loading, isAuthenticated } = useGameRatings();
  const { game } = useAppSelector((state) => state.rateSlice);

  const [Story, setStory] = useState<number>(4);
  const [Visual, setVisual] = useState<number>(4);
  const [Gameplay, setGameplay] = useState<number>(4);
  const [Tech, setTech] = useState<number>(4);
  const [Sub, setSub] = useState<number>(4);

  const [isPressed, setPress] = useState(false);
  const [isRated, setRated] = useState(false);
  const isGameSelected = game.id > 0;

  const onGameChange = () => {
    setRated(false);
    setPress(false);
    setStory(4);
    setVisual(4);
    setGameplay(4);
    setTech(4);
    setSub(4);

    if (getRating(String(game.id)) !== null) {
      setRated(true);
    }
  };

  useEffect(() => {
    if (isGameSelected) {
      onGameChange();
    }
  }, [game.id]);

  const handleRate = async () => {
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
  };

  const sliders: SliderConfig[] = [
    {
      key: "Story",
      label: "Сюжет / Лор",
      setter: setStory,
      value: Story,
    },
    {
      key: "Visual",
      label: "Визуал / Графика",
      setter: setVisual,
      value: Visual,
    },
    {
      key: "Gameplay",
      label: "Геймплей / Аудио",
      setter: setGameplay,
      value: Gameplay,
    },
    {
      key: "Tech",
      label: "Тех. часть / Оптимизация",
      setter: setTech,
      value: Tech,
    },
    {
      key: "Sub",
      label: "Общие впечатления",
      className: "lg:col-span-2 lg:pt-0 pt-6 w-full",
      color: "primary",
      setter: setSub,
      value: Sub,
    },
  ];

  const onPress = () => {
    setPress(true);
  };

  const resultValue: number = useMemo(() => {
    return Math.floor((Story + Visual + Gameplay + Tech) * 1.4 + Sub * 4.4);
  }, [Story, Visual, Gameplay, Tech, Sub]);

  return (
    <Card className="flex flex-col bg-gray p-7 rounded-lg w-full lg:min-w-xl max-w-3xl">
      <div>
        <h2 className="text-3xl font-semibold mb-16">
          {isGameSelected ? "Оцените эту игру" : "Сначала выберети игру"}
        </h2>
      </div>
      <div className="flex flex-col lg:inline-grid w-full lg:grid-rows-2 lg:grid-cols-2 gap-x-10 gap-y-8 items-center">
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
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold">
          {isGameSelected ? resultValue : "..."}
        </h1>
        <Button
          className={`transform-all shadow-pink-400/50 ${isPressed ? "shadow-lg" : ""}`}
          color={"secondary"}
          isDisabled={!isGameSelected || isPressed}
          size="lg"
          startContent={
            isPressed ? (
              check
            ) : loading ? (
              <Spinner color="white" size="sm" />
            ) : (
              ""
            )
          }
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
              : isRated
                ? "Переоценить"
                : "Подтвердить"
            : "Войти"}
        </Button>
      </div>
    </Card>
  );
};

export default RatingBlock;
