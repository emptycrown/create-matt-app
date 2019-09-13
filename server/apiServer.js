import { ENV, PROD } from '#/lib/url';
import { PORT, ROOT_URL } from '#/lib/url';
import { authorizeApp } from '~/lib/auth';
import { createServer } from 'http';
import { initializeGraphQL } from '~/graphql';
import { wrapApp as wrapAppSentry } from '~/integrations/sentry';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import serveIndexWithMetatags from './metatags';

const rootPath = path.join(__dirname, '..');
const webPath = path.join(rootPath, 'web');

function start() {
  const app = express();
  wrapAppSentry(app, () => {
    app.enable('trust proxy');
    app.use(
      rateLimit({
        windowMs: 1 * 60 * 1000, // window of 1 minute
        max: 800, // limits to 800 requests / minute
      })
    );
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    authorizeApp(app);
    // Serve static assets
    app.use('/dist', express.static(path.join(webPath, 'dist')));
    app.use('/static', express.static(path.join(rootPath, 'static')));
    app.use(
      favicon(
        path.join(
          rootPath,
          'static',
          ENV === PROD ? 'favicon-prod.ico' : 'favicon-dev.ico'
        )
      )
    );
    initializeGraphQL(app);
    serveIndexWithMetatags(app);
  });

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Serving at ${ROOT_URL}!`);
    process.send('ready');
  });
}

start();
