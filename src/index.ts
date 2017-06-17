import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import {info} from 'winston';

import {host, port} from './config';
import router from './router';

class Application {

  app: express.Application

  constructor() {
    this.app = express()

    this.setupViewEngine();
    this.setupRouter();
    this.startListening();
  }

  private setupViewEngine() {
    const hbs = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs'
    });

    this.app.engine('hbs', hbs.engine);
    this.app.set('views', path.resolve(__dirname, '../views'));
    this.app.set('view engine', 'hbs');
  }

  private setupRouter() {
    this.app.use(router);
  }

  private startListening() {
    this.app.listen(port, host, () => {
      info(`Server is ready and listening on http://${host}:${port}`);
    });
  }
};

export default (new Application()).app;
