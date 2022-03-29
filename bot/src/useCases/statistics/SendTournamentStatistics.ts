import MatchStatisticsEmbed from "../../components/embed/MatchStatistics";
import MatchStatistics from "../../models/MatchStatistics";
import getTournamentMatchesUntil from "../../utils/getTournamentMatchesUntil";

class SendTournamentStatistics {
    public async execute (args: {statistics: MatchStatistics[], channel: any}): Promise<boolean> {
        if (!args.statistics.length) {
            return args.channel.send("Pas de match à analyser")
        } else {
            for (const matchStatistics of args.statistics) {
                await args.channel.send({embeds: [new MatchStatisticsEmbed(matchStatistics)]});
            }
            return true;
        }
    }
}


export default new SendTournamentStatistics();