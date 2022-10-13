import { EmbedBuilder } from "discord.js";

class FlexGangEmbed extends EmbedBuilder {
    constructor(roles: string[], rolesDistribution: Map<string,string>) {
        const description = roles.map((role) => role + ' ' + rolesDistribution.get(role)).join('\n')
        super ({ 
            color: 0xFF0EFF,
            title:'FLEXGANG',
            description: description
        })
    }
}
export default FlexGangEmbed;