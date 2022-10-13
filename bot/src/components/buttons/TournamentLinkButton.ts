import { ButtonBuilder, ButtonStyle } from "discord.js";
import Tournament from "../../models/Tournament";

class TournamentLinkButton extends ButtonBuilder {
    constructor(tournament: Tournament) {
        super({
            label: tournament.label,
            style: ButtonStyle.Link,
            url: `${process.env.FRONTEND_URL}/tournament/${encodeURI(tournament.id)}`
        });

    }
}

export default TournamentLinkButton;
