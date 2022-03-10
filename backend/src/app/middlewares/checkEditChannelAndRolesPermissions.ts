import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import discordService from "../services/discordService";
import Roles from "../utils/roles";
import checkRoles from "./checkroles";

const checkPermission = (permissions: string, wantedPermission: number): boolean => {
    return (BigInt(permissions) & BigInt(wantedPermission)) === BigInt(wantedPermission);
}

const canEditChannelAndRoles = (permissions: string) => {
    return checkPermission(permissions, 0x10000000) && checkPermission(permissions, 0x10)
}

const checkEditChannelAndRolesPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
    if (checkRoles([Roles.ADMIN])) {
        next();
        return;
    }
    const { serverSubscriptionId, serverId } = req.body ;


    let permissions: string;
    let discordServerId: string;
    if (serverSubscriptionId) {
        try {
            const serverSubscriptionRepository = getRepository(ServerTournamentSubscribtion);
            const serverSubscription = await serverSubscriptionRepository.findOneOrFail(serverSubscriptionId, { relations: ['server'] });
            discordServerId = serverSubscription.server.discordServerId;
        } catch (err) {
            res.status(400).send('no serverSubscription with this ID');
            return;
        }    
    } else if (serverId) {
        try {
            const serverRepository = getRepository(Server);
            const server = await serverRepository.findOneOrFail(serverId);
            discordServerId = server.discordServerId;
        } catch (err) {
            res.status(400).send('no serverSubscription with this ID');
            return;
        }          
    }
    
    try {
        const discordServerDetail = await discordService.getDiscordServerDetail(discordServerId, discordAccessToken);
        permissions = discordServerDetail.permissions;
    } catch (err) {
        console.log(err)
        res.status(401).send(err.message);
        return;
    }
    if (canEditChannelAndRoles(permissions)) next();
    else res.status(401).send("You don't have enough permissions");
  };
  
  export default checkEditChannelAndRolesPermissions;