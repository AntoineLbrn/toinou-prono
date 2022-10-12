import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import tournamentSubscriptionService from "../services/tournamentSubscriptionService";

class tournamentSubscriptionController {

    async index(req: Request, res: Response) {
        tournamentSubscriptionService.getAll().then((subscriptions) => {
            return res.json(subscriptions)
        }).catch((error) => {
            res.statusMessage = error.code + ' ' + error.toString();
            return res.status(400).send();
        });
    }

    async edit(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const {id, shouldAutoPostBets, autoPostBetsHour, autoPostBetsMinutes, bettorRoleId, bettorRoleLabel, bettorChannelId, bettorChannelLabel} = req.body;
        tournamentSubscriptionService.edit(id, shouldAutoPostBets, autoPostBetsHour, autoPostBetsMinutes, bettorRoleId, bettorRoleLabel, bettorChannelId, bettorChannelLabel) 
            .then((subscription) => {
                return res.json(subscription)
            })
            .catch((error) => {
                res.statusMessage = error.toString();
                return res.status(400).send();
            });
    }


    async getByDiscordServerId(req: Request, res: Response) {
        const { discordServerId } = req.params;
        const relations = req.query.relations && typeof req.query.relations === 'string' ? req.query.relations.split(','): undefined;
        tournamentSubscriptionService.getByDiscordServerId({discordServerId, relations})
        .then((tournament) => {
          return res.json(tournament)
        })
        .catch((error) => {
          res.statusMessage = error.toString();
          return res.status(400).send();
        });
    }

    async create(req: Request, res: Response) {
        const {serverId, tournamentId} = req.body;
        tournamentSubscriptionService.insertNewTournamentSubscription(serverId, tournamentId).then((subscription) => {
            return res.json(subscription)
        }).catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        })
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        tournamentSubscriptionService.get(id).then((subscription) => {
                return res.json(subscription)
        }).catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        })
    }

    async getByLabelAndServerId(req: Request, res: Response) {
        const { label, serverId } = req.params;
        tournamentSubscriptionService.getByLabelAndServerId(label, serverId).then((subscription: ServerTournamentSubscribtion) => {
          return res.status(201).json(subscription);
        }).catch((error) => {
          res.statusMessage = error.code + ' ' + error.toString();
          return res.status(400).send();
        });
    }
    
    async getByTournamentIdAndServerId(req: Request, res: Response) {
        const { tournamentId, serverId } = req.params;
        tournamentSubscriptionService.getByTournamentIdAndServerId(tournamentId, serverId).then((subscription: ServerTournamentSubscribtion) => {
          return res.status(201).json(subscription);
        }).catch((error) => {
          res.statusMessage = error.code + ' ' + error.toString();
          return res.status(400).send();
        });
    }
}

export default new tournamentSubscriptionController();