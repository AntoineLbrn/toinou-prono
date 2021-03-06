import { Router } from "express";
import discordController from "../app/controllers/discordController";
import userController from "../app/controllers/userController";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT, { checkApiKey } from "../app/middlewares/security";
import Roles from "../app/utils/roles";

export const useUserRoutes = (routes: Router) => {
    routes.get("/users", [checkJWT, checkRoles([Roles.ADMIN])] ,userController.index);
    routes.get("/user/:id", userController.get, checkJWT); //?relations=
    routes.get("/user/?discordUserId=:discordUserId", userController.showByDiscordUserId, checkJWT);
    routes.post("/user", userController.create, checkApiKey);
}