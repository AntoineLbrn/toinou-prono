import LeaderboardRow from "./LeaderboardRow";
import Tournament from "./Tournament";

interface Leaderboard {
    leaderboardRows: LeaderboardRow[]
    tournament: Tournament
}

export default Leaderboard;
