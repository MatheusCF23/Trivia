import React from 'react';
import { act, screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testes pagina de Feedback.', () => {
  it('1) Verifica se está na pagina de feedback.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const { location: { pathname } } = history;
    expect(pathname).toBe('/feedback')
  });

  it('2) Verifica se na tela tem os dados do usuário logado.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const imgUser = screen.getByTestId('header-profile-picture');
    expect(imgUser).toBeInTheDocument();

    const nameUser = screen.getByTestId('header-player-name');
    expect(nameUser).toBeInTheDocument();
  });

  it('3) Verifica se na tela tem informação sobre o desempenho do player.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const feedbackGame = screen.getByTestId('feedback-text');
    expect(feedbackGame).toBeInTheDocument();
  });

  it('4) Verifica se na tela tem o botão "Play again" e se ele direciona para tela inicial.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('5) Verifica se na tela tem o botão "Ranking" e se ele direciona para tela de pontuação.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const btnRanking = screen.getByRole('button', {  name: /ranking/i});
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnRanking);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');
  });

  it('6) Verifica se na tela tem a pontuação do player.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {history.push('/feedback');})

    const pointScore = screen.getByTestId('feedback-total-score');
    expect(pointScore).toBeInTheDocument();

    const totalCorretAnswers = screen.getByTestId('feedback-total-question');
    expect(totalCorretAnswers).toBeInTheDocument();
  });
});