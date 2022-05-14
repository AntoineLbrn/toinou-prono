import { MessageEmbed } from "discord.js";
import Leaderboard from "../../models/Leaderboard";
import { Match } from "../../models/Match";

class LeaderboardEmbed extends MessageEmbed {
    constructor(leaderboard: Leaderboard) {
        const description = leaderboard.leaderboardRows.map((leaderboardRow) => 
        (`${leaderboardRow.rank} : ${leaderboardRow.user} (${leaderboardRow.points} pts )`)).join('\n');
        super (
            new MessageEmbed()
            .setColor('#FF0E0E')
            .setTitle(`Leaderboard de ${leaderboard.tournament.label}`)
            .setDescription(description)
        )
    }
}
export default LeaderboardEmbed;