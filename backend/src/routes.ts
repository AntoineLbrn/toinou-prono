import { Router } from 'express';
import { useAuthRoutes } from './routes/auth';
import { useBetRoutes } from './routes/bet';
import { useDiscordRoutes } from './routes/discord';
import { useMatchRoutes } from './routes/match';
import { useParticipationRoutes } from './routes/participation';
import { useServerRoutes } from './routes/server';
import { useStatisticsRoutes } from './routes/statistics';
import { useSubscriptionRoutes } from './routes/subscription';
import { useTournamentRoutes } from './routes/tournament';
import { useUserRoutes } from './routes/user';
import { useVoteRoutes } from './routes/vote';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'This is ToinouProno home route. Welcome and have fun using the API' });
});
useDiscordRoutes(routes);
useAuthRoutes(routes);
useUserRoutes(routes);
useServerRoutes(routes);
useTournamentRoutes(routes);
useSubscriptionRoutes(routes);
useBetRoutes(routes);
useMatchRoutes(routes);
useParticipationRoutes(routes);
useVoteRoutes(routes)
useStatisticsRoutes(routes);
export default routes;