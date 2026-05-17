import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "search-pokemon-fm-tech",
    template: "%s | search-pokemon-fm-tech",
  },
  description:
    "Production Pokémon search built with Next.js, TypeScript, Apollo, and shadcn/ui.",
  icons: {
    icon: "/images/pokeball.png",
    shortcut: "/images/pokeball.png",
    apple: "/images/pokeball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground"
      >
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_38%),linear-gradient(to_bottom,rgba(15,23,42,0.03),transparent_18%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%)]">
            <Navbar />
            <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-screen-2xl flex-col px-6 pb-12 pt-24 sm:px-8 lg:px-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
