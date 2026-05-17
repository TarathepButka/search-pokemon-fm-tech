"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useState } from "react";
import { ThemeProvider } from "next-themes";

import { getApolloClient } from "@/lib/apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => getApolloClient());

  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
