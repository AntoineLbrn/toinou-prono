import { Request, Response } from "express";
import { Server } from "../entities/Server";

import DiscordServer from "../models/DiscordServer";
import discordService from "../services/discordService";
import serverService from "../services/serverService";
import log, { LogType } from "../utils/log";
import ServerCreated from "./responseTypes/ServerCreated";

class ServerController {

  async index(req: Request, res: Response) {
    const servers = await serverService.getAllServers();

    return res.json(servers);
  }

  async add(req: Request, res: Response) {
    log('addServer', LogType.TRIGGERED);
    const discordServer = req.body as DiscordServer;
    serverService.createServerFromDiscordServer(discordServer).then((server: Server) => {
        log('addServer', LogType.SUCCESS);
        return res.status(201).json( {discordServer, server} as ServerCreated );
    }).catch((error) => {
        log('addServer', LogType.FAILED, error);
        return res.status(400).send(JSON.stringify(error));
    });
  }

  async get(req: Request, res: Response) {
    log('getServerDetail', LogType.TRIGGERED);
    const { id } = req.params;
    const discordAccessToken = res.locals.jwtPayload.discordAccessToken;
    serverService.getServerDetail(id).then((server: Server) => {
        discordService.getDiscordServerDetail(server.discordServerId, discordAccessToken).then((discordServer: DiscordServer) => {
          log('getServerDetail', LogType.SUCCESS);
          return res.status(201).json({discordServer, server});
        }).catch((error) => {
          log('getServerDetail', LogType.FAILED, error);
          return res.status(400).send(JSON.stringify(error));          
        })
    }).catch((error) => {
        log('getServerDetail', LogType.FAILED, error);
        return res.status(400).send(JSON.stringify(error));
    });
  }
}

export default new ServerController();