import { Colors, EmbedBuilder } from "discord.js";
import Tournament from "../../models/Tournament";

class TournamentEmbed extends EmbedBuilder {
    constructor(tournament: Tournament) {
        const description = tournament.description ? tournament.description : "Pas de description"
        super ({
            color: Colors.Gold,
            title: tournament.label,
            description: description
    })
    }
}
export default TournamentEmbed;