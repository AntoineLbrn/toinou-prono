import { MessageButton } from "discord.js";
import { Bet } from "../../models/Bet";

class BetButton extends MessageButton {
    constructor(bet: Bet) {
        super({
            label: bet.label,
            customId: `bet-button ${bet.id}`,
            style: "PRIMARY",
            emoji: "✉️",
        });

    }
}

export default BetButton;
