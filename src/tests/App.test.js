import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente App', () => {
  it('Verifica se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const linkElement1 = screen.getByRole('link', { name: 'Home' });
    const linkElement2 = screen.getByRole('link', { name: 'About' });
    const linkElement3 = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement3).toBeInTheDocument();
  });

  it('Testa se a aplicação redireciona para a página inicial ao clicar no Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação redireciona para a página about ao clicar no About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Redirecionamento para a página de favoritos ao clicar no Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
