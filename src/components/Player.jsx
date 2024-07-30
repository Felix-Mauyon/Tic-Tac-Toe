import { useState } from "react";

export default function Player({ player, playerSymbol, active, onchange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(player);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            // Call onchange when saving the edited name
            onchange(playerSymbol, playerName);
        }
    }

    function handleChange(e) {
        setPlayerName(e.target.value);
    }

    let player_name = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        player_name = <input type="text" value={playerName} onChange={handleChange} required />;
    }

    return (
        <li className={active ? "active" : undefined}>
            <span className="player">
                {player_name}
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
