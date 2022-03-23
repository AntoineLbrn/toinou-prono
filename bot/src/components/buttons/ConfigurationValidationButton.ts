import { MessageButton } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class ConfigurationValidationButton extends MessageButton {
    constructor(subscription: ServerTournamentSubscribtion) {
        super({
            label: 'Valider',
            style: "PRIMARY",
            emoji: "✅",
            customId: `validation-config-button ${subscription.id}`
        });

    }
}

export default ConfigurationValidationButton;
