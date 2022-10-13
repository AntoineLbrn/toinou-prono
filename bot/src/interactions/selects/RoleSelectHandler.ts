import { SelectMenuInteraction } from "discord.js";
import { Discord, Guard, SelectMenuComponent } from "discordx";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import isAdmin from "../../decorators/isAdmin";
import getSubscriptionById from "../../api/subscriptions/getSubscriptionById";
import getGuildRoleFromId from "../../utils/getGuildRoleFromId";
import sendSubscriptionRoleAndChannel from "../../api/subscriptions/sendSubscriptionRoleAndChannel";

@Discord()
class RoleSelectHandler {

    @SelectMenuComponent({id: new RegExp("^select-bettor-role .")})
    @Guard(isAdmin)
    handle(interaction: SelectMenuInteraction) {
        interaction.deferReply();
        const subscriptionId = interaction.customId.split(' ')[1];
        getSubscriptionById(subscriptionId).then(async (subscription: ServerTournamentSubscribtion) => {
            if (interaction.guild) {
                const role = getGuildRoleFromId(interaction.values[0], interaction.guild.roles);
                if (role) {
                    sendSubscriptionRoleAndChannel({id: subscription.id, bettorRoleId: role.id, bettorRoleLabel: role.name }).then(() => {
                        interaction.editReply(`Le role a été configuré, tout est bon ${interaction.user.toString()}`);        
                    });
                } else {
                    interaction.editReply(`Choisis un nouveau rôle, celui-ci n'existe plus !`);
                }
            } else {
                interaction.editReply(`Une erreur inconnue s'est produite`);
            }
            }).catch(async (err) => {
            interaction.editReply(err.message);
        });
    }
}
export default RoleSelectHandler;