"use client";

import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { Spinner } from "@heroui/spinner";
import { useGameRatings } from "../hooks/useGameRatings";

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const { loading } = useGameRatings();

  return (
    <div className="relative flex flex-col h-screen">
      <NavBar />
      <main className="container mx-auto pt-26 px-6 flex-grow">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AppShell;
