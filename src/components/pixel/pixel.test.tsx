import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {Pixel} from '.';

afterAll(cleanup)

test('renders transparent pixel if no color is passed', () => {
    render(<Pixel data-testid="pixel"/>);
    const pixelElement = screen.getByTestId("pixel");
    expect(pixelElement).toBeInTheDocument();
    expect(pixelElement).toHaveStyle({"color":"transparent"})
});


test('renders color if color is passed', () => {
    render(<Pixel color="red" data-testid="pixel"/>);
    const pixelElement = screen.getByTestId("pixel");
    expect(pixelElement).toBeInTheDocument();
    expect(pixelElement).toHaveStyle({"color":"red"})
});


test('renders color if color is passed', () => {
    const {rerender} =render(<Pixel color="red" data-testid="pixel"/>);
    const pixelElement = screen.getByTestId("pixel");
    expect(pixelElement).toBeInTheDocument();
    expect(pixelElement).toHaveStyle({"color":"red"})

    rerender(<Pixel color="blue" data-testid="pixel"/>)
    expect(screen.getByTestId("pixel")).toHaveStyle({"color":"blue"})

});
