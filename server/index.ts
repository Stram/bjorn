import * as express from 'express';
import {info} from 'winston';

import {host, port} from './config';
import router from './router';

class Application {

  express: express.Application

  constructor() {
    this.express = express()

    this.setupRouter();
    this.startListening();
  }

  private setupRouter() {
    this.express.use(router);
  }

  private startListening() {
    this.express.listen(port, host, () => {
      info(`Server is ready and listening on http://${host}:${port}`);
    });
  }
};

const app = new Application();

export default app.express;
