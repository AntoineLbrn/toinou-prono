import { ButtonBuilder, ButtonStyle } from "discord.js";
import Tournament from "../../models/Tournament";

class ParticipationButton extends ButtonBuilder {
    constructor(tournament: Tournament) {
        super({
            label: `Rejoindre`,
            customId: `participation-button ${tournament.id}`,
            style: ButtonStyle.Primary,
            emoji: "🥳",
        });

    }
}

export default ParticipationButton;
