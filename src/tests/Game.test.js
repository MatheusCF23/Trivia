import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Game from "../pages/Game";
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { invalidTokenQuestionsResponse, questionsResponse } from "./mocks/questions";
import { invalidTokenResponse, tokenResponse } from "./mocks/token";

describe("testing pg Game valid token", () => {
  jest.setTimeout(45000);
  test("1) validate btns questions and btn Next; storage localSotrage validate token", async () => {
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
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole("button", { name: "Play" });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, "Gabriela");
    userEvent.type(inputEmail, "trybe@test.com");
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await screen.findByTestId("header-score");
    expect(history.location.pathname).toBe("/game");

    expect(localStorage.getItem("token")).toEqual(tokenResponse.token);

    const corretAnswer = await screen.findByTestId("correct-answer");
    expect(corretAnswer).toBeEnabled();

    userEvent.click(corretAnswer);
    const btnNext = screen.getByRole("button", { name: "Next" });
    expect(btnNext).toBeInTheDocument();
  });

  test("2) btns questions disabled afet 30s", async () => {
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
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole("button", { name: "Play" });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, "Gabriela");
    userEvent.type(inputEmail, "trybe@test.com");
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await screen.findByTestId("header-score");
    expect(history.location.pathname).toBe("/game");

    const corretAnswer = await screen.findByTestId("correct-answer");
    expect(corretAnswer).toBeEnabled();

    await new Promise((timer) => {
      setTimeout(timer, 39000);
    });
    expect(corretAnswer).toBeDisabled();
  });
});

describe("pg Game with invalid token", () => {
  jest.resetAllMocks();
  test("3)test ivalid token clear localStorage and redirect pg", async () => {
    // <---------------- Mock do token invalido ---------------->
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(invalidTokenResponse),
    });
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });
    // <---------------- Mock do token invalido ---------------->
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole("button", { name: "Play" });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, "Gabriela");
    userEvent.type(inputEmail, "trybe@test.com");
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await new Promise((timer) => {
      setTimeout(timer, 3000);
    });
    expect(history.location.pathname).toBe("/");
    expect(localStorage.getItem("token")).toBe(null);

  });

  test("4)test btn setting", async () => {
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

    const { history } = renderWithRouterAndRedux( <App /> );

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole("button", { name: "Play" });

    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, "Gabriela");
    userEvent.type(inputEmail, "trybe@test.com");
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await new Promise((timer) => {
      setTimeout(timer, 3000);
    });

    const buttonSettings = screen.getByRole("button", { name: "Settings" });
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe("/settings");
  });


test("5)test score", async () => {
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

  const { history } = renderWithRouterAndRedux( <App /> );

  const inputName = screen.getByTestId("input-player-name");
  const inputEmail = screen.getByTestId("input-gravatar-email");
  const buttonPlay = screen.getByRole("button", { name: "Play" });

  expect(buttonPlay).toBeDisabled();
  userEvent.type(inputName, "Gabriela");
  userEvent.type(inputEmail, "trybe@test.com");
  expect(buttonPlay).toBeEnabled();

  userEvent.click(buttonPlay);
  await new Promise((timer) => {
    setTimeout(timer, 3000);
  });

  const score = screen.getByTestId('header-score');
  expect(score.innerHTML).toBe('0');
    const corretAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(corretAnswer);
    const btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);
    await new Promise((timer) => {
      setTimeout(timer, 2000);
    });
   expect(score.innerHTML).toBe('40');
   const wrongAnswer = await screen.findByTestId('wrong-answer-2');
    userEvent.click(wrongAnswer);

   expect(score.innerHTML).toBe('40');
});

});
