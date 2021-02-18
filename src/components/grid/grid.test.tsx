import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Grid } from ".";
// import {Pixel} from '../pixel' 


// const mock = Pixel as jest.MockedFunction<typeof Pixel>;
//console.log(mock.getMockImplementation()?.toString())
afterAll(cleanup);
//  jest.mock("../pixel", () => ({
//    Pixel: jest.fn(() => (<div data-testid="Pixel"></div>)),
// //  }));
// jest.mock('../pixel', () => ({Pixel: jest.fn().mockImplementation(()=> <div data-testid="Pixel"></div>)}))



describe("grid component", () => {
  it("should render all the childs", () => {
    let dots = [[{}, {}]];
    //mock.mockImplementation(()=> (<div data-testid="Pixel"></div>))
    // console.log(mock.getMockImplementation()?.toString())
    render(<Grid dots={dots} data-testid="grid" />);

    // screen.debug()
    const gridElement = screen.getByTestId("grid");
    expect(gridElement).toBeInTheDocument();
    expect(gridElement.children.length).toBe(1);
    //expect(gridElement.children.children.length).toBe(2)
  });

  it("should take the correct color for each child", () => {
    let dots = [
      [
        { r: 255, g: 0, b: 0, a: 1 },
        { r: 0, g: 255, b: 0, a: 1 },
        { r: 0, g: 0, b: 255, a: 1 },
        { r: 255, g: 255, b: 255, a: 0.5 },
      ],
    ];

    render(<Grid dots={dots} data-testid="grid" />);
    // screen.debug()
    const gridElement = screen.getByTestId("grid");
    const row = gridElement.children[0];
    const child1 = row.children[0];
    const child2 = row.children[1];
    const child3 = row.children[2];
    const child4 = row.children[3];

    expect(child1).toHaveStyle({ color: "rgba(255,0,0,1)" });
    expect(child2).toHaveStyle({ color: "rgba(0,255,0,1)" });
    expect(child3).toHaveStyle({ color: "rgba(0,0,255,1)" });
    expect(child4).toHaveStyle({ color: "rgba(255,255,255,0.5)" });
  });

  it("should assume 0 if color prop is missing", () => {
    let dots = [
      [
        { g: 0, b: 0, a: 1 },
        { r: 0, b: 0, a: 1 },
        { r: 0, g: 0, a: 1 },
        { r: 0, g: 0, b: 0 },
      ],
    ];

    render(<Grid dots={dots} data-testid="grid" />);
    const gridElement = screen.getByTestId("grid");
    const row = gridElement.children[0];
    const child1 = row.children[0];
    const child2 = row.children[1];
    const child3 = row.children[2];
    const child4 = row.children[3];

    expect(child1).toHaveStyle({ color: "rgba(0,0,0,1)" });
    expect(child2).toHaveStyle({ color: "rgba(0,0,0,1)" });
    expect(child3).toHaveStyle({ color: "rgba(0,0,0,1)" });
    expect(child4).toHaveStyle({ color: "rgb(0,0,0)" });
  });

  it("should be transparent if any color nor alfa is provided", () => {
    let dots = [[{}]];

    render(<Grid dots={dots} data-testid="grid" />);
    const gridElement = screen.getByTestId("grid");
    const row = gridElement.children[0];
    const child1 = row.children[0];
    expect(child1).toHaveStyle({ color: "rgba(0,0,0,0)" });
  });

  it("should render a Pixel component", () => {
    let dots = [[{}]];
    render(<Grid dots={dots} data-testid="grid" />);
    const gridElement = screen.getByTestId("grid");
    const pixelElement = screen.getByTestId("pixel");

    expect(gridElement).toContainElement(pixelElement);
  });
});
