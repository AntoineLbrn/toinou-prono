import { MessageEmbed } from "discord.js";
import MatchStatistics from "../../models/MatchStatistics";

class MatchStatisticsEmbed extends MessageEmbed {
    constructor(matchStatistics: MatchStatistics) {
        const description = matchStatistics.stats.map((betStatistics) => {
            return `${betStatistics.betLabel} : ${betStatistics.percentage}% (${betStatistics.numberOfVotesForBet} votes)`
        }).join('\n')
        super (
            new MessageEmbed()
            .setColor('#FF0E0E')
            .setTitle(matchStatistics.match.label)
            .setDescription(description)
        )
    }
}
export default MatchStatisticsEmbed;