import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByText(/this application simulates a pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokemon = screen.getByRole('heading',
      { name: /about pokédex/i },
      { level: 2 });
    expect(aboutPokemon).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo1 = screen.getByText(/this application simulates a pokédex, a/i);
    const pokedexInfo2 = screen.getByText(/one can filter pokémons by type, and see/i);
    const pokemonParagraphs = [pokedexInfo1, pokedexInfo2];
    expect(pokemonParagraphs).toHaveLength(2);
  });

  // noção de toHaveAttribute retirada de https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  it('Testa se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
// get all by tag p, e verifica a length, pra ver se tem dois parágrafos
