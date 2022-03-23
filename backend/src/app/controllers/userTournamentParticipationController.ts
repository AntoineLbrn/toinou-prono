import { Request, Response } from "express";
import { validationResult } from "express-validator";
import matchService from "../services/matchService";
import userTournamentParticipationService from "../services/userTournamentParticipationService";

class UserTournamentParticipationController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }
        const discordUserId = res.locals.jwtPayload.discordUserId;

        const { tournamentId } = req.body;
        userTournamentParticipationService.create(tournamentId, discordUserId)
        .then((newParticipation) => {
            return res.json(newParticipation)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async getByUser(req: Request, res: Response) {
        const discordUserId = res.locals.jwtPayload.discordUserId;

        userTournamentParticipationService.get({discordUserId})
        .then((participations) => {
            return res.json(participations)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async getByDiscordUserId(req: Request, res: Response) {
        const { discordUserId } = req.params;

        userTournamentParticipationService.get({discordUserId})
        .then((participations) => {
            return res.json(participations)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async getByUserAndTournament(req: Request, res: Response) {
        const discordUserId = res.locals.jwtPayload.discordUserId;
        const { tournamentId } = req.params;

        userTournamentParticipationService.getByDiscordUserIdAndTournamentId({discordUserId, tournamentId})
        .then((participations) => {
            return res.json(participations)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async getRank(req: Request, res: Response) {
        const discordUserId = res.locals.jwtPayload.discordUserId;
        const { tournamentId } = req.params;
        userTournamentParticipationService.getRank({discordUserId, tournamentId}).then((rank: number) => {
          return res.status(201).json(rank);
        }).catch((error) => {
          res.statusMessage = error.toString();
          return res.status(400).send();
        });
      }
}

export default new UserTournamentParticipationController();