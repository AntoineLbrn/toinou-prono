import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Ranking from "../models/Ranking";
import matchService from "../services/matchService";
import userTournamentParticipationService from "../services/userTournamentParticipationService";

class UserTournamentParticipationController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }
        const oAuthDiscordUserId = res.locals.jwtPayload?.discordUserId;

        const { tournamentId, discordUserId } = req.body;
        userTournamentParticipationService.create(tournamentId, discordUserId ? discordUserId : oAuthDiscordUserId)
        .then((newParticipation) => {
            return res.json(newParticipation)
        })
        .catch((error) => {
            res.statusMessage =  error.code + ' ' + error.toString();
            return res.status(400).send();
        });
    }

    async getByUser(req: Request, res: Response) {
        const discordUserId = res.locals.jwtPayload.discordUserId;
        const relations = req.query.relations && typeof req.query.relations === 'string' ? req.query.relations.split(','): undefined;
        userTournamentParticipationService.get({discordUserId, relations})
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
        const relations = req.query.relations && typeof req.query.relations === 'string' ? req.query.relations.split(','): undefined;

        userTournamentParticipationService.get({discordUserId, relations})
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

    async getRankByTournamentLabelAndDiscordUserId(req: Request, res: Response) {
    const { tournamentLabel, discordUserId  } = req.params;
    userTournamentParticipationService.getRankByTournamentLabelAndDiscordUserId({discordUserId, tournamentLabel}).then((rank: Ranking) => {
        return res.status(201).json(rank);
    }).catch((error) => {
        res.statusMessage =  error.code + ' ' + error.toString();
        return res.status(400).send();
    });
    }
}

export default new UserTournamentParticipationController();