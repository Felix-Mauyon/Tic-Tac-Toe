import { useState } from "react";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./components/Gameover";


const PLAYER = {
  X : 'Player 1',
  O : "Player 2"
}

const   INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameboard, playerName){
  let winner;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combo[0].row][combo[0].column];
    const secondSquareSymbol = gameboard[combo[1].row][combo[1].column];
    const thirdSquareSymbol = gameboard[combo[2].row][combo[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner

}

function deriveGameboard(gameturns){
  let gameboard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Apply each turn to the gameboard
  for (const turn of gameturns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard
}

function App() {
  const [gameturns, setGameturns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYER)


  function handleGetName(symbol, name){
    setPlayerName((editingName)=>{
      return {...editingName, [symbol]:[name]}
    })}

  const gameboard = deriveGameboard(gameturns)

  const winner = deriveWinner(gameboard, playerName)

  const hasDraw = gameturns.length === 9 && !winner;

  const activePlayer = handleActive(gameturns);


  function handleActive(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = "O";
    }
    return currentPlayer;
  }


  function resetFunction() {
    setGameturns([]);
  }


  function handleSelect(rowIndex, colIndex) {
    setGameturns((prevTurn) => {
      let currentPlayer = handleActive(prevTurn);
      const updatedTurn = [{ player: currentPlayer, square: { row: rowIndex, col: colIndex } }, ...prevTurn];
      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player player={playerName.X} playerSymbol="X" active={activePlayer === 'X'} onchange={handleGetName}/>
          <Player player={playerName.O} playerSymbol="O" active={activePlayer === 'O'} onchange={handleGetName}/>
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onclick={resetFunction} />}
        <Gameboard onSelect={handleSelect} board={gameboard} winner={winner} />
      </div>
      <Log turnsData={gameturns} />
    </main>
  );
}

export default App;
