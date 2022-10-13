import { SelectMenuBuilder, RoleManager } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class RoleSelect extends SelectMenuBuilder {
    constructor(roles: RoleManager, subscription: ServerTournamentSubscribtion) {
        const rolesAsOptions = roles.cache.map((role) => {
            return {
                label: role.name,
                value: role.id
            }
        });
        super ({
            custom_id: `select-bettor-role ${subscription.id}`,
            placeholder: 'Choisis le rôle de parieur',
            options: rolesAsOptions ? rolesAsOptions : []
        })
    }
}
export default RoleSelect;