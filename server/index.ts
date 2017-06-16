import * as express from 'express';

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

    });
  }
};

const app = new Application();

export default app.express;
