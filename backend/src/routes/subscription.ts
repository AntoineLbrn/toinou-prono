import { Router } from "express";
import { check } from "express-validator";
import tournamentSubscriptionController from "../app/controllers/tournamentSubscriptionController";
import checkEditChannelAndRolesPermissions from "../app/middlewares/checkEditChannelAndRolesPermissions";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT, { checkJWTOrApiKey, checkApiKey } from "../app/middlewares/security";
import Roles from "../app/utils/roles";

export const useSubscriptionRoutes = (routes: Router) => {
    routes.get("/subscription/tournamentLabel=:label&serverId=:serverId", checkJWTOrApiKey, tournamentSubscriptionController.getByLabelAndServerId);
    routes.get("/subscription/tournamentId=:tournamentId&serverId=:serverId", checkJWTOrApiKey, tournamentSubscriptionController.getByTournamentIdAndServerId);
    routes.get("/subscription/:id", checkApiKey, tournamentSubscriptionController.get);
    routes.get("/server-tournament-subscription/:id", [checkJWT, checkRoles([Roles.ADMIN])], tournamentSubscriptionController.get);
    routes.post("/tournament-subscription/create", [checkJWT, checkEditChannelAndRolesPermissions], tournamentSubscriptionController.create);
    
    routes.put("/tournament-subscription/edit", [
        checkJWT, 
        checkEditChannelAndRolesPermissions,     
        check("id", "id (subscription) is required").notEmpty(),
    ], tournamentSubscriptionController.edit);

    routes.put("/tournament-subscription/", [
        checkJWTOrApiKey,
        check("id", "id (subscription) is required").notEmpty(),
    ], tournamentSubscriptionController.edit);

    routes.get("/tournaments/:discordServerId", [
        checkApiKey,
    ], tournamentSubscriptionController.getByDiscordServerId)

    routes.get("/subscriptions", [
        checkApiKey,
    ], tournamentSubscriptionController.index)
            
}