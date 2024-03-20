import { useState } from "react";
import Board from "./Board";
import "../Game.css";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const isNext = currentMove % 2 === 0;
    // Recupero il quadrato corrent
    const currentSquares = history[currentMove];
    // Questa funzione verrà chiamata da Board per aggiornare il gioco
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // Nuovo array con tutti gli elementi di history seguito da nextSquares
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        if (!gameStarted) {
            setGameStarted(true);
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function restartGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setGameStarted(false)
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
        <div className="game flex justify-center">
            <div className="game-board flex flex-col gap-6">
                <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
                <div className="btn-restart">
                    <button onClick={restartGame}><span></span><p data-start="good luck!" data-text="start!" data-title="new game"></p></button>
                </div>
            </div>
            {gameStarted && (
                <div className="game-info absolute top-28 right-24">
                    <ul>{moves}</ul>
                </div>
            )}
        </div>
    )
}

export default Game;