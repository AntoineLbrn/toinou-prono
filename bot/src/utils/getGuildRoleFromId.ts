import { Role, RoleManager } from "discord.js";

const getGuildRoleFromId = (bettorRoleId: string, roles: RoleManager): Role | undefined => {
    return roles.cache.find((role) => role.id === bettorRoleId);
}

export default getGuildRoleFromId;
