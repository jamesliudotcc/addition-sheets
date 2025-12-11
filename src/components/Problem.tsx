import type React from "react";
import {
	DIVISION_SIGN,
	type MINUS_SIGN,
	MULTIPLICATION_SIGN,
	PLUS_SIGN,
} from "../constants";
import AdditionOrSubtraction from "./AdditionOrSubtraction/AdditionOrSubtraction";
import Division from "./Division/Division";
import Multiplication from "./Multiplication/Multiplication";

interface ProblemProps {
	operation?:
		| typeof PLUS_SIGN
		| typeof MINUS_SIGN
		| typeof MULTIPLICATION_SIGN
		| typeof DIVISION_SIGN;
}

// Exported for testability: creates two numbers, sorts descending, and pads to width 3.
export const generateProblem = (): string[] => {
	const firstNum = Math.floor(Math.random() * 999) + 1;
	const secondNum = Math.floor(Math.random() * 999) + 1;
	return [firstNum, secondNum]
		.sort((a, b) => b - a)
		.map((num) => num.toString().padStart(3, " "));
};

export const generateDivisionProblem = () => {
	const divisor = Math.floor(Math.random() * 8) + 2; // 2-9
	const quotient = Math.floor(Math.random() * 89) + 11; // 11-99 for nicer spacing
	const dividend = divisor * quotient;

	return {
		dividend: dividend.toString().padStart(3, " "),
		divisor: divisor.toString().padStart(2, " "),
	};
};

const Problem: React.FC<ProblemProps> = ({ operation = PLUS_SIGN }) => {
	// Generate two sorted numbers
	if (operation === DIVISION_SIGN) {
		const { dividend, divisor } = generateDivisionProblem();
		return <Division dividend={dividend} divisor={divisor} />;
	}

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
