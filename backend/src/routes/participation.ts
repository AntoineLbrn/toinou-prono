import { Router } from "express";
import { check } from "express-validator";
import userTournamentParticipationController from "../app/controllers/userTournamentParticipationController";
import checkJWT, { checkApiKey } from "../app/middlewares/security";

export const useParticipationRoutes = (routes: Router) => {


    routes.post("/user-tournament-participation/create", [
        checkJWT, 
        check("tournamentId", "tournamentId is required").notEmpty(),
    ], userTournamentParticipationController.create)
      

    routes.get("/user-tournament-participation", [
        checkJWT, 
    ], userTournamentParticipationController.getByUser)

    routes.get("/user-tournament-participation/tournament-id=:tournamentId", [
        checkJWT, 
    ], userTournamentParticipationController.getByUserAndTournament);
 
    
    routes.get("/user-tournament-participation/discord-user-id=:discordUserId", [
        checkApiKey,
    ], userTournamentParticipationController.getByDiscordUserId)

    routes.get("/rank/tournamentLabel=:tournamentLabel&discordUserId=:discordUserId", [
        checkApiKey, 
        check("tournamentLabel", "tournamentLabel is required").notEmpty(),
        check("discordUserId", "discordUserId is required").notEmpty(),
    ], userTournamentParticipationController.getRankByTournamentLabelAndDiscordUserId)

    routes.get("/rank/:tournamentId", [
        checkJWT, 
    ], userTournamentParticipationController.getRank);

    routes.post("/participation", [
        checkApiKey,         
        check("tournamentId", "tournamentLabel is required").notEmpty(),
        check("discordUserId", "discordUserId is required").notEmpty(),
    ], userTournamentParticipationController.create);

}