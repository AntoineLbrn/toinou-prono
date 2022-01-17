import { Router } from 'express';
import userController from './app/controllers/userController';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'This is ToinouProno home route. Welcome and have fun using the API' });
});
routes.get("/users", userController.index);
routes.post("/user", userController.store);

export default routes;