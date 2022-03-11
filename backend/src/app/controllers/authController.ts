import { Request, Response } from "express";
import discordService from "../services/discordService";
import userService from "../services/userService";
import DiscordTokenResponse from "../models/DiscordTokenResponse";
import DiscordUser from "../models/DiscordUser";
import authService from "../services/authService";
import log, { LogType } from "../utils/log";
import { User } from "../entities/User";
import Roles from "../utils/roles";

class AuthController {
    async authenticate(req: Request, res: Response) {
        log('authenticate', LogType.TRIGGERED);
        const { code, state } = req.body;
        discordService.getDiscordAccessToken(code, state).then((discordToken: DiscordTokenResponse) => {
            discordService.getDiscordUserByToken(discordToken.access_token).then((discordUser: DiscordUser) => {
                console.log(discordUser);
                userService.createUserIfNotExists(discordUser).then((user: User) => {
                    const token = authService.generateToken(discordUser.id, discordToken.access_token)
                    log('authenticate', LogType.SUCCESS, token);
                    return res.json({role: user.isSuperAdmin ? Roles.ADMIN : Roles.BASIC_USER, token: token});
                }).catch((error) => {
                    log('authenticate-createUser', LogType.FAILED, error);
                });
            }).catch((error) => {
                log('authenticate-getDiscordUser', LogType.FAILED, error);
            });
        }).catch((error) => {
            log('authenticate-getDiscordAccessToken', LogType.FAILED, error);
        });
    }
}

export default new AuthController();