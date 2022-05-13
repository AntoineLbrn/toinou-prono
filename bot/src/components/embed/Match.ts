import { MessageEmbed } from "discord.js";
import { Match } from "../../models/Match";

class MatchEmbed extends MessageEmbed {
    constructor(match: Match) {
        const description = match.description ? match.description : "Pas de description"
        const date = new Date(match.date).toLocaleDateString('fr', {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
        super (
            new MessageEmbed()
            .setColor('#FF0E0E')
            .setTitle(match.label)
            .setDescription(`${description} - ${date}`)
        )
    }
}
export default MatchEmbed;