import {Application, RequestHandler} from 'express';
import LRU from 'lru-cache';
import path from 'path';
import {BundleRenderer, BundleRendererOptions, createBundleRenderer} from 'vue-server-renderer';
import {error} from 'winston';

import dashboardTemplate from 'app/dashboard.template.html';
import setupDevServer from '../../build/setup-dev-server';
import * as serverBundle from '../../dist/server-renderer-bundles/vue-ssr-server-bundle.json';

const isProduction = true;

class MainController {
  private rendererPromise: Promise<void>;
  private renderer: BundleRenderer;

  constructor(app: Application) {
    if (isProduction) {
      this.rendererPromise = Promise.resolve();
      this.renderer = this.createRenderer(serverBundle, {});
    } else {
      this.rendererPromise = setupDevServer(app, (bundle, options) => {
        this.renderer = this.createRenderer(bundle, options);
      });
    }
  }

  public index: RequestHandler = (req, res, next) => {
    this.rendererPromise.then(() => {
      const context = {
        title: 'Dashboard',
        url: req.url,
      };

      this.renderer.renderToString(context, (err, html) => {
        if (err) {
          res.status(500).end('500 | Internal Server Error');
          error(`error during render : ${req.url}`);
          error(err.stack);
          return;
        }

        res.end(html);
      });
    });
  }

  private createRenderer(bundle: string|object, options: BundleRendererOptions) {
    return createBundleRenderer(bundle, Object.assign(options, {
      basedir: path.resolve(__dirname, './dist'),
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      runInNewContext: false,
      template: dashboardTemplate,

    }));
  }
}

export default MainController;
