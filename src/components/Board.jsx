import { useState } from "react";
import Square from "./Square";

function Board({ isNext, squares, onPlay }) {
    // const [isNext, setIsNext] = useState(true);
    // const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (isNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // setSquares(nextSquares);
        // setIsNext(!isNext);
        onPlay(nextSquares);
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
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }

        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Vincitore:' + ' ' + winner;
    } else if (squares.every(square => square !== null)) {
        // Verifica se tutti i quadrati sono stati riempiti senza che nessuno abbia vinto
        status = 'Pareggio';
    } else {
        status = 'Turno del giocatore' + ' ' + (isNext ? 'X' : 'O');
    }


    return (
        <>
            <div className="status text-center text-xl">
                <p className={winner ? 'animate-ping' : ''}>{status}</p>
            </div>
            <div className="board grid grid-cols-3">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} squareClassName="border-b-8 border-r-8 border-inherit" />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} squareClassName="border-b-8 border-r-8 border-inherit" />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} squareClassName="border-b-8 border-inherit" />
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} squareClassName="border-b-8 border-r-8 border-inherit" />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} squareClassName="border-b-8 border-r-8 border-inherit" />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} squareClassName="border-b-8 border-inherit" />
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} squareClassName="border-r-8 border-inherit" />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} squareClassName="border-r-8 border-inherit" />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}

export default Board;