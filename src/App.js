import { useState } from "react";
import "./App.css";
import winPlayer from "./win.mp3";
import myAud from "./step.mp3";
function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [newGame, setNewGame] = useState(false);
  // code for another fuction in App functions 'remember'
  function Square({ value, onSquareClick }) {
    return (
      <button className="squareBox" onClick={onSquareClick}>
        {value}
      </button>
    );
  } // ending of the code of the function

  function handleClick(i) {
    setNewGame(true);
    if (calculateWinner(square) || square[i]) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
      new Audio(myAud).play();
    } else {
      nextSquares[i] = "O";
      new Audio(myAud).play();
    }

    setSquare(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        new Audio(winPlayer).play();

        return squares[a];
      }
    }
    return null;
  }

  // code for function new game setting
  function NewGameSetting() {
    setSquare(Array(9).fill(null));
    setNewGame(false);
    new Audio(winPlayer).pause();
  }
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md- 8 co-sm-12 col-12 offset-xl-4 offset-lg-4 offset-md-2 offset-sm-0 offset-0">
            <h1>Tic-Toe Game</h1>
            <div className="status mt-4">{status}</div>
            <div className="squareGroup mt-3">
              <Square value={square[0]} onSquareClick={() => handleClick(0)} />
              <Square value={square[1]} onSquareClick={() => handleClick(1)} />
              <Square value={square[2]} onSquareClick={() => handleClick(2)} />
            </div>

            <div className="squareGroup">
              <Square value={square[3]} onSquareClick={() => handleClick(3)} />
              <Square value={square[4]} onSquareClick={() => handleClick(4)} />
              <Square value={square[5]} onSquareClick={() => handleClick(5)} />
            </div>

            <div className="squareGroup">
              <Square value={square[6]} onSquareClick={() => handleClick(6)} />
              <Square value={square[7]} onSquareClick={() => handleClick(7)} />
              <Square value={square[8]} onSquareClick={() => handleClick(8)} />
            </div>

            {newGame ? (
              <button
                className="btn btn-danger d-flex justify-content-center mt-3"
                style={{ width: "60%", marginLeft: "20%" }}
                onClick={NewGameSetting}
              >
                New Game
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* code for footer */}
      <footer>
        <strong>
          Developed By <span id="admin">Sudhnashu Kumar</span>{" "}
        </strong>
      </footer>
    </>
  );
}

export default App;
