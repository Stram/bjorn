import {Application} from 'express';
import MFS from 'memory-fs';
import path from 'path';
import webpack from 'webpack';
import {error, warn} from 'winston';

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const readFile = (fs: any, file: string) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
  } catch (e) {
    error(e);
  }
};

export default function setupDevServer(app: Application, cb: (bundle: object, options: object) => void): Promise<void> {
  let bundle: object;
  let clientManifest: object;

  return new Promise((resolve, reject) => {
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    );

    const clientCompiler = webpack(clientConfig);
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
      noInfo: true,
      publicPath: clientConfig.output.publicPath,
    });

    app.use(devMiddleware);

    clientCompiler.plugin('done', (stats) => {
      const jsonStats = stats.toJson();
      jsonStats.errors.forEach((err: any) => error(err));
      jsonStats.warnings.forEach((err: any) => warn(err));
      if (jsonStats.errors.length) {
        reject();
        return;
      }

      clientManifest = JSON.parse(readFile(
        devMiddleware.fileSystem,
        'vue-ssr-client-manifest.json',
      ));

      if (bundle) {
        resolve();
        cb(bundle, {
          clientManifest,
        });
      }
    });

    app.use(webpackHotMiddleware(clientCompiler, {heartbeat: 5000}));

    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
      if (err) {
        throw err;
      }
      const jsonStats = stats.toJson();

      if (jsonStats.errors.length) {
        reject();
        return;
      }

      bundle = JSON.parse(readFile(
        mfs,
        'vue-ssr-server-bundle.json',
      ));

      if (clientManifest) {
        resolve();
        cb(bundle, {
          clientManifest,
        });
      }
    });
  });
}
