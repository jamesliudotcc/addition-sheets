import React from 'react';
import { MULTIPLICATION_SIGN } from '../constants';
import DiagonalSVG from './DiagonalSVG';

export interface MultiplicationProps {
  firstRow: string;
  secondRow: string;
  operation: typeof MULTIPLICATION_SIGN;
}

const Multiplication: React.FC<MultiplicationProps> = ({ 
  firstRow, 
  secondRow, 
  operation 
}) => {
  // Ensure secondRow is always 3 digits for vertical display
  const secondDigits = secondRow.padStart(3, '0').split('');
  return (
    <article className="problem multiplication-problem">
      <table>
        <tbody>
          {/* First row: firstRow digits, then multiplication sign */}
          <tr>
            {firstRow.split('').map((digit, index) => (
              <td key={`first-${index}`}>{digit}</td>
            ))}
            <td className="solid-left">{operation}</td>
          </tr>
          {/* Next three rows: only last column has digits from secondRow; first of these gets solid-horizontal on all cells */}
          {secondDigits.map((digit, idx) => (
            <tr key={`mult-row-${idx}`}>
              <td className={(idx === 0 ? "solid-horizontal first-cell diagonal-cell" : "diagonal-cell")}> <DiagonalSVG />&nbsp;</td>
              <td className={(idx === 0 ? "solid-horizontal diagonal-cell" : "diagonal-cell")}> <DiagonalSVG />&nbsp;</td>
              <td className={(idx === 0 ? "solid-horizontal diagonal-cell" : "diagonal-cell")}> <DiagonalSVG />&nbsp;</td>
              <td className={idx === 0 ? "solid-horizontal solid-left" : "solid-left"}>{digit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Multiplication;
