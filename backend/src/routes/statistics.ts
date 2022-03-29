import { Router } from "express";
import { check } from "express-validator";
import statisticsController from "../app/controllers/statisticsController";
import { checkApiKey } from "../app/middlewares/security";

export const useStatisticsRoutes = (routes: Router) => {
    routes.get("/statistics/tournamentLabel=:tournamentLabel&numberOfDays=:numberOfDays", [
        checkApiKey, 
        check("tournamentLabel", "tournamentLabel is required").notEmpty(),
        check("numberOfDays", "numberOfDays is required").notEmpty(),
    ], statisticsController.getFromTournamentLabel);
}