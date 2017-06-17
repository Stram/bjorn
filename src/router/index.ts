import * as express from 'express';

import admin from '../controllers/admin';

class Router {

  router: express.Router

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    const adminRouter = this.getAdminRouter();

    this.router.use('/admin', adminRouter);
  }

  private getAdminRouter() {
    const router = express.Router();

    router.get('/', admin.index);

    return router;
  }
}

export default (new Router()).router;
