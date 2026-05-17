"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app";

let browserClient: ReturnType<typeof createApolloClient> | undefined;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
    cache: new InMemoryCache({
      typePolicies: {
        Pokemon: {
          keyFields: ["id"],
        },
        Query: {
          fields: {
            pokemons: {
              keyArgs: ["first"],
              merge(_existing, incoming) {
                return incoming;
              },
            },
            pokemon: {
              keyArgs: ["name"],
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
      },
      query: {
        fetchPolicy: "cache-first",
      },
    },
  });
}

export function getApolloClient() {
  if (typeof window === "undefined") {
    return createApolloClient();
  }

  if (!browserClient) {
    browserClient = createApolloClient();
  }

  return browserClient;
}
