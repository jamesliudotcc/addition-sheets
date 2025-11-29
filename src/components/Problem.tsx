import type React from "react";
import { type MINUS_SIGN, MULTIPLICATION_SIGN, PLUS_SIGN } from "../constants";
import AdditionOrSubtraction from "./AdditionOrSubtraction";
import Multiplication from "./Multiplication";

interface ProblemProps {
	operation?: typeof PLUS_SIGN | typeof MINUS_SIGN | typeof MULTIPLICATION_SIGN;
}

// Exported for testability: creates two numbers, sorts descending, and pads to width 3.
export const generateProblem = (): string[] => {
	const firstNum = Math.floor(Math.random() * 999) + 1;
	const secondNum = Math.floor(Math.random() * 999) + 1;
	return [firstNum, secondNum]
		.sort((a, b) => b - a)
		.map((num) => num.toString().padStart(3, " "));
};

const Problem: React.FC<ProblemProps> = ({ operation = PLUS_SIGN }) => {
	// Generate two sorted numbers
	const [firstRow, secondRow] = generateProblem();

	return operation === MULTIPLICATION_SIGN ? (
		<Multiplication
			firstRow={firstRow}
			secondRow={secondRow}
			operation={MULTIPLICATION_SIGN}
		/>
	) : (
		<AdditionOrSubtraction
			firstRow={firstRow}
			secondRow={secondRow}
			operation={operation as typeof PLUS_SIGN | typeof MINUS_SIGN}
		/>
	);
};

export default Problem;
