import { MessageButton } from "discord.js";
import Tournament from "../../models/Tournament";

class ParticipationButton extends MessageButton {
    constructor(tournament: Tournament) {
        super({
            label: `Rejoindre`,
            customId: `participation-button ${tournament.id}`,
            style: "PRIMARY",
            emoji: "🥳",
        });

    }
}

export default ParticipationButton;
