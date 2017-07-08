import * as express from 'express';

import admin from '../controllers/admin';
import dashboard from '../controllers/dashboard';

class Router {

  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.use('/', this.getIndexRouter());
    this.router.use('/admin', this.getAdminRouter());
  }

  private getAdminRouter() {
    const router = express.Router();

    router.get('/', admin.index);

    return router;
  }

  private getIndexRouter() {
    const router = express.Router();

    router.get('/', dashboard.index);

    return router;
  }
}

export default (new Router()).router;
