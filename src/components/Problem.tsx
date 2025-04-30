import React from 'react';

interface ProblemProps {
  problem: string;
}

const Problem: React.FC<ProblemProps> = ({ problem }) => {
  // Validate that the problem prop is exactly 6 characters
  if (problem.length !== 6) {
    throw new Error('Problem prop must be exactly 6 characters long');
  }

  // Split the problem into first three and last three digits
  const firstRow = problem.slice(0, 3);
  const secondRow = problem.slice(3, 6);

  return (
    <article className="problem">
      <table>
        <tbody>
          <tr>
            <td> </td>
            {firstRow.split('').map((digit, index) => (
              <td key={`first-${index}`}>{digit}</td>
            ))}
          </tr>
          <tr className="addition-row">
            <td>+</td>
            {secondRow.split('').map((digit, index) => (
              <td key={`second-${index}`}>{digit}</td>
            ))}
          </tr>
          <tr>
            {['', '', '', ''].map((_, index) => (
              <td key={`empty-${index}`}></td>
            ))}
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default Problem;
