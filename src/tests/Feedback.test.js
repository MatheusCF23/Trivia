import React from 'react';
import { act, screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { tokenResponse } from './mocks/token';
import { questionsResponse } from './mocks/questions';

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

  it('3) Verifica se na tela tem informação sobre o desempenho do player.', async () => {

    // <---------------- Mock do token e questions ---------------->
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(tokenResponse)
    })

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(questionsResponse)
    })
    // <---------------- Mock do token e questions ---------------->

    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay =  screen.getByRole('button', { name: /Play/i });
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'trybe@test.com');
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);

    // Timer para esperar o carregamento das questions na tela.
    await new Promise((resolverOuter) => { setTimeout(resolverOuter, 250); });
    
    expect(history.location.pathname).toBe('/game')

    // Passando pelas questions
    for (let i = 0; i <= 4; i += 1 ) {
      const corretAnswer = await screen.findByTestId('correct-answer');
      userEvent.click(corretAnswer);
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext);
    }
    
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