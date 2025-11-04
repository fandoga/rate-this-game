"use client";

import { Input } from "@heroui/react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

const NavBar = () => {
  return (
    <div className="flex flex-col w-full pb-10 pt-10 bg-gray items-center">
      <Input
        size="sm"
        className="max-w-md"
        label="Search for games"
        type="text"
      />
    </div>
  );
};

export default NavBar;
