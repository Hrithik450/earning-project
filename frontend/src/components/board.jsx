import { useEffect, useRef, useState } from "react";
import Square from "./squares";
import "./board.css";
import Wallet from "./wallet";
import Rules from "./rules";
import { useGameContext } from "../store/context/gameContext";
import { useAuthContext } from "../store/context/AuthContext";

function Board() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [isUserturn, setisUserturn] = useState(true);
  const [isgameActive, setisgameActive] = useState(false);
  const { handleCoins } = useGameContext();
  const { isAuthenticated, user } = useAuthContext();

  const resetGame = () => {
    setisUserturn(true);
    setisgameActive(false);
    setsquares(Array(9).fill(null));
  };

  useEffect(() => {
    if (!isUserturn) {
      const bestmove = findBestMove(squares);
      if (bestmove !== null) {
        setTimeout(() => {
          handleClick(bestmove);
        }, 1000);
      } else {
        alert("Game tied , Best of Luck for next time");
        handleCoins(1);
        resetGame();
      }
    }
  }, [isUserturn, squares, isgameActive]);

  const handleClick = (index) => {
    if (!isAuthenticated || user.plan === "NONE") {
      return <></>;
    }

    if (!isgameActive || squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = isUserturn ? "X" : "O";

    setsquares(newSquares);
    setisUserturn(!isUserturn);
  };

  function minimax(newSquares, depth, isMaximizingPlayer) {
    const winner = calculateWinner(newSquares);

    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (newSquares.every((square) => square !== null)) return 0; // Tie

    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      newSquares.forEach((square, index) => {
        if (square === null) {
          newSquares[index] = "O";
          let score = minimax(newSquares, depth + 1, false);
          newSquares[index] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newSquares.forEach((square, index) => {
        if (square === null) {
          newSquares[index] = "X"; // User's move
          let score = minimax(newSquares, depth + 1, true);
          newSquares[index] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  }

  function findBestMove(newSquares) {
    let bestMove = null;
    let bestScore = -Infinity;

    newSquares.forEach((square, index) => {
      if (square === null) {
        newSquares[index] = "O"; // Computer's move
        let moveScore = minimax(newSquares, 0, false);
        newSquares[index] = null;

        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = index;
        }
      }
    });

    return bestMove;
  }

  const renderSquare = (index) => {
    return (
      <>
        <Square
          value={squares[index]}
          click={() => handleClick(index)}
          isUserturn={isUserturn}
        />
      </>
    );
  };

  const winner = calculateWinner(squares);

  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner) {
      setisgameActive(false);
      handleCoins(1);
    }
  }, [squares]);

  const status = winner
    ? `winner : ${winner}`
    : `Next turn : ${isUserturn ? "User (X)" : "computer (O)"}`;

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
        return squares[a];
      }
    }

    return null;
  }

  const handleRestart = () => {
    setsquares(Array(9).fill(null));
    setisUserturn(true);
    setisgameActive(true);
  };

  return (
    <>
      <div className="board-container" id="Board">
        <div className="game-plan">
          <div className="status">{status}</div>
          <div className="board">
            <div className="row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div
            className="note"
            style={{ width: "90%", marginInline: "auto", marginTop: "1rem" }}
          >
            <p>
              Note: If You are unable to play game , then please upgrade your
              plan
            </p>
          </div>
          <div className="button-menu">
            <button
              onClick={() => setisgameActive(true)}
              disabled={isgameActive ? true : false}
              className="board-button"
            >
              Play Now
            </button>
            <button className="board-button" onClick={handleRestart}>
              <span className="button-text">Restart</span>
            </button>
          </div>
        </div>
        <div className="wallet-container">
          <Wallet />
        </div>
        <div className="wallet-container">
          <Rules />
        </div>
      </div>
    </>
  );
}

export default Board;
