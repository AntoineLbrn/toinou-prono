import { Router } from 'express';
import authController from './app/controllers/authController';
import discordController from './app/controllers/discordController';
import userController from './app/controllers/userController';
import checkRoles from './app/middlewares/checkroles';
import checkJWT from './app/middlewares/security';
import Roles from './app/utils/roles';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'This is ToinouProno home route. Welcome and have fun using the API' });
});
routes.post("/authenticate", authController.authenticate);
routes.get("/users", [checkJWT, checkRoles([Roles.ADMIN])] ,userController.index);
routes.get("/user/@me", checkJWT ,discordController.getCurrentUser);
routes.get("/user/:discordUserId", userController.showByDiscordUserId, checkJWT);
routes.post("/user", userController.store, checkJWT);

export default routes;