import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente NotFound', () => {
  it('Testa se a página contem um h2 com o texto...', () => {
    renderWithRouter(<NotFound />);
    const requestNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i },
      { level: 2 });
    expect(requestNotFound).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const requestNotFoundImg = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });

    expect(requestNotFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(requestNotFoundImg).toBeInTheDocument();
  });
});
