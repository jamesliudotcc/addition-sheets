import { useState } from 'react'

import './App.css'
import Problem from './components/Problem'

function App() {
  const generateProblems = () => 
    Array.from({ length: 12 }, () => 
      Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    );

  const [problems, setProblems] = useState<string[]>(generateProblems);

  const regenerateProblems = () => {
    setProblems(generateProblems());
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <nav>
        <button onClick={regenerateProblems}>
          <span aria-hidden="true">🔄</span>
          <span className="sr-only">Generate New Problems</span>
        </button>
        <button onClick={handlePrint}>
          <span aria-hidden="true">🖨️</span>
          <span className="sr-only">Print Problems</span>
        </button>
      </nav>
      <main role="main">
        {problems.map((problem, index) => (
          <Problem key={index} problem={problem} />
        ))}
      </main>
    </>
  )
}

export default App
