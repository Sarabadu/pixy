import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MouseDraw } from ".";
import { constants } from "../../constants";

const GRID_SIZE = constants.DEFAULT_GRID_SIZE;
afterAll(cleanup);

describe("mouse pixel art", () => {
  test(`should start with a transparent ${GRID_SIZE}x${GRID_SIZE} grid`, () => {
    render(<MouseDraw />);

    const pixels = screen.getAllByTestId("pixel");
    expect(pixels.length).toBe(GRID_SIZE * GRID_SIZE);

    // sample some pixels for performance
    for (const pixel of [pixels[0], pixels[500], pixels[1234], pixels[1599]]) {
      expect(pixel).toBeInTheDocument();
      expect(pixel).toHaveStyle({ color: "rgba(0,0,0,0)" });
    }
  });
  test(`should show a color input `, () => {
    render(<MouseDraw />);

    const colorInput = screen.getByTestId("color-picker");
    expect(colorInput).toBeInTheDocument();
  });

  test(`should set the pixel to the selected color `, () => {
    render(<MouseDraw />);

    const colorInput = screen.getByTestId("color-picker") as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    fireEvent.change(colorInput, { target: { value: "#FAFAFA" } });

    expect(colorInput.value).toBe("#fafafa");

    const pixel00 = screen.getAllByTestId("pixel")[0];

    fireEvent.click(pixel00);

    expect(pixel00).toBeInTheDocument();
    expect(pixel00).toHaveStyle({ color: "rgba(250,250,250,1)" });
  });
});
