import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import Problem from "./components/Problem";
import {
	DIVISION_SIGN,
	MINUS_SIGN,
	MULTIPLICATION_SIGN,
	PLUS_SIGN,
} from "./constants";

export type Operation =
	| typeof PLUS_SIGN
	| typeof MINUS_SIGN
	| typeof MULTIPLICATION_SIGN
	| typeof DIVISION_SIGN;

interface AppProps {
	operation: Operation;
}

const NAV_ITEMS = [
	{ path: "/addition", label: "Addition", operation: PLUS_SIGN },
	{ path: "/subtraction", label: "Subtraction", operation: MINUS_SIGN },
	{
		path: "/multiplication",
		label: "Multiplication",
		operation: MULTIPLICATION_SIGN,
	},
	{ path: "/division", label: "Division", operation: DIVISION_SIGN },
] satisfies Array<{ path: string; label: string; operation: Operation }>;

const createProblemKeys = (seed: string) =>
	Array.from(
		{ length: 12 },
		(index) =>
			`${seed}-${index}-${
				globalThis.crypto?.randomUUID?.() ??
				Math.random().toString(36).slice(2, 10)
			}`,
	);

function App({ operation }: AppProps) {
	const activeNav = NAV_ITEMS.find((item) => item.operation === operation);
	const [problemKeys, setProblemKeys] = useState(() =>
		createProblemKeys(operation),
	);

	useEffect(() => {
		setProblemKeys(createProblemKeys(operation));
	}, [operation]);

	const handlePrint = () => {
		window.print();
	};

	return (
		<>
			<nav className="operation-nav">
				<div
					className="operation-links"
					role="tablist"
					aria-label="Worksheet type"
				>
					{NAV_ITEMS.map(({ path, label }) => (
						<NavLink
							key={path}
							to={path}
							className={({ isActive }) =>
								`operation-link${isActive ? " active" : ""}`
							}
							aria-current={({ isActive }) => (isActive ? "page" : undefined)}
							role="tab"
							prefetch="intent"
						>
							{label}
						</NavLink>
					))}
				</div>
				<button onClick={handlePrint} className="print-button" type="button">
					<span aria-hidden="true">🖨️</span>
					<span className="sr-only">Print Problems</span>
				</button>
			</nav>
			<main>
				{problemKeys.map((key) => (
					<Problem key={key} operation={operation} />
				))}
			</main>
		</>
	);
}

export default App;
