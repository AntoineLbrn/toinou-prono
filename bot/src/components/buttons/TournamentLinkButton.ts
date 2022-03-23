import { MessageButton } from "discord.js";
import Tournament from "../../models/Tournament";

class TournamentLinkButton extends MessageButton {
    constructor(tournament: Tournament) {
        super({
            label: tournament.label,
            style: "LINK",
            url: `${process.env.FRONTEND_URL}/tournament/${encodeURI(tournament.id)}`
        });

    }
}

export default TournamentLinkButton;
