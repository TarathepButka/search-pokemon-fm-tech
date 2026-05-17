import { PokemonSummary } from '../lib/pokemon';

const bulbasaur: PokemonSummary = {
  id: 'UG9rZW1vbjowMDE=',
  number: '001',
  name: 'Bulbasaur',
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
  classification: 'Seed Pokémon',
  types: ['Grass', 'Poison'],
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  fleeRate: 0.1,
  maxCP: 951,
  maxHP: 1071,
  weight: { minimum: '6.04kg', maximum: '7.76kg' },
  height: { minimum: '0.61m', maximum: '0.79m' },
  evolutions: null,
};

const charmander: PokemonSummary = {
  id: 'UG9rZW1vbjowMDQ=',
  number: '004',
  name: 'Charmander',
  image: 'https://img.pokemondb.net/artwork/charmander.jpg',
  classification: 'Lizard Pokémon',
  types: ['Fire'],
  resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
  weaknesses: ['Water', 'Ground', 'Rock'],
  fleeRate: 0.1,
  maxCP: 841,
  maxHP: 955,
  weight: { minimum: '7.44kg', maximum: '9.56kg' },
  height: { minimum: '0.53m', maximum: '0.68m' },
  evolutions: null,
};

const squirtle: PokemonSummary = {
  id: 'UG9rZW1vbjowMDc=',
  number: '007',
  name: 'Squirtle',
  image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
  classification: 'Tiny Turtle Pokémon',
  types: ['Water'],
  resistant: ['Fire', 'Water', 'Ice', 'Steel'],
  weaknesses: ['Electric', 'Grass'],
  fleeRate: 0.1,
  maxCP: 899,
  maxHP: 1008,
  weight: { minimum: '7.88kg', maximum: '10.13kg' },
  height: { minimum: '0.44m', maximum: '0.56m' },
  evolutions: null,
};

describe('Pokemon Type Assertions', () => {
  test('Bulbasaur should have Grass type', () => {
    expect(bulbasaur.types).toContain('Grass');
  });

  test('Charmander should have Fire type', () => {
    expect(charmander.types).toContain('Fire');
  });

  test('Squirtle should have Water type', () => {
    expect(squirtle.types).toContain('Water');
  });
});
