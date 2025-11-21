"use client";

import Search from "./Search";
import NavButton from "./NavButton";

const NavBar = () => {
  const svgHome =
    "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25";
  const svgProfile =
    "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z";

  return (
    <div className="flex justify-between w-full gap-2 mx-auto px-10 pb-4 pt-4 bg-gray items-center">
      <NavButton href="/" svg={svgHome} />
      <Search />
      <NavButton href="/profile" svg={svgProfile} />
    </div>
  );
};

export default NavBar;
