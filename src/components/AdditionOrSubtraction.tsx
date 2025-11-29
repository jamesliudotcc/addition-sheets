import type React from "react";
import type { MINUS_SIGN, PLUS_SIGN } from "../constants";

export interface AdditionOrSubtractionProps {
	firstRow: string;
	secondRow: string;
	operation: typeof PLUS_SIGN | typeof MINUS_SIGN;
}

const AdditionOrSubtraction: React.FC<AdditionOrSubtractionProps> = ({
	firstRow,
	secondRow,
	operation,
}) => {
	return (
		<article className="problem">
			<table>
				<tbody>
					<tr>
						<td> </td>
						{firstRow.split("").map((digit, index) => (
							<td key={`first-${index}`}>{digit}</td>
						))}
					</tr>
					<tr className="addition-row">
						<td>{operation}</td>
						{secondRow.split("").map((digit, index) => (
							<td key={`second-${index}`}>{digit}</td>
						))}
					</tr>
					<tr>
						{["", "", "", ""].map((_, index) => (
							<td key={`empty-${index}`}></td>
						))}
					</tr>
				</tbody>
			</table>
		</article>
	);
};

export default AdditionOrSubtraction;
