import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DiceRoller from "./DiceRoller";

// Mock lucide-react icons to stable SVGs for predictable testing
vi.mock("lucide-react", () => {
  const Icon = (props) => {
    const { ["data-testid"]: dtid, size, ...rest } = props || {};
    return React.createElement("svg", {
      role: "img",
      "data-testid": dtid ?? "dice",
      "data-size": size ?? 80,
      ...rest,
    });
  };
  return {
    Dice1: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-1" }),
    Dice2: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-2" }),
    Dice3: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-3" }),
    Dice4: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-4" }),
    Dice5: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-5" }),
    Dice6: (p) => React.createElement(Icon, { ...p, "data-testid": "dice-6" }),
  };
});

describe("DiceRoller", () => {
  const getSlider = () => screen.getByRole("slider");
  const getRollButton = () =>
    screen.getByRole("button", { name: /roll dice/i });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with default 1 die and slider marks", () => {
    render(<DiceRoller />);

    const slider = getSlider();
    expect(slider).toBeInTheDocument();
    expect(slider.value).toBe("1");

    // One dice icon by default (index 0 => Dice1)
    expect(screen.getAllByTestId(/dice-/i)).toHaveLength(1);

    // Marks 1..6 visible
    [1, 2, 3, 4, 5, 6].forEach((n) => {
      expect(screen.getByText(String(n))).toBeInTheDocument();
    });
  });

  it("updates dice count when slider changes", () => {
    render(<DiceRoller />);

    const slider = getSlider();
    fireEvent.change(slider, { target: { value: "4" } });
    expect(slider.value).toBe("4");
    expect(screen.getAllByTestId(/dice-/i)).toHaveLength(4);
  });

  it("rolls dice deterministically with stubbed Math.random", () => {
    render(<DiceRoller />);

    // Set to 3 dice
    const slider = getSlider();
    fireEvent.change(slider, { target: { value: "3" } });

    // floor(r*6): 0 -> Dice1, 0.5 -> 3 -> Dice4, 0.99 -> 5 -> Dice6
    const seq = [0.0, 0.5, 0.99];
    let i = 0;
    const spy = vi
      .spyOn(Math, "random")
      .mockImplementation(() => seq[i++ % seq.length]);

    fireEvent.click(getRollButton());

    const ids = screen
      .getAllByTestId(/dice-/i)
      .map((el) => el.getAttribute("data-testid"));
    expect(ids).toEqual(["dice-1", "dice-4", "dice-6"]);

    spy.mockRestore();
  });

  it("adds roll to history with correct sum", () => {
    render(<DiceRoller />);

    // Two dice
    const slider = getSlider();
    fireEvent.change(slider, { target: { value: "2" } });

    // r: 0.0 -> idx 0 -> value 1, 0.8 -> idx 4 -> value 5; sum = 6
    const seq = [0.0, 0.8];
    let k = 0;
    vi.spyOn(Math, "random").mockImplementation(() => seq[k++ % seq.length]);

    fireEvent.click(getRollButton());

    const history = document.querySelector(".history");
    expect(history).toBeInTheDocument();

    const cards = history.querySelectorAll(".hisList .card");
    expect(cards.length).toBe(1);

    const spans = cards[0].querySelectorAll("span");
    expect(spans[0].textContent).toBe("1"); // roll index
    expect(spans[1].textContent).toBe("6"); // sum
  });

  it("accumulates multiple rolls with correct indices and sums", () => {
    render(<DiceRoller />);

    const slider = getSlider();
    fireEvent.change(slider, { target: { value: "1" } });

    // One die: idx 2 -> 3, idx 5 -> 6, idx 0 -> 1
    const seq = [2 / 6, 5 / 6, 0 / 6];
    let t = 0;
    vi.spyOn(Math, "random").mockImplementation(() => seq[t++ % seq.length]);

    const btn = getRollButton();
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);

    const cards = document.querySelectorAll(".history .hisList .card");
    expect(cards.length).toBe(3);

    expect(cards[0].querySelectorAll("span")[0].textContent).toBe("1");
    expect(cards[0].querySelectorAll("span")[1].textContent).toBe("3");

    expect(cards[1].querySelectorAll("span")[0].textContent).toBe("2");
    expect(cards[1].querySelectorAll("span")[1].textContent).toBe("6");

    expect(cards[2].querySelectorAll("span")[0].textContent).toBe("3");
    expect(cards[2].querySelectorAll("span")[1].textContent).toBe("1");
  });

  it("defaults icons to Dice1 when slider changes before any roll", () => {
    render(<DiceRoller />);

    const slider = getSlider();
    fireEvent.change(slider, { target: { value: "6" } });

    const icons = screen.getAllByTestId(/dice-/i);
    expect(icons).toHaveLength(6);
    icons.forEach((el) => {
      expect(el.getAttribute("data-testid")).toBe("dice-1");
    });
  });

  it("does not render history block when empty", () => {
    render(<DiceRoller />);
    expect(screen.queryByRole("heading", { name: /roll history/i })).toBeNull();
  });
});
