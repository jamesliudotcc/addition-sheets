import { useMemo } from "react";
import { MINUS_SIGN, PLUS_SIGN } from "../constants";

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
	const firstRowCells = useMemo(
		() =>
			firstRow.split("").map((digit, index) => ({
				digit,
				id: `first-${index}-${digit}`,
			})),
		[firstRow],
	);

	const secondRowCells = useMemo(
		() =>
			secondRow.split("").map((digit, index) => ({
				digit,
				id: `second-${index}-${digit}`,
			})),
		[secondRow],
	);

	const spacerCells = useMemo(
		() =>
			Array.from({ length: 4 }, (_, index) => ({
				id: `empty-${index}`,
			})),
		[],
	);

	return (
		<article className="problem">
			<table>
				<tbody>
					<tr>
						<td> </td>
						{firstRowCells.map(({ digit, id }) => (
							<td key={id}>{digit}</td>
						))}
					</tr>
					<tr className="addition-row">
						<td>{operation}</td>
						{secondRowCells.map(({ digit, id }) => (
							<td key={id}>{digit}</td>
						))}
					</tr>
					<tr>
						{spacerCells.map(({ id }) => (
							<td key={id} />
						))}
					</tr>
				</tbody>
			</table>
		</article>
	);
};

export default AdditionOrSubtraction;
