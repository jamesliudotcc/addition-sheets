import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Problem from "../components/Problem";
import {
	DIVISION_SIGN,
	MINUS_SIGN,
	MULTIPLICATION_SIGN,
	PLUS_SIGN,
} from "../constants";

describe("Problem component with dependency injection", () => {
	// Mock functions that return deterministic values
	const mockGenerateProblem = () => ["123", "045"];
	const mockGenerateDivisionProblem = () => ({
		dividend: "123",
		divisor: "12",
	});

	it("renders addition problem with injected values", () => {
		const markup = renderToStaticMarkup(
			React.createElement(Problem, {
				operation: PLUS_SIGN,
				generateProblemFn: mockGenerateProblem,
			}),
		);

		// Check for individual digits since they are rendered in separate cells
		expect(markup).toContain(">1<");
		expect(markup).toContain(">2<");
		expect(markup).toContain(">3<");
		expect(markup).toContain(">0<");
		expect(markup).toContain(">4<");
		expect(markup).toContain(">5<");
		expect(markup).toContain(PLUS_SIGN);
	});

	it("renders subtraction problem with injected values", () => {
		const markup = renderToStaticMarkup(
			React.createElement(Problem, {
				operation: MINUS_SIGN,
				generateProblemFn: mockGenerateProblem,
			}),
		);

		// Check for individual digits since they are rendered in separate cells
		expect(markup).toContain(">1<");
		expect(markup).toContain(">2<");
		expect(markup).toContain(">3<");
		expect(markup).toContain(">0<");
		expect(markup).toContain(">4<");
		expect(markup).toContain(">5<");
		expect(markup).toContain(MINUS_SIGN);
	});

	it("renders multiplication problem with injected values", () => {
		const markup = renderToStaticMarkup(
			React.createElement(Problem, {
				operation: MULTIPLICATION_SIGN,
				generateProblemFn: mockGenerateProblem,
			}),
		);

		// Check for individual digits since they are rendered in separate cells
		// Multiplication uses lattice method, so no operation symbol is rendered
		expect(markup).toContain(">1<");
		expect(markup).toContain(">2<");
		expect(markup).toContain(">3<");
		expect(markup).toContain(">0<");
		expect(markup).toContain(">4<");
		expect(markup).toContain(">5<");
	});

	it("renders division problem with injected values", () => {
		const markup = renderToStaticMarkup(
			React.createElement(Problem, {
				operation: DIVISION_SIGN,
				generateDivisionProblemFn: mockGenerateDivisionProblem,
			}),
		);

		// Check for the dividend and divisor values
		expect(markup).toContain(">123<");
		expect(markup).toContain(">12<");
	});
});
