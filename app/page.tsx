"use client"; 
import { useEffect, useState } from "react";

const X = 'X';
const O = 'O';

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Home() {
  const [won, setWon] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  const [isDraw, setIsDraw] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boardData]);

  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
        setWon(true);
        setWonCombo(bd);
        setModalTitle(xTurn ? 'O Win' : 'X Win');
      }
    })
  }

  const updateBoardData = (idx) => {
    if (!boardData[idx]) {
      let value = xTurn ? X : O;
      setBoardData({
        ...boardData, [idx] : value
      });
      setXTurn(!xTurn);
    }
  }

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    if (check) {
      setIsDraw(check);
      setModalTitle("Draw!")
    }
  }

  const reset = () => {
    setBoardData({
      0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "",8: "",
    });
    setXTurn(true);
    setWon(false);
    setWonCombo([]);
    setIsDraw(false);
    setModalTitle("");
  }

  return (
    <div>
      <h1>Tic tac toe</h1>
      <div className="game">
        <div className="game__menu">
          <p>{xTurn ? 'X Turn' : 'O Turn'}</p>
        </div>
        <div className="game__board">
          <div className={`modal ${modalTitle ? "show" : ""}`}>
              <div className="modal__title">{modalTitle}</div>
              <button onClick={reset}>New Game</button>
          </div>
          {[...Array(9)].map((v, idx) => {
            return (
              <div key={idx} className={`square ${won || isDraw ? "disabled" : ""}`} 
              onClick={() => updateBoardData(idx)}>
                <div className={wonCombo.includes(idx) ? 'square highlight' : ''}>
                {boardData[idx]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
