import { Router } from 'express';
import { check } from 'express-validator';
import authController from './app/controllers/authController';
import betController from './app/controllers/betController';
import discordController from './app/controllers/discordController';
import matchController from './app/controllers/matchController';
import serverController from './app/controllers/serverController';
import tournamentController from './app/controllers/tournamentController';
import tournamentSubscriptionController from './app/controllers/tournamentSubscriptionController';
import userController from './app/controllers/userController';
import userTournamentParticipationController from './app/controllers/userTournamentParticipationController';
import voteController from './app/controllers/voteController';
import checkEditChannelAndRolesPermissions from './app/middlewares/checkEditChannelAndRolesPermissions';
import checkRoles from './app/middlewares/checkroles';
import checkJWT, { checkApiKey, checkJWTOrApiKey } from './app/middlewares/security';
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
routes.get("/tournament/:id", checkJWTOrApiKey, tournamentController.get);
routes.get("/tournaments", [checkJWT], tournamentController.index);
routes.get("/servers", [checkJWT], serverController.index);

routes.get("/server-tournament-subscription/:id", [checkJWT, checkRoles([Roles.ADMIN])], tournamentSubscriptionController.get);
routes.post("/tournament-subscription/create", [checkJWT, checkEditChannelAndRolesPermissions], tournamentSubscriptionController.create);
routes.post("/tournament/create", [checkJWT, checkRoles([Roles.ADMIN])], tournamentController.create);
routes.put("/tournament-subscription/edit", [
  checkJWT, 
  checkEditChannelAndRolesPermissions,     
  check("id", "id (subscription) is required").notEmpty(),
], tournamentSubscriptionController.edit);
routes.put("/tournament/edit", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("id", "id (tournament) is required").notEmpty(),
], tournamentController.edit);

routes.put("/bet/edit", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("id", "id (bet) is required").notEmpty(),
], betController.edit);

routes.put("/match/edit", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("id", "id (match) is required").notEmpty(),
], matchController.edit);

routes.put("/bet/validate-and-invalidate-others", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("id", "id (bet) is required").notEmpty(),
], betController.validateBetAndInvalidateOthers);

routes.post("/match/create", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("tournamentId", "tournamentId is required").notEmpty(),
], matchController.create);

routes.post("/bet/create", [
  checkJWT, 
  checkRoles([Roles.ADMIN]),
  check("matchId", "matchId is required").notEmpty(),
], betController.create);

routes.post("/user-tournament-participation/create", [
  checkJWT, 
  check("tournamentId", "tournamentId is required").notEmpty(),
], userTournamentParticipationController.create)

routes.post("/vote/create", [
  checkJWT, 
  check("betId", "betId is required").notEmpty(),
], voteController.create)

routes.put("/vote", [
  checkApiKey, 
  check("betId", "betId is required").notEmpty(),
  check("discordUserId", "discordUserId is required").notEmpty(),
], voteController.edit)

routes.get("/user-tournament-participation", [
  checkJWT, 
], userTournamentParticipationController.getByUser)

routes.get("/user-tournament-participation/tournament-id=:tournamentId", [
  checkJWT, 
], userTournamentParticipationController.getByUserAndTournament);

routes.get("/rank/:tournamentId", [
  checkJWT, 
], userTournamentParticipationController.getRank);

routes.get("/tournaments/:discordServerId", [
  checkApiKey,
], tournamentSubscriptionController.getByDiscordServerId)

routes.get("/user-tournament-participation/discord-user-id=:discordUserId", [
  checkApiKey,
], userTournamentParticipationController.getByDiscordUserId)

export default routes;