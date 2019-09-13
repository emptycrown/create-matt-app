import * as sentry from '@sentry/browser';
import { ENV, PLATFORM, PROD } from '#/lib/env';

if (ENV === PROD) {
  // Automatically catches unhandled promise rejections
  sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: PLATFORM,
  });
}

export default sentry;
