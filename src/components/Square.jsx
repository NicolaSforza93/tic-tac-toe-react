import { useState } from "react";

function Square({ value, onSquareClick, squareClassName, isWinningSquare }) {
    // const [value, setValue] = useState(null);

    // function handleClick() {
    //     setValue('X');
    // }

    return (
        <button className={`square w-24 h-24 text-6xl ${value === 'X' ? 'text-red-500' : ''} ${squareClassName}`} onClick={onSquareClick}>{value}</button>
    );
}

export default Square;