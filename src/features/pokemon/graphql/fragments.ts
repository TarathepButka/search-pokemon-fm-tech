import { gql } from "@apollo/client";

export const POKEMON_SUMMARY_FRAGMENT = gql`
  fragment PokemonSummaryFields on Pokemon {
    id
    number
    name
    image
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP

    weight {
      minimum
      maximum
    }

    height {
      minimum
      maximum
    }

    evolutions {
      id
      name
    }
  }
`;

export const POKEMON_DETAIL_FRAGMENT = gql`
  fragment PokemonDetailFields on Pokemon {
    ...PokemonSummaryFields

    attacks {
      fast {
        name
        type
        damage
      }

      special {
        name
        type
        damage
      }
    }
  }
  ${POKEMON_SUMMARY_FRAGMENT}
`;
