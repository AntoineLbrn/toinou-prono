import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Tournament } from "../entities/Tournament";
import tournamentService from "../services/tournamentService";

class TournamentController {
    async index(req: Request, res: Response) {
        const tournaments = await Tournament.find({relations: ['serversSubscriptions', 'serversSubscriptions.server', 'matches', 'participations']});
    
        return res.json(tournaments);
    }

    async create(req: Request, res: Response) {
      const tournament = req.body as Partial<Tournament>;
      tournamentService.create(tournament)
      .then((tournament) => {
        return res.json(tournament)
      })
      .catch((error) => {
        res.statusMessage = error.toString();
        return res.status(400).send();
      });
    }
    
    async get(req: Request, res: Response) {
      const { id } = req.params;
      tournamentService.get(id).then((tournament: Tournament) => {
        return res.status(201).json(tournament);
      }).catch((error) => {
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

      const tournament = req.body as Partial<Tournament>;
      tournamentService.edit(tournament) 
      .then((tournament) => {
          return res.json(tournament)
      })
      .catch((error) => {
          res.statusMessage = error.toString();
          return res.status(400).send();
    });

    
  }
}

export default new TournamentController();