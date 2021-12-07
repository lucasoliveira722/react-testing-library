import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// Código efetuado com ajuda do Jonatas Passos, parte por conversa direta e parte por observar o código dele

describe('Testes do componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { level: 2 });
    expect(encountered).toBeInTheDocument();
  });

  it('Teste se tem botão com texto Próximo Pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('Teste se os próximos pokemons são mostrados ao clicar', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();

    userEvent.click(nextButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const totalButtons = 7;
    const typeFilters = screen.queryAllByTestId('pokemon-type-button');
    expect(typeFilters.length).toEqual(totalButtons);

    const arrButton = typeFilters.map((button) => button.textContent);
    const newArr = [...new Set(arrButton)];
    expect(newArr).toEqual(arrButton);
  });

  it('Ao clicar, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const psychicTypeButton = screen.getByRole('button', {
      name: /psychic/i,
    });

    userEvent.click(psychicTypeButton);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(alakazam).toBeInTheDocument();
  });

  it('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);

    const bugButton = screen.getByRole('button', {
      name: /bug/i,
    });
    userEvent.click(bugButton);

    const textBug = screen.getByTestId('pokemon-type');
    expect(textBug).toHaveTextContent('Bug');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toHaveTextContent('All');

    const pikachu = screen.getByTestId('pokemon-type');
    expect(pikachu).toHaveTextContent('Electric');

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);

    const charmander = screen.getByTestId(/^pokemon-type$/i);
    expect(charmander).toHaveTextContent('Fire');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toHaveTextContent(/all/i);

    const normalButton = screen.getByRole('button', {
      name: /normal/i,
    });
    userEvent.click(allButton);
    expect(normalButton).toBeInTheDocument();
  });
});
