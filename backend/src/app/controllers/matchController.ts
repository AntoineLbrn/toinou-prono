import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Match } from "../entities/Match";
import matchService from "../services/matchService";
class MatchController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const { label, description, date, tournamentId, manualVoteClosing}= req.body;
        matchService.create(label, description, date, tournamentId, manualVoteClosing)
        .then((newMatch) => {
            return res.json(newMatch)
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async edit(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }
  
        const match = req.body as Partial<Match>;
        matchService.edit(match) 
            .then((match) => {
                return res.json(match)
            })
            .catch((error) => {
                res.statusMessage = error.toString();
                return res.status(400).send();
            });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        matchService.delete(id)
            .then((match) => {
                return res.json(match);
            })
            .catch ((error) => {
                res.statusMessage =  error.code + ' ' + error.toString();
                return res.status(400).send();
            })
    }
  
}

export default new MatchController();