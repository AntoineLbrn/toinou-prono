import { EmbedBuilder } from "discord.js";
import { Match } from "../../models/Match";

class MatchEmbed extends EmbedBuilder {
    constructor(match: Match) {
        const description = match.description ? match.description : "Pas de description"
        const date = new Date(match.date).toLocaleDateString('fr', {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: "Europe/Paris"});
        super (
            { color: 0xFF0E0E, title: match.label, description: `${description} - ${date}`}
        )
    }
}
export default MatchEmbed;