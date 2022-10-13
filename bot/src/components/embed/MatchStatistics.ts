import { EmbedBuilder } from "discord.js";
import MatchStatistics from "../../models/MatchStatistics";

class MatchStatisticsEmbed extends EmbedBuilder {
    constructor(matchStatistics: MatchStatistics) {
        const description = matchStatistics.stats.map((betStatistics) => {
            return `${betStatistics.betLabel} : ${betStatistics.percentage}% (${betStatistics.numberOfVotesForBet} votes)`
        }).join('\n')
        super ({
            color: 0xFF0E0E,
            title: matchStatistics.match.label,
            description: description
        })
    }
}
export default MatchStatisticsEmbed;