import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ mensage: 'Hello World' });
});

export default routes;
