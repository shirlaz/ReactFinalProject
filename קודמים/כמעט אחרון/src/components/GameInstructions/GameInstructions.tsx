import React, { FC } from 'react';
import './GameInstructions.scss';

interface GameInstructionsPropsProps { }

const GameInstructions: FC<GameInstructionsPropsProps> = () => (
  <div className="GameInstructions">
    <h1> Incorporating Tic tac toe Game:</h1>
    The game is worn on a network that is 3x3 squares.<br></br>
    Suppose you are X, so your boyfriend is O.<br></br>
    Each player in turn presses one of the squares.<br></br>
    The goal is to have a complete line or a complete column or diagonal that will all be marked in your mark (x or o).<br></br>
    The winner is the one who first a line, column or diagonal.<br></br>
    Enjoy😃😃😃
  </div>
);

export default GameInstructions;