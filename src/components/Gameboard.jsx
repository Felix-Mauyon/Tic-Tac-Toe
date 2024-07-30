export default function Gameboard ({ onSelect, board, winner}){



    return (
        <ol id="game-board">
            {board.map((row, rowIndex)=>{
                return <li key={rowIndex}><ol>
                        {row.map((playerSymbol, playerSymbolIndex)=>{
                        return <li key={playerSymbolIndex}><button onClick={()=>onSelect(rowIndex, playerSymbolIndex ) } disabled={playerSymbol!==null || winner}>{playerSymbol}</button></li>
                    })}
                </ol></li>
            })}
        </ol>
    )
}