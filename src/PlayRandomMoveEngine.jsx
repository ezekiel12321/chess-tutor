import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";


export default function PlayRandomMoveEngine({ onUpdate }) {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const result = game.move(move);
    setGame(new Chess(game.fen()));
    console.log(game.fen())
    return result; // null if the move was illegal, the move object if the move was legal
}

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  async function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // a  lways promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    try {
        const response = await fetch('https://ezekiel12321.pythonanywhere.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fen: game.fen()}),
        });
      const data = await response.json();
      const best_move = data['best move'];
      const analysis = data['analysis'];
      
      onUpdate(best_move, analysis);
      console.log("best_move", best_move)
      console.log("analysis", analysis)

        
    } catch (error) {
        console.error('Error:', error);
    }
      
    try {
        const response = await fetch('https://ezekiel12321.pythonanywhere.com/hello');
        const data = await response.text();

        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
    //setTimeout(makeRandomMove, 200);
    
      
    
    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}