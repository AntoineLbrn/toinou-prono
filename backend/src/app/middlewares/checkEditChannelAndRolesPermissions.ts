import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import discordService from "../services/discordService";

const checkPermission = (permissions: string, wantedPermission: number): boolean => {
    return (BigInt(permissions) & BigInt(wantedPermission)) === BigInt(wantedPermission);
}

const canEditChannelAndRoles = (permissions: string) => {
    return checkPermission(permissions, 0x10000000) && checkPermission(permissions, 0x10)
}

const checkEditChannelAndRolesPermissions = async (req: Request, res: Response, next: NextFunction) => {
      const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
      const { serverSubscriptionId } = req.body ;
  
      
      const serverSubscriptionRepository = getRepository(ServerTournamentSubscribtion);
      let permissions: string;

      try {
        const serverSubscription = await serverSubscriptionRepository.findOneOrFail(serverSubscriptionId, { relations: ['server'] });
        try {
            const discordServerDetail = await discordService.getDiscordServerDetail(serverSubscription.server.discordServerId, discordAccessToken);
            permissions = discordServerDetail.permissions;
        } catch (err) {
            console.log(err)
          res.status(401).send(err.message);
          return;
        }
      } catch (err) {
          res.status(400).send('no serverSubscription with this ID');
          return;
      }
      if (canEditChannelAndRoles(permissions)) next();
      else res.status(401).send("You don't have enough permissions");
  };
  
  export default checkEditChannelAndRolesPermissions;