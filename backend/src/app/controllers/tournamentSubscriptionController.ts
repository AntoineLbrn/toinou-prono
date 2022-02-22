import { Request, Response } from "express";
import { validationResult } from "express-validator";
import tournamentSubscriptionService from "../services/tournamentSubscriptionService";

class tournamentSubscriptionController {
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

    async create(req: Request, res: Response) {
        const {serverId, tournamentId} = req.body;
        tournamentSubscriptionService.insertNewTournamentSubscription(serverId, tournamentId).then((subscription) => {
            return res.json(subscription)
        }).catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        })
    }
}

export default new tournamentSubscriptionController();