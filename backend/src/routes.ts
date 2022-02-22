import { Router } from 'express';
import { check } from 'express-validator';
import authController from './app/controllers/authController';
import discordController from './app/controllers/discordController';
import serverController from './app/controllers/serverController';
import tournamentController from './app/controllers/tournamentController';
import tournamentSubscriptionController from './app/controllers/tournamentSubscriptionController';
import userController from './app/controllers/userController';
import checkEditChannelAndRolesPermissions from './app/middlewares/checkEditChannelAndRolesPermissions';
import checkRoles from './app/middlewares/checkroles';
import checkJWT from './app/middlewares/security';
import Roles from './app/utils/roles';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'This is ToinouProno home route. Welcome and have fun using the API' });
});
routes.post("/authenticate", authController.authenticate);
routes.get("/users", [checkJWT, checkRoles([Roles.ADMIN])] ,userController.index);
routes.get("/user/@me", checkJWT , discordController.getCurrentUser);
routes.get("/user/:discordUserId", userController.showByDiscordUserId, checkJWT);

routes.get("/discord/servers", checkJWT, discordController.getServers, );
routes.post("/server/add", checkJWT, serverController.add);

routes.get("/server/:id", checkJWT, serverController.get);
routes.get("/tournaments", [checkJWT, checkRoles([Roles.ADMIN])], tournamentController.index);

routes.post("/tournament-subscription/create", [checkJWT, checkEditChannelAndRolesPermissions], tournamentSubscriptionController.create);
routes.put("/tournament-subscription/edit", [
  checkJWT, 
  checkEditChannelAndRolesPermissions,     
  check("id", "id (subscription) is required").notEmpty(),
], tournamentSubscriptionController.edit);


export default routes;