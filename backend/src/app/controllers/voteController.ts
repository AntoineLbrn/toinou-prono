import { Request, Response } from "express";
import { validationResult } from "express-validator";
import voteService from "../services/voteService";

class VoteController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const { betId, discordUserId } = req.body;
        const discordUserIdFromToken = res.locals.jwtPayload?.discordUserId;

        voteService.create({discordUserId: discordUserIdFromToken ? discordUserIdFromToken : discordUserId, betId})
        .then((newVote) => {
            return res.json(newVote)
        })
        .catch((error) => {
            res.statusMessage =  error.code + ' ' + error.toString();
            return res.status(400).send();
        });
    }

    async edit(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const { betId, discordUserId } = req.body;
        const discordUserIdFromToken = res.locals.jwtPayload?.discordUserId;

        voteService.editOrCreate({discordUserId: discordUserIdFromToken ? discordUserIdFromToken : discordUserId, betId})
        .then((vote) => {
            return res.json(vote)
        })
        .catch((error) => {
            res.statusMessage =  error.code + ' ' + error.toString();
            return res.status(400).send();
        });
    }
    
}

export default new VoteController();