import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import {info} from 'winston';

import {BUNDLES_FOLDER_NAME, DISTRIBUTION_FOLDER_NAME, HOST, PORT } from './config';
import router from './router';

class Application {

  public app: express.Application;

  constructor() {
    this.app = express();

    this.setupRouter();
    this.setupAssetsPaths();
    this.startListening();
  }

  private setupRouter() {
    this.app.use(router);
  }

  private setupAssetsPaths() {
    this.app.use('/', express.static(path.resolve(DISTRIBUTION_FOLDER_NAME, '../', BUNDLES_FOLDER_NAME)));
  }

  private startListening() {
    this.app.listen(PORT, HOST, () => {
      info(`Server is ready and listening on http://${HOST}:${PORT}`);
    });
  }
}

export default (new Application()).app;
