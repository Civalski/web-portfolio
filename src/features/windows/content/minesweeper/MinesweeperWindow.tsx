"use client";

import { useMemo, useState } from "react";
import type { JSX, MouseEvent as ReactMouseEvent } from "react";

import type { WindowContentProps } from "@/types/window.types";

interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

type GameStatus = "playing" | "won" | "lost";

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

function createEmptyBoard(): Cell[][] {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );
}

function countAdjacentMines(board: Cell[][], row: number, column: number): number {
  let count = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset === 0 && columnOffset === 0) {
        continue;
      }

      if (board[row + rowOffset]?.[column + columnOffset]?.hasMine) {
        count += 1;
      }
    }
  }

  return count;
}

function createBoard(): Cell[][] {
  const board = createEmptyBoard();
  const minePositions = new Set<string>();

  while (minePositions.size < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const column = Math.floor(Math.random() * BOARD_SIZE);
    minePositions.add(`${row}:${column}`);
  }

  minePositions.forEach((position) => {
    const [row, column] = position.split(":").map(Number);
    board[row][column].hasMine = true;
  });

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let column = 0; column < BOARD_SIZE; column += 1) {
      board[row][column].adjacentMines = countAdjacentMines(board, row, column);
    }
  }

  return board;
}

function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function revealCell(board: Cell[][], row: number, column: number): void {
  const cell = board[row]?.[column];

  if (cell === undefined || cell.isRevealed || cell.isFlagged) {
    return;
  }

  cell.isRevealed = true;

  if (cell.adjacentMines !== 0 || cell.hasMine) {
    return;
  }

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset !== 0 || columnOffset !== 0) {
        revealCell(board, row + rowOffset, column + columnOffset);
      }
    }
  }
}

function revealAllMines(board: Cell[][]): void {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.hasMine) {
        cell.isRevealed = true;
      }
    });
  });
}

function hasWon(board: Cell[][]): boolean {
  return board.every((row) =>
    row.every((cell) => cell.hasMine || cell.isRevealed),
  );
}

function getCellLabel(cell: Cell): string {
  if (cell.isFlagged && !cell.isRevealed) {
    return "F";
  }

  if (!cell.isRevealed) {
    return "";
  }

  if (cell.hasMine) {
    return "*";
  }

  return cell.adjacentMines === 0 ? "" : String(cell.adjacentMines);
}

export default function MinesweeperWindow({}: WindowContentProps): JSX.Element {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard());
  const [status, setStatus] = useState<GameStatus>("playing");

  const flaggedCount = useMemo(
    () => board.flat().filter((cell) => cell.isFlagged).length,
    [board],
  );

  const resetGame = (): void => {
    setBoard(createBoard());
    setStatus("playing");
  };

  const handleCellClick = (row: number, column: number): void => {
    if (status !== "playing") {
      return;
    }

    const nextBoard = cloneBoard(board);
    const cell = nextBoard[row][column];

    if (cell.isFlagged || cell.isRevealed) {
      return;
    }

    if (cell.hasMine) {
      revealAllMines(nextBoard);
      setBoard(nextBoard);
      setStatus("lost");
      return;
    }

    revealCell(nextBoard, row, column);
    setBoard(nextBoard);

    if (hasWon(nextBoard)) {
      setStatus("won");
    }
  };

  const handleFlag = (
    event: ReactMouseEvent<HTMLButtonElement>,
    row: number,
    column: number,
  ): void => {
    event.preventDefault();

    if (status !== "playing") {
      return;
    }

    const nextBoard = cloneBoard(board);
    const cell = nextBoard[row][column];

    if (!cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged;
      setBoard(nextBoard);
    }
  };

  return (
    <div className="flex h-full flex-col items-center gap-3 bg-[#c0c0c0] p-3 text-[12px] text-[#10233f]">
      <div className="winxp-inset flex w-full items-center justify-between bg-[#c0c0c0] p-2">
        <div className="bg-black px-2 py-1 font-mono text-[18px] text-red-500">
          {String(Math.max(0, MINE_COUNT - flaggedCount)).padStart(3, "0")}
        </div>
        <button
          type="button"
          className="winxp-raised bg-[#d4d0c8] px-3 py-1 text-[18px]"
          onClick={resetGame}
          aria-label="Restart Minesweeper"
        >
          {status === "lost" ? ":(" : status === "won" ? "B)" : ":)"}
        </button>
        <div className="bg-black px-2 py-1 font-mono text-[18px] text-red-500">
          {status === "won" ? "WIN" : status === "lost" ? "BAD" : "000"}
        </div>
      </div>
      <div className="winxp-inset grid grid-cols-9 bg-[#808080] p-1">
        {board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <button
              key={`${rowIndex}-${columnIndex}`}
              type="button"
              className={`flex h-8 w-8 items-center justify-center border text-[16px] font-bold ${
                cell.isRevealed
                  ? "border-[#808080] bg-[#c0c0c0]"
                  : "border-b-[#404040] border-l-white border-r-[#404040] border-t-white bg-[#d4d0c8]"
              }`}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
              onContextMenu={(event) => handleFlag(event, rowIndex, columnIndex)}
              aria-label={`Cell ${rowIndex + 1}, ${columnIndex + 1}`}
            >
              {getCellLabel(cell)}
            </button>
          )),
        )}
      </div>
    </div>
  );
}
