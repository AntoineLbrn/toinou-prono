import { Request, Response } from "express";
import { Tournament } from "../entities/Tournament";

class TournamentController {
    async index(req: Request, res: Response) {
        const tournaments = await Tournament.find();
    
        return res.json(tournaments);
      }
    
}

export default new TournamentController();