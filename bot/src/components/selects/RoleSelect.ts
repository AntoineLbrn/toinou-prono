import { MessageSelectMenu, RoleManager } from "discord.js";

class RoleSelect extends MessageSelectMenu {
    constructor(roles: RoleManager) {
        const rolesAsOptions = roles.cache.map((role) => {
            return {
                label: role.name,
                value: role.id
            }
        });
        super (
            new MessageSelectMenu()
            .setCustomId('select-bettor-role')
            .setPlaceholder('Choisis le rôle de parieur')
            .addOptions(rolesAsOptions ? rolesAsOptions : []),
        )
    }
}
export default RoleSelect;