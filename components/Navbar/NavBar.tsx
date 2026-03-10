"use client";

import { signIn, signOut } from "next-auth/react";
import NavButton from "./NavButton";
import Search from "./Search";
import { useGameRatings } from "@/app/shared/hooks/useGameRatings";
import { Button } from "@heroui/button";
import { LogOut } from "@/app/shared/utils/icons";

const NavBar = () => {
  const { isAuthenticated, session } = useGameRatings();

  return (
    <div className="flex justify-between w-full gap-2 mx-auto px-10 pb-4 pt-4 bg-gray items-center">
      <NavButton href="/" />
      <Search />
      {isAuthenticated ? (
        <>
          <NavButton href="/profile" img={session?.user.image} />
          <div className="group fixed bottom-6 right-6">
            <Button
              startContent={<LogOut />}
              radius="full"
              className="opacity-40 text-red-100 transition-all duration-300"
              color="danger"
              onClick={() => signOut()}
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all ease-linear duration-600 group-hover:max-w-[200px]">
                Выйти
              </span>
            </Button>
          </div>
        </>
      ) : (
        <Button className="cursor-pointer" onClick={() => signIn("google")}>
          Войти
        </Button>
      )}
    </div>
  );
};

export default NavBar;
