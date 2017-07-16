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
    this.router.use('*', this.mainController.index);
  }
}

export default Router;
