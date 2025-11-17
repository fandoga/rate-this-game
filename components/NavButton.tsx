import { Link } from "@heroui/link";
import React from "react";

interface NavButtonProps {
  href: string;
  svg: string;
}

const NavButton: React.FC<NavButtonProps> = ({ href, svg }) => {
  return (
    <Link
      className="flex items-center justify-center transition-all duration-300 bg-default-100 rounded-full w-10 h-10 hover:scale-110 hover:shadow-lg shadow-indigo-500/70"
      href={href}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={svg} />
      </svg>
    </Link>
  );
};

export default NavButton;
