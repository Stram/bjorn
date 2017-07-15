import * as express from 'express';

import MainController from '../controllers/Main';

class Router {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.use('/', this.getIndexRouter());
  }

  private getIndexRouter() {
    const router = express.Router();

    router.get('/', dashboard.index);

    return router;
  }
}

export default (new Router()).router;
