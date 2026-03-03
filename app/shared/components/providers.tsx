"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import { makeStore } from "@/store/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const store = makeStore();

  return (
    <HeroUIProvider navigate={router.push}>
      <Provider store={store}>
        <SessionProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </SessionProvider>
      </Provider>
    </HeroUIProvider>
  );
}
