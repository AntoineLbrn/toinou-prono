import { Router } from "express";
import discordController from "../app/controllers/discordController";
import userController from "../app/controllers/userController";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT from "../app/middlewares/security";
import Roles from "../app/utils/roles";

export const useUserRoutes = (routes: Router) => {
    routes.get("/users", [checkJWT, checkRoles([Roles.ADMIN])] ,userController.index);
    routes.get("/user/:discordUserId", userController.showByDiscordUserId, checkJWT);
}