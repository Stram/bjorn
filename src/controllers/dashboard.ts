import {RequestHandler} from 'express';
import {createBundleRenderer} from 'vue-server-renderer';
import winston from 'winston';

import dashboardTemplate from 'apps/dashboard/dashboard.template.html';
import * as clientManifest from '../../bundles/vue-ssr-client-manifest.json';
import * as serverBundle from '../../dist/server-renderer-bundles/vue-ssr-server-bundle.json';

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  template: dashboardTemplate,
});

class DashboardController {
  public index: RequestHandler = (req, res, next) => {

    renderer.renderToString({
      title: 'Dashboard',
    }, (error, html) => {
      if (error) {
        winston.error('Error during application render: ', error);
        res.status(500).send();
        return;
      }
      res.send(html);
    });
  }
}

export default new DashboardController();
