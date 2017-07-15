import * as express from 'express';

import MainController from '../controllers/Main';

class Router {
  public router: express.Router;
  private mainController: MainController;

  constructor(app: express.Application) {
    this.router = express.Router();
    this.mainController = new MainController(app);
    this.setRoutes();
  }

  private setRoutes() {
    this.router.use('/', this.getIndexRouter());
  }

  private getIndexRouter() {
    const router = express.Router();

    router.get('/', this.mainController.index);

    return router;
  }
}

export default Router;
