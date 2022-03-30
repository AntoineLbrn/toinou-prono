import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Bet, BetStatus } from "../entities/Bet";
import betService from "../services/betService";
import matchService from "../services/matchService";

class BetController {

    async create(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }

        const { label, matchId, description, status } = req.body;
        betService.create(label, matchId, description, status)
        .then((newBet) => {
            return res.json(newBet)
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
  
        const bet = req.body as Partial<Bet>;
        betService.edit(bet) 
            .then((bet) => {
                return res.json(bet)
            })
            .catch((error) => {
                res.statusMessage = error.toString();
                return res.status(400).send();
            });
    }

    async validateBetAndInvalidateOthers(req: Request, res: Response) {
        const err = validationResult(req);
        if (! err.isEmpty()) {
            res.statusMessage = JSON.stringify(err.mapped())
            return res.status(400).send();
        }
  
        const { id } = req.body;
        betService.get(id)
        .then((bet: Bet) => {
            matchService.invalidateAllBetsExcept(bet.match.id, id)
            .then(() => {
                betService.edit({id, status: BetStatus.WON}) 
                .then((bet) => {
                    return res.json(bet)
                })
                .catch((error) => {
                    res.statusMessage = error.toString();
                    return res.status(400).send();
                });
            })
            .catch((error) => {
                res.statusMessage = error.toString();
                return res.status(400).send();
            });
        })
        .catch((error) => {
            res.statusMessage = error.toString();
            return res.status(400).send();
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        betService.delete(id)
            .then((bet) => {
                return res.json(bet);
            })
            .catch ((error) => {
                res.statusMessage =  error.code + ' ' + error.toString();
                return res.status(400).send();
            })
    }
}

export default new BetController();