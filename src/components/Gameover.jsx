export default function Gameover({winner, onclick}){
    return(
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} Won</p>}
            {!winner && <p>It's a draw</p>}
            <button onClick={onclick}>Rematch</button>

        </div>

    )
}