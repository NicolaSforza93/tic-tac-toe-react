import { useState } from "react";

function Square({ value, onSquareClick, squareClassName }) {
    // const [value, setValue] = useState(null);

    // function handleClick() {
    //     setValue('X');
    // }

    return (
        <button className={`w-24 h-24 font-bold text-6xl ${value === 'X' ? 'text-red-500' : ''} ${squareClassName}`} onClick={onSquareClick}>{value}</button>
    );
}

export default Square;