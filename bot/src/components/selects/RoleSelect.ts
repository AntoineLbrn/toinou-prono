import { MessageSelectMenu, RoleManager } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class RoleSelect extends MessageSelectMenu {
    constructor(roles: RoleManager, subscription: ServerTournamentSubscribtion) {
        const rolesAsOptions = roles.cache.map((role) => {
            return {
                label: role.name,
                value: role.id
            }
        });
        super (
            new MessageSelectMenu()
            .setCustomId(`select-bettor-role ${subscription.id}`)
            .setPlaceholder('Choisis le rôle de parieur')
            .addOptions(rolesAsOptions ? rolesAsOptions : []),
        )
    }
}
export default RoleSelect;