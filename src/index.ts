import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import {info} from 'winston';

import {HOST, PORT, DISTRIBUTION_FOLDER_NAME, BUNDLES_FOLDER_NAME} from './config';
import router from './router';

class Application {

  app: express.Application

  constructor() {
    this.app = express()

    this.setupViewEngine();
    this.setupRouter();
    this.setupAssetsPaths();
    this.startListening();
  }

  private setupViewEngine() {
    const hbs = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs'
    });

    this.app.engine('hbs', hbs.engine);
    this.app.set('views', path.resolve(DISTRIBUTION_FOLDER_NAME, '../views'));
    this.app.set('view engine', 'hbs');
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
};

export default (new Application()).app;
