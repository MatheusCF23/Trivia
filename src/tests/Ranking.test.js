import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('testing pg Ranking ', () => {
  test('the page should have one button, redirectly home and title ranking', () => {
    const { history } = renderWithRouterAndRedux( <App /> );
    act(() => {
        history.push('/ranking');
    });
    const btnGoHome = screen.getByRole('button', { name: 'Home' });
    const title = screen.getByRole('heading', { name: /ranking/i });

    expect(btnGoHome).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    userEvent.click(btnGoHome);
    const { location: { pathname }} = history;
    expect(pathname).toBe("/");

  });
});