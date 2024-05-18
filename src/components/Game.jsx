  import React from "react";
  import { useState, useEffect } from "react";

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isTurnX, setIsTurnX] = useState(false);
    const [turnCount, setTurnCount] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [oScore, setOScore] = useState(0);
    const [xScore, setXScore] = useState(0);

    useEffect(() => {
      if(winner === "X"){
        setXScore(xScore + 1)
      }
      else if(winner === "O"){
        setOScore(oScore + 1);
      }
    },[winner])

    const checkWin = (gameBoard) => {
      for (let pattern of winPatterns) {
        const [pos1, pos2, pos3] = pattern;
        if (
          gameBoard[pos1] !== null &&
          gameBoard[pos1] === gameBoard[pos2] &&
          gameBoard[pos1] === gameBoard[pos3]
        ) {
          setIsWon(true);
          setWinner(gameBoard[pos1]);
          setDisableButtons(true);
          return;
        }
      }

      if(turnCount === 8){
        setIsDraw(true);
        setDisableButtons(true);
      }
    };


    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsWon(false);
      setDisableButtons(false);
      setTurnCount(0);
      setIsTurnX(false);
      setIsDraw(false);
    };

    const handleClick = (index) => {
      if (board[index] !== null) {
        return;
      }
      const newBoard = [...board];

    newBoard[index] = isTurnX ? "X" : "O";

      setBoard(newBoard);
      setIsTurnX(!isTurnX);
      setTurnCount(turnCount + 1);

      if (turnCount >= 4) {
        checkWin(newBoard);
      }

    };

    const getButtonClasses = (index) => {
      let classes = "box";
      if (index < 3) {
        classes += " btop";
      }
      if (index % 3 === 0) {
        classes += " bleft";
      }
      if (index % 3 === 2) {
        classes += " bright";
      }
      if (index > 5) {
        classes += " bbot";
      }
      return classes;
    };

    return (
      <>
        <div className="score">
          <span>O : {oScore}</span>
          <span>X : {xScore}</span>
        </div>
        {isDraw && <div className="msg">This Game is a Draw!</div>}
        {!isWon && !isDraw && <div className="msg">{isTurnX ? "'X's turn" : "'O's turn"}</div>}
        {isWon && <div className="msg">Winner is '{winner}'</div>}
        <div className="gameContainer">
          {board.map((value, index) => (
            <button
              key={index}
              disabled={disableButtons}
              className={getButtonClasses(index)}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => {
            resetGame();
          }}
          className="animatedBtn"
        >
          Play Again
        </button>
      </>
    );
  };

  export default Game;
