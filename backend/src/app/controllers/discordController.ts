import { Request, Response } from "express";
import { User } from "../entities/User";
import DiscordServer from "../models/DiscordServer";
import DiscordServerAggregated from "../models/DiscordServerAggregated";
import discordService from "../services/discordService";
import serverService from "../services/serverService";
import userService from "../services/userService";
import log, { LogType } from "../utils/log";

class DiscordController {
    async getCurrentUser(req: Request, res: Response) {
        log('getCurrentUser', LogType.TRIGGERED);
        const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
        const discordUserId = res.locals.jwtPayload.discordUserId;
        userService.getUserByDiscordUserId(discordUserId).then((user: User) => {
            discordService.getDiscordUserByToken(discordAccessToken).then((response) => {
                log('getCurrentUser', LogType.SUCCESS);
                return res.json({isAdmin: user.isSuperAdmin, participations: user.participations, ...response});
            }).catch((error) => {
                log('getCurrentUser', LogType.FAILED, error);
                return res.status(401).send('invalid token');
            });
        }).catch((error) => {
            log('getCurrentUser', LogType.FAILED, error);
            return res.status(401).send('invalid token');
        });
    }

    async getServers(req: Request, res: Response) {
        log('getServers', LogType.TRIGGERED);
        const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
        discordService.getDiscordServersByToken(discordAccessToken).then((discordServers: DiscordServer[]) => {
            serverService.getAggregatedServersByDiscordServer(discordServers).then((aggregatedServers: DiscordServerAggregated[]) => {
                return res.json(aggregatedServers);
            }).catch((error) => {
                log('getServers', LogType.FAILED, error);
                return res.status(400).send('failed retrieving servers');
            });
        }).catch((error) => {
            log('getServers', LogType.FAILED, error);
            return res.status(401).send('invalid token');
        });
    }
}

export default new DiscordController();