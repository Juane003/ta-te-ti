import { ReactElement, useEffect, useState } from "react";
import Token from "../Token/Token";

const defaultBoard: Array<null | string> = Array(9).fill(null);

const Board = (): ReactElement => {
  const [board, setBoard] = useState<Array<string | null>>(defaultBoard);
  const [player, setPlayer] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

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

  const handleResetClick = () => {
    setPlayer(true);
    setBoard(defaultBoard);
    setWinner(null);
    setDraw(false);
  };

  const handleOnClick = (event: any): void => {
    const tokenPosition = board.slice();
    if (winner) {
      event.PreventDefault();
    }
    if (tokenPosition[event.target.value] !== null) {
      event.preventDefault();
    } else {
      if (player === true) {
        tokenPosition[event.target.value] = "X";
      } else {
        tokenPosition[event.target.value] = "O";
      }
      setBoard(tokenPosition);
      setPlayer((prev) => !prev);
    }
  };

  const renderTokens = (element: null | string, index: number) => {
    return (
      <Token text={element} key={index} value={index} onClick={handleOnClick} />
    );
  };

  useEffect(() => {
    const isNull = (element: null | string) => element === null;
    lines.map((element: Array<number>) => {
      const [a, b, c] = [...element];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    });

    if (!winner && !board.some(isNull)) {
      setDraw(true);
    }
  }, [board]);

  return (
    <div>
      {draw && <h1>Empate</h1>}
      {winner && <h1>Ganador: {winner}</h1>}
      <button onClick={handleResetClick}>Reset</button>
      <div className="h-48 w-48 grid grid-cols-3 border border-black">
        {board.map(renderTokens)}
      </div>
    </div>
  );
};

export default Board;
