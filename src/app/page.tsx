import { HomeClient } from "@/components/pokemon/HomeClient";

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <HomeClient
      initialQuery={
        typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : ""
      }
      initialType={
        typeof resolvedSearchParams.type === "string"
          ? resolvedSearchParams.type
          : ""
      }
    />
  );
}
