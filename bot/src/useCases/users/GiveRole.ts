import { GuildMember, RoleResolvable } from "discord.js";

class GiveRole {
    public async execute (args: {role: RoleResolvable, member: GuildMember | any}): Promise<GuildMember> {
        return await args.member.roles.add(args.role);
    }
}

export default new GiveRole();