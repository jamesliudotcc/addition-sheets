import type React from "react";
import DivisionBracket from "./DivisionBracket";
import styles from "./Division.module.css";

interface DivisionProps {
	dividend: string;
	divisor: string;
}

const Division: React.FC<DivisionProps> = ({ dividend, divisor }) => {
	return (
		<article className={`problem division-problem ${styles.problem}`}>
			<div className={styles.grid}>
				<div className={styles.bracket}>
					<DivisionBracket />
				</div>
				<div className={styles.dividend}>{dividend}</div>
				<aside className={styles.divisor}>{divisor}</aside>
			</div>
		</article>
	);
};

export default Division;
