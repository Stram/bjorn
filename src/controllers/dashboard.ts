import {RequestHandler} from 'express';
import {createBundleRenderer} from 'vue-server-renderer';
import {error} from 'winston';

import dashboardTemplate from 'app/dashboard.template.html';
import * as clientManifest from '../../bundles/vue-ssr-client-manifest.json';
import * as serverBundle from '../../dist/server-renderer-bundles/vue-ssr-server-bundle.json';

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  runInNewContext: false,
  template: dashboardTemplate,
});

class DashboardController {
  public index: RequestHandler = (req, res, next) => {

    renderer.renderToString({
      title: 'Dashboard',
      url: req.url,
    }, (renderError, html) => {
      if (renderError) {
        error('Error during application render: ', renderError);
        res.status(500).send();
        return;
      }
      res.send(html);
    });
  }
}

export default new DashboardController();
