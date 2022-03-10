import { Request, Response } from "express";
import { validationResult } from "express-validator";
import betService from "../services/betService";
import voteService from "../services/voteService";

class VoteController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const { betId } = req.body;
        const discordUserId = res.locals.jwtPayload.discordUserId;

        voteService.create({discordUserId, betId})
        .then((newVote) => {
            return res.json(newVote)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }
}

export default new VoteController();