import React from 'react';
import LongDivisionSVG from './DiagonalSVG';

interface DivisionProps {
  dividend: string;
  divisor: string;
}

const Division: React.FC<DivisionProps> = ({ dividend, divisor }) => {
  return (
    <article style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
      {/* Long division symbol */}
      <LongDivisionSVG />
      
      {/* Dividend positioned underneath the horizontal line */}
      <main
        style={{
          position: 'absolute',
          left: '10px',
          top: '20px',
          fontSize: '16px',
          fontFamily: 'monospace',
          zIndex: 2,
        }}
      >
        {dividend}
      </main>
      
      {/* Divisor positioned to the left of the parenthesis */}
      <aside
        style={{
          position: 'absolute',
          left: '90px',
          top: '5px',
          fontSize: '16px',
          fontFamily: 'monospace',
          zIndex: 2,
        }}
      >
        {divisor}
      </aside>
    </article>
  );
};

export default Division; 