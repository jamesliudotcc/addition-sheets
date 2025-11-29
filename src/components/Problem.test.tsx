import React from 'react';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import AdditionOrSubtraction from './AdditionOrSubtraction';
import Multiplication from './Multiplication';
import { MINUS_SIGN, MULTIPLICATION_SIGN } from '../constants';
import { generateProblem } from './Problem';

describe('generateProblem', () => {
  const originalRandom = Math.random;

  beforeEach(() => {
    Math.random = () => 0.5;
  });

  afterEach(() => {
    Math.random = originalRandom;
  });

  it('returns two sorted, padded numbers as strings', () => {
    const [first, second] = generateProblem();
    expect(first.length).toBe(3);
    expect(second.length).toBe(3);
    expect(Number(first.trim())).toBeGreaterThanOrEqual(Number(second.trim()));
  });
});

describe('AdditionOrSubtraction', () => {
  it('renders digits and the chosen operation', () => {
    const markup = renderToStaticMarkup(
      React.createElement(AdditionOrSubtraction, {
        firstRow: '123',
        secondRow: '045',
        operation: MINUS_SIGN,
      }),
    );
    expect(markup).toContain('<td>1</td>');
    expect(markup).toContain('<td>2</td>');
    expect(markup).toContain('<td>3</td>');
    expect(markup).toContain('<td>0</td>');
    expect(markup).toContain('<td>4</td>');
    expect(markup).toContain('<td>5</td>');
    expect(markup).toContain(MINUS_SIGN);
  });
});

describe('Multiplication', () => {
  it('pads the second multiplicand to three digits for lattice layout', () => {
    const markup = renderToStaticMarkup(
      React.createElement(Multiplication, {
        firstRow: '987',
        secondRow: '9',
        operation: MULTIPLICATION_SIGN,
      }),
    );
    expect(markup).toContain('grid-area:d4">0</div>');
    expect(markup).toContain('grid-area:d5">0</div>');
    expect(markup).toContain('grid-area:d6">9</div>');
  });

  it('leaves blank spots when digits are missing', () => {
    const markup = renderToStaticMarkup(
      React.createElement(Multiplication, {
        firstRow: '7',
        secondRow: '12',
        operation: MULTIPLICATION_SIGN,
      }),
    );
    expect(markup).toContain('grid-area:d1">7</div>');
    expect(markup).toContain('grid-area:d2"></div>');
    expect(markup).toContain('grid-area:d3"></div>');
    expect(markup).toContain('grid-area:d4">0</div>');
    expect(markup).toContain('grid-area:d5">1</div>');
    expect(markup).toContain('grid-area:d6">2</div>');
  });
});
