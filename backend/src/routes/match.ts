import { Router } from "express";
import { check } from "express-validator";
import matchController from "../app/controllers/matchController";
import checkRoles from "../app/middlewares/checkroles";
import checkJWT from "../app/middlewares/security";
import Roles from "../app/utils/roles";

export const useMatchRoutes = (routes: Router) => {

    routes.put("/match/edit", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("id", "id (match) is required").notEmpty(),
    ], matchController.edit);

    routes.post("/match/create", [
        checkJWT, 
        checkRoles([Roles.ADMIN]),
        check("tournamentId", "tournamentId is required").notEmpty(),
    ], matchController.create);
}