import { useState } from "react";
import Board from "./Board";
import "../Game.css";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const isNext = currentMove % 2 === 0;
    // Recupero il quadrato corrent
    const currentSquares = history[currentMove];
    // Questa funzione verrà chiamata da Board per aggiornare il gioco
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // Nuovo array con tutti gli elementi di history seguito da nextSquares
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Vai alla mossa n.' + move;
        } else {
            description = "Vai all'inizio del gioco";
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game flex justify-center gap-10">
            <div className="game-board flex flex-col gap-6">
                <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info self-center">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

export default Game;