"use client";

import { Tooltip } from "@heroui/tooltip";
import React, { useState } from "react";
import { GameType } from "../types";

interface MobileTooltipType {
  className: string;
  content: string;
  spanClass: string;
  data: GameType[keyof GameType] | string;
}

const MobileTooltip: React.FC<MobileTooltipType> = ({
  className,
  content,
  spanClass,
  data,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Tooltip isOpen={isOpen} className={className} content={content}>
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={spanClass}
      >
        {data}
      </span>
    </Tooltip>
  );
};

export default MobileTooltip;
