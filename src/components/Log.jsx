export default function Log({ turnsData }){

    return (
        <ol id="log" >
            {turnsData.map((entry)=> (
            <li key={`${entry.square.row}${entry.square.col}`}>{entry.player} selected {entry.square.row},{entry.square.col}</li>
            )
            )}
        </ol>
    )
}