"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { setScaleMode } from "@/app/shared/utils/localStorage";

interface ScaleDropdownProps {
  mode: "medium" | "small" | "big";
  setter: Dispatch<SetStateAction<"medium" | "small" | "big">>;
}

const ScaleDropdown: React.FC<ScaleDropdownProps> = ({ mode, setter }) => {
  const labelMap: Record<"medium" | "small" | "big", string> = {
    medium: "Средние значки",
    small: "Мелкие значки",
    big: "Крупные значки",
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-transparent w-40">{labelMap[mode]}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as "medium" | "small" | "big";
          setter(key);
          setScaleMode(key);
        }}
      >
        <DropdownItem key="big">Крупные значки</DropdownItem>
        <DropdownItem key="medium">Средние значки</DropdownItem>
        <DropdownItem key="small">Мелкие значки</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ScaleDropdown;
