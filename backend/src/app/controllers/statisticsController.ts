import { Request, Response } from "express";
import MatchStatistics from "../models/MatchStatistics";
import statisticsService from "../services/statisticsService";

class StatisticsController {
    async getFromTournamentLabel(req: Request, res: Response) {
        const { tournamentLabel, numberOfDays } = req.params;
        statisticsService.getFromTournamentLabel(tournamentLabel, Number(numberOfDays)).then((matchStatistics: MatchStatistics[]) => {
          return res.status(201).json(matchStatistics);
        }).catch((error) => {
            console.log(error)
          res.statusMessage =  error.code + ' ' + error.toString();
          return res.status(400).send();
        });
    }
}

export default new StatisticsController();