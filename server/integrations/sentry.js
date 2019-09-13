import * as sentry from '@sentry/node';
import { ENV, PLATFORM, PROD } from '#/lib/env';

export async function wrapApp(app, prepareApp) {
  if (ENV === PROD) {
    sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: PLATFORM,
      // TODO: add git sha
      // release: null,
    });
    app.use(sentry.Handlers.requestHandler());
    prepareApp();
    app.use(sentry.Handlers.errorHandler());
  } else {
    prepareApp();
  }
}

export default sentry;
