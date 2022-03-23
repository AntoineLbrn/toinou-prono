import { Router } from "express";
import discordController from "../app/controllers/discordController";
import checkJWT from "../app/middlewares/security";

export const useDiscordRoutes = (routes: Router) => {
    routes.get("/user/@me", checkJWT , discordController.getCurrentUser);
    routes.get("/discord/servers", checkJWT, discordController.getServers, );
}