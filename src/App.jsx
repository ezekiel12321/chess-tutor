import { useState } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js';
import PlayRandomMoveEngine from './PlayRandomMoveEngine';
import NavBar from './navbar';
import Section from './Section.jsx';

import './App.css'

function App() {
  

  const [bestMove, setBestMove] = useState('');
  const [analysis, setAnalysis] = useState('');

  const handleUpdate = (bestMove, analysis) => {
    setBestMove(bestMove);
    setAnalysis(analysis);
  }

  return (
    <div>
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ width: "45%", height: "45%", border: "2px solid black"}}>
          <PlayRandomMoveEngine onUpdate={handleUpdate} />  
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', flex: 1}}>
          <Section
            move={bestMove} 
            analysis={analysis}
          />
        </div>
        
      </div>
     
    </div>
  );
}

export default App
