import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import App from "../App";
import Ranking from "../pages/Ranking";
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

  test("Verifica se aparece o nome e o score do jogador na tela", async () => {
    renderWithRouterAndRedux(<Ranking />);
    
    if (!JSON.parse(localStorage.getItem("ranking"))) {
      localStorage.setItem("ranking", JSON.stringify([]));
      expect(screen.getByTestId("player-name-0")).not.toBeInTheDocument();
      expect(screen.getByTestId("player-score-0")).not.toBeInTheDocument();
    }

    localStorage.setItem(
      "ranking",
      JSON.stringify([
        {
          imgPlayer:
            "https://www.gravatar.com/avatar/05ea36e0c3766e6649a17e0ed11cee45",
          name: "Gabriela",
          score: 110,
        },
        {
          imgPlayer:
            "https://www.gravatar.com/avatar/3fba7ce06cc7aa4e36b67cd1757c731b",
          name: "Gabriela",
          score: 0,
        },
        {
          imgPlayer:
            "https://www.gravatar.com/avatar/3fba7ce06cc7aa4e36b67cd1757c731b",
          name: "Gabriela",
          score: 10,
        },
      ])
    );
    expect(await screen.findByText("Ranking")).toBeInTheDocument();
    expect(screen.getByTestId("player-name-0")).toBeInTheDocument();
    expect(screen.getByTestId("player-score-0")).toBeInTheDocument();
    expect(screen.getByTestId("player-name-1")).toBeInTheDocument();
    expect(screen.getByTestId("player-score-1")).toBeInTheDocument();
  });
});
