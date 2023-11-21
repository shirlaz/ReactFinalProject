import { useState } from 'react';
import { Square } from '../../types/Square';
import './TicTacToe.scss';
import React from 'react'

interface TicTacToeProps { }

const TicTacToe = () => {
  const [matrix, setMatrix] = useState([
    [{} as Square, {} as Square, {} as Square],
    [{} as Square, {} as Square, {} as Square],
    [{} as Square, {} as Square, {} as Square]
  ])
  const [winnerPlayer, setWinnerPlayer] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('x');
  const onClick = (index: number, infexCol: number) => {
    if (!matrix[index][infexCol].pressed) {
      matrix[index][infexCol].player = currentPlayer;
      matrix[index][infexCol].pressed = true;
      matrix[index][infexCol] = { ...matrix[index][infexCol] };
      setMatrix([...matrix]);
      const winner = checkWinner(matrix);
      setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
      if (winner) {
        setWinnerPlayer(`The winner is ${winner}`);
      }
    }
  };

  function checkWinner(matrix: Square[][]): string | null {
    // Check rows
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][0].player && matrix[i][0].player === matrix[i][1].player && matrix[i][1].player === matrix[i][2].player) {
        return matrix[i][0].player;
      }
    }
    // Check columns
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[0][j].player && matrix[0][j].player === matrix[1][j].player && matrix[1][j].player === matrix[2][j].player) {
        return matrix[0][j].player;
      }
    }
    // Check diagonals
    if (matrix[0][0].player && matrix[0][0].player === matrix[1][1].player && matrix[1][1].player === matrix[2][2].player) {
      return matrix[0][0].player;
    }
    if (matrix[0][2].player && matrix[0][2].player === matrix[1][1].player && matrix[1][1].player === matrix[2][0].player) {
      return matrix[0][2].player;
    }
    // If no winner found
    return null;
  }

  function handleNewGame() {
    setMatrix([[{} as Square, {} as Square, {} as Square],
    [{} as Square, {} as Square, {} as Square],
    [{} as Square, {} as Square, {} as Square]
    ]);
    setWinnerPlayer('');
    setCurrentPlayer('x');
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>
      <p>{winnerPlayer}</p>
      <button className="new-game-btn" onClick={handleNewGame}>New Game</button>
      <div className="game-board">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => (
              <button
                key={colIndex}
                className="game-btn"
                onClick={() => onClick(rowIndex, colIndex)}
              >
                {matrix[rowIndex][colIndex].pressed ? matrix[rowIndex][colIndex].player : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
