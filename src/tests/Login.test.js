import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('testing clicks', () => {
  test('the page should have two inputs e two buttons', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    const imgRosa = screen.getByAltText('interrogação rosa');
    const imgAzul = screen.getByAltText('interrogação azul');
    const imgVerde = screen.getByAltText('interrogação verde');
    const imgAmarelo = screen.getByAltText('interrogação amarelo');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
    expect(imgRosa).toBeInTheDocument();
    expect(imgAzul).toBeInTheDocument();
    expect(imgVerde).toBeInTheDocument();
    expect(imgAmarelo).toBeInTheDocument();
  });
});

describe('testing clicks', () => {
  test('validate inputs and disabled button play', async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay =  screen.getByRole('button', { name: 'Play' });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, 'Gabriela');
    userEvent.type(inputEmail, 'trybe@test.com');
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    // await waitFor(() => expect(screen.getByText("Settings")).toBeInTheDocument(), {timeout: 2000,});
    // await screen.findByText('Settings')
    await screen.findByTestId('header-score');
    expect(history.location.pathname).toBe('/game');
  });

  test('test click settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });
});