import { Router } from "express";
import { check } from "express-validator";
import tournamentController from "../app/controllers/tournamentController";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT, { checkApiKey, checkJWTOrApiKey } from "../app/middlewares/security";
import Roles from "../app/utils/roles";


export const useTournamentRoutes = (routes: Router) => {
    routes.get("/tournament/label=:label", checkJWTOrApiKey, tournamentController.getByLabel);
    routes.get("/tournament/:id", checkJWTOrApiKey, tournamentController.get);
    routes.get("/tournaments", [checkJWT], tournamentController.index);
    routes.post("/tournament/create", [checkJWT, checkRoles([Roles.ADMIN])], tournamentController.create);
    
    routes.put("/tournament/edit", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("id", "id (tournament) is required").notEmpty(),
    ], tournamentController.edit);

    routes.get("/leaderboard/label=:label", [checkApiKey], tournamentController.getLeaderboardByTournamentLabel);

}