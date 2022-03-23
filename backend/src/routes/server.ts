import { Router } from "express";
import serverController from "../app/controllers/serverController";
import checkJWT from "../app/middlewares/security";

export const useServerRoutes = (routes: Router) => {
    routes.get("/server/:id", checkJWT, serverController.get);
    routes.post("/server/add", checkJWT, serverController.add);
    routes.get("/servers", [checkJWT], serverController.index);
}