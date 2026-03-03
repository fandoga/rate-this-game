"use client";

import { signIn } from "next-auth/react";

import NavButton from "./NavButton";
import Search from "./Search";

import { useGameRatings } from "@/app/shared/hooks/useGameRatings";

const NavBar = () => {
  const { isAuthenticated, session } = useGameRatings();

  console.log(session, isAuthenticated);

  return (
    <div className="flex justify-between w-full gap-2 mx-auto px-10 pb-4 pt-4 bg-gray items-center">
      <NavButton href="/" />
      <Search />
      {isAuthenticated ? (
        <NavButton href="/profile" img={session?.user.image} />
      ) : (
        <button className="cursor-pointer" onClick={() => signIn("google")}>
          Sign in
        </button>
      )}
    </div>
  );
};

export default NavBar;
