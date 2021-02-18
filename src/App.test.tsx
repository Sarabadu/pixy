import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';


afterAll(cleanup);

describe('Uri to pixel art', () => {
  test('one black pixel', () => {
  const history = createMemoryHistory()
  history.push('/pix/000000zz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(1)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(0,0,0,1)"})
});

test('one white pixel', () => {
  const history = createMemoryHistory()
  history.push('/pix/zzzzzzzz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(1)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(255,255,255,1)"})
});


test('incomplete pixel alpha', () => {
  const history = createMemoryHistory()
  history.push('/pix/zzzzzz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(1)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(255,255,255,1)"})
});

test('incomplete pixel color blue', () => {
  const history = createMemoryHistory()
  history.push('/pix/0000')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(1)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(00,00,255,1)"})
});

test('incomplete pixel color green', () => {
  const history = createMemoryHistory()
  history.push('/pix/00')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(1)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(00,255,255,1)"})
});

test('two black pixels', () => {
  const history = createMemoryHistory()
  history.push('/pix/000000zz000000zz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  // screen.debug()
  const pixels = screen.getAllByTestId("pixel")
  expect(pixels.length).toBe(2)
  expect(pixels[0]).toBeInTheDocument()
  expect(pixels[1]).toBeInTheDocument()
  expect(pixels[0]).toHaveStyle({color:"rgba(0,0,0,1)"})

  expect(pixels[1]).toHaveStyle({color:"rgba(0,0,0,1)"})
});

test('two in the same row', () => {
  const history = createMemoryHistory()
  history.push('/pix/000000zz000000zz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  const rows = screen.getAllByTestId("row")
  expect(pixels.length).toBe(2)
  expect(rows.length).toBe(1)

  expect(rows[0]).toBeInTheDocument()
  expect(rows[0]).toContainElement(pixels[0])
  expect(rows[0]).toContainElement(pixels[1])
  expect(pixels[0]).toHaveStyle({color:"rgba(0,0,0,1)"})
  expect(pixels[1]).toHaveStyle({color:"rgba(0,0,0,1)"})
});



test('two in different rows', () => {
  const history = createMemoryHistory()
  history.push('/pix/000000zz/000000zz')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const pixels = screen.getAllByTestId("pixel")
  const rows = screen.getAllByTestId("row")
  expect(pixels.length).toBe(2)
  expect(rows.length).toBe(2)

  expect(rows[0]).toBeInTheDocument()
  expect(rows[0]).toContainElement(pixels[0])
  expect(rows[1]).toContainElement(pixels[1])
  expect(pixels[0]).toHaveStyle({color:"rgba(0,0,0,1)"})
  expect(pixels[1]).toHaveStyle({color:"rgba(0,0,0,1)"})
});
})


