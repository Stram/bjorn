import * as express from 'express';
import {info} from 'winston';

import {HOST, PORT} from './config';
import Router from './router';

class Application {
  public app: express.Application;
  private router: express.Router;

  constructor() {
    this.app = express();

    this.setupRouter();
    this.startListening();
  }

  private setupRouter() {
    const routerClass = new Router(this.app);
    this.router = routerClass.router;
    this.app.use(this.router);
  }

  private startListening() {
    this.app.listen(PORT, HOST, () => {
      info(`Server is ready and listening on http://${HOST}:${PORT}`);
    });
  }
}

export default (new Application()).app;
