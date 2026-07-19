import { useAuth } from "../auth/useAuth";

export function PlayerProfile() {
const { player } = useAuth();


return(
    <div className="player-profile">
        <img
        className="player-avatar"
        src={`/${player.avatar}`}
        alt={`${player.name}'s avatar`}
        />

        <div className="player-details">
        <h1>{player.name}</h1>
        <p>{player.event}</p>
        </div>
    </div>

);}