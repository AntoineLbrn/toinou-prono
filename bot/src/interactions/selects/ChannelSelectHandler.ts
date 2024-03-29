import { SelectMenuInteraction } from "discord.js";
import { Discord, Guard, SelectMenuComponent } from "discordx";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import isAdmin from "../../decorators/isAdmin";
import getSubscriptionById from "../../api/subscriptions/getSubscriptionById";
import getGuildRoleFromId from "../../utils/getGuildRoleFromId";
import sendSubscriptionRoleAndChannel from "../../api/subscriptions/sendSubscriptionRoleAndChannel";
import getGuildChannelFromId from "../../utils/getGuildChannelFromId";
import getChannelPermissions from "../../utils/getChannelPermissions";

const hasSubscriptionRoleBeenSet = (subscription: ServerTournamentSubscribtion): boolean => {
    return !!subscription.bettorRoleId && !!subscription.bettorRoleLabel; 
}

@Discord()
class ChannelSelectHandler {

    @SelectMenuComponent({id:new RegExp("^select-bettor-channel .")})
    @Guard(isAdmin)
    handle(interaction: SelectMenuInteraction) {
        interaction.deferReply();
        const subscriptionId = interaction.customId.split(' ')[1];
        const guild = interaction.guild;
        if (guild) {
            getSubscriptionById(subscriptionId).then(async (subscription: ServerTournamentSubscribtion) => {
                if (hasSubscriptionRoleBeenSet(subscription)) {
                    const role = getGuildRoleFromId(subscription.bettorRoleId, guild.roles);
                    if (role) {
                        const channel = getGuildChannelFromId(interaction.values[0], guild.channels);
                        if (channel) {
                            sendSubscriptionRoleAndChannel({id: subscription.id, bettorChannelId: channel.id, bettorChannelLabel: channel.name}).then(() => {
                                channel.edit({permissionOverwrites: getChannelPermissions({guild: guild, role: role})})
                                interaction.editReply(`Le channel a été configuré, tout est bon ${interaction.user.toString()}`);        
                            });
                        } else {
                            interaction.editReply(`Choisis un nouveau channel, celui-ci n'existe plus !`);
                        }
                    } else {
                        interaction.editReply(`Choisis un nouveau rôle, celui-ci n'existe plus !`);
                    }
                } else {
                    interaction.editReply(`Choisis un rôle avant un canal`);
                }
            }).catch(async (err) => {
                interaction.editReply(err.message);
            });
    
        } else {
            interaction.editReply('Erreur inattendue');
        }
    }
}
export default ChannelSelectHandler;