import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Testa se o card contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Testa se ao clicar no link, é feito o redirecionamento da aplicação', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const detailsText = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(detailsText).toHaveTextContent('Pikachu Details');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const checked = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checked);

    const favoritesIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoritesIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritesIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
// Modificação para commit requisito 6 (Falha da AWS)
