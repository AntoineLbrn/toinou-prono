import { CommandInteraction, Interaction, Role } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class CreateRole {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: Interaction}): Promise<Role> {
        if (args.interaction.guild) {
            return args.interaction.guild?.roles.create({
                mentionable: true, 
                name: args.subscription.bettorRoleLabel,
            });
        } else {
            throw new Error('Unexpected error');
        }
    }
}


export default new CreateRole();