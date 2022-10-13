import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Bet } from "../../models/Bet";

class BetButton extends ButtonBuilder {
    constructor(bet: Bet) {
        super({
            label: bet.label,
            customId: `bet-button ${bet.id}`,
            style: ButtonStyle.Primary,
            emoji: "✉️",
        });

    }
}

export default BetButton;
