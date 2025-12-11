import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import App, { type Operation } from "./App.tsx";
import {
	DIVISION_SIGN,
	MINUS_SIGN,
	MULTIPLICATION_SIGN,
	PLUS_SIGN,
} from "./constants";

const ROUTES: Array<{ path: string; operation: Operation }> = [
	{ path: "/addition", operation: PLUS_SIGN },
	{ path: "/subtraction", operation: MINUS_SIGN },
	{ path: "/multiplication", operation: MULTIPLICATION_SIGN },
	{ path: "/division", operation: DIVISION_SIGN },
];

const router = createBrowserRouter([
	{ path: "/", element: <Navigate to="/addition" replace /> },
	...ROUTES.map(({ path, operation }) => ({
		path,
		element: <App operation={operation} />,
	})),
	{ path: "*", element: <Navigate to="/addition" replace /> },
]);

// Guard against server-side/bundler evaluation where `document` is undefined.
if (typeof document !== "undefined") {
	const rootElement = document.getElementById("root");
	if (rootElement) {
		createRoot(rootElement).render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>,
		);
	}
}
