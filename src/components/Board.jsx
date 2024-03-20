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
                // lines contiene gli indici dei quadrati
                return lines[i];
            }
        }

        return null;
    }

    const winnerLine = calculateWinner(squares);
    // assegna il valore del quadrato vincente a winner se c'è una linea vincente, altrimenti sarà null
    const winner = winnerLine ? squares[winnerLine[0]] : null;
    let status;
    if (winner) {
        status = 'Vittoria' + ' ' + winner;
    } else if (squares.every(square => square !== null)) {
        // Verifica se tutti i quadrati sono stati riempiti senza che nessuno abbia vinto
        status = 'Pareggio XO';
    } else {
        status = 'Turno del giocatore' + ' ' + (isNext ? 'X' : 'O');
    }

    const renderLine = () => {
        if (winnerLine) {
            const [a, b, c] = winnerLine;
            const lineStyle = {
                position: 'absolute',
                zIndex: 1,
                border: '3px solid #ff0000',
                borderRadius: '5px',
            };

            if (a === 0 && c === 2) {
                // La linea attraversa la parte superiore del tabellone
                lineStyle.top = '15%';
                lineStyle.left = '0';
                lineStyle.width = '100%';
                lineStyle.transform = 'translateY(-50%)';
                lineStyle.animation = 'extend-line-w 1s forwards';
            } else if (a === 3 && c === 5) {
                // La linea attraversa la parte centrale del tabellone
                lineStyle.top = '48%';
                lineStyle.left = '0';
                lineStyle.width = '100%';
                lineStyle.transform = 'translateY(-50%)';
                lineStyle.animation = 'extend-line-w 1s forwards';
            } else if (a === 6 && c === 8) {
                // La linea attraversa la parte inferiore del tabellone
                lineStyle.top = '83%';
                lineStyle.left = '0';
                lineStyle.width = '100%';
                lineStyle.transform = 'translateY(-50%)';
                lineStyle.animation = 'extend-line-w 1s forwards';
            } else if (a === 0 && c === 6) {
                // La linea attraversa la parte sinistra del tabellone
                lineStyle.left = '14%';
                lineStyle.top = '0';
                lineStyle.height = '100%';
                lineStyle.transform = 'translateX(-50%)';
                lineStyle.animation = 'extend-line-h 1s forwards';
            } else if (a === 1 && c === 7) {
                // La linea attraversa la parte centrale del tabellone
                lineStyle.left = '48%';
                lineStyle.top = '0';
                lineStyle.height = '100%';
                lineStyle.transform = 'translateX(-50%)';
                lineStyle.animation = 'extend-line-h 1s forwards';
            } else if (a === 2 && c === 8) {
                // La linea attraversa la parte destra del tabellone
                lineStyle.left = '83%';
                lineStyle.top = '0';
                lineStyle.height = '100%';
                lineStyle.transform = 'translateX(-50%)';
                lineStyle.animation = 'extend-line-h 1s forwards';
            } else if (a === 0 && c === 8) {
                // La linea attraversa la diagonale principale
                lineStyle.top = '0';
                lineStyle.left = '49%';
                // lineStyle.width = '100%';
                lineStyle.height = '100%';
                lineStyle.transform = 'rotate(-45deg)';
                lineStyle.animation = 'extend-line-h 1s forwards';
            } else if (a === 2 && c === 6) {
                // La linea attraversa l'altra diagonale
                lineStyle.top = '0';
                lineStyle.left = '47%';
                // lineStyle.width = '100%';
                lineStyle.height = '100%';
                lineStyle.transform = 'rotate(45deg)';
                lineStyle.animation = 'extend-line-h 1s forwards';
            }

            return <div className="winning-line" style={lineStyle}></div>;
        }

        return null;
    };


    return (
        <>
            <div className="status text-center text-3xl">
                <p className={`${winner === 'X' ? 'text-red-500' : ''} ${winner ? 'animate-ping' : ''}`}>{status}</p>
            </div>
            <div className="board grid grid-cols-3 relative">
                {renderLine()}
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winnerLine && winnerLine.includes(0)} squareClassName="border-b border-r" />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winnerLine && winnerLine.includes(1)} squareClassName="border-b border-r" />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winnerLine && winnerLine.includes(2)} squareClassName="border-b" />
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winnerLine && winnerLine.includes(3)} squareClassName="border-b border-r" />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winnerLine && winnerLine.includes(4)} squareClassName="border-b border-r" />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winnerLine && winnerLine.includes(5)} squareClassName="border-b" />
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winnerLine && winnerLine.includes(6)} squareClassName="border-r" />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winnerLine && winnerLine.includes(7)} squareClassName="border-r" />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winnerLine && winnerLine.includes(8)} />
            </div>
        </>
    )
}

export default Board;