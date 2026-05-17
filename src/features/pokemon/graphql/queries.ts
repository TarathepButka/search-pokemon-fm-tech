import { gql } from "@apollo/client";

import { POKEMON_DETAIL_FRAGMENT, POKEMON_SUMMARY_FRAGMENT } from "./fragments";

export const POKEMONS_QUERY = gql`
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      ...PokemonSummaryFields
    }
  }
  ${POKEMON_SUMMARY_FRAGMENT}
`;

export const POKEMON_QUERY = gql`
  query Pokemon($name: String) {
    pokemon(name: $name) {
      ...PokemonDetailFields
    }
  }
  ${POKEMON_DETAIL_FRAGMENT}
`;
