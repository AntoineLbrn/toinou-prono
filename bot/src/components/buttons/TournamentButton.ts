import { MessageButton } from "discord.js";
import getTournamentMatchesUntil from "../../utils/getTournamentMatchesUntil";
import Tournament from "../../models/Tournament";

class TournamentButton extends MessageButton {
    constructor(tournament: Tournament, days: number) {
        super({
            label: `${tournament.label} (${getTournamentMatchesUntil(tournament, days).length})`,
            customId: `tournament-button ${tournament.id} ${days}`,
            style: "PRIMARY",
            emoji: "🏆",
        });

    }
}

export default TournamentButton;
