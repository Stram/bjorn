import * as express from 'express';
import {info} from 'winston';

import {host, port} from 'server/config';

class Application {

  express: express.Application

  constructor() {
    this.express = express()
    this.init();
  }

  init() {
    this.setRoutes();
    this.startListening();
  }

  private setRoutes() {
    // TODO
  }

  private startListening() {
    this.express.listen(port, host, () => {
      info(`Server is ready and listening on http://${host}:${port}`);
    });
  }
};

const app = new Application();

export default app.express;
