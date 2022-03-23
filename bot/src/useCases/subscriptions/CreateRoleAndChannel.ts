import { Channel, CommandInteraction, Role } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import CreateChannel from "./CreateChannel";
import CreateRole from "./CreateRole";

class CreateRoleAndChannel {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction}): Promise<{role: Role, channel: Channel}> {
        const role = await CreateRole.execute(args);
        const channel = await CreateChannel.execute({...args, role});
        args.interaction.reply(`Voici votre nouveau channel ${channel.toString()}`);
        return {role, channel};
    }
}


export default new CreateRoleAndChannel();