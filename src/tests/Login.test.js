import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { questionsResponse } from './mocks/questions';
import { tokenResponse } from './mocks/token';

describe('testing pg Login ', () => {
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
  jest.setTimeout(3000)
  test('validate inputs and disabled button play', async() => {
    jest.resetAllMocks();
   // <---------------- Mock do token valido e questions ---------------->
   jest.spyOn(global, "fetch");
   global.fetch.mockResolvedValueOnce({
     json: jest.fn().mockResolvedValue(tokenResponse),
   });

   jest.spyOn(global, "fetch");
   global.fetch.mockResolvedValueOnce({
     json: jest.fn().mockResolvedValue(questionsResponse),
   });
   // <---------------- Mock do token valido e questions ---------------->

    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay =  screen.getByRole('button', { name: 'Play' });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, 'Gabriela');
    userEvent.type(inputEmail, 'trybe@test.com');
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout : 2000})
// ...
    // await new Promise((resolverOuter) => { setTimeout(resolverOuter, 150); });
    // await screen.findByTestId('header-score');
    // expect(history.location.pathname).toBe('/game');
  });

  test('test click settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });
});