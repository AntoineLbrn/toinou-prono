import { Request, Response } from "express";
import discordService from "../services/discordService";
import log, { LogType } from "../utils/log";

class DiscordController {
    async getCurrentUser(req: Request, res: Response) {
        log('getCurrentUser', LogType.TRIGGERED);
        const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
        discordService.getDiscordUserByToken(discordAccessToken).then((response) => {
            log('getCurrentUser', LogType.SUCCESS);
            return res.json(response);
        }).catch((error) => {
            log('getCurrentUser', LogType.FAILED, error);
        }) ;
    }
}

export default new DiscordController();