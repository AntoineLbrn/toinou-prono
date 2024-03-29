import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Tournament } from "../entities/Tournament";
import Leaderboard from "../models/Leaderboard";
import tournamentService from "../services/tournamentService";

class TournamentController {
  async index(req: Request, res: Response) {
    const relations = req.query.relations as string;
    const tournaments = await Tournament.find({ relations: relations ? relations.split(',') : ['serversSubscriptions', 'serversSubscriptions.server', 'matches', 'participations'] });

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
    const relations = req.query.relations as string;
    tournamentService.get(id, relations ? relations.split(',') : []).then((tournament: Tournament) => {
      return res.status(201).json(tournament);
    }).catch((error) => {
      res.statusMessage = error.toString();
      return res.status(400).send();
    });
  }

  async getByLabel(req: Request, res: Response) {
    const { label } = req.params;
    tournamentService.getByLabel(label).then((tournament: Tournament) => {
      return res.status(201).json(tournament);
    }).catch((error) => {
      res.statusMessage = error.code + ' ' + error.toString();
      return res.status(400).send();
    });
  }

  async populateMatches(req: Request, res: Response) {
    const { id } = req.params;
    tournamentService.fetchExternalMatches(id)
      .then((tournament) => {
        return res.json(tournament)
      })
      .catch((error) => {
        res.statusMessage = error.toString();
        return res.status(400).send();
      });
  }

  async populateMatchesResults(req: Request, res: Response) {
    const { id } = req.params;
    tournamentService.fetchExternalMatchesResults(id)
      .then((tournament) => {
        return res.json(tournament)
      })
      .catch((error) => {
        res.statusMessage = error.toString();
        return res.status(400).send();
      });
  }

  async edit(req: Request, res: Response) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
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

  async getLeaderboardByTournamentLabel(req: Request, res: Response) {
    const { label } = req.params;
    tournamentService.getLeaderboardByTournamentLabel(label).then((leaderboard: Leaderboard) => {
      return res.status(200).json(leaderboard);
    }).catch((error) => {
      res.statusMessage = error.code + ' ' + error.toString();
      return res.status(400).send();
    });
  }
}

export default new TournamentController();