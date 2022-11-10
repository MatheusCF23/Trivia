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

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
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
    await screen.findByText('Game');
    expect(history.location.pathname).toBe('/game');
  });

  test('test click settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });
});