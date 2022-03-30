import { Router } from "express";
import { check } from "express-validator";
import betController from "../app/controllers/betController";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT from "../app/middlewares/security";
import Roles from "../app/utils/roles";

export const useBetRoutes = (routes: Router) => {
    routes.put("/bet/edit", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("id", "id (bet) is required").notEmpty(),
    ], betController.edit);


    routes.put("/bet/validate-and-invalidate-others", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("id", "id (bet) is required").notEmpty(),
    ], betController.validateBetAndInvalidateOthers);

    routes.post("/bet/create", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("matchId", "matchId is required").notEmpty(),
      ], betController.create);

    routes.delete('/bet/:id', [
    checkJWT, 
    checkRoles([Roles.ADMIN]),
    ], betController.delete);
}