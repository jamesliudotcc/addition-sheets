import type React from "react";
import type { MULTIPLICATION_SIGN } from "../constants";
import LatticeSVG from "./LatticeSVG";
import styles from "./Multiplication.module.css";

export interface MultiplicationProps {
	firstRow: string;
	secondRow: string;
	operation: typeof MULTIPLICATION_SIGN;
}

const Multiplication: React.FC<MultiplicationProps> = ({
	firstRow,
	secondRow,
	operation,
}) => {
	// Ensure secondRow is always 3 digits for vertical display
	const secondDigits = secondRow.padStart(3, "0").split("");
	const firstDigits = firstRow.split("");

	return (
		<article className={`problem ${styles.problem}`}>
			<div className={styles.grid}>
				{/* Top row: First multiplicand digits */}
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d1" }}
				>
					{firstDigits[0] || ""}
				</div>
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d2" }}
				>
					{firstDigits[1] || ""}
				</div>
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d3" }}
				>
					{firstDigits[2] || ""}
				</div>

				{/* Lattice grid spans 3x3 in lower left */}
				<div
					className={`${styles.gridCell} ${styles.latticeCell}`}
					style={{ gridArea: "lat" }}
				>
					<LatticeSVG cellSize={50} strokeWidth={1.5} />
				</div>

				{/* Right column: Second multiplicand digits */}
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d4" }}
				>
					{secondDigits[0] || ""}
				</div>
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d5" }}
				>
					{secondDigits[1] || ""}
				</div>
				<div
					className={`${styles.gridCell} ${styles.digitCell}`}
					style={{ gridArea: "d6" }}
				>
					{secondDigits[2] || ""}
				</div>
			</div>
		</article>
	);
};

export default Multiplication;
