import { EmbedBuilder } from "discord.js";
import Leaderboard from "../../models/Leaderboard";
import { Match } from "../../models/Match";

class LeaderboardEmbed extends EmbedBuilder {
    constructor(leaderboard: Leaderboard) {
        const description = leaderboard.leaderboardRows.map((leaderboardRow) => 
        (`${leaderboardRow.rank} : ${leaderboardRow.user} (${leaderboardRow.points} pts )`)).join('\n');
        super ({
            color: 0xFF0E0E,
            title: `Leaderboard de ${leaderboard.tournament.label}`,
            description: description
        })
    }
}
export default LeaderboardEmbed;