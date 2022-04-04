import { Tournament } from "../entities/Tournament";
import LeaderboardRow from "./LeaderboardRow";

interface Leaderboard {
    leaderboardRows: LeaderboardRow[]
    tournament: Tournament
}

export default Leaderboard;
