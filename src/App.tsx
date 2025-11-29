import type React from "react";
import { useState } from "react";
import "./App.css";
import Problem from "./components/Problem";
import { MINUS_SIGN, MULTIPLICATION_SIGN, PLUS_SIGN } from "./constants";

function App() {
	const [operation, setOperation] = useState<
		typeof PLUS_SIGN | typeof MINUS_SIGN | typeof MULTIPLICATION_SIGN
	>(PLUS_SIGN);

	const handleOperationChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setOperation(
			event.target.value as
				| typeof PLUS_SIGN
				| typeof MINUS_SIGN
				| typeof MULTIPLICATION_SIGN,
		);
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<>
			<nav>
				<select
					value={operation}
					onChange={handleOperationChange}
					aria-label="Select Operation"
				>
					<option value={PLUS_SIGN}>+</option>
					<option value={MINUS_SIGN}>−</option>
					<option value={MULTIPLICATION_SIGN}>×</option>
				</select>
				<button onClick={handlePrint}>
					<span aria-hidden="true">🖨️</span>
					<span className="sr-only">Print Problems</span>
				</button>
			</nav>
			<main role="main">
				{Array.from({ length: 12 }, (_, index) => (
					<Problem key={index} operation={operation} />
				))}
			</main>
		</>
	);
}

export default App;
