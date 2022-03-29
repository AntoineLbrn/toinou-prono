import { Router } from "express"
import { check } from "express-validator"
import voteController from "../app/controllers/voteController"
import checkJWT, { checkApiKey, checkJWTOrApiKey } from "../app/middlewares/security"

export const useVoteRoutes = (routes: Router) => {
    
    routes.post("/vote/create", [
        checkJWT, 
        check("betId", "betId is required").notEmpty(),
    ], voteController.create)
  
    routes.put("/vote", [
        checkJWTOrApiKey, 
        check("betId", "betId is required").notEmpty(),
    ], voteController.edit)
}