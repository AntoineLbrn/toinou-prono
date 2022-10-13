import { ButtonBuilder, ButtonStyle  } from "discord.js";
import getTournamentMatchesUntil from "../../utils/getTournamentMatchesUntil";
import Tournament from "../../models/Tournament";

class TournamentButton extends ButtonBuilder  {
    constructor(tournament: Tournament, days: number) {
        super({
            label: `${tournament.label} (${getTournamentMatchesUntil(tournament, days).length})`,
            customId: `tournament-button ${tournament.id} ${days}`,
            style: ButtonStyle.Primary,
            emoji: "🏆",
        });

    }
}

export default TournamentButton;
