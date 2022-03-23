import { Router } from "express";
import authController from '../app/controllers/authController';

export const useAuthRoutes = (routes: Router) => {
    routes.post("/authenticate", authController.authenticate);
}