import { ColorResolvable, MessageEmbed } from "discord.js";
import Tournament from "../../models/Tournament";

class TournamentEmbed extends MessageEmbed {
    constructor(tournament: Tournament) {
        const description = tournament.description ? tournament.description : "Pas de description"
        super (
            new MessageEmbed()
            .setColor('GOLD')
            .setTitle(tournament.label)
            .setDescription(description)
        )
    }
}
export default TournamentEmbed;