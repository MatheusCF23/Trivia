import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import App from "../App";
import Ranking from "../pages/Ranking";
import { saveRankingLocalStorage } from "../service/localStorage";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe("testing pg Ranking ", () => {
  test("the page should have one button, redirectly home and title ranking", () => {
   
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push("/ranking");
    });
    const btnGoHome = screen.getByRole("button", { name: "Home" });
    const title = screen.getByRole("heading", { name: /ranking/i });

    expect(btnGoHome).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    userEvent.click(btnGoHome);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/");
  });

  test("Verifica se aparece o nome e o score do jogador na tela", () => {
    renderWithRouterAndRedux(<Ranking />)

    const name = screen.findAllByTestId(`player-name-${index}`);
    expect(name).toBeVisible();

    const score = screen.findAllByTestId(`player-score-${index}`);
    expect(score).toBeVisible();
  })

  test ("Verifica se quando não possui nada na chave Ranking do LocalStorage o estado é salvo no LocalStorage", () => {
    renderWithRouterAndRedux(<Ranking />);

    localStorage.setItem('ranking', JSON.stringify([]))

    if (!JSON.parse(localStorage.getItem('ranking'))) {
     
    }

  })
});
