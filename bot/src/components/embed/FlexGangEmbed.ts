import { MessageEmbed } from "discord.js";

class FlexGangEmbed extends MessageEmbed {
    constructor(roles: string[], rolesDistribution: Map<string,string>) {
        const description = roles.map((role) => role + ' ' + rolesDistribution.get(role)).join('\n')
        super (
            new MessageEmbed()
            .setColor('#FF0EFF')
            .setTitle('FLEXGANG')
            .setDescription(description)
        )
    }
}
export default FlexGangEmbed;