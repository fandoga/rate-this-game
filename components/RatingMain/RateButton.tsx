"use client";

import { check } from "@/app/shared/utils/icons";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import { signIn } from "next-auth/react";
import React from "react";

type RateButtonProps = {
  isPressed: boolean;
  isGameSelected: boolean;
  isAuthenticated: boolean;
  isRated: boolean;
  loading: boolean;
  handleRate: () => void;
} & Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "isDisabled" | "startContent" | "children"
>;

const RateButton = ({
  isPressed,
  isGameSelected,
  isAuthenticated,
  isRated,
  loading,
  handleRate,
  className,
  ...buttonProps
}: RateButtonProps) => {
  return (
    <Button
      {...buttonProps}
      className={`transform-all shadow-pink-400/50 ${isPressed ? "shadow-lg" : ""} ${className ?? ""}`}
      color={"secondary"}
      isDisabled={!isGameSelected || isPressed}
      size="lg"
      startContent={
        isPressed ? check : loading ? <Spinner color="white" size="sm" /> : ""
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
  );
};

export default RateButton;
