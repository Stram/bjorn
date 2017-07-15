import * as express from 'express';
import * as path from 'path';
import {info} from 'winston';

import {BUNDLES_FOLDER_NAME, DISTRIBUTION_FOLDER_NAME, HOST, PORT } from './config';
import Router from './router';

class Application {

  public app: express.Application;
  private router: express.Router;

  constructor() {
    this.app = express();

    this.setupRouter();
    this.setupAssetsPaths();
    this.startListening();
  }

  private setupRouter() {
    const routerClass = new Router(this.app);
    this.router = routerClass.router;
    this.app.use(this.router);
  }

  private setupAssetsPaths() {
    // this.app.use('/', express.static(path.resolve(DISTRIBUTION_FOLDER_NAME, '../', BUNDLES_FOLDER_NAME)));
  }

  private startListening() {
    this.app.listen(PORT, HOST, () => {
      info(`Server is ready and listening on http://${HOST}:${PORT}`);
    });
  }
}

export default (new Application()).app;
